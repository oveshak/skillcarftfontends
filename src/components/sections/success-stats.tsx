'use client'

import { useEffect, useMemo, useRef, useState } from 'react'



type StatCounterProps = {
  end: number
  label: string
  suffix?: string
  /** Optional: locale for formatting. Defaults to 'bn-BD'. */
  locale?: string
  /** Optional: duration of the animation in ms. Defaults to 2000. */
  duration?: number
}

const StatCounter = ({ end, label, suffix = '', locale = 'bn-BD', duration = 2000 }: StatCounterProps) => {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // If user prefers reduced motion, jump straight to end value
    if (prefersReducedMotion) {
      setCount(end)
      setHasAnimated(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && !hasAnimated) {
          const startTime = performance.now()

          const step = (now: number) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic for nicer feel
            const current = Math.floor(eased * end)
            setCount(current)
            if (progress < 1) {
              requestAnimationFrame(step)
            } else {
              setCount(end)
              setHasAnimated(true)
            }
          }

          requestAnimationFrame(step)
          observer.unobserve(el)
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [end, duration, hasAnimated, prefersReducedMotion])

  const formatted = useMemo(() => {
    try {
      return count.toLocaleString(locale)
    } catch {
      return count.toString()
    }
  }, [count, locale])

  return (
    <div ref={ref} className="space-y-2 sm:space-y-3">
      <h3
        className="font-black leading-none tracking-tight text-white drop-shadow-sm"
        style={{ fontFamily: 'Hind Siliguri, sans-serif', fontWeight: 900, fontVariationSettings: '"wght" 900' }}
      >
        {/* Responsive fluid type: from ~42px on mobile to ~64px+ on xl */}
        <span className="block text-[clamp(2.4rem,6vw,4rem)]">{formatted}{suffix}</span>
      </h3>
      <p className="text-base sm:text-lg md:text-xl font-medium text-white/90">{label}</p>
    </div>
  )
}

const SuccessStats = () => {
  return (
    <section
      aria-labelledby="success-stats-heading"
      className="relative isolate"
      style={{
        // Let the container control height via padding; background covers naturally
        // Additional styles handled via utility classes
      }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 -z-10 bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: "url('https://cdn.10minuteschool.com/images/bg_01_1700634148023.webp')" }}
      />
      {/* Gradient + scrim overlay for contrast */}
      <div className="absolute inset-0 -z-10 bg-black/40 [background:linear-gradient(180deg,rgba(0,0,0,.35),rgba(0,0,0,.55))]" />

      <div className="px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16">
        <div className="mx-auto max-w-6xl text-center text-white">
          <h2 id="success-stats-heading" className="text-gray-50 font-extrabold tracking-tight text-[clamp(1.2rem,2.8vw,1.8rem)]">
          ২০২৫-২৬ শিক্ষাবর্ষে স্কিলস ক্রাপ্টের ট্রেনিং সাফল্য
          </h2>
          <p className="mt-2 text-[clamp(1rem,2.4vw,1.25rem)] font-medium text-gray-100/95">
            তোমাদের সাফল্যই আমাদের অনুপ্রেরণা
          </p>

          <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 md:gap-14">
            <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-5 sm:p-6 md:p-7 backdrop-blur">
              <StatCounter end={11868} label="মোট শিক্ষার্থী" />
            </div>
            <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-5 sm:p-6 md:p-7 backdrop-blur">
              <StatCounter end={8312} label="চান্সপ্রাপ্ত শিক্ষার্থী" suffix="+" />
            </div>
            <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-5 sm:p-6 md:p-7 backdrop-blur">
              <StatCounter end={32} label="টপ ১০০-তে চান্সপ্রাপ্ত শিক্ষার্থী" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SuccessStats
