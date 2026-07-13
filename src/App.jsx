import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

import albumData from './albumData'
import CircularGallery from './components/CircularGallery/CircularGallery'
import BorderGlow from './components/BorderGlow/BorderGlow'
import Grainient from './components/Grainient/Grainient'
import SpotlightCard from './components/SpotlightCard/SpotlightCard'
import StarBorder from './components/StarBorder/StarBorder'
import TiltedCard from './components/TiltedCard/TiltedCard'
import usePortfolioAnimations from './hooks/usePortfolioAnimations'
import './App.css'

const heroGalleryItems = [
  { image: '/media/optimized/hero-gallery/3-4-1.webp', text: 'BREEZE' },
  { image: '/media/optimized/hero-gallery/3-4-2.webp', text: 'COAST DRIVE' },
  { image: '/media/optimized/hero-gallery/3-4-3.webp', text: 'URBAN SUV' },
  { image: '/media/optimized/hero-gallery/3-4-4.webp', text: 'YUE 7' },
  { image: '/media/optimized/hero-gallery/3-4-7.webp', text: 'INFLATED' },
  { image: '/media/optimized/hero-gallery/3-4-8.webp', text: 'VANOW' },
  { image: '/media/optimized/hero-gallery/3-4-6.webp', text: 'ACCORD' },
  { image: '/media/optimized/hero-gallery/3-4-5.webp', text: 'DESERT RUN' },
  { image: '/media/optimized/hero-gallery/3-4-9.webp', text: 'CLICK 001' },
  { image: '/media/optimized/hero-gallery/3-4-11.webp', text: 'CREATE' },
  { image: '/media/optimized/hero-gallery/3-4-10.webp', text: 'PUR ZEAL' },
]

const careerList = [
  {
    date: '2024.03 - 至今',
    company: '广州智合创享科技有限公司',
    role: '平面设计',
    text: '负责社区内容视觉、线下活动物料与项目主视觉落地。',
  },
  {
    date: '2023.06 - 2024.03',
    company: '乐远置业（广州）有限公司',
    role: '视觉设计师 / 品牌发展部',
    text: '参与翻新企业形象、社媒创意、形象海报设计。',
  },
  {
    date: '2022.06 - 2022.09',
    company: '北京杰尔鹏泰互动广告公司',
    role: '视觉设计师 / 设计部',
    text: '设计手机主题为重点，为全球各地区用户提供优秀的视觉设计。',
  },
]

const selectedWorks = [
  {
    title: '汽车商业平面',
    meta: '车型修图 / 版式设计 / 视觉传播',
    className: 'work-a',
    image: '/media/optimized/work-covers/car-commercial.webp',
  },
  {
    title: '品牌视觉体系',
    meta: 'VI 设计 / 视觉统一 / 品牌落地',
    className: 'work-b',
    image: '/media/optimized/work-covers/brand-system.webp',
  },
  {
    title: '多元创意设计',
    meta: '创意落地 / 视觉优化 / 定制设计',
    className: 'work-c',
    image: '/media/optimized/work-covers/creative-design.webp',
  },
]

const strengths = [
  {
    no: '01',
    title: '完整项目主导能力',
    kind: 'Lead',
    icon: '/media/optimized/strength-icons/icon-01.webp',
    hoverIcon: '/media/optimized/strength-hover-icons/hover-01.webp',
  },
  {
    no: '02',
    title: '品牌视觉体系搭建',
    kind: 'Brand',
    icon: '/media/optimized/strength-icons/icon-02.webp',
    hoverIcon: '/media/optimized/strength-hover-icons/hover-02.webp',
  },
  {
    no: '03',
    title: 'AI 设计提效',
    kind: 'AI',
    icon: '/media/optimized/strength-icons/icon-03.webp',
    hoverIcon: '/media/optimized/strength-hover-icons/hover-03.webp',
  },
  {
    no: '04',
    title: '设计管理统筹',
    kind: 'Management',
    icon: '/media/optimized/strength-icons/icon-04.webp',
    hoverIcon: '/media/optimized/strength-hover-icons/hover-04.webp',
  },
  {
    no: '05',
    title: '跨部门协同',
    kind: 'Collaboration',
    icon: '/media/optimized/strength-icons/icon-05.webp',
    hoverIcon: '/media/optimized/strength-hover-icons/hover-05.webp',
  },
]

const contactTitleLines = ["LET'S BUILD", 'BETTER VISUAL', 'SYSTEMS']

function App() {
  const [activeWork, setActiveWork] = useState(null)
  usePortfolioAnimations()

  const openWork = (work) => {
    setActiveWork(work)
  }

  return (
    <main className="site-shell">
      <Header />
      <section className="hero-section section" id="home">
        <div className="hero-bg" aria-hidden="true">
          <video className="hero-video" autoPlay muted loop playsInline preload="auto">
            <source src="/media/hero-bg-0708-2.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="container hero-content">
          <h1>
            <span className="title-mask title-name">
              <i className="js-title-line">WEITIANQIAN</i>
            </span>
            <strong className="portfolio-title">
              <span className="title-mask portfolio-mask">
                <i className="js-title-line">PORTFOLIO</i>
              </span>
              <img className="js-title-deco" src="/media/optimized/signature-name-2.webp" alt="Wei TianQian" />
            </strong>
            <img className="title-stars js-title-deco" src="/media/optimized/title-stars.webp" alt="" />
          </h1>
          <p className="hero-copy js-hero-copy">
            用视觉系统与 AI 工作流，让品牌内容更快、更准、更有辨识度。
          </p>
        </div>
        <div className="hero-gallery js-hero-gallery">
          <CircularGallery
            items={heroGalleryItems}
            bend={1.7}
            textColor="rgba(244, 246, 241, 0.92)"
            borderRadius={0.065}
            font="bold 22px Arial"
            scrollSpeed={2.4}
            scrollEase={0.04}
          />
        </div>
      </section>

      <div className="lower-background">
        <div className="lower-grainient" aria-hidden="true">
          <Grainient
            color1="#195708"
            color2="#090909"
            color3="#004550"
            timeSpeed={1.55}
            colorBalance={-0.03}
            warpStrength={0.95}
            warpFrequency={12}
            warpSpeed={2}
            warpAmplitude={26}
            blendAngle={0}
            blendSoftness={0.05}
            rotationAmount={800}
            noiseScale={2}
            grainAmount={0.1}
            grainScale={2}
            grainAnimated={false}
            contrast={1.5}
            gamma={1}
            saturation={1}
            centerX={0}
            centerY={0}
            zoom={1.5}
          />
        </div>

        <section className="section experience-section js-section" id="experience">
          <div className="container">
            <SectionTitle title="工作经历" subtitle="WORK EXPERIENCE" />
            <div className="profile-grid">
              <div className="avatar-panel js-reveal-card" aria-label="个人形象">
                <TiltedCard
                  imageSrc="/media/optimized/avatar.webp"
                  altText="韦天乾头像"
                  containerHeight="100%"
                  containerWidth="100%"
                  imageHeight="100%"
                  imageWidth="100%"
                  rotateAmplitude={9}
                  scaleOnHover={1.04}
                  showMobileWarning={false}
                  showTooltip={false}
                />
              </div>
              <div className="intro-panel js-reveal-card">
                <p className="small-label">ABOUT ME</p>
                <h2>你好，我是韦天乾!</h2>
                <p>
                  我长期关注品牌视觉、商业影像和 AI 辅助创意流程，擅长把零散需求整理为可复用的视觉系统，
                  让项目从概念、执行到交付保持稳定质感。
                </p>
                <div className="info-grid">
                  <div>
                    <span className="info-label">岗位</span>
                    <strong>平面、视觉设计师</strong>
                  </div>
                  <div>
                    <span className="info-label">方向</span>
                    <strong>平面 / UI / AIGC</strong>
                  </div>
                  <div>
                    <span className="info-label">手机</span>
                    <strong>15979099685</strong>
                  </div>
                  <div>
                    <span className="info-label">邮箱</span>
                    <strong>1294540944@qq.com</strong>
                  </div>
                </div>
                <div className="profile-stats" aria-label="个人数据">
                  <div>
                    <strong>3+</strong>
                    <span>工作经验</span>
                  </div>
                  <div>
                    <strong>广州</strong>
                    <span>城市</span>
                  </div>
                  <div>
                    <strong>30+</strong>
                    <span>落地项目</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="career-line" aria-label="职业路径">
              {careerList.map((item) => (
                <div className="career-item" key={item.company}>
                  <span className="career-marker" aria-hidden="true" />
                  <article className="career-card js-reveal-card">
                    <time>{item.date}</time>
                    <h3>{item.company}</h3>
                    <strong>{item.role}</strong>
                    <p>{item.text}</p>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section works-section js-section" id="works">
          <div className="container">
            <SectionTitle title="视觉作品" subtitle="SELECTED WORKS" />
            <div className="works-grid">
              {selectedWorks.map((work, index) => (
                <BorderGlow
                  className={`work-glow-card js-reveal-card ${work.className}`}
                  key={work.title}
                  edgeSensitivity={24}
                  glowColor="84 100 62"
                  backgroundColor="#080d0d"
                  borderRadius={20}
                  glowRadius={34}
                  glowIntensity={1.15}
                  coneSpread={26}
                  colors={['#b9ff18', '#00d0a4', '#3156ff']}
                  fillOpacity={0.22}
                >
                  <SpotlightCard
                    className="work-spotlight"
                    spotlightColor="rgba(255, 255, 255, 0.24)"
                    role="button"
                    tabIndex={0}
                    aria-label={`查看${work.title}作品相册`}
                    onClick={() => openWork(work)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        openWork(work)
                      }
                    }}
                  >
                    <article className={`work-card ${work.className}`}>
                      <img className="work-cover" src={work.image} alt="" />
                      <div>
                        <h3>{work.title}</h3>
                        <p>{work.meta}</p>
                      </div>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                    </article>
                  </SpotlightCard>
                </BorderGlow>
              ))}
            </div>
          </div>
        </section>

        <section className="section strengths-section js-section" id="strengths">
          <div className="container">
            <SectionTitle title="个人优势" subtitle="CORE STRENGTHS" />
            <div className="strength-grid">
              {strengths.map((item) => (
                <StarBorder
                  as="div"
                  className="strength-star-card js-reveal-card"
                  key={item.no}
                  color="rgba(185, 255, 24, 0.95)"
                  speed="5.8s"
                  thickness={2}
                >
                  <article className="strength-card">
                    <div className="strength-top">
                      <span>{item.no}</span>
                      <small>{item.kind}</small>
                    </div>
                    <h3>{item.title}<em>.</em></h3>
                    <img className="strength-icon" src={item.icon} alt="" />
                    <img className="strength-hover-icon" src={item.hoverIcon} alt="" />
                  </article>
                </StarBorder>
              ))}
            </div>
          </div>
        </section>

        <section className="section contact-section js-section" id="contact">
          <div className="container contact-grid">
            <div className="contact-heading js-reveal-card">
              <p>联系方式</p>
              <h2 className="contact-title" aria-label="LET'S BUILD BETTER VISUAL SYSTEMS">
                {contactTitleLines.map((line) => (
                  <span className="contact-title-line" key={line}>
                    {line.split('').map((letter, index) => (
                      <span className="contact-letter" key={`${line}-${letter}-${index}`}>
                        {letter === ' ' ? '\u00A0' : letter}
                      </span>
                    ))}
                  </span>
                ))}
              </h2>
              <span className="brand-pill contact-logo-pill">
                <img src="/media/optimized/contact-logo.webp" alt="Awei" />
              </span>
            </div>
            <div className="contact-card js-reveal-card">
              <h3>CONTACT</h3>
              <dl>
                <div>
                  <dt>手机</dt>
                  <dd>15979099685</dd>
                </div>
                <div>
                  <dt>微信</dt>
                  <dd>wtq-0000</dd>
                </div>
                <div>
                  <dt>邮箱</dt>
                  <dd>1294540944@qq.com</dd>
                </div>
              </dl>
              <img className="qr-code" src="/media/optimized/contact-qr.webp" alt="微信二维码" />
            </div>
          </div>
        </section>
      </div>
      {activeWork ? <WorkAlbumModal work={activeWork} onClose={() => setActiveWork(null)} /> : null}
    </main>
  )
}

function Header() {
  const scrollToSection = (event, sectionId) => {
    event.preventDefault()
    const target = document.getElementById(sectionId)
    if (!target) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
    window.history.replaceState(null, '', `#${sectionId}`)
  }

  return (
    <header className="floating-nav js-nav">
      <a className="logo-pill" href="#home" aria-label="返回首页" onClick={(event) => scrollToSection(event, 'home')}>
        <img src="/media/optimized/brand-logo.webp" alt="Awei" />
      </a>
      <nav aria-label="主导航">
        <a href="#experience" onClick={(event) => scrollToSection(event, 'experience')}>工作经历</a>
        <a href="#works" onClick={(event) => scrollToSection(event, 'works')}>精选作品</a>
        <a href="#strengths" onClick={(event) => scrollToSection(event, 'strengths')}>个人优势</a>
      </nav>
      <a className="contact-button" href="#contact" onClick={(event) => scrollToSection(event, 'contact')}>联系我</a>
    </header>
  )
}

function WorkAlbumModal({ work, onClose }) {
  const scrollRef = useRef(null)
  const panelRef = useRef(null)
  const backdropRef = useRef(null)
  const pauseUntilRef = useRef(0)
  const isImageHoveredRef = useRef(false)
  const [introComplete, setIntroComplete] = useState(false)
  const album = albumData[work.className]

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.classList.add('modal-open')
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('modal-open')
    }
  }, [onClose])

  useEffect(() => {
    if (!album) return undefined

    setIntroComplete(false)

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setIntroComplete(true)
      return undefined
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: 'expo.out' },
        onComplete: () => setIntroComplete(true),
      })

      timeline
        .fromTo(
          backdropRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.45, ease: 'power2.out' },
        )
        .fromTo(
          panelRef.current,
          { y: '16vh', autoAlpha: 0, scale: 0.965, rotateX: 2 },
          { y: 0, autoAlpha: 1, scale: 1, rotateX: 0, duration: 0.95 },
          0.08,
        )
    })

    return () => context.revert()
  }, [album])

  useEffect(() => {
    if (!album || !introComplete) return undefined

    let frameId = 0
    let lastTime = performance.now()

    const tick = (time) => {
      const scroller = scrollRef.current
      if (scroller && !isImageHoveredRef.current && time > pauseUntilRef.current) {
        const delta = Math.min(time - lastTime, 48)
        const maxScroll = scroller.scrollHeight - scroller.clientHeight
        if (maxScroll > 0) {
          scroller.scrollTop += delta * 0.055
          if (scroller.scrollTop >= maxScroll - 1) {
            scroller.scrollTop = 0
          }
        }
      }
      lastTime = time
      frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [album, introComplete])

  if (!album) return null

  const pauseAutoScroll = () => {
    pauseUntilRef.current = performance.now() + 1600
  }

  const handleImageHover = (isHovering) => {
    isImageHoveredRef.current = isHovering
    if (!isHovering) pauseUntilRef.current = performance.now() + 360
  }

  return (
    <div className="album-modal" role="dialog" aria-modal="true" aria-label={`${work.title}作品相册`}>
      <button ref={backdropRef} className="album-backdrop" type="button" aria-label="关闭弹窗" onClick={onClose} />
      <section ref={panelRef} className={`album-panel ${album.slug}`}>
        <header className="album-header">
          <div>
            <span>{String(selectedWorks.findIndex((item) => item.className === work.className) + 1).padStart(2, '0')}</span>
            <h2>{work.title}</h2>
            <p>{work.meta}</p>
          </div>
          <button type="button" className="album-close" onClick={onClose} aria-label="关闭相册">
            ×
          </button>
        </header>
        <div
          ref={scrollRef}
          className={`album-scroll columns-${album.columns}`}
          onWheel={pauseAutoScroll}
          onPointerDown={pauseAutoScroll}
          onTouchStart={pauseAutoScroll}
        >
          <div className="album-waterfall">
            {album.images.map((image, index) => (
              <figure
                className={`album-image-frame ${image.long ? 'long' : ''}`}
                key={image.src}
                onPointerEnter={() => handleImageHover(true)}
                onPointerLeave={() => handleImageHover(false)}
                onFocus={() => handleImageHover(true)}
                onBlur={() => handleImageHover(false)}
              >
                <img src={image.src} alt={`${work.title}作品 ${index + 1}`} loading={index < 6 ? 'eager' : 'lazy'} />
              </figure>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function SectionTitle({ title, subtitle }) {
  return (
    <div className="section-title js-section-title">
      <h2>{subtitle}<span>↘</span></h2>
      <p>{title}</p>
    </div>
  )
}

export default App
