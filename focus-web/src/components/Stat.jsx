import { useCountUp } from '../hooks/useMotion'

/**
 * Cifra que cuenta desde cero al entrar en pantalla.
 * Acepta valores como "100%", "+1k", "5.0" o "4": separa el número de
 * lo que lo rodea para animar solo la parte numérica.
 *
 * Va dentro de un <dl>, por eso emite un par dt/dd.
 */
export default function Stat({ value, label }) {
  const match = String(value).match(/^([^\d.,]*)([\d.,]+)(.*)$/)
  const prefijo = match ? match[1] : ''
  const numero = match ? parseFloat(match[2].replace(',', '.')) : 0
  const sufijo = match ? match[3] : value
  const decimales = match && match[2].includes('.') ? 1 : 0

  const [ref, actual] = useCountUp(numero)

  return (
    <div ref={ref} className="group text-center md:text-left">
      <dt className="sr-only">{label}</dt>
      <dd>
        <span className="block font-display text-4xl font-light text-grafito-gradient transition-transform duration-500 ease-smooth group-hover:-translate-y-1 sm:text-5xl">
          {prefijo}
          {match ? actual.toFixed(decimales) : ''}
          {sufijo}
        </span>
        <span className="mt-3 block text-[0.65rem] uppercase tracking-widest text-tinta-tenue transition-colors duration-500 group-hover:text-tinta">
          {label}
        </span>
      </dd>
    </div>
  )
}
