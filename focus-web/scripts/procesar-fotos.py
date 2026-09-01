"""Prepara las fotos de Focus para la web.

Lee los originales a resolución completa de FOCUS/fotos-originales/ y, por
cada uno, escribe en public/images/galeria/ una versión JPG y otra WebP con el
lado largo a 1400 px. Al terminar regenera src/data/gallery.js, que es lo que
consume la galería del sitio.

Para agregar una foto nueva:
  1. Guárdala en FOCUS/fotos-originales/ con un nombre descriptivo.
  2. Agrega su línea a MAPA, con la categoría y el texto alternativo.
  3. Ejecuta:  python scripts/procesar-fotos.py

Requiere Pillow:  pip install Pillow
"""

import base64
import io
import os

from PIL import Image, ImageOps

AQUI = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.dirname(AQUI)                       # focus-web/
ROOT = os.path.dirname(SRC)                       # FOCUS/
ORIG = os.path.join(ROOT, 'fotos-originales')     # originales a resolución completa
WEB = os.path.join(SRC, 'public', 'images', 'galeria')

# (archivo en fotos-originales, categoría del filtro, texto alternativo)
# Las categorías válidas están en src/config/site.js -> galleryFilters
MAPA = [
    # ── Uñas ────────────────────────────────────────────────
    ('frances-pedreria.jpeg',    'unas', 'Francés blanco almendra con línea dorada y pedrería'),
    ('frances-clasico.jpeg',     'unas', 'Francés blanco clásico en uñas cuadradas'),
    ('frances-cuadradas.jpeg',   'unas', 'Francés blanco en uñas cuadradas largas con pedrería'),
    ('frances-flor.jpeg',        'unas', 'Francés blanco almendra con flor pintada a mano'),
    ('frances-mariposa.jpeg',    'unas', 'Francés blanco con mariposa y pedrería'),
    ('nailart-dorado.jpeg',      'unas', 'Nail art dorado sobre base nude con acabado francés'),
    ('nailart-estrellas.jpeg',   'unas', 'Rosa glitter con estrellas y lunas doradas'),
    ('nailart-holografico.jpeg', 'unas', 'Nude almendra con estrellas y mariposa holográfica'),
    ('nailart-lineas.jpeg',      'unas', 'Nude con líneas blancas y glitter dorado'),
    ('nailart-flores.jpeg',      'unas', 'Francés amarillo suave con flores doradas'),
    ('color-negro.jpeg',         'unas', 'Francés negro almendra con detalles en rojo'),
    ('color-nude.jpeg',          'unas', 'Nude natural en uñas cuadradas cortas'),
    ('color-azul.jpeg',          'unas', 'Azul cielo almendra con mariposa blanca'),

    # ── Peinados ────────────────────────────────────────────
    ('peinado-tiara-rizos.jpeg',        'peinados', 'Semirecogido con tiara y rizos definidos'),
    ('peinado-corona-ondas.jpeg',       'peinados', 'Semirecogido con corona y ondas largas'),
    ('peinado-tocado-flores.jpeg',      'peinados', 'Semirecogido con tocado de flores y rizos'),
    ('peinado-recogido-flores.jpeg',    'peinados', 'Recogido con flores naturales y mechones sueltos'),
    ('peinado-tiara-trenzas.jpeg',      'peinados', 'Semirecogido con tiara y trenzas entrelazadas'),
    ('peinado-trenzas-rizos.jpeg',      'peinados', 'Semirecogido con trenzas laterales y rizos'),
    ('peinado-trenza-cascada.jpeg',     'peinados', 'Trenza en cascada sobre cabello suelto ondulado'),
    ('peinado-semirecogido-ondas.jpeg', 'peinados', 'Semirecogido con trenza y ondas suaves'),
    ('peinado-recogido-alto.jpeg',      'peinados', 'Recogido alto con rizos enmarcando el rostro'),
    ('peinado-recogido-mechas.jpeg',    'peinados', 'Recogido con rizos y mechas iluminadas'),
    ('peinado-cola-ondas.jpeg',         'peinados', 'Cola de caballo alta con ondas largas'),

    # ── Maquillaje de grados ────────────────────────────────
    ('grados-coral-luminoso.jpg',   'maquillaje', 'Maquillaje de grados en coral luminoso con labio nude'),
    ('grados-ahumado-calido.jpg',   'maquillaje', 'Ahumado cálido con delineado marcado y labio terracota'),
    ('grados-nude-rosado.jpg',      'maquillaje', 'Maquillaje nude rosado con cejas definidas'),
    ('grados-bronce-glossy.jpg',    'maquillaje', 'Piel bronceada con sombra dorada y labio glossy'),
    ('grados-labio-rojo.jpg',       'maquillaje', 'Delineado alado con labio rojo clásico'),
    ('grados-glam-collar.jpg',      'maquillaje', 'Glam suave con rizos sueltos y piel luminosa'),
    ('grados-verde-esmeralda.jpg',  'maquillaje', 'Sombra verde esmeralda con labio nude'),
    ('grados-coral-durazno.jpg',    'maquillaje', 'Sombra coral durazno difuminada con labio marrón'),
    ('grados-natural-rizos.jpg',    'maquillaje', 'Maquillaje natural luminoso con rizos'),
    ('grados-marron-suave.jpg',     'maquillaje', 'Ahumado marrón suave con piel satinada'),
    ('grados-ahumado-marron.jpg',   'maquillaje', 'Ahumado marrón con pestañas marcadas'),
    ('grados-rosa-malva.jpg',       'maquillaje', 'Sombra rosa malva con labio rosado'),
    ('grados-glam-neon.jpg',        'maquillaje', 'Glam de grados con piel luminosa y labio nude'),
    ('grados-delineado-azul.jpg',   'maquillaje', 'Delineado azul con labio glossy'),
]

LADO = 1400
os.makedirs(WEB, exist_ok=True)

salida = []
for archivo, cat, alt in MAPA:
    ruta = os.path.join(ORIG, archivo)
    if not os.path.exists(ruta):
        print('FALTA', ruta)
        continue

    slug = os.path.splitext(archivo)[0]

    # exif_transpose respeta la orientación con que se tomó la foto
    im = ImageOps.exif_transpose(Image.open(ruta)).convert('RGB')
    w, h = im.size
    escala = LADO / max(w, h)
    if escala < 1:
        im = im.resize((round(w * escala), round(h * escala)), Image.LANCZOS)

    im.save(os.path.join(WEB, slug + '.jpg'), 'JPEG', quality=82, optimize=True, progressive=True)
    im.save(os.path.join(WEB, slug + '.webp'), 'WEBP', quality=78, method=6)

    # LQIP: miniatura de 16 px que va embebida en el JS. Se muestra
    # desenfocada mientras baja la foto real, así nunca hay un hueco negro.
    mini = im.copy()
    mini.thumbnail((16, 16), Image.LANCZOS)
    buf = io.BytesIO()
    mini.save(buf, 'JPEG', quality=40)
    b64 = base64.b64encode(buf.getvalue()).decode()

    salida.append({
        'slug': slug,
        'cat': cat,
        'alt': alt,
        'w': im.size[0],
        'h': im.size[1],
        'lqip': 'data:image/jpeg;base64,' + b64,
    })

    kb = lambda ext: os.path.getsize(os.path.join(WEB, slug + ext)) // 1024
    print(f'{slug:22} {im.size[0]}x{im.size[1]}  jpg {kb(".jpg")}KB  webp {kb(".webp")}KB')

# Regenera el archivo de datos que consume la galería
RAYA = '─' * 61
CABECERA = '\n'.join([
    f'// {RAYA}',
    '//  ARCHIVO GENERADO — no editar a mano.',
    '//  Lo produce scripts/procesar-fotos.py a partir de',
    '//  FOCUS/fotos-originales/. Ver README ("Fotos").',
    '//',
    '//  src   ruta sin extensión: existe .webp y .jpg',
    '//  cat   categoría para el filtro de la galería',
    '//  ratio ancho/alto, para reservar el espacio y evitar saltos',
    '//  lqip  miniatura de 16px en base64, para el efecto blur-up',
    f'// {RAYA}',
    '',
    '',
])

lineas = []
for s in salida:
    lineas.append('\n'.join([
        '  {',
        f"    src: '/images/galeria/{s['slug']}',",
        f"    cat: '{s['cat']}',",
        f"    alt: '{s['alt']}',",
        f"    ratio: {round(s['w'] / s['h'], 4)},",
        f"    lqip: '{s['lqip']}',",
        '  },',
    ]))

bloque = CABECERA + 'export const gallery = [\n' + '\n'.join(lineas) + '\n]\n'
destino = os.path.join(SRC, 'src', 'data', 'gallery.js')
with io.open(destino, 'w', encoding='utf-8') as f:
    f.write(bloque)

print(f'\n{len(salida)} fotos -> {destino}')
