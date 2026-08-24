import { setCampo, setSeccion, useContenido } from '../store'
import { Area, Campo, Chips, Tarjeta } from '../ui'

export default function Inicio() {
  const { hero, marqueeItems } = useContenido()
  const set = (campo) => (valor) => setCampo('hero', campo, valor)

  const setLinea = (i) => (valor) =>
    setCampo(
      'hero',
      'title',
      hero.title.map((t, j) => (j === i ? valor : t)),
    )

  return (
    <div className="space-y-6">
      <Tarjeta titulo="Portada" descripcion="Lo primero que ve quien entra al sitio.">
        <Campo
          label="Etiqueta superior"
          valor={hero.eyebrow}
          onChange={set('eyebrow')}
          ayuda="La línea pequeña sobre el título."
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <Campo label="Título, primera línea" valor={hero.title[0]} onChange={setLinea(0)} />
          <Campo
            label="Título, segunda línea"
            valor={hero.title[1]}
            onChange={setLinea(1)}
            ayuda="Va en cursiva y con el degradado plateado."
          />
        </div>
        <Area label="Párrafo" valor={hero.body} onChange={set('body')} />
        <div className="grid gap-5 sm:grid-cols-2">
          <Campo label="Botón principal" valor={hero.primaryCta} onChange={set('primaryCta')} />
          <Campo label="Botón secundario" valor={hero.secondaryCta} onChange={set('secondaryCta')} />
        </div>
      </Tarjeta>

      <Tarjeta
        titulo="Cinta de servicios"
        descripcion="La franja que se desplaza justo debajo de la portada."
      >
        <Chips
          label="Palabras de la cinta"
          valores={marqueeItems}
          onChange={(v) => setSeccion('marqueeItems', v)}
          placeholder="Ej: Acrygel"
        />
      </Tarjeta>

      <VistaPreviaTitulo hero={hero} />
    </div>
  )
}

/** Muestra cómo va quedando el titular, con la misma tipografía del sitio. */
function VistaPreviaTitulo({ hero }) {
  return (
    <Tarjeta titulo="Así se verá" descripcion="Con la tipografía y los colores reales del sitio.">
      <div className="rounded border border-borde bg-papel-hueso p-8">
        <p className="mb-5 flex items-center gap-3 text-[0.65rem] uppercase tracking-widest text-tinta-tenue">
          <span className="h-px w-8 bg-tinta-tenue" />
          {hero.eyebrow}
        </p>
        <p className="font-display text-4xl font-light leading-[0.95] text-tinta-fuerte">
          {hero.title[0]}
          <br />
          <span className="bg-gradient-grafito bg-clip-text italic text-transparent">
            {hero.title[1]}
          </span>
        </p>
        <p className="mt-5 max-w-lg text-sm font-light leading-relaxed text-tinta-suave">
          {hero.body}
        </p>
      </div>
    </Tarjeta>
  )
}
