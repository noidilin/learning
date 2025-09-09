'use client'

import { Tag } from '@/components/ui/tag'
import { useScroll, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

const text = `You're racing to create exceptional work, but traditional design tools slow you down with unnecessary complexity and steep learning curves.`
const words = text.split(' ')

export default function Intro() {
  const scrollTarget = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: scrollTarget,
    offset: ['start end', 'end end'],
  })
  const [currentWord, setCurrentWord] = useState(0)
  const wordIndex = useTransform(scrollYProgress, [0, 1], [0, words.length])

  useEffect(() => {
    wordIndex.on('change', (latest) => setCurrentWord(latest))
  }, [wordIndex])

  return (
    <section className='mx-auto max-w-10/12 py-28 lg:py-40'>
      <div className='sticky top-32'>
        <div className='flex justify-center'>
          <Tag variant='outline'>Introducing Layers</Tag>
        </div>
        <div className='mt-10 text-center text-4xl font-medium sm:text-5xl md:text-6xl lg:text-7xl'>
          <span>Your creative process deserves better.</span>{' '}
          <span>
            {words.map((word, wordIndex) => (
              <span
                key={wordIndex}
                className={cn('text-foreground/15 transition duration-500', {
                  'text-foreground': wordIndex < currentWord,
                })}
              >{`${word} `}</span>
            ))}
          </span>
          <span className='block text-lime-400'>
            That&apos;s why we built Layers.
          </span>
        </div>
      </div>
      <div className='h-[150vh]' ref={scrollTarget}></div>
    </section>
  )
}
