import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function usePortfolioAnimations() {
  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return undefined

    const ctx = gsap.context(() => {
      gsap.set('.js-title-line', {
        yPercent: 118,
        scaleX: 0.78,
        scaleY: 1.18,
        transformOrigin: 'left center',
        filter: 'blur(18px)',
        clipPath: 'inset(0 0 100% 0)',
      })
      gsap.set('.js-hero-copy', { y: 28, autoAlpha: 0, filter: 'blur(10px)' })
      gsap.set('.js-hero-gallery', { y: 90, autoAlpha: 0, scale: 0.94, filter: 'blur(18px)' })
      gsap.set('.js-nav', { y: -34, autoAlpha: 0, scale: 0.96 })
      gsap.set('.js-title-deco', { autoAlpha: 0, scale: 0.7, rotate: -14 })

      const opening = gsap.timeline({ defaults: { ease: 'power4.out' } })
      opening
        .to('.js-title-line', {
          yPercent: 0,
          scaleX: 1,
          scaleY: 1,
          filter: 'blur(0px)',
          clipPath: 'inset(0 0 0% 0)',
          duration: 1.35,
          stagger: 0.16,
          ease: 'expo.out',
        }, 0.18)
        .to('.js-title-deco', {
          autoAlpha: 1,
          scale: 1,
          rotate: 0,
          duration: 1.05,
          stagger: 0.08,
        }, 0.82)
        .to('.js-hero-copy', {
          y: 0,
          autoAlpha: 1,
          filter: 'blur(0px)',
          duration: 0.95,
        }, 1.02)
        .to('.js-hero-gallery', {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.25,
        }, 1.16)
        .to('.js-nav', {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 0.9,
        }, 1.3)

      gsap.utils.toArray('.js-section').forEach((section) => {
        const title = section.querySelector('.js-section-title h2')
        const titleMeta = section.querySelector('.js-section-title p')
        const cards = section.querySelectorAll('.js-reveal-card')
        const images = section.querySelectorAll('.js-image-reveal')

        if (title) {
          gsap.from(title, {
            scrollTrigger: {
              trigger: section,
              start: 'top 74%',
              once: true,
            },
            x: -150,
            y: 50,
            scaleX: 1.28,
            transformOrigin: 'left center',
            autoAlpha: 0,
            filter: 'blur(18px)',
            duration: 1.25,
            ease: 'expo.out',
          })
        }

        if (titleMeta) {
          gsap.from(titleMeta, {
            scrollTrigger: {
              trigger: section,
              start: 'top 72%',
              once: true,
            },
            y: 26,
            autoAlpha: 0,
            filter: 'blur(10px)',
            duration: 0.9,
            delay: 0.12,
            ease: 'power3.out',
          })
        }

        if (cards.length) {
          gsap.from(cards, {
            scrollTrigger: {
              trigger: section,
              start: 'top 82%',
              once: true,
            },
            y: 90,
            autoAlpha: 0,
            scale: 0.92,
            rotateX: 10,
            filter: 'blur(14px)',
            transformOrigin: 'center bottom',
            duration: 1.05,
            stagger: 0.13,
            ease: 'power4.out',
            clearProps: 'opacity,visibility,transform,filter',
          })
        }

        if (images.length) {
          images.forEach((image) => {
            gsap.from(image, {
              scrollTrigger: {
                trigger: image,
                start: 'top 78%',
                end: 'bottom 20%',
                scrub: 1.1,
              },
              yPercent: -7,
              scale: 1.08,
              ease: 'none',
            })
          })
        }
      })

      gsap.to('.lower-grainient', {
        scrollTrigger: {
          trigger: '.lower-background',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.6,
        },
        yPercent: -5,
        ease: 'none',
      })

      ScrollTrigger.refresh()
    })

    return () => ctx.revert()
  }, [])
}
