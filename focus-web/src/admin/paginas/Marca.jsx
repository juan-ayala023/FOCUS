import { useContenido, setCampo, setSeccion } from '../store'
import { Boton, Campo, FilaLista, Tarjeta } from '../ui'

export default function Marca() {
  const { brand } = useContenido()
  const set = (campo) => (valor) => setCampo('brand', campo, valor)

  const setHorario = (i, campo, valor) =>
    setCampo(
      'brand',
      'hours',
      brand.hours.map((h, j) => (j === i ? { ...h, [campo]: valor } : h)),
    )

  return (
    <div className="space-y-6">
      <Tarjeta titulo="Identidad" descripcion="El nombre y el slogan aparecen en la portada, el menú y el pie.">
        <div className="grid gap-5 sm:grid-cols-2">
          <Campo label="Nombre" valor={brand.name} onChange={set('name')} />
          <Campo
            label="Logotipo (texto)"
            valor={brand.wordmark}
            onChange={set('wordmark')}
            ayuda="En minúscula, como se ve en el menú."
          />
        </div>
        <Campo label="Bajada" valor={brand.tagline} onChange={set('tagline')} />
        <Campo
          label="Slogan"
          valor={brand.slogan}
          onChange={set('slogan')}
          ayuda="Se muestra entre comillas en la portada y el pie."
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <Campo label="Ciudad" valor={brand.city} onChange={set('city')} />
          <Campo label="Departamento" valor={brand.region} onChange={set('region')} />
        </div>
      </Tarjeta>

      <Tarjeta
        titulo="Contacto"
        descripcion="El número de WhatsApp alimenta todos los botones de reserva del sitio."
      >
        <Campo
          label="WhatsApp"
          valor={brand.whatsapp}
          onChange={set('whatsapp')}
          placeholder="573001234567"
          ayuda="Formato internacional, sin + ni espacios. Colombia: 57 + el número."
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <Campo label="Usuario de Instagram" valor={brand.instagramHandle} onChange={set('instagramHandle')} />
          <Campo label="Enlace de Instagram" valor={brand.instagramUrl} onChange={set('instagramUrl')} />
        </div>
        <Campo label="Correo" valor={brand.email} onChange={set('email')} tipo="email" />
        <Campo
          label="Dirección"
          valor={brand.address}
          onChange={set('address')}
          ayuda="Aparece en la sección de contacto."
        />
      </Tarjeta>

      <Tarjeta
        titulo="Horarios"
        descripcion="Se listan en la sección de contacto, en este orden."
        acciones={
          <Boton
            onClick={() =>
              setCampo('brand', 'hours', [...brand.hours, { days: 'Nuevo día', time: '9:00 — 18:00' }])
            }
          >
            Agregar franja
          </Boton>
        }
      >
        {brand.hours.map((h, i) => (
          <FilaLista
            key={i}
            titulo={h.days || 'Sin nombre'}
            indice={i}
            total={brand.hours.length}
            onSubir={() => {
              const l = [...brand.hours]
              ;[l[i - 1], l[i]] = [l[i], l[i - 1]]
              setCampo('brand', 'hours', l)
            }}
            onBajar={() => {
              const l = [...brand.hours]
              ;[l[i + 1], l[i]] = [l[i], l[i + 1]]
              setCampo('brand', 'hours', l)
            }}
            onQuitar={() =>
              setCampo(
                'brand',
                'hours',
                brand.hours.filter((_, j) => j !== i),
              )
            }
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Campo label="Días" valor={h.days} onChange={(v) => setHorario(i, 'days', v)} />
              <Campo label="Horario" valor={h.time} onChange={(v) => setHorario(i, 'time', v)} />
            </div>
          </FilaLista>
        ))}
      </Tarjeta>

      <Tarjeta titulo="Menú" descripcion="Los enlaces del menú superior y del pie de página.">
        <EditorMenu />
      </Tarjeta>
    </div>
  )
}

/** Editor del menú, separado para no alargar el componente principal. */
function EditorMenu() {
  const { nav } = useContenido()

  const setItem = (i, campo, valor) =>
    setSeccion(
      'nav',
      nav.map((n, j) => (j === i ? { ...n, [campo]: valor } : n)),
    )

  return (
    <>
      {nav.map((item, i) => (
        <FilaLista
          key={i}
          titulo={item.label}
          indice={i}
          total={nav.length}
          onSubir={() => {
            const l = [...nav]
            ;[l[i - 1], l[i]] = [l[i], l[i - 1]]
            setSeccion('nav', l)
          }}
          onBajar={() => {
            const l = [...nav]
            ;[l[i + 1], l[i]] = [l[i], l[i + 1]]
            setSeccion('nav', l)
          }}
          onQuitar={() =>
            setSeccion(
              'nav',
              nav.filter((_, j) => j !== i),
            )
          }
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Campo label="Texto" valor={item.label} onChange={(v) => setItem(i, 'label', v)} />
            <Campo
              label="Destino"
              valor={item.href}
              onChange={(v) => setItem(i, 'href', v)}
              ayuda="Ancla dentro de la página, por ejemplo #galeria"
            />
          </div>
        </FilaLista>
      ))}
    </>
  )
}
