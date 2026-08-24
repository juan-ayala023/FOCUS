import { useState } from 'react'

/**
 * Imagen con WebP + JPG y efecto blur-up.
 *
 * Mientras baja la foto real se muestra el LQIP (miniatura de 16px
 * embebida en base64) escalado y desenfocado, así nunca hay un hueco
 * negro. Al cargar, la nítida entra con un fundido.
 *
 * `src` va SIN extensión: el componente arma `.webp` y `.jpg`.
 */
export default function SmartImage({
  src,
  alt,
  lqip,
  className = '',
  imgClassName = '',
  ratio,
  loading = 'lazy',
  sizes,
}) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      className={`relative overflow-hidden bg-papel-hueso ${className}`}
      style={ratio ? { aspectRatio: String(ratio) } : undefined}
    >
      {lqip && (
        <img
          src={lqip}
          alt=""
          aria-hidden="true"
          className={[
            'absolute inset-0 h-full w-full scale-110 object-cover blur-xl transition-opacity duration-700 ease-smooth',
            loaded ? 'opacity-0' : 'opacity-100',
          ].join(' ')}
        />
      )}

      <picture>
        <source srcSet={`${src}.webp`} type="image/webp" />
        <img
          src={`${src}.jpg`}
          alt={alt}
          loading={loading}
          decoding="async"
          sizes={sizes}
          onLoad={() => setLoaded(true)}
          className={[
            'relative h-full w-full object-cover transition-[opacity,transform,filter] duration-[1200ms] ease-smooth',
            loaded ? 'opacity-100' : 'opacity-0',
            imgClassName,
          ].join(' ')}
        />
      </picture>
    </div>
  )
}
