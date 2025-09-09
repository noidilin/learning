import Image from 'next/image'
import { H4 } from '@/components/ui/typography'
import acmeLogo from '@/public/images/acme-corp.svg'
import apexLogo from '@/public/images/apex.svg'
import celestialLogo from '@/public/images/celestial.svg'
import echoValleyLogo from '@/public/images/echo-valley.svg'
import outsideLogo from '@/public/images/outside.svg'
import pulseLogo from '@/public/images/pulse.svg'
import quantumLogo from '@/public/images/quantum.svg'
import twiceLogo from '@/public/images/twice.svg'
import { Fragment } from 'react'
import * as motion from 'motion/react-client'

const logos = [
  { name: 'Quantum', image: quantumLogo },
  { name: 'Acme Corp', image: acmeLogo },
  { name: 'Echo Valley', image: echoValleyLogo },
  { name: 'Pulse', image: pulseLogo },
  { name: 'Outside', image: outsideLogo },
  { name: 'Apex', image: apexLogo },
  { name: 'Celestial', image: celestialLogo },
  { name: 'Twice', image: twiceLogo },
]

export default function LogoTicker() {
  return (
    <section className='overflow-x-clip py-24'>
      <H4 className='text-center font-normal text-muted-foreground'>
        Already chosen by these market leaders
      </H4>
      <div className='mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]'>
        <motion.div
          animate={{ x: '-50%' }}
          transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
          className='flex gap-24 pr-24'
        >
          {Array.from({ length: 2 }).map((_, i) => (
            <Fragment key={i}>
              {logos.map((logo) => (
                <Image alt={logo.name} key={logo.name} src={logo.image} />
              ))}
            </Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
