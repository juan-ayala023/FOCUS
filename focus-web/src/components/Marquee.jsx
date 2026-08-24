import { useSite } from '../hooks/useSite'

/**
 * Cinta infinita de servicios. La lista se duplica y se anima
 * -50% para que el ciclo empalme sin salto.
 */
export default function Marquee() {
  const { marqueeItems } = useSite()
  const track = [...marqueeItems, ...marqueeItems]

  return (
    <div
      className="group relative overflow-hidden border-y border-borde bg-papel-puro py-5"
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-papel-puro to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-papel-puro to-transparent" />

      {/* Se detiene al pasar el cursor para poder leerla */}
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center whitespace-nowrap font-display text-lg font-light tracking-widest text-tinta-tenue transition-colors duration-500 group-hover:text-tinta"
          >
            <span className="px-8">{item}</span>
            <span className="text-tinta-tenue/40">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
