import { useEffect, useState } from 'react'
import { hayCambios, useContenido } from './store'
import Login from './Login'
import Preview from './Preview'
import Panel from './paginas/Panel'
import Marca from './paginas/Marca'
import Inicio from './paginas/Inicio'
import Servicios from './paginas/Servicios'
import Galeria from './paginas/Galeria'
import Estudio from './paginas/Estudio'
import Testimonios from './paginas/Testimonios'
import Contacto from './paginas/Contacto'
import Ajustes from './paginas/Ajustes'

const SECCIONES = [
  { id: 'panel', label: 'Panel', icono: '▤', grupo: null },
  { id: 'marca', label: 'Marca y contacto', icono: '◆', grupo: 'Contenido' },
  { id: 'inicio', label: 'Portada', icono: '▲', grupo: 'Contenido' },
  { id: 'servicios', label: 'Servicios', icono: '☰', grupo: 'Contenido' },
  { id: 'galeria', label: 'Galería', icono: '▦', grupo: 'Contenido' },
  { id: 'estudio', label: 'Estudio', icono: '◈', grupo: 'Contenido' },
  { id: 'testimonios', label: 'Testimonios', icono: '❞', grupo: 'Contenido' },
  { id: 'contacto', label: 'Contacto', icono: '✉', grupo: 'Contenido' },
  { id: 'ajustes', label: 'Ajustes', icono: '⚙', grupo: 'Sistema' },
]

const PAGINAS = {
  marca: Marca,
  inicio: Inicio,
  servicios: Servicios,
  galeria: Galeria,
  estudio: Estudio,
  testimonios: Testimonios,
  contacto: Contacto,
  ajustes: Ajustes,
}

/** Lee la sección desde el hash de la URL: /admin#servicios */
const seccionDeHash = () => {
  const id = window.location.hash.replace('#', '')
  return SECCIONES.some((s) => s.id === id) ? id : 'panel'
}

export default function AdminApp() {
  const { brand } = useContenido()
  const [usuario, setUsuario] = useState(null)
  const [seccion, setSeccion] = useState(seccionDeHash)
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [previa, setPrevia] = useState(false)

  // Mantiene sincronizados la URL y el botón "atrás" del navegador
  useEffect(() => {
    const alCambiar = () => setSeccion(seccionDeHash())
    window.addEventListener('hashchange', alCambiar)
    return () => window.removeEventListener('hashchange', alCambiar)
  }, [])

  const irA = (id) => {
    window.location.hash = id
    setSeccion(id)
    setMenuAbierto(false)
  }

  if (!usuario) return <Login onEntrar={setUsuario} />

  const actual = SECCIONES.find((s) => s.id === seccion) ?? SECCIONES[0]
  const Pagina = PAGINAS[seccion]

  return (
    <div className="min-h-screen bg-papel-hueso text-tinta">
      {/* ── Barra lateral ───────────────────────────────── */}
      <aside
        className={[
          'fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-borde bg-papel transition-transform duration-300 ease-smooth lg:translate-x-0',
          menuAbierto ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        <div className="border-b border-borde px-6 py-6">
          <span className="font-display text-2xl font-light tracking-[0.3em] text-tinta-fuerte">
            {brand.wordmark}
          </span>
          <p className="mt-1 text-[0.55rem] uppercase tracking-widest text-tinta-tenue">
            Administración
          </p>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-5">
          {SECCIONES.map((s, i) => {
            const abreGrupo = s.grupo && SECCIONES[i - 1]?.grupo !== s.grupo
            return (
              <div key={s.id}>
                {abreGrupo && (
                  <p className="mb-2 mt-5 px-3 text-[0.55rem] uppercase tracking-widest text-tinta-tenue/70">
                    {s.grupo}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => irA(s.id)}
                  aria-current={s.id === seccion ? 'page' : undefined}
                  className={[
                    'mb-0.5 flex w-full items-center gap-3 rounded px-3 py-2.5 text-sm transition-colors duration-200',
                    s.id === seccion
                      ? 'bg-papel-humo text-tinta-fuerte'
                      : 'text-tinta-suave hover:bg-papel-hueso hover:text-tinta-fuerte',
                  ].join(' ')}
                >
                  <span aria-hidden="true" className="w-4 text-center text-xs text-tinta-tenue">
                    {s.icono}
                  </span>
                  {s.label}
                </button>
              </div>
            )
          })}
        </nav>

        <div className="border-t border-borde p-4">
          <div className="mb-3 flex items-center gap-3 px-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-papel-humo text-xs uppercase text-tinta-fuerte">
              {usuario.slice(0, 2)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-xs text-tinta-fuerte">{usuario}</p>
              <p className="text-[0.55rem] uppercase tracking-widest text-tinta-tenue">
                Administrador
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setUsuario(null)}
            className="w-full rounded border border-borde px-3 py-2 text-[0.65rem] uppercase tracking-widest text-tinta-suave transition-colors hover:border-plata hover:text-tinta-fuerte"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Fondo del menú en móvil */}
      {menuAbierto && (
        <button
          type="button"
          aria-label="Cerrar menú"
          onClick={() => setMenuAbierto(false)}
          className="fixed inset-0 z-30 bg-papel-hueso/70 lg:hidden"
        />
      )}

      {/* ── Contenido ───────────────────────────────────── */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-4 border-b border-borde bg-papel-hueso/90 px-6 py-4 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setMenuAbierto(true)}
              aria-label="Abrir menú"
              className="flex h-9 w-9 flex-col items-center justify-center gap-1 rounded border border-borde lg:hidden"
            >
              <span className="h-px w-4 bg-tinta" />
              <span className="h-px w-4 bg-tinta" />
            </button>
            <div>
              <h1 className="font-display text-2xl font-light text-tinta-fuerte">
                {actual.label}
              </h1>
              {hayCambios() && (
                <p className="mt-0.5 flex items-center gap-2 text-[0.6rem] uppercase tracking-widest text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                  Cambios guardados en este navegador
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPrevia(true)}
              className="rounded border border-borde px-4 py-2.5 text-xs uppercase tracking-widest text-tinta transition-colors hover:border-plata hover:text-tinta-fuerte"
            >
              Vista previa
            </button>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="rounded bg-onyx px-4 py-2.5 text-xs uppercase tracking-widest text-papel transition-colors hover:bg-white"
            >
              Ver sitio
            </a>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-6 py-8">
          {Pagina ? <Pagina /> : <Panel irA={irA} />}
        </main>
      </div>

      {previa && <Preview onCerrar={() => setPrevia(false)} />}
    </div>
  )
}
