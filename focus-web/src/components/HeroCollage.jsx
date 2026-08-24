import { useSite } from '../hooks/useSite'
import SmartImage from './SmartImage'

// Los dos servicios con foto propia, para que desde la portada se vea
// que el estudio hace uñas y peinados.
// Si alguna no está en la galería, se cae al orden actual sin romper nada.
const PREFERIDAS = ['frances-pedreria', 'peinado-tiara-rizos', 'color-azul']

function elegirDestacadas(gallery) {
  const escogidas = PREFERIDAS.map((slug) =>
    gallery.find((f) => f.src.endsWith(slug)),
  ).filter(Boolean)
  const relleno = gallery.filter((f) => !escogidas.includes(f))
  return [...escogidas, ...relleno].slice(0, 3)
}

/**
 * Composición de fotos que ocupa la mitad derecha del hero.
 * Tres marcos flotando a distinto ritmo, con una etiqueta encima.
 * Solo en pantallas grandes: en móvil el hero ya funciona con el texto.
 */
export default function HeroCollage() {
  const { gallery } = useSite()
  const [principal, secundaria, terciaria] = elegirDestacadas(gallery)
  if (!principal) return null

  return (
    <div className="relative hidden lg:block" aria-hidden="true">
      <div className="relative mx-auto aspect-[5/6] w-full max-w-[30rem]">
        {/* Halo plateado detrás del conjunto */}
        <div className="absolute -inset-10 -z-10 animate-breathe rounded-full bg-gradient-radial blur-3xl" />

        {/* Foto principal */}
        <figure
          className="absolute left-[14%] top-0 w-[62%] animate-riseIn"
          style={{ animationDelay: '600ms' }}
        >
          <div className="animate-float border border-plata/70 bg-papel-puro p-1.5 shadow-suave">
            <SmartImage
              src={principal.src}
              alt=""
              lqip={principal.lqip}
              ratio={principal.ratio}
              loading="eager"
              sizes="320px"
            />
          </div>
        </figure>

        {/* Secundaria, montada sobre la principal */}
        {secundaria && (
          <figure
            className="absolute bottom-[10%] left-0 w-[44%] animate-riseIn"
            style={{ animationDelay: '780ms' }}
          >
            <div
              className="animate-float border border-plata/70 bg-papel-puro p-1.5 shadow-suave"
              style={{ animationDelay: '1.4s' }}
            >
              <SmartImage
                src={secundaria.src}
                alt=""
                lqip={secundaria.lqip}
                ratio={secundaria.ratio}
                sizes="220px"
              />
            </div>
          </figure>
        )}

        {/* Terciaria, arriba a la derecha */}
        {terciaria && (
          <figure
            className="absolute right-0 top-[34%] w-[38%] animate-riseIn"
            style={{ animationDelay: '940ms' }}
          >
            <div
              className="animate-float border border-plata/70 bg-papel-puro p-1.5 shadow-suave"
              style={{ animationDelay: '2.6s' }}
            >
              <SmartImage
                src={terciaria.src}
                alt=""
                lqip={terciaria.lqip}
                ratio={terciaria.ratio}
                sizes="190px"
              />
            </div>
          </figure>
        )}

        {/* Etiqueta */}
        <div
          className="absolute bottom-0 right-[6%] animate-fadeIn border border-plata/70 bg-papel-puro/95 px-5 py-4 backdrop-blur-md"
          style={{ animationDelay: '1200ms' }}
        >
          <span className="block font-display text-2xl font-light text-grafito-gradient">
            {gallery.length} trabajos
          </span>
          <span className="mt-1 block text-[0.6rem] uppercase tracking-widest text-tinta-tenue">
            en la galería
          </span>
        </div>
      </div>
    </div>
  )
}
