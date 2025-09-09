import Footer from '@/components/footer'
import Navbar from '@/components/nav-bar'
import Cta from './(home)/cta'
import Faqs from './(home)/faqs'
import Features from './(home)/features'
import Hero from './(home)/hero'
import Integrations from './(home)/integrations'
import Intro from './(home)/intro'
import LogoTicker from './(home)/logo-ticker'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <LogoTicker />
      <Intro />
      <Features />
      <Integrations />
      <Faqs />
      <Cta />
      <Footer />
    </>
  )
}
