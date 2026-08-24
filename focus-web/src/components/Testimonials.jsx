import { useSite } from '../hooks/useSite'
import Reveal from './Reveal'

export default function Testimonials() {
  const { testimonials } = useSite()

  return (
    <section className="section bg-papel-puro">
      <div className="container">
        <Reveal className="mb-14 text-center">
          <p className="eyebrow mb-6">Lo que dicen</p>
          <h2 className="font-display text-4xl font-light text-tinta-fuerte sm:text-5xl">
            Confianza que <span className="italic text-tinta">vuelve</span>
          </h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.author} delay={i * 110}>
              <figure className="group flex h-full flex-col border border-borde bg-papel-hueso/50 p-8 transition-all duration-500 ease-smooth hover:-translate-y-1.5 hover:border-plata/50 hover:bg-papel-hueso hover:shadow-suave">
                <span
                  aria-hidden="true"
                  className="font-display text-5xl leading-none text-tinta-tenue/50 transition-colors duration-500 group-hover:text-tinta"
                >
                  &ldquo;
                </span>
                <blockquote className="mt-3 flex-1 text-sm font-light leading-relaxed text-tinta-suave">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-7 border-t border-borde pt-5">
                  <span className="block text-sm text-tinta-fuerte">{t.author}</span>
                  <span className="mt-1 block text-[0.65rem] uppercase tracking-widest text-tinta-tenue">
                    {t.service}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
