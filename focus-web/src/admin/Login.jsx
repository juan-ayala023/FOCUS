import { useState } from 'react'
import { useContenido } from './store'
import { AvisoDemo, Boton } from './ui'

/**
 * Pantalla de acceso.
 *
 * DEMO: no valida nada contra un servidor — acepta cualquier usuario y
 * contraseña, y solo existe para mostrar cómo se vería el ingreso.
 * No escribe credenciales en ningún lado.
 */
export default function Login({ onEntrar }) {
  const { brand } = useContenido()
  const [usuario, setUsuario] = useState('')
  const [clave, setClave] = useState('')
  const [error, setError] = useState('')

  const enviar = (e) => {
    e.preventDefault()
    if (!usuario.trim() || !clave.trim()) {
      setError('Completa los dos campos para continuar.')
      return
    }
    onEntrar(usuario.trim())
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-claro px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <span className="font-display text-3xl font-light tracking-[0.3em] text-tinta-fuerte">
            {brand.wordmark}
          </span>
          <p className="mt-3 text-[0.6rem] uppercase tracking-widest text-tinta-tenue">
            Panel de administración
          </p>
        </div>

        <form
          onSubmit={enviar}
          className="space-y-5 rounded border border-borde bg-papel p-8"
        >
          <div>
            <label
              htmlFor="usuario"
              className="mb-2 block text-[0.65rem] uppercase tracking-widest text-tinta-tenue"
            >
              Usuario
            </label>
            <input
              id="usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              autoComplete="off"
              className="w-full rounded border border-borde bg-papel-hueso px-4 py-3 text-sm text-tinta-fuerte focus:border-plata focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="clave"
              className="mb-2 block text-[0.65rem] uppercase tracking-widest text-tinta-tenue"
            >
              Contraseña
            </label>
            <input
              id="clave"
              type="password"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              autoComplete="off"
              className="w-full rounded border border-borde bg-papel-hueso px-4 py-3 text-sm text-tinta-fuerte focus:border-plata focus:outline-none"
            />
          </div>

          {error && <p className="text-xs text-rose-300">{error}</p>}

          <Boton variante="principal" className="w-full" type="submit">
            Entrar
          </Boton>

          <AvisoDemo>
            Demostración: acepta cualquier usuario y contraseña. No hay autenticación real ni se
            envía nada a ningún servidor.
          </AvisoDemo>
        </form>

        <p className="mt-6 text-center">
          <a
            href="/"
            className="text-xs uppercase tracking-widest text-tinta-tenue transition-colors hover:text-tinta-fuerte"
          >
            ← Volver al sitio
          </a>
        </p>
      </div>
    </div>
  )
}
