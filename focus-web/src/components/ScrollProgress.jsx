import { useScrollProgress } from '../hooks/useMotion'

/** Hilo plateado en el borde superior que marca el avance de la página. */
export default function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <div
      className="fixed inset-x-0 top-0 z-[55] h-px bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full origin-left bg-gradient-grafito"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}
