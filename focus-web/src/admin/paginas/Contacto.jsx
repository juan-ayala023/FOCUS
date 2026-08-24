import { setCampo, useContenido } from '../store'
import { Area, Campo, Tarjeta } from '../ui'

export default function Contacto() {
  const { contact, brand } = useContenido()
  const set = (campo) => (valor) => setCampo('contact', campo, valor)

  const numero = (brand.whatsapp || '').replace(/\D/g, '')

  return (
    <div className="space-y-6">
      <Tarjeta titulo="Reservas" descripcion="El bloque final, antes del pie de página.">
        <Campo label="Etiqueta superior" valor={contact.eyebrow} onChange={set('eyebrow')} />
        <Campo label="Título" valor={contact.title} onChange={set('title')} />
        <Area label="Párrafo" valor={contact.body} onChange={set('body')} filas={3} />
        <Campo
          label="Nota al pie del botón"
          valor={contact.note}
          onChange={set('note')}
          ayuda="La línea pequeña bajo el botón de WhatsApp."
        />
      </Tarjeta>

      <Tarjeta
        titulo="Enlace de reserva"
        descripcion="Se arma solo con el número de WhatsApp de la sección Marca."
      >
        <div className="rounded border border-borde bg-papel-hueso p-5">
          <span className="mb-2 block text-[0.65rem] uppercase tracking-widest text-tinta-tenue">
            A dónde llevan los botones
          </span>
          <code className="block break-all text-xs text-tinta">
            https://wa.me/{numero || '(sin número)'}
          </code>
          {!numero && (
            <p className="mt-3 text-xs text-rose-300">
              Falta el número de WhatsApp. Sin él, los botones de reserva no llevan a ningún lado.
            </p>
          )}
          {numero === '573000000000' && (
            <p className="mt-3 text-xs text-amber-700">
              Este es el número de ejemplo. Cámbialo en Marca por el real del estudio.
            </p>
          )}
        </div>
      </Tarjeta>
    </div>
  )
}
