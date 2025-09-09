'use client'

import { MenuIcon, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import { useState } from 'react'
import logoImage from '@/public/images/logo.svg'
import { ThemeToggle } from './theme-toggle'
import { Button } from './ui/button'

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'Features', href: '#features' },
  { label: 'Integrations', href: '#integrations' },
  { label: 'FAQs', href: '#faqs' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <section className='fixed top-0 z-50 w-full py-4 lg:py-8'>
        <div className='mx-auto max-w-10/12 rounded-2xl border border-foreground/15 bg-neutral-950/70 backdrop-blur'>
          <div className='grid flex-1 grid-cols-2 items-center px-6 py-2 lg:grid-cols-3'>
            <div>
              <Image
                alt='layers logo'
                className='h-9 w-auto lg:h-auto'
                src={logoImage}
              />
            </div>
            <div className='hidden items-center justify-center lg:flex'>
              <nav className='flex gap-6 font-medium'>
                {navLinks.map((link) => (
                  <a href={link.href} key={link.label}>
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
            <div className='flex items-center justify-end'>
              <ThemeToggle />
              <button type='button' onClick={() => setIsOpen(!isOpen)}>
                <AnimatePresence mode='wait'>
                  {isOpen ? (
                    <motion.div
                      key='close'
                      initial={{ rotate: 45, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -45, opacity: 0 }}
                      className='overflow-hidden'
                    >
                      <X className='lg:hidden' />
                    </motion.div>
                  ) : (
                    <motion.div
                      key='open'
                      initial={{ rotate: 45, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -45, opacity: 0 }}
                      className='overflow-hidden'
                    >
                      <MenuIcon className='lg:hidden' />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
              <div className='hidden gap-2 lg:flex'>
                <Button variant='outline'>Log In</Button>
                <Button className='bg-lime-400'>Sign In</Button>
              </div>
            </div>
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                className='overflow-hidden lg:hidden'
              >
                {/* NOTE: padding and gap will interfere the animation when components mounted and unmounted */}
                <div className='flex flex-col items-center gap-4 py-4'>
                  {navLinks.map((link) => (
                    <a href={link.href} key={link.label} className=''>
                      {link.label}
                    </a>
                  ))}
                  <div className='flex gap-4'>
                    <Button variant='outline'>Log In</Button>
                    <Button className='bg-lime-400'>Sign In</Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      {/* HACK: should avoid these magic number */}
      <div className='pb-[86px] md:pb-[98px] lg:px-[130px]'></div>
    </>
  )
}
