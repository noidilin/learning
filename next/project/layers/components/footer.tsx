import Image from 'next/image'
import logoImage from '@/public/images/logo.svg'

const footerLinks = [
  { href: '#', label: 'Contact' },
  { href: '#', label: 'Privacy Policy' },
  { href: '#', label: 'Terms & Conditions' },
]

export default function Footer() {
  return (
    <section className='mx-auto max-w-10/12 py-16'>
      <div className='flex flex-col items-center gap-6 md:flex-row md:justify-between'>
        <div>
          <Image src={logoImage} alt='Layers logo' />
        </div>
        <div>
          <nav className='flex gap-6'>
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className='text-sm text-foreground/50'
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  )
}
