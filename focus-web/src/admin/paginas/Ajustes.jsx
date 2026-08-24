import { useRef, useState } from 'react'
import { exportarJSON, hayCambios, importarJSON, restablecer } from '../store'
import { AvisoDemo, Boton, Tarjeta } from '../ui'

export default function Ajustes() {
  const [mensaje, setMensaje] = useState(null)
  const inputArchivo = useRef(null)

  const descargar = () => {
    const blob = new Blob([exportarJSON()], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'focus-contenido.json'
    a.click()
    URL.revokeObjectURL(url)
    setMensaje({ tipo: 'ok', texto: 'Respaldo descargado.' })
  }

  const cargar = async (archivo) => {
    if (!archivo) return
    const texto = await archivo.text()
    const error = importarJSON(texto)
    setMensaje(
      error
        ? { tipo: 'error', texto: error }
        : { tipo: 'ok', texto: 'Contenido restaurado desde el archivo.' },
    )
    if (inputArchivo.current) inputArchivo.current.value = ''
  }

  return (
    <div className="space-y-6">
      <Tarjeta
        titulo="Respaldo"
        descripcion="Descarga el contenido para guardarlo o pasarlo a otro equipo."
      >
        <div className="flex flex-wrap gap-3">
          <Boton variante="principal" onClick={descargar}>
            Descargar JSON
          </Boton>
          <Boton onClick={() => inputArchivo.current?.click()}>Cargar desde archivo</Boton>
          <input
            ref={inputArchivo}
            type="file"
            accept="application/json,.json"
            onChange={(e) => cargar(e.target.files?.[0])}
            className="hidden"
          />
        </div>

        {mensaje && (
          <p
            className={[
              'rounded border px-4 py-3 text-xs font-light',
              mensaje.tipo === 'ok'
                ? 'border-emerald-600/30 bg-emerald-500/10 text-emerald-800'
                : 'border-rose-500/30 bg-rose-500/[0.06] text-rose-200/80',
            ].join(' ')}
          >
            {mensaje.texto}
          </p>
        )}
      </Tarjeta>

      <Tarjeta
        titulo="Restablecer"
        descripcion="Descarta todo lo editado y vuelve al contenido con el que se entregó el sitio."
      >
        <AvisoDemo>
          Esto borra los cambios guardados en este navegador. Si quieres conservarlos, descarga
          primero el respaldo.
        </AvisoDemo>
        <Boton
          variante="peligro"
          disabled={!hayCambios()}
          onClick={() => {
            if (confirm('¿Descartar todos los cambios y volver al contenido original?')) {
              restablecer()
              setMensaje({ tipo: 'ok', texto: 'Contenido restablecido.' })
            }
          }}
        >
          Restablecer contenido
        </Boton>
      </Tarjeta>

      <Tarjeta titulo="Cómo llevar esto a producción" descripcion="Lo que faltaría para que sea un CMS de verdad.">
        <ol className="space-y-4 text-sm font-light leading-relaxed text-tinta-suave">
          <li className="flex gap-4">
            <span className="font-display text-tinta-tenue">01</span>
            <span>
              <strong className="font-normal text-tinta">Base de datos.</strong> Hoy el contenido
              vive en <code className="text-tinta-tenue">localStorage</code>. Reemplazar el archivo{' '}
              <code className="text-tinta-tenue">src/admin/store.js</code> por llamadas a una API
              es el único cambio necesario en el panel: las pantallas quedan igual.
            </span>
          </li>
          <li className="flex gap-4">
            <span className="font-display text-tinta-tenue">02</span>
            <span>
              <strong className="font-normal text-tinta">Inicio de sesión real.</strong> El de
              ahora acepta cualquier cosa y solo sirve para mostrar la pantalla.
            </span>
          </li>
          <li className="flex gap-4">
            <span className="font-display text-tinta-tenue">03</span>
            <span>
              <strong className="font-normal text-tinta">Subida de fotos.</strong> Con un
              servidor se pueden subir desde el panel, con el mismo recorte y compresión que hace
              hoy <code className="text-tinta-tenue">scripts/procesar-fotos.py</code>.
            </span>
          </li>
        </ol>
      </Tarjeta>
    </div>
  )
}
