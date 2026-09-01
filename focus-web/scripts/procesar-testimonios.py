"""Prepara las capturas de mensajes de clientas para la web.

Lee los originales de FOCUS/testimonios-originales/ y, por cada uno, escribe
en public/images/testimonios/ una versión JPG y otra WebP con el lado largo
a 900 px. Al terminar regenera src/data/testimonios.js.

El texto de MAPA es la transcripción del mensaje. No es decorativo: es el
`alt` de la imagen, así que es lo único que leen un lector de pantalla y
Google. Una captura sin transcribir es texto invisible para los dos.

Para agregar una captura nueva:
  1. Guárdala en FOCUS/testimonios-originales/ con un nombre descriptivo.
  2. Agrega su línea a MAPA con la transcripción del mensaje.
  3. Ejecuta:  python scripts/procesar-testimonios.py

Requiere Pillow:  pip install Pillow
"""

import base64
import io
import json
import os

from PIL import Image, ImageOps

AQUI = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.dirname(AQUI)                          # focus-web/
ROOT = os.path.dirname(SRC)                          # FOCUS/
ORIG = os.path.join(ROOT, 'testimonios-originales')
WEB = os.path.join(SRC, 'public', 'images', 'testimonios')

# (archivo en testimonios-originales, transcripción del mensaje)
MAPA = [
    ('gracias-cambio.jpg',
     'Gracias a ti Laura por tan hermoso trabajo, amé tu cambio. Aparte de que '
     'haces ver bien a las personas, eres una increíble persona. Admiración total '
     'para ti y mil gracias por tu hermoso trabajo, me encantó.'),
    ('cambio-extremo.jpg',
     'Súper bien, gracias a Dios. Todos sorprendidos de tanta belleza. Y yo, la '
     'mujer más hermosa y feliz del mundo, y todavía sorprendida del cambio tan extremo.'),
    ('quede-divina.jpg',
     'Ay, súper: quedé divina, muy admirada por todos. Quedé muy bonita, muchas '
     'gracias a ti y a la otra chica.'),
    ('resultados-hablan.jpg',
     'Muchísimas gracias por hacerlo en excelencia, tus resultados hablan por ti. '
     'Siempre será algo increíble.'),
    ('duro-toda-la-noche.jpg',
     'Súper bien, Lau: me duró toda la noche. Quedé feliz.'),
    ('me-transforma.jpg',
     'Usted me transforma, me pone tan linda. Créame que admiro mucho su trabajo, Lau.'),
    ('quinces-aleja.jpg',
     'Lau, hola, mira cómo quedó Aleja. Muchas gracias por tu trabajo y el de tu '
     'compañera; ella quedó feliz.'),
    ('unas-lindas.jpg',
     'Usted hace las uñas muy lindas, me encantan.'),
    ('me-encanto.jpg',
     'Hola, ¿cómo estás? Me encantó cómo quedé.'),
    ('contenta-maquillaje-peinado.jpg',
     'Muchísimas gracias. Quedé muy contenta y a gusto con el maquillaje y el peinado.'),
    ('profe-de-artes.jpg',
     'Laura, felicitaciones. Todo el mundo me admiró y di sus créditos como la '
     'responsable de la obra de arte. Hasta el profesor de artes preguntó que qué '
     'técnica, que cómo hizo para ponerme esas facciones.'),
    ('companeras-admiradas.jpg',
     'Hola, ¿cómo estás? Espero que estés muy bien. Gracias por tu excelente '
     'trabajo, muchas gracias, un abrazo. Están hermosas todas mis compañeras, muy '
     'admiradas con tu lindo arte. Te felicito, encantada.'),
    ('enamorada-del-talento.jpg',
     'Súper preciosa, muchas gracias. Enamorada de tu talento.'),
    ('maquillaje-espectacular.jpg',
     'Hola, Laura, pasaba por aquí a agradecerle por ese maquillaje tan '
     'espectacular. La gente me lo halagó demasiado; en serio que me duró hasta el '
     'último segundo, antes casi no logro desmaquillarme de lo duradero que quedó. '
     'Muy feliz, en serio, fue súper acorde. Muchas gracias.'),
    ('trabajo-para-manu.jpg',
     'Hola, Laura: quedamos muy contentos con el trabajo que le hiciste a Manu. '
     'Mil gracias.'),
    ('me-recomendaron.jpg',
     'Buenas tardes. Estoy buscando dónde arreglarme las cejas y te recomendaron mucho.'),
    ('mis-unitas.jpg',
     'Gracias, me gustaron mucho mis uñitas.'),
    ('siempre-satisfecha.jpg',
     'Me admiraron mucho el maquillaje, Lau. Tu trabajo es espectacular, siempre '
     'quedo satisfecha.'),
    ('momentos-importantes.jpg',
     'Eres una tesa, la mejor encargada para hacerme brillar en los momentos importantes.'),
    ('manicurista-de-confianza.jpg',
     'Tu trabajo merece que lo conozca mucha gente y nunca dudaré de eso. Eres mi '
     'manicurista de confianza.'),
]

LADO = 900
os.makedirs(WEB, exist_ok=True)

salida = []
for archivo, texto in MAPA:
    ruta = os.path.join(ORIG, archivo)
    if not os.path.exists(ruta):
        print('FALTA', ruta)
        continue

    slug = os.path.splitext(archivo)[0]

    im = ImageOps.exif_transpose(Image.open(ruta)).convert('RGB')
    w, h = im.size
    escala = min(1.0, LADO / max(w, h))
    if escala < 1.0:
        im = im.resize((round(w * escala), round(h * escala)), Image.LANCZOS)

    # Las capturas son texto: la nitidez importa más que el peso, así que
    # van con calidad alta y sin submuestreo de color.
    im.save(os.path.join(WEB, f'{slug}.jpg'), quality=88, subsampling=0, optimize=True)
    im.save(os.path.join(WEB, f'{slug}.webp'), quality=86, method=6)

    # LQIP: miniatura de 16 px en base64 para el efecto blur-up
    mini = im.copy()
    mini.thumbnail((16, 16))
    buf = io.BytesIO()
    mini.save(buf, format='JPEG', quality=40)
    lqip = 'data:image/jpeg;base64,' + base64.b64encode(buf.getvalue()).decode()

    salida.append({
        'src': f'/images/testimonios/{slug}',
        'ratio': round(im.width / im.height, 4),
        'texto': texto,
        'lqip': lqip,
    })

    kb = lambda p: os.path.getsize(os.path.join(WEB, p)) // 1024
    print(f'{slug:28s} {im.width}x{im.height}  jpg {kb(slug + ".jpg")}KB  webp {kb(slug + ".webp")}KB')

destino = os.path.join(SRC, 'src', 'data', 'testimonios.js')
with open(destino, 'w', encoding='utf-8') as f:
    f.write('// ─────────────────────────────────────────────────\n')
    f.write('//  ARCHIVO GENERADO — no editar a mano.\n')
    f.write('//  Lo produce scripts/procesar-testimonios.py a partir\n')
    f.write('//  de FOCUS/testimonios-originales/.\n')
    f.write('//\n')
    f.write('//  src    ruta sin extensión: existe .webp y .jpg\n')
    f.write('//  texto  transcripción del mensaje; es el alt de la imagen\n')
    f.write('//  ratio  ancho/alto, para reservar el espacio\n')
    f.write('//  lqip   miniatura de 16px en base64\n')
    f.write('// ─────────────────────────────────────────────────\n\n')
    f.write('export const testimonios = [\n')
    for t in salida:
        f.write('  {\n')
        f.write(f"    src: '{t['src']}',\n")
        f.write(f"    ratio: {t['ratio']},\n")
        f.write("    texto: " + json.dumps(t["texto"], ensure_ascii=False) + ",\n")
        f.write(f"    lqip: '{t['lqip']}',\n")
        f.write('  },\n')
    f.write(']\n')

print(f'\n{len(salida)} capturas -> {destino}')
