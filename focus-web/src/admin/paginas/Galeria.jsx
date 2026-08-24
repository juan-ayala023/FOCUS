import { useState } from 'react'
import { moverEnLista, quitarDeLista, setEnLista, setSeccion, useContenido } from '../store'
import { AvisoDemo, Boton, Campo, Selector, Tarjeta } from '../ui'

export default function Galeria() {
  const { gallery, galleryFilters } = useContenido()
  const [filtro, setFiltro] = useState('todo')
  const [editando, setEditando] = useState(null)

  const categorias = galleryFilters.filter((f) => f.id !== 'todo')
  const visibles = gallery
    .map((foto, indice) => ({ foto, indice }))
    .filter(({ foto }) => filtro === 'todo' || foto.cat === filtro)

  return (
    <div className="space-y-6">
      <Tarjeta
        titulo="Galería"
        descripcion={`${gallery.length} fotos. El orden de aquí es el orden del mosaico en la página.`}
      >
        <AvisoDemo>
          Subir fotos nuevas necesita un servidor. En esta demostración puedes reordenar, cambiar
          la categoría, editar la descripción y quitar fotos; para agregar otras se usa el script{' '}
          <code className="text-amber-800">scripts/procesar-fotos.py</code>.
        </AvisoDemo>

        {/* Filtro por categoría */}
        <div className="flex flex-wrap gap-2">
          {galleryFilters.map((f) => {
            const cuenta =
              f.id === 'todo' ? gallery.length : gallery.filter((g) => g.cat === f.id).length
            const activo = f.id === filtro
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFiltro(f.id)}
                className={[
                  'rounded border px-4 py-2 text-xs uppercase tracking-widest transition-colors duration-300',
                  activo
                    ? 'border-tinta-tenue bg-onyx text-papel'
                    : 'border-borde text-tinta-suave hover:border-plata hover:text-tinta-fuerte',
                ].join(' ')}
              >
                {f.label}
                <span className="ml-2 opacity-60">{cuenta}</span>
              </button>
            )
          })}
        </div>

        {/* Mosaico */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {visibles.map(({ foto, indice }) => (
            <figure
              key={foto.src}
              className="group overflow-hidden rounded border border-borde bg-papel-hueso"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={`${foto.src}.jpg`}
                  alt={foto.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-2 top-2 rounded bg-papel-hueso/80 px-2 py-1 text-[0.6rem] uppercase tracking-widest text-tinta backdrop-blur-sm">
                  {indice + 1}
                </span>
              </div>

              <figcaption className="space-y-3 p-3">
                <p className="line-clamp-2 text-xs font-light leading-relaxed text-tinta-suave">
                  {foto.alt}
                </p>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded border border-borde px-2 py-1 text-[0.6rem] uppercase tracking-widest text-tinta-tenue">
                    {categorias.find((c) => c.id === foto.cat)?.label ?? foto.cat}
                  </span>
                  <div className="flex flex-wrap items-center gap-0.5">
                    <button
                      type="button"
                      onClick={() => moverEnLista('gallery', indice, -1)}
                      disabled={indice === 0}
                      aria-label="Mover antes"
                      className="flex h-7 w-7 items-center justify-center rounded text-tinta-tenue transition-colors hover:text-tinta-fuerte disabled:opacity-25"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={() => moverEnLista('gallery', indice, 1)}
                      disabled={indice === gallery.length - 1}
                      aria-label="Mover después"
                      className="flex h-7 w-7 items-center justify-center rounded text-tinta-tenue transition-colors hover:text-tinta-fuerte disabled:opacity-25"
                    >
                      →
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditando(indice)}
                      aria-label="Editar"
                      className="flex h-7 w-7 items-center justify-center rounded text-tinta-tenue transition-colors hover:text-tinta-fuerte"
                    >
                      ✎
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`¿Quitar esta foto de la galería?\n\n${foto.alt}`)) {
                          quitarDeLista('gallery', indice)
                        }
                      }}
                      aria-label="Quitar"
                      className="flex h-7 w-7 items-center justify-center rounded text-tinta-tenue transition-colors hover:text-rose-300"
                    >
                      ×
                    </button>
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        {visibles.length === 0 && (
          <p className="text-sm font-light text-tinta-tenue">
            No hay fotos en esta categoría.
          </p>
        )}
      </Tarjeta>

      <Tarjeta
        titulo="Categorías del filtro"
        descripcion="Los botones que aparecen sobre el mosaico en la página."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {galleryFilters.map((f, i) => (
            <Campo
              key={f.id}
              label={f.id === 'todo' ? 'Todo (fija)' : `Etiqueta de "${f.id}"`}
              valor={f.label}
              onChange={(v) =>
                setSeccion(
                  'galleryFilters',
                  galleryFilters.map((g, j) => (j === i ? { ...g, label: v } : g)),
                )
              }
            />
          ))}
        </div>
      </Tarjeta>

      {editando !== null && gallery[editando] && (
        <EditorFoto
          foto={gallery[editando]}
          indice={editando}
          categorias={categorias}
          onCerrar={() => setEditando(null)}
        />
      )}
    </div>
  )
}

/** Panel lateral para editar una foto. */
function EditorFoto({ foto, indice, categorias, onCerrar }) {
  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-papel-hueso/70 backdrop-blur-sm"
      onClick={onCerrar}
    >
      <aside
        className="h-full w-full max-w-md animate-fadeIn overflow-y-auto border-l border-borde bg-papel p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-xl font-light text-tinta-fuerte">Editar foto</h2>
          <Boton onClick={onCerrar}>Cerrar</Boton>
        </header>

        <img
          src={`${foto.src}.jpg`}
          alt={foto.alt}
          className="mb-6 w-full rounded border border-borde object-cover"
        />

        <div className="space-y-5">
          <Campo
            label="Descripción"
            valor={foto.alt}
            onChange={(v) => setEnLista('gallery', indice, 'alt', v)}
            ayuda="Se ve al pasar el cursor y bajo la foto ampliada. También la leen los buscadores."
          />
          <Selector
            label="Categoría"
            valor={foto.cat}
            onChange={(v) => setEnLista('gallery', indice, 'cat', v)}
            opciones={categorias.map((c) => ({ valor: c.id, label: c.label }))}
          />
          <div>
            <span className="mb-2 block text-[0.65rem] uppercase tracking-widest text-tinta-tenue">
              Archivo
            </span>
            <code className="block break-all rounded border border-borde bg-papel-hueso px-4 py-3 text-xs text-tinta-suave">
              {foto.src}.webp / .jpg
            </code>
          </div>
        </div>
      </aside>
    </div>
  )
}
