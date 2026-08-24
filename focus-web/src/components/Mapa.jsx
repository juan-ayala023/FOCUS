import { useSite } from '../hooks/useSite'

/**
 * Mapa de Google con la ubicación del estudio.
 *
 * Usa el `output=embed` de Google Maps, que no pide clave de API. La vía
 * oficial (Maps Embed API) obligaría a crear un proyecto en Google Cloud
 * y a dejar la clave a la vista en el frontend; para una landing no compensa.
 *
 * Qué se muestra sale de `brand.mapa` en config/site.js. Mientras no haya
 * dirección exacta apunta al municipio.
 *
 * El iframe carga en diferido: son ~600 KB de Google que no deben pesar
 * en la carga inicial, y el mapa está al final de la página.
 */
export default function Mapa() {
  const { brand } = useSite()
  const consulta = encodeURIComponent(brand.mapa)
  const zoom = brand.mapaZoom ?? 14

  return (
    <div>
      <div className="relative overflow-hidden border border-borde bg-papel-hueso">
        <iframe
          title={`Mapa de ${brand.name} en ${brand.city}, ${brand.region}`}
          src={`https://maps.google.com/maps?q=${consulta}&z=${zoom}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[340px] w-full grayscale-[0.85] transition-[filter] duration-700 ease-smooth hover:grayscale-0 md:h-[420px]"
        />
      </div>

      <a
        href={`https://www.google.com/maps/dir/?api=1&destination=${consulta}`}
        target="_blank"
        rel="noreferrer"
        className="group mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-tinta-suave transition-colors duration-300 hover:text-tinta-fuerte"
      >
        Cómo llegar
        <span
          aria-hidden="true"
          className="transition-transform duration-300 ease-smooth group-hover:translate-x-1"
        >
          →
        </span>
      </a>
    </div>
  )
}
