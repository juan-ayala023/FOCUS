/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.5rem', lg: '2rem' },
      screens: { '2xl': '1320px' },
    },
    extend: {
      colors: {
        // ── Paleta Focus Beauty · manual de marca vol.01 ─────────────
        // Los HEX son los oficiales del manual. La jerarquía está
        // invertida a propósito: el manual pone Onyx como principal
        // («plata sobre noche»), aquí dominan crema y grises y el
        // negro queda para detalles.
        //
        // papel  → superficies. Neutros CÁLIDOS (crema, Warm Gray 1).
        // tinta  → textos y trazos, del más fuerte al más tenue.
        // plata  → filetes y líneas; es el único gris FRÍO, como en el
        //          manual, y por contraste es lo que hace leer cálido
        //          al resto.
        papel: {
          puro: '#FFFFFF', // tarjetas elevadas
          DEFAULT: '#F5F5F2', // Crema · fondo del sitio
          hueso: '#EFEFEA', // secciones alternas
          humo: '#E5E5DE', // recesos y hover
        },
        // Ojo: el Acero del manual (#8A8E94) da 3.01:1 sobre la crema y no
        // pasa AA en las etiquetas pequeñas. Sobre Onyx sí cumplía, pero
        // aquí el fondo es claro, así que la escala de TEXTO se oscurece.
        tinta: {
          fuerte: '#0F1115', // Onyx · titulares — 17.3:1
          DEFAULT: '#3A3D42', // Carbón · cuerpo — 9.98:1
          suave: '#5A5E64', // secundario — 5.97:1
          tenue: '#686C73', // etiquetas y versalitas — 4.83:1
        },
        acero: '#8A8E94', // Acero · solo decorativo (iconos, trazos)
        plata: '#C8CBD0', // Plata · filetes
        onyx: '#0F1115', // Onyx · detalles negros (botones, scrims)
        borde: '#E2E2DB',
        // Excepción deliberada a la paleta del manual: el botón flotante
        // usa el verde oficial de WhatsApp porque se reconoce al instante
        // como «escríbeme». Es el único color del sitio fuera de la paleta.
        whatsapp: {
          DEFAULT: '#25D366',
          oscuro: '#1DA851', // hover
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
        // Manuscrita del letrero del estudio, bajo el logo
        firma: ['Sacramento', 'cursive'],
      },
      letterSpacing: {
        widest: '0.28em',
        brand: '0.42em',
      },
      backgroundImage: {
        // Metálico en grafito: el equivalente claro del degradado plata.
        // Ningún tramo sube de #7A7E85 para que siga leyéndose sobre crema.
        'gradient-grafito':
          'linear-gradient(135deg, #0F1115 0%, #7A7E85 45%, #2C2F34 70%, #0F1115 100%)',
        'gradient-claro': 'linear-gradient(180deg, #F5F5F2 0%, #EFEFEA 100%)',
        'gradient-radial': 'radial-gradient(ellipse at center, #FFFFFF 0%, #F5F5F2 70%)',
      },
      boxShadow: {
        // Sobre fondo claro no hay «glow»: lo que eleva es una sombra corta.
        realce: '0 16px 40px -16px hsl(220 17% 7% / .30)',
        suave: '0 24px 60px -28px hsl(220 17% 7% / .25)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(.22, 1, .36, 1)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        // Entrada escalonada de las palabras del titular
        riseIn: {
          '0%': { transform: 'translateY(115%) rotate(4deg)', opacity: '0' },
          '100%': { transform: 'translateY(0) rotate(0)', opacity: '1' },
        },
        // Apertura del lightbox
        zoomIn: {
          '0%': { transform: 'scale(.92)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        // Barrido de luz plateada sobre los botones
        shine: {
          '0%': { transform: 'translateX(-120%) skewX(-20deg)' },
          '100%': { transform: 'translateX(220%) skewX(-20deg)' },
        },
        // Línea que se dibuja al entrar en pantalla
        drawLine: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        halo: {
          '0%': { transform: 'scale(1)', opacity: '.45' },
          '70%,100%': { transform: 'scale(1.75)', opacity: '0' },
        },
        breathe: {
          '0%,100%': { opacity: '.35' },
          '50%': { opacity: '.7' },
        },
        // Punto de luz que baja por el indicador de scroll
        scrollHint: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(300%)' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        shimmer: 'shimmer 6s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        riseIn: 'riseIn 1s cubic-bezier(.22,1,.36,1) both',
        zoomIn: 'zoomIn .45s cubic-bezier(.22,1,.36,1) both',
        fadeIn: 'fadeIn .3s ease-out both',
        shine: 'shine 1.1s cubic-bezier(.22,1,.36,1)',
        drawLine: 'drawLine 1s cubic-bezier(.22,1,.36,1) both',
        halo: 'halo 2.6s cubic-bezier(.22,1,.36,1) infinite',
        breathe: 'breathe 5s ease-in-out infinite',
        scrollHint: 'scrollHint 2.4s cubic-bezier(.7,0,.3,1) infinite',
      },
    },
  },
  plugins: [],
}
