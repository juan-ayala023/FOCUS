import { useState } from 'react'
import { testimonios } from '../data/testimonios'
import SmartImage from './SmartImage'
import Reveal from './Reveal'

const INICIALES = 8

/**
 * Muro de capturas de mensajes de clientas.
 *
 * Son las conversaciones reales, sin retocar: es lo que las hace creíbles.
 * Van a dos columnas como mucho porque a tres el texto de las capturas
 * queda demasiado pequeño para leerlo.
 *
 * El `alt` de cada una es la transcripción del mensaje. Sin eso, veinte
 * capturas serían veinte huecos vacíos para un lector de pantalla y para
 * Google: el texto de una imagen no lo lee ninguno de los dos.
 *
 * Se muestran ocho y el resto bajo demanda, para no dejar un muro de
 * scroll interminable a quien solo pasaba por aquí.
 */
export default function MuroTestimonios() {
  const [todos, setTodos] = useState(false)
  const visibles = todos ? testimonios : testimonios.slice(0, INICIALES)
  const faltan = testimonios.length - INICIALES

  if (!testimonios.length) return null

  return (
    <div className="mt-16">
      <Reveal className="mb-8 flex items-baseline gap-4">
        <span className="text-[0.68rem] font-medium uppercase tracking-widest text-tinta-tenue">
          Mensajes de clientas
        </span>
        <span className="h-px flex-1 bg-borde" />
      </Reveal>

      {/* Columnas CSS: cada captura tiene un alto distinto y así encajan
          solas, sin dejar huecos ni tener que calcular nada. */}
      <div className="columns-1 gap-5 sm:columns-2 [column-fill:balance]">
        {visibles.map((t, i) => (
          <figure
            key={t.src}
            className="mb-5 break-inside-avoid overflow-hidden border border-borde bg-papel-puro p-2 shadow-suave"
          >
            <SmartImage
              src={t.src}
              alt={t.texto}
              lqip={t.lqip}
              ratio={t.ratio}
              loading={i < 4 ? 'eager' : 'lazy'}
              sizes="(min-width:640px) 45vw, 90vw"
            />
          </figure>
        ))}
      </div>

      {!todos && faltan > 0 && (
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setTodos(true)}
            className="btn-linea px-8 py-3"
          >
            Ver {faltan} mensajes más
          </button>
        </div>
      )}
    </div>
  )
}
