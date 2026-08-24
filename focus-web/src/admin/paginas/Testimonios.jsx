import {
  agregarEnLista,
  moverEnLista,
  quitarDeLista,
  setEnLista,
  useContenido,
} from '../store'
import { Area, AvisoDemo, Boton, Campo, FilaLista, Tarjeta } from '../ui'

export default function Testimonios() {
  const { testimonials } = useContenido()

  return (
    <div className="space-y-6">
      <Tarjeta
        titulo="Testimonios"
        descripcion="Se muestran en tres columnas, en este orden."
        acciones={
          <Boton
            variante="principal"
            onClick={() =>
              agregarEnLista('testimonials', { quote: '', author: '', service: '' })
            }
          >
            Agregar testimonio
          </Boton>
        }
      >
        <AvisoDemo>
          Los tres testimonios que trae el sitio son de ejemplo, inventados para mostrar el
          formato. Reemplázalos por reseñas reales antes de publicar.
        </AvisoDemo>

        {testimonials.map((t, i) => (
          <FilaLista
            key={i}
            titulo={t.author || 'Sin nombre'}
            indice={i}
            total={testimonials.length}
            onSubir={() => moverEnLista('testimonials', i, -1)}
            onBajar={() => moverEnLista('testimonials', i, 1)}
            onQuitar={() => quitarDeLista('testimonials', i)}
          >
            <Area
              label="Reseña"
              valor={t.quote}
              onChange={(v) => setEnLista('testimonials', i, 'quote', v)}
              filas={3}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Campo
                label="Nombre"
                valor={t.author}
                onChange={(v) => setEnLista('testimonials', i, 'author', v)}
                placeholder="Valentina R."
              />
              <Campo
                label="Servicio"
                valor={t.service}
                onChange={(v) => setEnLista('testimonials', i, 'service', v)}
                placeholder="Acrygel"
              />
            </div>
          </FilaLista>
        ))}

        {testimonials.length === 0 && (
          <p className="text-sm font-light text-tinta-tenue">
            Sin testimonios. La sección se sigue mostrando, pero vacía.
          </p>
        )}
      </Tarjeta>
    </div>
  )
}
