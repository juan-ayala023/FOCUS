import { useId, useState } from 'react'

// ─── Piezas sueltas que se repiten en todo el panel ──────────

export function Boton({ children, variante = 'plano', className = '', ...props }) {
  const estilos = {
    principal: 'bg-onyx text-papel hover:bg-white',
    plano: 'border border-borde text-tinta hover:border-plata hover:text-tinta-fuerte',
    peligro: 'border border-rose-500/40 text-rose-300 hover:border-rose-500 hover:bg-rose-500/10',
  }
  return (
    <button
      type="button"
      className={[
        'inline-flex items-center justify-center gap-2 rounded px-4 py-2.5 text-xs uppercase tracking-widest transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40',
        estilos[variante],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}

export function Campo({ label, valor, onChange, ayuda, placeholder, tipo = 'text' }) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[0.65rem] uppercase tracking-widest text-tinta-tenue">
        {label}
      </label>
      <input
        id={id}
        type={tipo}
        value={valor ?? ''}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded border border-borde bg-papel-hueso px-4 py-3 text-sm text-tinta-fuerte placeholder:text-tinta-tenue/50 focus:border-plata focus:outline-none"
      />
      {ayuda && <p className="mt-2 text-xs font-light text-tinta-tenue">{ayuda}</p>}
    </div>
  )
}

export function Area({ label, valor, onChange, ayuda, filas = 4 }) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[0.65rem] uppercase tracking-widest text-tinta-tenue">
        {label}
      </label>
      <textarea
        id={id}
        rows={filas}
        value={valor ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full resize-y rounded border border-borde bg-papel-hueso px-4 py-3 text-sm leading-relaxed text-tinta-fuerte focus:border-plata focus:outline-none"
      />
      {ayuda && <p className="mt-2 text-xs font-light text-tinta-tenue">{ayuda}</p>}
    </div>
  )
}

export function Selector({ label, valor, onChange, opciones }) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[0.65rem] uppercase tracking-widest text-tinta-tenue">
        {label}
      </label>
      <select
        id={id}
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded border border-borde bg-papel-hueso px-4 py-3 text-sm text-tinta-fuerte focus:border-plata focus:outline-none"
      >
        {opciones.map((o) => (
          <option key={o.valor} value={o.valor}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export function Tarjeta({ titulo, descripcion, children, acciones }) {
  return (
    <section className="rounded border border-borde bg-papel">
      {(titulo || acciones) && (
        <header className="flex flex-wrap items-start justify-between gap-4 border-b border-borde px-6 py-5">
          <div>
            {titulo && (
              <h2 className="font-display text-xl font-light text-tinta-fuerte">{titulo}</h2>
            )}
            {descripcion && (
              <p className="mt-1 text-xs font-light text-tinta-tenue">{descripcion}</p>
            )}
          </div>
          {acciones}
        </header>
      )}
      <div className="space-y-5 p-6">{children}</div>
    </section>
  )
}

/** Lista de etiquetas editables — para los ítems de cada servicio. */
export function Chips({ label, valores, onChange, placeholder = 'Agregar y pulsar Enter' }) {
  const [borrador, setBorrador] = useState('')

  const agregar = () => {
    const limpio = borrador.trim()
    if (!limpio || valores.includes(limpio)) return
    onChange([...valores, limpio])
    setBorrador('')
  }

  return (
    <div>
      <span className="mb-2 block text-[0.65rem] uppercase tracking-widest text-tinta-tenue">
        {label}
      </span>
      <div className="mb-3 flex flex-wrap gap-2">
        {valores.map((v, i) => (
          <span
            key={v}
            className="inline-flex items-center gap-2 rounded border border-borde px-3 py-1.5 text-xs text-tinta"
          >
            {v}
            <button
              type="button"
              onClick={() => onChange(valores.filter((_, j) => j !== i))}
              aria-label={`Quitar ${v}`}
              className="text-tinta-tenue transition-colors hover:text-rose-300"
            >
              ×
            </button>
          </span>
        ))}
        {valores.length === 0 && (
          <span className="text-xs font-light text-tinta-tenue">Sin elementos todavía.</span>
        )}
      </div>
      <div className="flex gap-2">
        <input
          value={borrador}
          placeholder={placeholder}
          onChange={(e) => setBorrador(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              agregar()
            }
          }}
          className="min-w-0 flex-1 rounded border border-borde bg-papel-hueso px-4 py-2.5 text-sm text-tinta-fuerte placeholder:text-tinta-tenue/50 focus:border-plata focus:outline-none"
        />
        <Boton onClick={agregar} disabled={!borrador.trim()} className="shrink-0">
          Agregar
        </Boton>
      </div>
    </div>
  )
}

/** Cabecera de un elemento de lista, con mover y eliminar. */
export function FilaLista({ titulo, indice, total, onSubir, onBajar, onQuitar, children }) {
  return (
    <article className="rounded border border-borde bg-papel-hueso/60">
      <header className="flex items-center justify-between gap-3 border-b border-borde px-5 py-3">
        <h3 className="text-sm text-tinta-fuerte">{titulo}</h3>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onSubir}
            disabled={indice === 0}
            aria-label="Subir"
            className="flex h-8 w-8 items-center justify-center rounded text-tinta-tenue transition-colors hover:text-tinta-fuerte disabled:opacity-25"
          >
            ↑
          </button>
          <button
            type="button"
            onClick={onBajar}
            disabled={indice === total - 1}
            aria-label="Bajar"
            className="flex h-8 w-8 items-center justify-center rounded text-tinta-tenue transition-colors hover:text-tinta-fuerte disabled:opacity-25"
          >
            ↓
          </button>
          <button
            type="button"
            onClick={onQuitar}
            aria-label="Eliminar"
            className="flex h-8 w-8 items-center justify-center rounded text-tinta-tenue transition-colors hover:text-rose-300"
          >
            ×
          </button>
        </div>
      </header>
      <div className="space-y-4 p-5">{children}</div>
    </article>
  )
}

/** Aviso fijo de que esto es una demostración. */
export function AvisoDemo({ children }) {
  return (
    <p className="rounded border border-amber-600/30 bg-amber-500/10 px-4 py-3 text-xs font-light leading-relaxed text-amber-800">
      {children}
    </p>
  )
}
