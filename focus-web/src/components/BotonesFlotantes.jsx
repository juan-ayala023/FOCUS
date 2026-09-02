import { useEffect, useState } from 'react'
import { useSite } from '../hooks/useSite'

/**
 * Botones flotantes de contacto y redes.
 *
 * WhatsApp abajo —es la acción principal y la que queda más cerca del
 * pulgar—, y encima las redes. Los tres comparten tamaño y color onyx:
 * ni el verde de WhatsApp, ni el degradado de Instagram, ni el cian de
 * TikTok —serían seis colores más en una página de crema y grises—.
 *
 * Cada red se pinta solo si tiene enlace configurado en site.js. Un botón
 * que no lleva a ninguna parte es peor que no tener botón.
 *
 * WhatsApp no se oculta nunca. Las redes sí esperan a que pases el hero:
 * ahí abajo están «Agendar cita» y «Ver servicios», y en móvil los tres
 * círculos se montaban justo encima de esos dos botones.
 */

const IconoInstagram = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <rect x="2.8" y="2.8" width="18.4" height="18.4" rx="5.2" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.4" cy="6.6" r="1.15" fill="currentColor" stroke="none" />
  </svg>
)

const IconoTikTok = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 1 1 .77-5.06V9.69a5.67 5.67 0 0 0-.77-.05A5.68 5.68 0 1 0 15.54 15.4V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.29 4.29 0 0 1-3.24-1.48Z" />
  </svg>
)

const IconoWhatsApp = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37s-1.04 1.01-1.04 2.47c0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35z" />
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.25 8.23z" />
  </svg>
)

export default function BotonesFlotantes() {
  const { brand, whatsappLink } = useSite()
  const [pasoElHero, setPasoElHero] = useState(false)

  useEffect(() => {
    const alScroll = () => setPasoElHero(window.scrollY > window.innerHeight * 0.75)
    alScroll()
    window.addEventListener('scroll', alScroll, { passive: true })
    return () => window.removeEventListener('scroll', alScroll)
  }, [])

  const botones = [
    brand.instagramUrl && {
      id: 'instagram',
      href: brand.instagramUrl,
      etiqueta: `${brand.name} en Instagram`,
      Icono: IconoInstagram,
    },
    brand.tiktokUrl && {
      id: 'tiktok',
      href: brand.tiktokUrl,
      etiqueta: `${brand.name} en TikTok`,
      Icono: IconoTikTok,
    },
    {
      id: 'whatsapp',
      href: whatsappLink(),
      etiqueta: 'Agendar cita por WhatsApp',
      Icono: IconoWhatsApp,
      siempreVisible: true,
    },
  ].filter(Boolean)

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      {botones.map(({ id, href, etiqueta, Icono, siempreVisible }) => (
        <a
          key={id}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={etiqueta}
          className={[
            'group flex h-12 w-12 items-center justify-center rounded-full bg-onyx shadow-realce transition-all duration-500 ease-smooth hover:-translate-y-1 hover:bg-tinta',
            siempreVisible || pasoElHero
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none translate-y-3 opacity-0',
          ].join(' ')}
        >
          <Icono className="h-[22px] w-[22px] text-papel" aria-hidden="true" />
        </a>
      ))}
    </div>
  )
}
