import { useEffect, useRef, useState } from 'react'
import { useContenido } from './store'

const ANCHOS = {
  escritorio: { ancho: 1440, alto: 900, label: 'Escritorio' },
  tablet: { ancho: 820, alto: 1100, label: 'Tablet' },
  movil: { ancho: 390, alto: 844, label: 'Móvil' },
}

/**
 * Vista previa del sitio dentro del panel.
 *
 * El iframe carga la misma página en el mismo origen, así que lee el
 * mismo localStorage y muestra las ediciones. Se recarga con retraso
 * para no rehacerla en cada tecla mientras se escribe.
 */
export default function Preview({ onCerrar }) {
  const contenido = useContenido()
  const [dispositivo, setDispositivo] = useState('escritorio')
  const [recargando, setRecargando] = useState(false)
  const iframe = useRef(null)
  const primera = useRef(true)

  useEffect(() => {
    if (primera.current) {
      primera.current = false
      return
    }
    setRecargando(true)
    const t = setTimeout(() => {
      try {
        iframe.current?.contentWindow?.location.reload()
      } catch {
        /* el iframe todavía no está listo */
      }
      setRecargando(false)
    }, 600)
    return () => clearTimeout(t)
  }, [contenido])

  const { ancho, alto } = ANCHOS[dispositivo]

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-papel-hueso/95 backdrop-blur-md">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-borde px-6 py-4">
        <div className="flex items-center gap-3">
          <h2 className="font-display text-lg font-light text-tinta-fuerte">Vista previa</h2>
          {recargando && (
            <span className="text-[0.6rem] uppercase tracking-widest text-tinta-tenue">
              actualizando…
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {Object.entries(ANCHOS).map(([id, d]) => (
            <button
              key={id}
              type="button"
              onClick={() => setDispositivo(id)}
              className={[
                'rounded border px-4 py-2 text-xs uppercase tracking-widest transition-colors duration-300',
                id === dispositivo
                  ? 'border-tinta-tenue bg-onyx text-papel'
                  : 'border-borde text-tinta-suave hover:border-plata hover:text-tinta-fuerte',
              ].join(' ')}
            >
              {d.label}
            </button>
          ))}
          <button
            type="button"
            onClick={onCerrar}
            className="ml-2 flex h-9 w-9 items-center justify-center rounded border border-borde text-tinta transition-colors hover:border-tinta-tenue hover:text-tinta-fuerte"
            aria-label="Cerrar vista previa"
          >
            ×
          </button>
        </div>
      </header>

      <div className="flex flex-1 items-start justify-center overflow-auto p-6">
        <div
          className="shrink-0 origin-top overflow-hidden rounded border border-borde bg-papel shadow-suave"
          style={{
            width: ancho,
            height: alto,
            // Encaja el ancho elegido dentro del espacio disponible
            transform: `scale(${Math.min(1, (window.innerWidth - 80) / ancho)})`,
          }}
        >
          <iframe
            ref={iframe}
            src="/"
            title="Vista previa del sitio"
            width={ancho}
            height={alto}
            className="border-0"
          />
        </div>
      </div>
    </div>
  )
}
