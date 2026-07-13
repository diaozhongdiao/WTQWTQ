import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const projectRoot = process.cwd()
const mediaRoot = path.join(projectRoot, 'public', 'media')
const optimizedRoot = path.join(mediaRoot, 'optimized')
const albumRoot = path.join(mediaRoot, 'album')
const albumDataPath = path.join(projectRoot, 'src', 'albumData.js')
const imageExts = new Set(['.jpg', '.jpeg', '.png', '.webp'])

const albumCategories = [
  { key: 'work-a', slug: 'car-commercial', match: '01.', columns: 5, shuffle: true, cropLongAspect: 2 },
  { key: 'work-b', slug: 'brand-system', match: '02.', columns: 1, reverse: true },
  { key: 'work-c', slug: 'creative-design', match: '03.', columns: 1 },
]

function toPublicPath(filePath) {
  return `/${path.relative(path.join(projectRoot, 'public'), filePath).replaceAll(path.sep, '/')}`
}

async function listFiles(dir, { skipOptimized = true } = {}) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (skipOptimized && fullPath.startsWith(optimizedRoot)) continue
      files.push(...await listFiles(fullPath, { skipOptimized }))
    } else if (imageExts.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath)
    }
  }
  return files
}

async function convertToWebp(input, output, {
  maxWidth = 1800,
  maxHeight = 5600,
  quality = 84,
  cropLongAspect = null,
} = {}) {
  await fs.mkdir(path.dirname(output), { recursive: true })
  const metadata = await sharp(input).metadata()
  const pipeline = sharp(input, { animated: true }).rotate()
  const width = metadata.width ?? 0
  const height = metadata.height ?? 0
  const ratio = height / Math.max(width, 1)
  if (cropLongAspect && ratio > cropLongAspect && width > 0) {
    const targetWidth = Math.min(width, maxWidth)
    pipeline.resize({
      width: targetWidth,
      height: Math.round(targetWidth * cropLongAspect),
      fit: 'cover',
      position: 'attention',
    })
  } else if ((width && width > maxWidth) || (height && height > maxHeight)) {
    pipeline.resize({ width: maxWidth, height: maxHeight, fit: 'inside', withoutEnlargement: true })
  }
  await pipeline.webp({ quality, effort: 5, smartSubsample: true }).toFile(output)
  const outMeta = await sharp(output).metadata()
  return {
    width: outMeta.width ?? metadata.width ?? 0,
    height: outMeta.height ?? metadata.height ?? 0,
  }
}

function getAlbumCategory(folderName) {
  return albumCategories.find((category) => folderName.startsWith(category.match))
}

function seededShuffle(items) {
  const result = [...items]
  let seed = 20260709
  for (let i = result.length - 1; i > 0; i -= 1) {
    seed = (seed * 1664525 + 1013904223) % 4294967296
    const j = seed % (i + 1)
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

async function optimizeAlbum() {
  const categories = {}
  const folders = await fs.readdir(albumRoot, { withFileTypes: true })
  for (const folder of folders.filter((entry) => entry.isDirectory())) {
    const category = getAlbumCategory(folder.name)
    if (!category) continue

    const sourceDir = path.join(albumRoot, folder.name)
    let files = (await fs.readdir(sourceDir, { withFileTypes: true }))
      .filter((entry) => entry.isFile() && imageExts.has(path.extname(entry.name).toLowerCase()))
      .map((entry) => path.join(sourceDir, entry.name))
      .sort((a, b) => a.localeCompare(b, 'zh-CN'))
    if (category.reverse) files = files.reverse()
    if (category.shuffle) files = seededShuffle(files)

    const images = []
    for (let index = 0; index < files.length; index += 1) {
      const input = files[index]
      const filename = `${String(index + 1).padStart(3, '0')}.webp`
      const output = path.join(optimizedRoot, 'album', category.slug, filename)
      const dimensions = await convertToWebp(input, output, {
        maxWidth: category.columns === 5 ? 1200 : 1900,
        maxHeight: category.columns === 5 ? 2400 : 9000,
        quality: category.columns === 5 ? 83 : 85,
        cropLongAspect: category.cropLongAspect ?? null,
      })
      images.push({
        src: toPublicPath(output),
        width: dimensions.width,
        height: dimensions.height,
        long: false,
      })
    }
    categories[category.key] = {
      slug: category.slug,
      columns: category.columns,
      images,
    }
  }
  return categories
}

async function optimizeReferencedMedia() {
  const files = await listFiles(mediaRoot)
  for (const input of files) {
    const rel = path.relative(mediaRoot, input)
    if (rel.startsWith(`album${path.sep}`)) continue
    const parsed = path.parse(rel)
    const output = path.join(optimizedRoot, parsed.dir, `${parsed.name}.webp`)
    const isCover = rel.startsWith(`work-covers${path.sep}`)
    const isHeroGallery = rel.startsWith(`hero-gallery${path.sep}`)
    const maxWidth = isCover ? 2400 : isHeroGallery ? 1100 : 1600
    const quality = isCover ? 86 : isHeroGallery ? 84 : 86
    await convertToWebp(input, output, { maxWidth, quality })
  }
}

function writeAlbumData(categories) {
  const content = `const albumData = ${JSON.stringify(categories, null, 2)}\n\nexport default albumData\n`
  return fs.writeFile(albumDataPath, content)
}

await fs.rm(optimizedRoot, { recursive: true, force: true })
const albumData = await optimizeAlbum()
await optimizeReferencedMedia()
await writeAlbumData(albumData)

const beforeFiles = await listFiles(mediaRoot)
const optimizedFiles = await listFiles(optimizedRoot, { skipOptimized: false })
const originalTotal = beforeFiles
  .filter((file) => !file.startsWith(optimizedRoot))
  .reduce(async (sumPromise, file) => (await sumPromise) + (await fs.stat(file)).size, Promise.resolve(0))
const optimizedTotal = optimizedFiles.reduce(
  async (sumPromise, file) => (await sumPromise) + (await fs.stat(file)).size,
  Promise.resolve(0),
)

console.log(`Optimized ${optimizedFiles.length} images`)
console.log(`Original media images: ${((await originalTotal) / 1024 / 1024).toFixed(2)} MB`)
console.log(`Optimized WebP images: ${((await optimizedTotal) / 1024 / 1024).toFixed(2)} MB`)
