import { useSite } from '../hooks/useSite'

export default function Footer() {
  const { brand, nav } = useSite()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-borde bg-papel-puro">
      <div className="container py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <a
              href="#inicio"
              className="group inline-flex flex-col items-end"
              aria-label={`${brand.name} — inicio`}
            >
              {/* alt vacío a propósito: el enlace ya se anuncia con su aria-label */}
              <img
                src={brand.logo}
                alt=""
                width={640}
                height={164}
                loading="lazy"
                decoding="async"
                className="h-9 w-auto transition-opacity duration-500 ease-smooth group-hover:opacity-70 sm:h-10"
              />
              <span className="mt-1.5 -mr-1 font-firma text-base leading-none text-tinta-suave transition-colors duration-500 group-hover:text-tinta-fuerte">
                {brand.firma}
              </span>
            </a>
            <p className="mt-5 font-display text-lg font-light italic text-tinta-tenue">
              «{brand.slogan}»
            </p>
            <p className="mt-4 text-sm font-light text-tinta-suave">
              {brand.city}, {brand.region} · Colombia
            </p>
          </div>

          <nav className="flex flex-col gap-3" aria-label="Pie de página">
            <span className="eyebrow mb-1">Navegación</span>
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-light text-tinta-suave transition-colors duration-300 hover:text-tinta-fuerte"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <span className="eyebrow mb-1">Síguenos</span>
            <a
              href={brand.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-light text-tinta-suave transition-colors duration-300 hover:text-tinta-fuerte"
            >
              Instagram {brand.instagramHandle}
            </a>
            <a
              href={`mailto:${brand.email}`}
              className="text-sm font-light text-tinta-suave transition-colors duration-300 hover:text-tinta-fuerte"
            >
              {brand.email}
            </a>
          </div>
        </div>

        <div className="hairline my-12" />

        <div className="flex flex-col items-center justify-between gap-4 text-[0.65rem] uppercase tracking-widest text-tinta-tenue sm:flex-row">
          <p>
            © {year} {brand.name} {brand.tagline}. Todos los derechos reservados.
          </p>
          <p className="flex items-center gap-4">
            <span>
              {brand.city}, {brand.region}
            </span>
            <a
              href="/admin"
              className="text-tinta-tenue/60 transition-colors duration-300 hover:text-tinta"
            >
              Administrar
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
