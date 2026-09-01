import { useSite } from '../hooks/useSite'
import Reveal from './Reveal'
import Stat from './Stat'

export default function Studio() {
  const { brand, manifesto, stats } = useSite()

  return (
    <section id="estudio" className="section overflow-hidden bg-gradient-claro">
      <div className="container">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Retrato */}
          <Reveal className="order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -inset-4 -z-10 bg-gradient-radial opacity-70 blur-2xl" />
              <picture>
                <source srcSet="/images/estudio/estudio-laura-bn.webp" type="image/webp" />
                <img
                  src="/images/estudio/estudio-laura-bn.jpg"
                  alt={`Laura, de ${brand.name}, maquillando a una clienta en el estudio`}
                  loading="lazy"
                  className="aspect-[4/5] w-full border border-borde object-cover shadow-suave"
                />
              </picture>
              <div className="absolute -bottom-6 -right-4 border border-borde bg-papel/90 px-6 py-5 backdrop-blur-sm sm:-right-6">
                <p className="font-display text-3xl font-light text-tinta-fuerte">
                  {brand.city}
                </p>
                <p className="mt-1 text-[0.65rem] uppercase tracking-widest text-tinta-tenue">
                  {brand.region} · Colombia
                </p>
              </div>
            </div>

            {/* Detrás de cámara: el trabajo en curso, no el resultado */}
            <div className="mt-14 grid grid-cols-2 gap-4">
              {[
                ['estudio-maquillando', 'Laura aplicando maquillaje a una clienta en el estudio'],
                ['estudio-detras-camara', 'Laura preparando a una clienta antes de su evento'],
              ].map(([nombre, texto]) => (
                <picture key={nombre}>
                  <source srcSet={`/images/estudio/${nombre}.webp`} type="image/webp" />
                  <img
                    src={`/images/estudio/${nombre}.jpg`}
                    alt={texto}
                    loading="lazy"
                    className="aspect-[4/5] w-full border border-borde object-cover grayscale-[0.35] transition-[filter] duration-700 ease-smooth hover:grayscale-0"
                  />
                </picture>
              ))}
            </div>
          </Reveal>

          {/* Manifiesto */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="eyebrow mb-6 flex items-center gap-4">
                <span className="h-px w-10 bg-tinta-tenue" />
                {manifesto.eyebrow}
              </p>
              <h2 className="font-display text-4xl font-light leading-[1.1] text-tinta-fuerte sm:text-5xl">
                {manifesto.title}
              </h2>
              <p className="mt-7 text-base font-light leading-relaxed text-tinta-suave">
                {manifesto.intro}
              </p>
            </Reveal>

            <div className="mt-12 space-y-10">
              {manifesto.pillars.map((pillar, i) => (
                <Reveal key={pillar.label} delay={120 + i * 120}>
                  <div className="border-l border-borde pl-6">
                    <h3 className="mb-3 text-[0.68rem] font-medium uppercase tracking-widest text-tinta">
                      {pillar.label}
                    </h3>
                    <p className="text-sm font-light leading-relaxed text-tinta-suave">
                      {pillar.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Cifras */}
        <Reveal className="mt-24 md:mt-32">
          <div className="hairline mb-12" />
          <dl className="grid grid-cols-2 gap-10 md:grid-cols-4">
            {stats.map((stat) => (
              <Stat key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
