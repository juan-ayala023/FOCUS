import { hayCambios, useContenido } from '../store'
import { AvisoDemo, Tarjeta } from '../ui'

/** Tarjeta de cifra del tablero. */
function Cifra({ valor, label, nota }) {
  return (
    <div className="rounded border border-borde bg-papel p-6">
      <span className="block font-display text-4xl font-light text-grafito-gradient">{valor}</span>
      <span className="mt-2 block text-[0.65rem] uppercase tracking-widest text-tinta-tenue">
        {label}
      </span>
      {nota && <span className="mt-3 block text-xs font-light text-tinta-suave">{nota}</span>}
    </div>
  )
}

export default function Panel({ irA }) {
  const c = useContenido()

  const pendientes = []
  if ((c.brand.whatsapp || '').replace(/\D/g, '') === '573000000000') {
    pendientes.push({ texto: 'El WhatsApp sigue siendo el número de ejemplo', donde: 'marca' })
  }
  if (c.brand.email?.includes('focusbeauty.co')) {
    pendientes.push({ texto: 'El correo sigue siendo el de ejemplo', donde: 'marca' })
  }
  if (c.brand.instagramUrl?.includes('focus_beautystudio')) {
    pendientes.push({ texto: 'El usuario de Instagram sigue siendo el de ejemplo', donde: 'marca' })
  }
  if (c.testimonials.some((t) => ['Valentina R.', 'Daniela M.', 'Sara L.'].includes(t.author))) {
    pendientes.push({ texto: 'Hay testimonios de ejemplo sin reemplazar', donde: 'testimonios' })
  }
  if (c.services.some((s) => s.image?.includes('/images/portrait.jpg') || s.image?.includes('/images/studio.jpg') || s.image?.includes('/images/lashes.jpg'))) {
    pendientes.push({ texto: 'Hay servicios con fotos provisionales', donde: 'servicios' })
  }

  return (
    <div className="space-y-6">
      <AvisoDemo>
        Panel de demostración. Lo que edites se guarda en este navegador, no en un servidor: se ve
        en este equipo, pero no en el de otra persona ni en el sitio publicado. Para que fuera
        real hace falta conectar una base de datos y un inicio de sesión.
      </AvisoDemo>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Cifra valor={c.gallery.length} label="Fotos en galería" />
        <Cifra valor={c.services.length} label="Servicios" />
        <Cifra valor={c.testimonials.length} label="Testimonios" />
        <Cifra
          valor={hayCambios() ? 'Sí' : 'No'}
          label="Cambios sin publicar"
          nota={hayCambios() ? 'Guardados en este navegador' : 'El sitio está en su estado original'}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Tarjeta titulo="Por revisar" descripcion="Lo que todavía tiene contenido de ejemplo.">
          {pendientes.length === 0 ? (
            <p className="text-sm font-light text-tinta-suave">
              Todo el contenido de ejemplo fue reemplazado.
            </p>
          ) : (
            <ul className="space-y-2">
              {pendientes.map((p) => (
                <li key={p.texto}>
                  <button
                    type="button"
                    onClick={() => irA(p.donde)}
                    className="flex w-full items-center justify-between gap-4 rounded border border-borde px-4 py-3 text-left text-sm font-light text-tinta-suave transition-colors duration-300 hover:border-plata hover:text-tinta-fuerte"
                  >
                    {p.texto}
                    <span aria-hidden="true" className="text-tinta-tenue">
                      →
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Tarjeta>

        <Tarjeta titulo="Secciones de la página" descripcion="En el orden en que se ven.">
          <ol className="space-y-1">
            {[
              ['Portada', 'inicio'],
              ['Servicios', 'servicios'],
              ['Galería', 'galeria'],
              ['Estudio', 'estudio'],
              ['Testimonios', 'testimonios'],
              ['Contacto', 'contacto'],
            ].map(([nombre, destino], i) => (
              <li key={destino}>
                <button
                  type="button"
                  onClick={() => irA(destino)}
                  className="flex w-full items-center gap-4 rounded px-4 py-3 text-left text-sm text-tinta-suave transition-colors duration-300 hover:bg-papel-hueso hover:text-tinta-fuerte"
                >
                  <span className="font-display text-xs text-tinta-tenue">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {nombre}
                </button>
              </li>
            ))}
          </ol>
        </Tarjeta>
      </div>
    </div>
  )
}
