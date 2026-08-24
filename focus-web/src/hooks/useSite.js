import { useMemo } from 'react'
import { useContenido } from '../admin/store'

/**
 * Contenido vivo del sitio.
 *
 * Devuelve lo mismo que exportaba config/site.js, pero pasando por el
 * almacén: si alguien edita algo desde /admin, la página se actualiza
 * sola. Sin ediciones guardadas, devuelve exactamente los valores por
 * defecto de config/site.js.
 */
export function useSite() {
  const contenido = useContenido()

  return useMemo(
    () => ({
      ...contenido,
      /** Enlace de WhatsApp con el mensaje ya escrito. */
      whatsappLink: (servicio) => {
        const numero = (contenido.brand.whatsapp || '').replace(/\D/g, '')
        const texto = servicio
          ? `¡Hola Focus! Quiero agendar una cita de ${servicio}.`
          : '¡Hola Focus! Quiero agendar una cita.'
        return `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`
      },
    }),
    [contenido],
  )
}
