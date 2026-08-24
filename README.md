# FOCUS

Landing page de **Focus Beauty**, estudio de belleza en La Unión, Antioquia.

El sitio vive en [`focus-web/`](focus-web/) — React 18 + Vite + Tailwind CSS.

## Arrancar

Desde esta carpeta o desde `focus-web/`, da igual:

```bash
npm run dev      # servidor de desarrollo
npm run build    # genera focus-web/dist/
npm run preview  # sirve el build ya compilado
```

La primera vez hay que instalar las dependencias:

```bash
npm --prefix focus-web install
```

## Estructura

```
focus-web/          el sitio (ver focus-web/README.md para el detalle)
fotos-originales/   fotos a resolución completa; no se publican
vercel.json         configuración del despliegue
```

## Pendientes

El contenido de texto está en [`focus-web/src/config/site.js`](focus-web/src/config/site.js).
Lo que sigue con datos de ejemplo está marcado con `TODO`:

| Dato | Campo |
|---|---|
| WhatsApp | `brand.whatsapp` |
| Correo e Instagram | `brand.email` · `brand.instagramHandle` |
| Dirección exacta | `brand.address` y `brand.mapa` (el mapa apunta al municipio) |
| Testimonios | `testimonials` |
| Fotos de maquillaje y pestañas | `services[].image` |
