import { useSite } from '../hooks/useSite'
import SmartImage from './SmartImage'
import Reveal from './Reveal'

/**
 * Franja de maquillaje de grados.
 *
 * Es el único bloque oscuro de la página, y a propósito: las fotos están
 * tomadas sobre fondo negro en el estudio, así que aquí se funden con la
 * sección en vez de recortarse contra la crema. De paso recupera el
 * «plata sobre noche» del manual como el momento negro del sitio.
 *
 * Las fotos salen de la galería filtrando por categoría, así que añadir
 * una más al script las trae aquí solas.
 *
 * La tira se desplaza en horizontal con scroll-snap: sin JavaScript, y en
 * el móvil se arrastra con el dedo como es natural.
 */
export default function Grados() {
  const { gallery, whatsappLink } = useSite()
  const fotos = gallery.filter((f) => f.cat === 'maquillaje')

  if (!fotos.length) return null

  return (
    <section className="relative overflow-hidden bg-onyx py-20 md:py-24">
      {/* Halo frío, como el neón del estudio detrás de las modelos */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-plata/30 to-transparent"
      />

      <div className="container">
        <Reveal className="max-w-2xl">
          <p className="text-[0.68rem] font-medium uppercase tracking-widest text-plata/60">
            Maquillaje · Grados
          </p>
          <h2 className="mt-6 font-display text-4xl font-light leading-tight text-papel sm:text-5xl">
            El día que te <span className="italic text-plata">gradúas</span>
          </h2>
          <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-plata/70">
            Un maquillaje pensado para el lente y para las horas que vienen
            después: piel luminosa que no se apaga en las fotos, mirada
            definida y un acabado que aguanta el día entero.
          </p>
        </Reveal>
      </div>

      {/* La tira va dentro del contenedor para que su primera foto quede
          a plomo con el titular. El relleno propio no sirve: con
          snap-mandatory el navegador lo compensa y desplaza la tira solo. */}
      <Reveal delay={150} className="container">
        <ul className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {fotos.map((foto, i) => (
            <li
              key={foto.src}
              className="w-[64%] shrink-0 snap-start sm:w-[38%] lg:w-[23%] xl:w-[18.4%]"
            >
              <SmartImage
                src={foto.src}
                alt={foto.alt}
                lqip={foto.lqip}
                ratio={3 / 4}
                loading={i < 3 ? 'eager' : 'lazy'}
                sizes="(min-width:1280px) 240px, (min-width:1024px) 300px, (min-width:640px) 38vw, 64vw"
                className="border border-plata/15"
                imgClassName="transition-transform duration-700 ease-smooth hover:scale-[1.04]"
              />
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="container">
        <Reveal delay={250} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href={whatsappLink('Maquillaje de grados')}
            target="_blank"
            rel="noreferrer"
            className="btn-base border border-plata/40 text-papel transition-all duration-500 ease-smooth hover:-translate-y-0.5 hover:border-plata hover:bg-papel hover:text-onyx"
          >
            Agendar mi grado
          </a>
          <a
            href="#galeria"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest text-plata/60 transition-colors duration-300 hover:text-papel"
          >
            Ver las {fotos.length} fotos
            <span
              aria-hidden="true"
              className="transition-transform duration-300 ease-smooth group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
