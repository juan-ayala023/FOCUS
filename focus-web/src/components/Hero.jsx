import { useEffect, useState } from "react";
import { useSite } from "../hooks/useSite";
import { useReducedMotion } from "../hooks/useMotion";
import HeroCollage from "./HeroCollage";

/**
 * Parte una frase en palabras y las hace subir una tras otra.
 * Cada palabra va dentro de una máscara con overflow oculto; el relleno
 * extra evita que se corten las colas de la p y la g.
 */
function Palabras({ texto, desde = 0, className = "" }) {
  return texto.split(" ").map((palabra, i) => (
    <span key={`${palabra}-${i}`}>
      <span className="-mb-[0.18em] inline-block overflow-hidden pb-[0.18em] align-bottom">
        <span
          className={`inline-block animate-riseIn ${className}`}
          style={{ animationDelay: `${desde + i * 90}ms` }}
        >
          {palabra}
        </span>
      </span>{" "}
    </span>
  ));
}

export default function Hero() {
  const { brand, hero, whatsappLink } = useSite()
  const reduced = useReducedMotion();
  const [offset, setOffset] = useState(0);

  // Parallax: el fondo se mueve a un tercio de la velocidad del scroll
  useEffect(() => {
    if (reduced) return;
    let frame = null;

    const update = () => {
      frame = null;
      setOffset(Math.min(window.scrollY, window.innerHeight));
    };
    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Fondo con parallax */}
      <div
        className="absolute inset-0 -z-20 will-change-transform"
        style={{
          transform: `translate3d(0, ${offset * 0.32}px, 0) scale(1.12)`,
        }}
      >
        <picture>
          <source srcSet="/images/hero.webp" type="image/webp" />
          <img
            src="/images/hero.jpg"
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            className="h-full w-full object-cover object-center opacity-30 grayscale"
          />
        </picture>
      </div>

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-papel via-papel/55 to-papel" />
      <div className="absolute inset-0 -z-10 animate-breathe bg-gradient-radial mix-blend-multiply" />

      <div
        className="container relative pb-24 pt-32"
        style={{
          // El texto sube y se desvanece un poco antes que el fondo
          transform: reduced
            ? undefined
            : `translate3d(0, ${offset * -0.12}px, 0)`,
          opacity: reduced ? 1 : Math.max(1 - offset / 620, 0),
        }}
      >
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div className="max-w-2xl">
            <p
              className="eyebrow mb-8 flex animate-fadeIn items-center gap-4"
              style={{ animationDelay: "150ms" }}
            >
              <span className="h-px w-10 origin-left animate-drawLine bg-tinta-tenue" />
              {hero.eyebrow}
            </p>

            <h1 className="font-display text-[3.25rem] font-light leading-[0.95] tracking-tight text-tinta-fuerte sm:text-7xl lg:text-[5.5rem]">
              <Palabras texto={hero.title[0]} desde={250} />
              <br />
              <Palabras
                texto={hero.title[1]}
                desde={250 + hero.title[0].split(" ").length * 90}
                className="animate-shimmer bg-gradient-grafito bg-clip-text italic text-transparent"
              />
            </h1>

            <p
              className="mt-8 max-w-xl animate-riseIn text-base font-light leading-relaxed text-tinta-suave sm:text-lg"
              style={{ animationDelay: "750ms" }}
            >
              {hero.body}
            </p>

            <p
              className="mt-6 animate-fadeIn font-display text-xl font-light italic text-tinta"
              style={{ animationDelay: "950ms" }}
            >
              «{brand.slogan}»
            </p>

            <div
              className="mt-12 flex animate-fadeIn flex-col gap-4 sm:flex-row sm:items-center"
              style={{ animationDelay: "1100ms" }}
            >
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="btn-onyx group"
              >
                {hero.primaryCta}
                <span className="transition-transform duration-500 ease-smooth group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a href="#servicios" className="btn-linea group">
                {hero.secondaryCta}
              </a>
            </div>
          </div>

          <HeroCollage />
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
        <span className="text-[0.6rem] uppercase tracking-widest text-tinta-tenue">
          Desliza
        </span>
        <span className="relative h-12 w-px overflow-hidden bg-borde">
          <span className="absolute inset-x-0 top-0 h-4 animate-scrollHint bg-tinta" />
        </span>
      </div>
    </section>
  );
}
