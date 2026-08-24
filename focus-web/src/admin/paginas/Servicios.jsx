import {
  agregarEnLista,
  moverEnLista,
  quitarDeLista,
  setEnLista,
  useContenido,
} from '../store'
import { Area, Boton, Campo, Chips, FilaLista, Selector, Tarjeta } from '../ui'

/** Fotos disponibles para asignar a un servicio. */
function opcionesDeFoto(gallery) {
  return [
    { valor: '/images/portrait.jpg', label: 'Retrato (provisional)' },
    { valor: '/images/lashes.jpg', label: 'Pestañas (provisional)' },
    { valor: '/images/studio.jpg', label: 'Estudio (provisional)' },
    ...gallery.map((f) => ({
      valor: `${f.src}.jpg`,
      label: f.alt,
    })),
  ]
}

export default function Servicios() {
  const { services, gallery } = useContenido()
  const fotos = opcionesDeFoto(gallery)

  const nuevo = () => {
    const numero = String(services.length + 1).padStart(2, '0')
    agregarEnLista('services', {
      id: `servicio-${Date.now()}`,
      number: numero,
      title: 'Nuevo servicio',
      lead: '',
      description: '',
      items: [],
      image: fotos[0].valor,
    })
  }

  return (
    <div className="space-y-6">
      <Tarjeta
        titulo="Servicios"
        descripcion="Se muestran en este orden. Los marcados como destacados ocupan el ancho completo."
        acciones={
          <Boton variante="principal" onClick={nuevo}>
            Agregar servicio
          </Boton>
        }
      >
        {services.length === 0 && (
          <p className="text-sm font-light text-tinta-tenue">
            No hay servicios. Agrega el primero con el botón de arriba.
          </p>
        )}

        {services.map((s, i) => (
          <FilaLista
            key={s.id ?? i}
            titulo={`${s.number} · ${s.title}`}
            indice={i}
            total={services.length}
            onSubir={() => moverEnLista('services', i, -1)}
            onBajar={() => moverEnLista('services', i, 1)}
            onQuitar={() => quitarDeLista('services', i)}
          >
            <div className="grid gap-4 sm:grid-cols-[7rem_1fr]">
              <Campo
                label="Número"
                valor={s.number}
                onChange={(v) => setEnLista('services', i, 'number', v)}
              />
              <Campo
                label="Título"
                valor={s.title}
                onChange={(v) => setEnLista('services', i, 'title', v)}
              />
            </div>

            <Campo
              label="Frase corta"
              valor={s.lead}
              onChange={(v) => setEnLista('services', i, 'lead', v)}
              ayuda="Va en cursiva bajo el título."
            />

            <Area
              label="Descripción"
              valor={s.description}
              onChange={(v) => setEnLista('services', i, 'description', v)}
              filas={3}
            />

            <Chips
              label="Lo que incluye"
              valores={s.items ?? []}
              onChange={(v) => setEnLista('services', i, 'items', v)}
              placeholder="Ej: Semipermanente"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Selector
                label="Foto"
                valor={s.image}
                onChange={(v) => setEnLista('services', i, 'image', v)}
                opciones={fotos}
              />
              <div className="flex flex-col justify-end gap-3">
                <label className="flex items-center gap-3 text-sm text-tinta">
                  <input
                    type="checkbox"
                    checked={!!s.featured}
                    onChange={(e) => setEnLista('services', i, 'featured', e.target.checked)}
                    className="h-4 w-4 accent-onyx"
                  />
                  Destacado (ancho completo)
                </label>
                <label className="flex items-center gap-3 text-sm text-tinta">
                  <input
                    type="checkbox"
                    checked={!!s.reverse}
                    disabled={!s.featured}
                    onChange={(e) => setEnLista('services', i, 'reverse', e.target.checked)}
                    className="h-4 w-4 accent-onyx disabled:opacity-30"
                  />
                  Foto a la derecha
                </label>
              </div>
            </div>

            {s.image && (
              <img
                src={s.image}
                alt=""
                className="h-28 w-full rounded border border-borde object-cover"
              />
            )}
          </FilaLista>
        ))}
      </Tarjeta>
    </div>
  )
}
