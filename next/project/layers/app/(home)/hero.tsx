'use client'

import Image from 'next/image'
import { Pointer } from '@/components/pointer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { H1, Lead, Muted } from '@/components/ui/typography'
import designExample1Image from '@/public/images/design-example-1.png'
import designExample2Image from '@/public/images/design-example-2.png'
import { motion, useAnimate } from 'motion/react'
import { useEffect } from 'react'
import cusorYouImage from '@/public/images/cursor-you.svg'

export default function Hero() {
  const [leftDesignScope, leftDesignAnimate] = useAnimate()
  const [leftPointerScope, leftPointerAnimate] = useAnimate()
  const [rightDesignScope, rightDesignAnimate] = useAnimate()
  const [rightPointerScope, rightPointerAnimate] = useAnimate()

  useEffect(() => {
    leftDesignAnimate([
      [leftDesignScope.current, { opacity: 1 }, { duration: 0.5 }],
      [leftDesignScope.current, { y: 0, x: 0 }, { duration: 0.5 }],
    ])
    leftPointerAnimate([
      [leftPointerScope.current, { opacity: 1 }, { duration: 0.5 }],
      [leftPointerScope.current, { y: 0, x: -100 }, { duration: 0.5 }],
      [
        leftPointerScope.current,
        { x: 0, y: [0, 16, 0] },
        { duration: 0.5, ease: 'easeInOut' },
      ],
    ])
    rightDesignAnimate([
      [rightDesignScope.current, { opacity: 1 }, { duration: 0.5, delay: 1.5 }],
      [rightDesignScope.current, { y: 0, x: 0 }, { duration: 0.5 }],
    ])
    rightPointerAnimate([
      [
        rightPointerScope.current,
        { opacity: 1 },
        { duration: 0.5, delay: 1.5 },
      ],
      [rightPointerScope.current, { y: 0, x: 175 }, { duration: 0.5 }],
      [
        rightPointerScope.current,
        { x: 0, y: [0, 20, 0] },
        { duration: 0.5, ease: 'easeInOut' },
      ],
    ])
  }, [
    leftDesignScope,
    leftDesignAnimate,
    leftPointerScope,
    leftPointerAnimate,
    rightDesignScope,
    rightDesignAnimate,
    rightPointerScope,
    rightPointerAnimate,
  ])

  return (
    <section
      className='overflow-x-clip py-24'
      style={{ cursor: `url(${cusorYouImage.src}), auto` }}
    >
      <div className='relative mx-auto max-w-11/12'>
        <div className='hidden lg:block'>
          <motion.div
            ref={leftDesignScope}
            initial={{ opacity: 0, y: 100, x: -100 }}
            className='absolute top-24 -left-48'
            drag
          >
            <Image
              alt='design exampe 1'
              src={designExample1Image}
              draggable='false'
            />
          </motion.div>
          <motion.div
            ref={leftPointerScope}
            initial={{ opacity: 0, y: 100, x: -200 }}
            className='absolute top-96 left-56'
          >
            <Pointer
              labelStyle='bg-blue-500'
              name='Johnason'
              pointerStyle='size-5'
            />
          </motion.div>
          <motion.div
            ref={rightDesignScope}
            initial={{ opacity: 0, x: 100, y: 100 }}
            className='absolute -top-24 -right-72'
            drag
          >
            <Image
              alt='design exampe 2'
              src={designExample2Image}
              draggable='false'
            />
          </motion.div>
          <motion.div
            ref={rightPointerScope}
            initial={{ opacity: 0, x: 275, y: 100 }}
            className='absolute -top-4 right-80'
          >
            <Pointer
              labelStyle='bg-rose-500'
              name='Andrea'
              pointerStyle='size-5'
            />
          </motion.div>
        </div>
        <div className='mx-auto flex flex-col items-center'>
          <Lead className='inline-flex rounded-full bg-gradient-to-r from-purple-400 to-pink-400 px-3 py-1 font-semibold text-neutral-900'>
            $7.5M seed round raised
          </Lead>
          <H1 className='mt-6 text-center md:max-w-xl md:text-6xl lg:max-w-2xl lg:text-7xl xl:max-w-4xl xl:text-8xl'>
            Impactful design, created effortlessly
          </H1>
          <Muted className='mt-8 max-w-2xl text-center text-lg'>
            Design tools should not slow you down. Layers combines powerful
            features with an intuitive interface that keep you in your creative
            flow.
          </Muted>
          <form className='mt-8 flex w-1/2 max-w-lg gap-2 rounded-2xl border border-foreground/15 p-2'>
            <Input
              placeholder='Enter your email'
              type='email'
              className='w-full px-4 md:flex-1'
            />
            <Button type='submit' className='bg-lime-400'>
              Sign Up
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
