import { useSite } from '../hooks/useSite'
import Reveal from './Reveal'
import Mapa from './Mapa'


export default function Contact() {
  const { brand, contact, whatsappLink } = useSite()

  const channels = [
    {
      label: 'WhatsApp',
      value: 'Escribir ahora',
      href: whatsappLink(),
      hint: 'Respuesta en horario de atención',
    },
    {
      label: 'Instagram',
      value: brand.instagramHandle,
      href: brand.instagramUrl,
      hint: 'Portafolio y disponibilidad',
    },
    {
      label: 'Correo',
      value: brand.email,
      href: `mailto:${brand.email}`,
      hint: 'Eventos y grupos',
    },
  ]

  return (
    <section id="contacto" className="section relative overflow-hidden bg-gradient-claro">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-plata/40 to-transparent" />

      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-6">{contact.eyebrow}</p>
          <h2 className="font-display text-4xl font-light leading-[1.1] text-tinta-fuerte sm:text-5xl lg:text-6xl">
            {contact.title}
          </h2>
          <p className="mt-7 text-base font-light leading-relaxed text-tinta-suave">
            {contact.body}
          </p>

          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            className="btn-onyx group mt-10 px-10"
          >
            Agendar por WhatsApp
            <span className="transition-transform duration-500 ease-smooth group-hover:translate-x-1">
              →
            </span>
          </a>

          <p className="mt-5 text-[0.65rem] uppercase tracking-widest text-tinta-tenue">
            {contact.note}
          </p>
        </Reveal>

        {/* Canales */}
        <Reveal delay={140} className="mt-20">
          <div className="grid gap-px border border-borde bg-borde md:grid-cols-3">
            {channels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noreferrer"
                className="group relative overflow-hidden bg-papel p-8 transition-all duration-500 ease-smooth hover:bg-papel-hueso"
              >
                <span className="block text-[0.65rem] uppercase tracking-widest text-tinta-tenue">
                  {channel.label}
                </span>
                <span className="mt-3 block font-display text-2xl font-light text-tinta-fuerte transition-colors duration-300 group-hover:text-tinta">
                  {channel.value}
                </span>
                <span className="mt-2 block text-xs font-light text-tinta-suave">
                  {channel.hint}
                </span>
                {/* Línea que se dibuja de izquierda a derecha */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-grafito transition-transform duration-700 ease-smooth group-hover:scale-x-100"
                />
              </a>
            ))}
          </div>
        </Reveal>

        {/* Horarios y ubicación */}
        <Reveal delay={200} className="mt-14">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="eyebrow mb-6">Horarios</h3>
              <dl className="space-y-3">
                {brand.hours.map((h) => (
                  <div
                    key={h.days}
                    className="flex items-baseline justify-between gap-4 border-b border-borde/60 pb-3"
                  >
                    <dt className="text-sm font-light text-tinta-suave">{h.days}</dt>
                    <dd className="text-sm text-tinta-fuerte">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3 className="eyebrow mb-6">Ubicación</h3>
              <p className="font-display text-2xl font-light leading-snug text-tinta-fuerte">
                {brand.address}
              </p>
              <p className="mt-3 text-sm font-light text-tinta-suave">
                La dirección exacta se comparte al confirmar la cita.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={300} className="mt-12">
          <Mapa />
        </Reveal>
      </div>
    </section>
  )
}
