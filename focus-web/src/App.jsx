import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Services from './components/Services'
import Grados from './components/Grados'
import Gallery from './components/Gallery'
import Studio from './components/Studio'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppFab from './components/WhatsAppFab'

export default function App() {
  return (
    <>
      <a
        href="#servicios"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-onyx focus:px-4 focus:py-2 focus:text-xs focus:uppercase focus:tracking-widest focus:text-papel"
      >
        Saltar al contenido
      </a>

      <ScrollProgress />
      <Navbar />

      <main>
        <Hero />
        <Marquee />
        <Services />
        <Grados />
        <Gallery />
        <Studio />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
      <WhatsAppFab />
    </>
  )
}
