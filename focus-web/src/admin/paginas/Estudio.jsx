import {
  agregarEnLista,
  moverEnLista,
  quitarDeLista,
  setCampo,
  setEnLista,
  useContenido,
} from '../store'
import { Area, Boton, Campo, FilaLista, Tarjeta } from '../ui'

export default function Estudio() {
  const { manifesto, stats } = useContenido()
  const set = (campo) => (valor) => setCampo('manifesto', campo, valor)

  const setPilar = (i, campo, valor) =>
    setCampo(
      'manifesto',
      'pillars',
      manifesto.pillars.map((p, j) => (j === i ? { ...p, [campo]: valor } : p)),
    )

  return (
    <div className="space-y-6">
      <Tarjeta titulo="Quiénes somos" descripcion="El bloque de texto junto a la foto del estudio.">
        <Campo label="Etiqueta superior" valor={manifesto.eyebrow} onChange={set('eyebrow')} />
        <Campo label="Título" valor={manifesto.title} onChange={set('title')} />
        <Area label="Introducción" valor={manifesto.intro} onChange={set('intro')} filas={4} />
      </Tarjeta>

      <Tarjeta
        titulo="Misión y visión"
        descripcion="Cada bloque aparece con una línea vertical a la izquierda."
        acciones={
          <Boton
            onClick={() =>
              setCampo('manifesto', 'pillars', [
                ...manifesto.pillars,
                { label: 'Nuevo bloque', text: '' },
              ])
            }
          >
            Agregar bloque
          </Boton>
        }
      >
        {manifesto.pillars.map((p, i) => (
          <FilaLista
            key={i}
            titulo={p.label || 'Sin título'}
            indice={i}
            total={manifesto.pillars.length}
            onSubir={() => {
              const l = [...manifesto.pillars]
              ;[l[i - 1], l[i]] = [l[i], l[i - 1]]
              setCampo('manifesto', 'pillars', l)
            }}
            onBajar={() => {
              const l = [...manifesto.pillars]
              ;[l[i + 1], l[i]] = [l[i], l[i + 1]]
              setCampo('manifesto', 'pillars', l)
            }}
            onQuitar={() =>
              setCampo(
                'manifesto',
                'pillars',
                manifesto.pillars.filter((_, j) => j !== i),
              )
            }
          >
            <Campo label="Título" valor={p.label} onChange={(v) => setPilar(i, 'label', v)} />
            <Area label="Texto" valor={p.text} onChange={(v) => setPilar(i, 'text', v)} filas={5} />
          </FilaLista>
        ))}
      </Tarjeta>

      <Tarjeta
        titulo="Cifras"
        descripcion="Cuentan desde cero al entrar en pantalla. Funciona con valores como 100%, +1k o 5.0."
        acciones={
          <Boton onClick={() => agregarEnLista('stats', { value: '0', label: 'Nueva cifra' })}>
            Agregar cifra
          </Boton>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {stats.map((s, i) => (
            <FilaLista
              key={i}
              titulo={s.label || 'Sin nombre'}
              indice={i}
              total={stats.length}
              onSubir={() => moverEnLista('stats', i, -1)}
              onBajar={() => moverEnLista('stats', i, 1)}
              onQuitar={() => quitarDeLista('stats', i)}
            >
              <Campo
                label="Valor"
                valor={s.value}
                onChange={(v) => setEnLista('stats', i, 'value', v)}
              />
              <Campo
                label="Etiqueta"
                valor={s.label}
                onChange={(v) => setEnLista('stats', i, 'label', v)}
              />
            </FilaLista>
          ))}
        </div>
      </Tarjeta>
    </div>
  )
}
