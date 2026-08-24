import { useEffect, useState } from 'react'
import { useSite } from '../hooks/useSite'
import { useActiveSection } from '../hooks/useMotion'

// Los ids que vigila el indicador de sección activa
const SECCIONES = ['inicio', 'servicios', 'galeria', 'estudio', 'contacto']

export default function Navbar() {
  const { brand, nav, whatsappLink } = useSite()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const activa = useActiveSection(SECCIONES)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Bloquea el scroll del fondo mientras el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-smooth',
        scrolled || open
          ? 'border-b border-borde bg-papel/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      ].join(' ')}
    >
      <div className="container flex h-20 items-center justify-between">
        <a
          href="#inicio"
          onClick={() => setOpen(false)}
          className="group flex flex-col items-end"
          aria-label={`${brand.name} — inicio`}
        >
          {/* alt vacío a propósito: el enlace ya se anuncia con su aria-label */}
          <img
            src={brand.logo}
            alt=""
            width={640}
            height={164}
            decoding="async"
            className="h-8 w-auto transition-opacity duration-500 ease-smooth group-hover:opacity-70"
          />
          <span className="mt-1.5 -mr-1 font-firma text-sm leading-none text-tinta-suave transition-colors duration-500 group-hover:text-tinta-fuerte">
            {brand.firma}
          </span>
        </a>

        <nav className="hidden items-center gap-10 md:flex" aria-label="Principal">
          {nav.map((item) => {
            const esActiva = activa === item.href.slice(1)
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={esActiva ? 'true' : undefined}
                className={[
                  'group relative text-sm transition-colors duration-300',
                  esActiva ? 'text-tinta-fuerte' : 'text-tinta-suave hover:text-tinta-fuerte',
                ].join(' ')}
              >
                {item.label}
                {/* Subrayado: lleno en la sección actual, se dibuja al pasar el cursor */}
                <span
                  className={[
                    'absolute -bottom-1.5 left-0 h-px bg-tinta transition-all duration-500 ease-smooth',
                    esActiva ? 'w-full' : 'w-0 group-hover:w-full',
                  ].join(' ')}
                />
              </a>
            )
          })}
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            className="btn-linea border-plata/60 px-6 py-2.5 text-tinta-fuerte hover:bg-onyx hover:text-papel"
          >
            Reservar
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
        >
          <span
            className={[
              'h-px w-6 bg-onyx transition-all duration-300 ease-smooth',
              open ? 'translate-y-[3.5px] rotate-45' : '',
            ].join(' ')}
          />
          <span
            className={[
              'h-px w-6 bg-onyx transition-all duration-300 ease-smooth',
              open ? '-translate-y-[3.5px] -rotate-45' : '',
            ].join(' ')}
          />
        </button>
      </div>

      {/* Menú móvil */}
      <div
        className={[
          'overflow-hidden bg-papel/95 backdrop-blur-xl transition-[max-height,opacity] duration-500 ease-smooth md:hidden',
          open ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0',
        ].join(' ')}
      >
        <nav className="container flex flex-col gap-1 py-8" aria-label="Móvil">
          {nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${80 + i * 60}ms` : '0ms' }}
              className={[
                'border-b border-borde/60 py-4 font-display text-3xl font-light text-tinta-fuerte transition-all duration-500 ease-smooth',
                open ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0',
              ].join(' ')}
            >
              {item.label}
            </a>
          ))}
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            className="mt-6 bg-onyx py-4 text-center text-xs uppercase tracking-widest text-papel"
          >
            Reservar por WhatsApp
          </a>
        </nav>
      </div>
    </header>
  )
}
