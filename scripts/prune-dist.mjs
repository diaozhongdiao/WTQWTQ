import fs from 'node:fs/promises'
import path from 'node:path'

const projectRoot = process.cwd()
const distMediaRoot = path.join(projectRoot, 'dist', 'media')

const removableDirs = [
  'album',
  'hero-gallery',
  'strength-hover-icons',
  'strength-icons',
  'work-covers',
]

const removableRootFiles = [
  'avatar.jpg',
  'brand-logo.png',
  'contact-logo.png',
  'contact-qr.jpg',
  'signature-name.png',
  'signature-name-2.png',
  'title-stars.png',
]

async function removeIfExists(target) {
  await fs.rm(target, { recursive: true, force: true })
}

for (const dir of removableDirs) {
  await removeIfExists(path.join(distMediaRoot, dir))
}

for (const file of removableRootFiles) {
  await removeIfExists(path.join(distMediaRoot, file))
}

console.log('Pruned unused source media from dist')
