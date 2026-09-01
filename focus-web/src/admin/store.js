import { useSyncExternalStore } from 'react'

import {
  brand,
  contact,
  galleryFilters,
  hero,
  manifesto,
  marqueeItems,
  nav,
  services,
  stats,
  testimonials,
} from '../config/site'
import { gallery } from '../data/gallery'

// ─────────────────────────────────────────────────────────────
//  Almacén de contenido del sitio
//
//  DEMO: guarda todo en localStorage del navegador. No hay
//  servidor ni base de datos, así que lo que edites se ve solo
//  en este equipo y en este navegador. Para que fuera real hay
//  que reemplazar leer()/guardar() por llamadas a una API.
// ─────────────────────────────────────────────────────────────

const CLAVE = 'focus:contenido'
const VERSION = 7 // súbelo si cambia la forma de los datos: descarta lo guardado

/** Copia profunda sin referencias compartidas con los valores por defecto. */
const clonar = (v) => JSON.parse(JSON.stringify(v))

/** Contenido original del sitio, tal como está en config/site.js y data/gallery.js. */
export const contenidoPorDefecto = () =>
  clonar({
    brand,
    nav,
    hero,
    marqueeItems,
    services,
    galleryFilters,
    gallery,
    manifesto,
    stats,
    testimonials,
    contact,
  })

function leer() {
  try {
    const crudo = localStorage.getItem(CLAVE)
    if (!crudo) return contenidoPorDefecto()

    const guardado = JSON.parse(crudo)
    if (guardado.version !== VERSION) return contenidoPorDefecto()

    // Mezcla superficial por clave: si mañana agregamos una sección nueva
    // a site.js, aparece aunque el navegador tenga contenido viejo guardado.
    return { ...contenidoPorDefecto(), ...guardado.datos }
  } catch {
    return contenidoPorDefecto()
  }
}

let contenido = typeof window === 'undefined' ? contenidoPorDefecto() : leer()
const oyentes = new Set()

function avisar() {
  oyentes.forEach((fn) => fn())
}

function persistir() {
  try {
    localStorage.setItem(CLAVE, JSON.stringify({ version: VERSION, datos: contenido }))
  } catch {
    // Modo incógnito o cuota llena: seguimos en memoria.
  }
}

const suscribir = (fn) => {
  oyentes.add(fn)
  return () => oyentes.delete(fn)
}

const instantanea = () => contenido

/** Lee el contenido completo y se vuelve a renderizar cuando cambia. */
export function useContenido() {
  return useSyncExternalStore(suscribir, instantanea, instantanea)
}

/**
 * Reemplaza una sección entera.
 *   setSeccion('hero', { ...hero, title: [...] })
 */
export function setSeccion(clave, valor) {
  contenido = { ...contenido, [clave]: valor }
  persistir()
  avisar()
}

/**
 * Cambia un campo suelto dentro de una sección que es un objeto.
 *   setCampo('brand', 'whatsapp', '573001234567')
 */
export function setCampo(seccion, campo, valor) {
  setSeccion(seccion, { ...contenido[seccion], [campo]: valor })
}

/**
 * Cambia un campo de un elemento dentro de una sección que es una lista.
 *   setEnLista('services', 2, 'title', 'Peinados')
 */
export function setEnLista(seccion, indice, campo, valor) {
  const lista = contenido[seccion].map((item, i) =>
    i === indice ? { ...item, [campo]: valor } : item,
  )
  setSeccion(seccion, lista)
}

/** Agrega un elemento al final de una lista. */
export function agregarEnLista(seccion, item) {
  setSeccion(seccion, [...contenido[seccion], item])
}

/** Quita el elemento en esa posición. */
export function quitarDeLista(seccion, indice) {
  setSeccion(
    seccion,
    contenido[seccion].filter((_, i) => i !== indice),
  )
}

/** Mueve un elemento arriba (-1) o abajo (+1). */
export function moverEnLista(seccion, indice, salto) {
  const lista = [...contenido[seccion]]
  const destino = indice + salto
  if (destino < 0 || destino >= lista.length) return
  ;[lista[indice], lista[destino]] = [lista[destino], lista[indice]]
  setSeccion(seccion, lista)
}

/** Vuelve al contenido original y borra lo guardado. */
export function restablecer() {
  contenido = contenidoPorDefecto()
  try {
    localStorage.removeItem(CLAVE)
  } catch {
    /* nada que hacer */
  }
  avisar()
}

/** Contenido actual como JSON legible, para descargarlo. */
export function exportarJSON() {
  return JSON.stringify(contenido, null, 2)
}

/**
 * Carga contenido desde un JSON exportado antes.
 * Devuelve un mensaje de error, o null si salió bien.
 */
export function importarJSON(texto) {
  let datos
  try {
    datos = JSON.parse(texto)
  } catch {
    return 'El archivo no es un JSON válido.'
  }

  if (!datos || typeof datos !== 'object' || Array.isArray(datos)) {
    return 'El archivo no tiene la forma esperada.'
  }
  if (!datos.brand || !datos.hero) {
    return 'Falta contenido básico (marca o portada). ¿Es un respaldo de Focus?'
  }

  contenido = { ...contenidoPorDefecto(), ...datos }
  persistir()
  avisar()
  return null
}

/** true si hay cambios guardados respecto al contenido original. */
export function hayCambios() {
  try {
    return localStorage.getItem(CLAVE) !== null
  } catch {
    return false
  }
}
