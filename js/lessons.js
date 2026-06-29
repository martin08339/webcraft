// ============================================================
// WebCraft — Lecciones de HTML y CSS
// Archivo: js/lessons.js
// Descripción: Array completo de 10 lecciones educativas
//              sobre desarrollo web en español.
// ============================================================

const lessons = [

  // ──────────────────────────────────────────────
  // LECCIÓN 1 — ¿Qué es HTML? Introducción
  // ──────────────────────────────────────────────
  {
    id: 1,
    title: "¿Qué es HTML? Introducción",
    course: "html-css",
    category: "html",
    level: "Principiante",
    xp: 100,
    description: "Aprende qué es HTML, su historia y la estructura básica de una página web.",
    icon: "📄",
    content: `
      <h2>🌐 ¿Qué es HTML?</h2>
      <p><strong>HTML</strong> son las siglas de <em>HyperText Markup Language</em> (Lenguaje de Marcado de Hipertexto). Es el lenguaje estándar que se utiliza para crear y estructurar el contenido de las páginas web.</p>
      <p>Piensa en HTML como el <strong>esqueleto</strong> de una página web. Así como los huesos le dan forma y estructura al cuerpo humano, HTML le da forma y estructura al contenido que ves en tu navegador.</p>

      <h2>📜 Breve historia</h2>
      <p>HTML fue creado por <strong>Tim Berners-Lee</strong> en 1991 mientras trabajaba en el CERN (el laboratorio europeo de física de partículas). Su objetivo era permitir que los científicos compartieran documentos de investigación de forma sencilla a través de internet. Desde entonces, HTML ha evolucionado enormemente: la versión actual es <strong>HTML5</strong>, que incluye soporte para multimedia, gráficos y mucho más.</p>

      <h2>🏷️ Etiquetas, elementos y atributos</h2>
      <p>HTML funciona mediante <strong>etiquetas</strong> (tags). Las etiquetas son palabras clave rodeadas por los signos <code>&lt;</code> y <code>&gt;</code>.</p>

      <h3>Etiquetas de apertura y cierre</h3>
      <p>La mayoría de las etiquetas vienen en pares: una <strong>etiqueta de apertura</strong> y una <strong>etiqueta de cierre</strong>. La etiqueta de cierre lleva una barra diagonal <code>/</code> antes del nombre.</p>
      <pre><code>&lt;p&gt;Este es un párrafo.&lt;/p&gt;</code></pre>

      <h3>Elementos</h3>
      <p>Un <strong>elemento</strong> es el conjunto completo: la etiqueta de apertura + el contenido + la etiqueta de cierre.</p>
      <pre><code>&lt;h1&gt;Hola Mundo&lt;/h1&gt;
┗━━┛              ┗━━━━┛
apertura          cierre
      ┗━━━━━━━━━━━━━┛
         contenido</code></pre>

      <h3>Atributos</h3>
      <p>Los <strong>atributos</strong> proporcionan información adicional sobre un elemento. Se escriben dentro de la etiqueta de apertura.</p>
      <pre><code>&lt;a href="https://www.google.com"&gt;Ir a Google&lt;/a&gt;
   ┗━━━━━━━━━━━━━━━━━━━━━━━━┛
         atributo href</code></pre>

      <h2>🏗️ Estructura básica de un documento HTML</h2>
      <p>Todo documento HTML sigue una estructura fundamental. Es como el plano de una casa: cada sección tiene su propósito.</p>
      <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="es"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Mi primera página&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;¡Hola Mundo!&lt;/h1&gt;
    &lt;p&gt;Esta es mi primera página web.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>

      <h3>Explicación de cada parte:</h3>
      <ul>
        <li><code>&lt;!DOCTYPE html&gt;</code> — Indica al navegador que este es un documento HTML5.</li>
        <li><code>&lt;html lang="es"&gt;</code> — El elemento raíz que contiene todo. El atributo <code>lang</code> define el idioma.</li>
        <li><code>&lt;head&gt;</code> — Contiene metadatos (información sobre la página que no se ve directamente): título, codificación, enlaces a estilos, etc.</li>
        <li><code>&lt;meta charset="UTF-8"&gt;</code> — Define la codificación de caracteres para soportar tildes y eñes.</li>
        <li><code>&lt;title&gt;</code> — El título que aparece en la pestaña del navegador.</li>
        <li><code>&lt;body&gt;</code> — Contiene todo el contenido visible de la página: textos, imágenes, enlaces, etc.</li>
      </ul>

      <h2>💡 Dato importante</h2>
      <p>HTML <strong>no</strong> es un lenguaje de programación; es un lenguaje de <strong>marcado</strong>. No tiene lógica como bucles o condicionales. Su único trabajo es <em>estructurar</em> el contenido.</p>
    `,
    initialCode: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Mi primera página</title>
</head>
<body>
    <h1>¡Hola Mundo!</h1>
    <p>Esta es mi primera página web.</p>
</body>
</html>`,
    challenge: "Modifica el código para crear una página que tenga un título personalizado en la pestaña del navegador, un encabezado <h1> con tu nombre y un párrafo <p> que diga en qué ciudad vives."
  },

  // ──────────────────────────────────────────────
  // LECCIÓN 2 — Etiquetas de texto
  // ──────────────────────────────────────────────
  {
    id: 2,
    title: "Etiquetas de texto: encabezados, párrafos y enlaces",
    course: "html-css",
    category: "html",
    level: "Principiante",
    xp: 120,
    description: "Domina los encabezados h1-h6, párrafos, enlaces y etiquetas de formato de texto.",
    icon: "✍️",
    content: `
      <h2>📝 Encabezados: h1 – h6</h2>
      <p>Los encabezados definen títulos y subtítulos en tu página. Van desde <code>&lt;h1&gt;</code> (el más importante y grande) hasta <code>&lt;h6&gt;</code> (el menos importante y más pequeño).</p>
      <p>Piensa en los encabezados como el <strong>índice de un libro</strong>: <code>&lt;h1&gt;</code> sería el título del libro, <code>&lt;h2&gt;</code> los capítulos, <code>&lt;h3&gt;</code> las secciones dentro de un capítulo, y así sucesivamente.</p>
      <pre><code>&lt;h1&gt;Título principal de la página&lt;/h1&gt;
&lt;h2&gt;Sección importante&lt;/h2&gt;
&lt;h3&gt;Subsección&lt;/h3&gt;
&lt;h4&gt;Detalle de la subsección&lt;/h4&gt;
&lt;h5&gt;Información complementaria&lt;/h5&gt;
&lt;h6&gt;Nota al pie&lt;/h6&gt;</code></pre>

      <h3>⚠️ Reglas para usar encabezados</h3>
      <ul>
        <li>Usa <strong>solo un <code>&lt;h1&gt;</code></strong> por página (es el título principal).</li>
        <li>No saltes niveles: después de <code>&lt;h2&gt;</code> debería venir <code>&lt;h3&gt;</code>, no <code>&lt;h5&gt;</code>.</li>
        <li>No uses encabezados solo para hacer texto grande; para eso existe CSS.</li>
      </ul>

      <h2>📄 Párrafos</h2>
      <p>La etiqueta <code>&lt;p&gt;</code> define un párrafo de texto. El navegador añade automáticamente un espacio antes y después de cada párrafo.</p>
      <pre><code>&lt;p&gt;Este es el primer párrafo. Contiene información introductoria.&lt;/p&gt;
&lt;p&gt;Este es el segundo párrafo. Trata sobre otro tema diferente.&lt;/p&gt;</code></pre>
      <p>Es importante separar las ideas en párrafos distintos para mejorar la legibilidad del contenido.</p>

      <h2>🔗 Enlaces (hipervínculos)</h2>
      <p>La etiqueta <code>&lt;a&gt;</code> (de <em>anchor</em>, que significa "ancla") se utiliza para crear enlaces que te llevan a otras páginas, secciones o sitios web.</p>

      <h3>Enlace externo</h3>
      <p>Apunta a otro sitio web:</p>
      <pre><code>&lt;a href="https://www.wikipedia.org"&gt;Visitar Wikipedia&lt;/a&gt;</code></pre>

      <h3>Enlace que abre en nueva pestaña</h3>
      <p>El atributo <code>target="_blank"</code> hace que el enlace se abra en una nueva pestaña del navegador:</p>
      <pre><code>&lt;a href="https://www.google.com" target="_blank"&gt;Abrir Google en nueva pestaña&lt;/a&gt;</code></pre>

      <h3>Enlace interno (misma página)</h3>
      <p>Puedes enlazar a una sección dentro de la misma página usando el atributo <code>id</code>:</p>
      <pre><code>&lt;!-- El enlace --&gt;
&lt;a href="#contacto"&gt;Ir a Contacto&lt;/a&gt;

&lt;!-- La sección destino --&gt;
&lt;h2 id="contacto"&gt;Contacto&lt;/h2&gt;
&lt;p&gt;Escríbenos a info@ejemplo.com&lt;/p&gt;</code></pre>

      <h2>🎨 Formato de texto</h2>
      <p>HTML ofrece etiquetas para dar formato visual y semántico al texto:</p>

      <h3>Negrita y énfasis</h3>
      <pre><code>&lt;strong&gt;Este texto es importante (negrita)&lt;/strong&gt;
&lt;em&gt;Este texto tiene énfasis (cursiva)&lt;/em&gt;</code></pre>
      <p><code>&lt;strong&gt;</code> indica que el texto es de gran importancia (se muestra en negrita). <code>&lt;em&gt;</code> indica énfasis (se muestra en cursiva). Ambos tienen un significado semántico, a diferencia de <code>&lt;b&gt;</code> y <code>&lt;i&gt;</code> que solo cambian la apariencia.</p>

      <h3>Salto de línea y línea horizontal</h3>
      <pre><code>&lt;p&gt;Primera línea&lt;br&gt;Segunda línea (mismo párrafo)&lt;/p&gt;

&lt;p&gt;Sección superior&lt;/p&gt;
&lt;hr&gt;
&lt;p&gt;Sección inferior&lt;/p&gt;</code></pre>
      <p><code>&lt;br&gt;</code> inserta un salto de línea dentro de un mismo bloque. <code>&lt;hr&gt;</code> dibuja una línea horizontal que separa secciones visualmente. Ambas son <strong>etiquetas vacías</strong> (no necesitan cierre).</p>

      <h2>📌 Ejemplo completo</h2>
      <pre><code>&lt;h1&gt;Mi blog de viajes&lt;/h1&gt;
&lt;p&gt;Bienvenidos a mi blog donde comparto mis &lt;strong&gt;aventuras&lt;/strong&gt; por el mundo.&lt;/p&gt;

&lt;h2&gt;Último viaje: Japón&lt;/h2&gt;
&lt;p&gt;Japón es un país &lt;em&gt;fascinante&lt;/em&gt; que mezcla tradición y tecnología.&lt;/p&gt;
&lt;p&gt;Puedes leer más en &lt;a href="https://www.japan.travel/es/" target="_blank"&gt;la web oficial de turismo&lt;/a&gt;.&lt;/p&gt;
&lt;hr&gt;
&lt;p&gt;&amp;copy; 2025 Mi Blog de Viajes&lt;/p&gt;</code></pre>
    `,
    initialCode: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Etiquetas de texto</title>
</head>
<body>
    <h1>Encabezado nivel 1</h1>
    <h2>Encabezado nivel 2</h2>
    <h3>Encabezado nivel 3</h3>

    <p>Este es un párrafo de ejemplo.</p>
    <p>Este es otro párrafo con <strong>texto en negrita</strong> y <em>texto en cursiva</em>.</p>

    <a href="https://www.google.com">Enlace a Google</a>
</body>
</html>`,
    challenge: "Crea una página que simule un artículo de blog. Debe tener: un título principal (h1), al menos dos subtítulos (h2), tres párrafos con texto que use <strong> y <em>, dos enlaces (uno externo que abra en nueva pestaña y uno interno a una sección), y una línea horizontal <hr> para separar secciones."
  },

  // ──────────────────────────────────────────────
  // LECCIÓN 3 — Imágenes, listas y estructura semántica
  // ──────────────────────────────────────────────
  {
    id: 3,
    title: "Imágenes, listas y estructura semántica",
    course: "html-css",
    category: "html",
    level: "Principiante",
    xp: 130,
    description: "Aprende a usar imágenes, listas ordenadas/desordenadas y etiquetas semánticas de HTML5.",
    icon: "🖼️",
    content: `
      <h2>🖼️ Imágenes</h2>
      <p>La etiqueta <code>&lt;img&gt;</code> permite insertar imágenes en tu página. Es una <strong>etiqueta vacía</strong> (no tiene cierre).</p>
      <pre><code>&lt;img src="foto.jpg" alt="Descripción de la foto" width="400" height="300"&gt;</code></pre>

      <h3>Atributos importantes</h3>
      <ul>
        <li><code>src</code> — La ruta o URL de la imagen (obligatorio).</li>
        <li><code>alt</code> — Texto alternativo que se muestra si la imagen no carga y que leen los lectores de pantalla (obligatorio para accesibilidad).</li>
        <li><code>width</code> y <code>height</code> — Ancho y alto en píxeles. Es recomendable definirlos para evitar saltos al cargar la página.</li>
      </ul>

      <h3>Ejemplo con imagen de internet</h3>
      <pre><code>&lt;img
  src="https://placekitten.com/400/300"
  alt="Un gatito adorable"
  width="400"
  height="300"
&gt;</code></pre>
      <p>💡 Siempre escribe un <code>alt</code> descriptivo. Es fundamental para la <strong>accesibilidad</strong> (personas con discapacidad visual) y para el <strong>SEO</strong> (posicionamiento en buscadores).</p>

      <h2>📋 Listas</h2>
      <p>HTML ofrece dos tipos principales de listas. Imagínalas como la lista de la compra (desordenada) y los pasos de una receta (ordenada).</p>

      <h3>Lista desordenada (viñetas)</h3>
      <p>Se usa <code>&lt;ul&gt;</code> (<em>unordered list</em>) y cada elemento va dentro de <code>&lt;li&gt;</code> (<em>list item</em>):</p>
      <pre><code>&lt;ul&gt;
    &lt;li&gt;Manzanas&lt;/li&gt;
    &lt;li&gt;Plátanos&lt;/li&gt;
    &lt;li&gt;Naranjas&lt;/li&gt;
&lt;/ul&gt;</code></pre>

      <h3>Lista ordenada (numerada)</h3>
      <p>Se usa <code>&lt;ol&gt;</code> (<em>ordered list</em>) cuando el orden importa:</p>
      <pre><code>&lt;ol&gt;
    &lt;li&gt;Precalentar el horno a 180°C&lt;/li&gt;
    &lt;li&gt;Mezclar los ingredientes secos&lt;/li&gt;
    &lt;li&gt;Añadir los húmedos y batir&lt;/li&gt;
    &lt;li&gt;Hornear durante 25 minutos&lt;/li&gt;
&lt;/ol&gt;</code></pre>

      <h3>Listas anidadas</h3>
      <p>Puedes poner listas dentro de listas para crear sub-elementos:</p>
      <pre><code>&lt;ul&gt;
    &lt;li&gt;Frutas
        &lt;ul&gt;
            &lt;li&gt;Manzana&lt;/li&gt;
            &lt;li&gt;Pera&lt;/li&gt;
        &lt;/ul&gt;
    &lt;/li&gt;
    &lt;li&gt;Verduras
        &lt;ul&gt;
            &lt;li&gt;Zanahoria&lt;/li&gt;
            &lt;li&gt;Brócoli&lt;/li&gt;
        &lt;/ul&gt;
    &lt;/li&gt;
&lt;/ul&gt;</code></pre>

      <h2>🏛️ Etiquetas semánticas de HTML5</h2>
      <p>Las etiquetas semánticas describen el <strong>significado</strong> del contenido, no solo su apariencia. Usar estas etiquetas es como poner carteles en las habitaciones de una casa: "cocina", "dormitorio", "baño"… El navegador y los buscadores entienden mejor la estructura de tu página.</p>

      <pre><code>&lt;header&gt;    → Encabezado de la página o sección (logo, navegación)
&lt;nav&gt;       → Menú de navegación
&lt;main&gt;      → Contenido principal (solo uno por página)
&lt;section&gt;   → Sección temática del contenido
&lt;article&gt;   → Contenido independiente (artículo, post, noticia)
&lt;aside&gt;     → Contenido complementario (barra lateral)
&lt;footer&gt;    → Pie de página</code></pre>

      <h3>Ejemplo de estructura semántica</h3>
      <pre><code>&lt;header&gt;
    &lt;h1&gt;Mi sitio web&lt;/h1&gt;
    &lt;nav&gt;
        &lt;a href="#inicio"&gt;Inicio&lt;/a&gt;
        &lt;a href="#sobre-mi"&gt;Sobre mí&lt;/a&gt;
        &lt;a href="#contacto"&gt;Contacto&lt;/a&gt;
    &lt;/nav&gt;
&lt;/header&gt;

&lt;main&gt;
    &lt;section id="inicio"&gt;
        &lt;h2&gt;Bienvenidos&lt;/h2&gt;
        &lt;p&gt;Esta es la página principal.&lt;/p&gt;
    &lt;/section&gt;

    &lt;article&gt;
        &lt;h2&gt;Mi primer artículo&lt;/h2&gt;
        &lt;p&gt;Contenido del artículo...&lt;/p&gt;
    &lt;/article&gt;
&lt;/main&gt;

&lt;footer&gt;
    &lt;p&gt;&amp;copy; 2025 Mi sitio web&lt;/p&gt;
&lt;/footer&gt;</code></pre>
      <p>💡 Aunque <code>&lt;div&gt;</code> sigue siendo útil, <strong>prefiere las etiquetas semánticas</strong> siempre que sea posible. Tu código será más legible y accesible.</p>
    `,
    initialCode: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Imágenes y listas</title>
</head>
<body>
    <h1>Mi página con imágenes y listas</h1>

    <img src="https://placekitten.com/300/200" alt="Un gatito bonito" width="300" height="200">

    <h2>Lista de mis hobbies</h2>
    <ul>
        <li>Programar</li>
        <li>Leer</li>
        <li>Cocinar</li>
    </ul>

    <h2>Pasos para aprender HTML</h2>
    <ol>
        <li>Leer la teoría</li>
        <li>Practicar con ejemplos</li>
        <li>Crear proyectos propios</li>
    </ol>
</body>
</html>`,
    challenge: "Crea una página web usando etiquetas semánticas (header, nav, main, section, footer). Dentro del main, incluye una imagen con su texto alternativo, una lista desordenada con al menos 4 elementos, y una lista ordenada con 3 pasos. El header debe tener un título y un nav con al menos 3 enlaces."
  },

  // ──────────────────────────────────────────────
  // LECCIÓN 4 — Formularios e inputs
  // ──────────────────────────────────────────────
  {
    id: 4,
    title: "Formularios e inputs",
    course: "html-css",
    category: "html",
    level: "Intermedio",
    xp: 150,
    description: "Aprende a crear formularios interactivos con distintos tipos de campos de entrada.",
    icon: "📝",
    content: `
      <h2>📋 ¿Qué es un formulario?</h2>
      <p>Los formularios son la manera en que los usuarios <strong>envían información</strong> a un sitio web. Cada vez que inicias sesión, te registras, compras algo en línea o envías un comentario, estás usando un formulario.</p>
      <p>La etiqueta <code>&lt;form&gt;</code> envuelve todos los campos de entrada:</p>
      <pre><code>&lt;form action="/enviar" method="POST"&gt;
    &lt;!-- Aquí van los campos del formulario --&gt;
&lt;/form&gt;</code></pre>
      <ul>
        <li><code>action</code> — La URL a la que se envían los datos.</li>
        <li><code>method</code> — El método HTTP: <code>GET</code> (datos en la URL) o <code>POST</code> (datos ocultos en el cuerpo de la petición).</li>
      </ul>

      <h2>🔤 La etiqueta &lt;input&gt;</h2>
      <p><code>&lt;input&gt;</code> es la etiqueta más versátil de los formularios. Su atributo <code>type</code> determina qué tipo de campo se muestra:</p>

      <pre><code>&lt;!-- Campo de texto --&gt;
&lt;input type="text" name="nombre" placeholder="Tu nombre"&gt;

&lt;!-- Campo de correo electrónico (valida formato) --&gt;
&lt;input type="email" name="correo" placeholder="tu@email.com"&gt;

&lt;!-- Campo de contraseña (oculta caracteres) --&gt;
&lt;input type="password" name="clave" placeholder="Contraseña"&gt;

&lt;!-- Campo numérico --&gt;
&lt;input type="number" name="edad" min="1" max="120"&gt;

&lt;!-- Casilla de verificación --&gt;
&lt;input type="checkbox" name="terminos" id="terminos"&gt;
&lt;label for="terminos"&gt;Acepto los términos&lt;/label&gt;

&lt;!-- Botones de opción (radio) --&gt;
&lt;input type="radio" name="genero" value="masculino" id="masc"&gt;
&lt;label for="masc"&gt;Masculino&lt;/label&gt;
&lt;input type="radio" name="genero" value="femenino" id="fem"&gt;
&lt;label for="fem"&gt;Femenino&lt;/label&gt;</code></pre>

      <h2>🏷️ La etiqueta &lt;label&gt;</h2>
      <p>La etiqueta <code>&lt;label&gt;</code> asocia un texto descriptivo a un campo de formulario. Es esencial para la <strong>accesibilidad</strong>: cuando un usuario hace clic en el label, se activa el campo asociado.</p>
      <pre><code>&lt;label for="email"&gt;Correo electrónico:&lt;/label&gt;
&lt;input type="email" id="email" name="email"&gt;</code></pre>
      <p>El atributo <code>for</code> del label debe coincidir con el <code>id</code> del input.</p>

      <h2>📝 Textarea y Select</h2>

      <h3>Área de texto grande</h3>
      <p><code>&lt;textarea&gt;</code> permite al usuario escribir texto largo (comentarios, mensajes, etc.):</p>
      <pre><code>&lt;label for="mensaje"&gt;Tu mensaje:&lt;/label&gt;
&lt;textarea id="mensaje" name="mensaje" rows="5" cols="40" placeholder="Escribe tu mensaje aquí..."&gt;&lt;/textarea&gt;</code></pre>

      <h3>Menú desplegable</h3>
      <p><code>&lt;select&gt;</code> crea una lista desplegable con opciones:</p>
      <pre><code>&lt;label for="pais"&gt;País:&lt;/label&gt;
&lt;select id="pais" name="pais"&gt;
    &lt;option value=""&gt;Selecciona un país&lt;/option&gt;
    &lt;option value="mx"&gt;México&lt;/option&gt;
    &lt;option value="es"&gt;España&lt;/option&gt;
    &lt;option value="ar"&gt;Argentina&lt;/option&gt;
    &lt;option value="co"&gt;Colombia&lt;/option&gt;
&lt;/select&gt;</code></pre>

      <h2>🔘 Botones</h2>
      <p>La etiqueta <code>&lt;button&gt;</code> crea un botón. El atributo <code>type</code> indica su función:</p>
      <pre><code>&lt;!-- Envía el formulario --&gt;
&lt;button type="submit"&gt;Enviar&lt;/button&gt;

&lt;!-- Reinicia todos los campos --&gt;
&lt;button type="reset"&gt;Limpiar&lt;/button&gt;

&lt;!-- Botón genérico (para JavaScript) --&gt;
&lt;button type="button"&gt;Hacer algo&lt;/button&gt;</code></pre>

      <h2>✅ Atributos de validación</h2>
      <p>HTML5 tiene validaciones integradas que funcionan sin JavaScript:</p>
      <pre><code>&lt;!-- Campo obligatorio --&gt;
&lt;input type="text" name="nombre" required&gt;

&lt;!-- Texto de ayuda (placeholder) --&gt;
&lt;input type="email" placeholder="ejemplo@correo.com"&gt;

&lt;!-- Longitud mínima y máxima --&gt;
&lt;input type="password" minlength="8" maxlength="20"&gt;

&lt;!-- Patrón personalizado (regex) --&gt;
&lt;input type="text" pattern="[A-Za-z]{3,}" title="Solo letras, mínimo 3"&gt;</code></pre>

      <h2>📌 Ejemplo completo: Formulario de contacto</h2>
      <pre><code>&lt;form action="/contacto" method="POST"&gt;
    &lt;label for="nombre"&gt;Nombre:&lt;/label&gt;
    &lt;input type="text" id="nombre" name="nombre" required placeholder="Tu nombre completo"&gt;

    &lt;label for="email"&gt;Email:&lt;/label&gt;
    &lt;input type="email" id="email" name="email" required placeholder="tu@correo.com"&gt;

    &lt;label for="asunto"&gt;Asunto:&lt;/label&gt;
    &lt;select id="asunto" name="asunto"&gt;
        &lt;option value="consulta"&gt;Consulta general&lt;/option&gt;
        &lt;option value="soporte"&gt;Soporte técnico&lt;/option&gt;
        &lt;option value="sugerencia"&gt;Sugerencia&lt;/option&gt;
    &lt;/select&gt;

    &lt;label for="mensaje"&gt;Mensaje:&lt;/label&gt;
    &lt;textarea id="mensaje" name="mensaje" rows="5" required&gt;&lt;/textarea&gt;

    &lt;input type="checkbox" id="terminos" name="terminos" required&gt;
    &lt;label for="terminos"&gt;Acepto los términos y condiciones&lt;/label&gt;

    &lt;button type="submit"&gt;Enviar mensaje&lt;/button&gt;
&lt;/form&gt;</code></pre>
    `,
    initialCode: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Formularios</title>
</head>
<body>
    <h1>Formulario de contacto</h1>
    <form>
        <label for="nombre">Nombre:</label><br>
        <input type="text" id="nombre" name="nombre" placeholder="Tu nombre" required><br><br>

        <label for="correo">Correo:</label><br>
        <input type="email" id="correo" name="correo" placeholder="tu@email.com" required><br><br>

        <label for="mensaje">Mensaje:</label><br>
        <textarea id="mensaje" name="mensaje" rows="4" cols="40" placeholder="Escribe aquí..."></textarea><br><br>

        <button type="submit">Enviar</button>
    </form>
</body>
</html>`,
    challenge: "Crea un formulario de registro que incluya: campos de nombre completo, correo electrónico, contraseña (mínimo 8 caracteres), fecha de nacimiento, un menú desplegable para seleccionar país, botones de radio para seleccionar género, una casilla de verificación para aceptar términos, y un botón de enviar. Todos los campos deben tener sus labels asociados."
  },

  // ──────────────────────────────────────────────
  // LECCIÓN 5 — Tablas y multimedia
  // ──────────────────────────────────────────────
  {
    id: 5,
    title: "Tablas y multimedia",
    course: "html-css",
    category: "html",
    level: "Intermedio",
    xp: 140,
    description: "Crea tablas de datos y aprende a insertar video, audio e iframes.",
    icon: "📊",
    content: `
      <h2>📊 Tablas en HTML</h2>
      <p>Las tablas sirven para mostrar <strong>datos estructurados</strong> en filas y columnas: horarios, comparativas, estadísticas, etc. Piensa en ellas como una hoja de cálculo de Excel.</p>

      <h3>Estructura básica</h3>
      <pre><code>&lt;table&gt;
    &lt;thead&gt;
        &lt;tr&gt;
            &lt;th&gt;Nombre&lt;/th&gt;
            &lt;th&gt;Edad&lt;/th&gt;
            &lt;th&gt;Ciudad&lt;/th&gt;
        &lt;/tr&gt;
    &lt;/thead&gt;
    &lt;tbody&gt;
        &lt;tr&gt;
            &lt;td&gt;Ana&lt;/td&gt;
            &lt;td&gt;28&lt;/td&gt;
            &lt;td&gt;Madrid&lt;/td&gt;
        &lt;/tr&gt;
        &lt;tr&gt;
            &lt;td&gt;Carlos&lt;/td&gt;
            &lt;td&gt;34&lt;/td&gt;
            &lt;td&gt;México DF&lt;/td&gt;
        &lt;/tr&gt;
    &lt;/tbody&gt;
&lt;/table&gt;</code></pre>

      <h3>Etiquetas de tabla explicadas</h3>
      <ul>
        <li><code>&lt;table&gt;</code> — Contenedor principal de la tabla.</li>
        <li><code>&lt;thead&gt;</code> — Sección del encabezado (títulos de columna).</li>
        <li><code>&lt;tbody&gt;</code> — Sección del cuerpo (datos).</li>
        <li><code>&lt;tr&gt;</code> — Define una fila (<em>table row</em>).</li>
        <li><code>&lt;th&gt;</code> — Celda de encabezado (<em>table header</em>), texto en negrita y centrado.</li>
        <li><code>&lt;td&gt;</code> — Celda de datos (<em>table data</em>).</li>
      </ul>

      <h3>Combinar celdas: colspan y rowspan</h3>
      <p><code>colspan</code> hace que una celda ocupe varias <strong>columnas</strong>. <code>rowspan</code> hace que ocupe varias <strong>filas</strong>.</p>
      <pre><code>&lt;table border="1"&gt;
    &lt;tr&gt;
        &lt;th colspan="3"&gt;Horario semanal&lt;/th&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
        &lt;th&gt;Hora&lt;/th&gt;
        &lt;th&gt;Lunes&lt;/th&gt;
        &lt;th&gt;Martes&lt;/th&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
        &lt;td rowspan="2"&gt;09:00 - 11:00&lt;/td&gt;
        &lt;td&gt;Matemáticas&lt;/td&gt;
        &lt;td&gt;Historia&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
        &lt;td&gt;Física&lt;/td&gt;
        &lt;td&gt;Inglés&lt;/td&gt;
    &lt;/tr&gt;
&lt;/table&gt;</code></pre>

      <h2>🎬 Multimedia: Video</h2>
      <p>La etiqueta <code>&lt;video&gt;</code> permite insertar videos directamente en tu página:</p>
      <pre><code>&lt;video width="640" height="360" controls&gt;
    &lt;source src="mi-video.mp4" type="video/mp4"&gt;
    Tu navegador no soporta la etiqueta de video.
&lt;/video&gt;</code></pre>
      <h3>Atributos útiles</h3>
      <ul>
        <li><code>controls</code> — Muestra los controles de reproducción (play, pausa, volumen).</li>
        <li><code>autoplay</code> — Reproduce automáticamente al cargar (usa con cuidado).</li>
        <li><code>loop</code> — Reproduce en bucle infinito.</li>
        <li><code>muted</code> — Inicia sin sonido (necesario para autoplay en la mayoría de navegadores).</li>
        <li><code>poster="imagen.jpg"</code> — Imagen de vista previa antes de reproducir.</li>
      </ul>

      <h2>🎵 Audio</h2>
      <p>Similar al video, la etiqueta <code>&lt;audio&gt;</code> inserta clips de sonido:</p>
      <pre><code>&lt;audio controls&gt;
    &lt;source src="cancion.mp3" type="audio/mpeg"&gt;
    &lt;source src="cancion.ogg" type="audio/ogg"&gt;
    Tu navegador no soporta audio HTML5.
&lt;/audio&gt;</code></pre>
      <p>💡 Es buena práctica incluir múltiples formatos con <code>&lt;source&gt;</code> para garantizar compatibilidad entre navegadores.</p>

      <h2>🪟 Iframes: Embebiendo contenido externo</h2>
      <p>La etiqueta <code>&lt;iframe&gt;</code> permite <strong>insertar otra página web</strong> dentro de la tuya. Es muy usada para incrustar videos de YouTube, mapas de Google, etc.</p>
      <pre><code>&lt;!-- Insertar un video de YouTube --&gt;
&lt;iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
    title="Video de YouTube"
    frameborder="0"
    allowfullscreen
&gt;&lt;/iframe&gt;

&lt;!-- Insertar un mapa de Google --&gt;
&lt;iframe
    src="https://www.google.com/maps/embed?pb=..."
    width="600"
    height="450"
    style="border:0;"
    loading="lazy"
&gt;&lt;/iframe&gt;</code></pre>
      <p>⚠️ No todos los sitios web permiten ser embebidos en iframes por razones de seguridad.</p>
    `,
    initialCode: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Tablas y multimedia</title>
</head>
<body>
    <h1>Calificaciones del curso</h1>

    <table border="1">
        <thead>
            <tr>
                <th>Estudiante</th>
                <th>Matemáticas</th>
                <th>Ciencias</th>
                <th>Historia</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>María García</td>
                <td>95</td>
                <td>88</td>
                <td>92</td>
            </tr>
            <tr>
                <td>Juan López</td>
                <td>78</td>
                <td>91</td>
                <td>85</td>
            </tr>
            <tr>
                <td>Ana Martínez</td>
                <td>100</td>
                <td>95</td>
                <td>98</td>
            </tr>
        </tbody>
    </table>
</body>
</html>`,
    challenge: "Crea una tabla de horario escolar semanal con 5 días (Lunes a Viernes) y al menos 4 franjas horarias. Usa <thead> y <tbody>. Aplica colspan para un título que abarque todas las columnas y rowspan en al menos una celda (por ejemplo, una clase que dure dos horas). Debajo de la tabla, añade un elemento <video> o <audio> con atributo controls."
  },

  // ──────────────────────────────────────────────
  // LECCIÓN 6 — ¿Qué es CSS? Introducción
  // ──────────────────────────────────────────────
  {
    id: 6,
    title: "¿Qué es CSS? Introducción",
    course: "html-css",
    category: "css",
    level: "Principiante",
    xp: 100,
    description: "Descubre CSS, las 3 formas de añadirlo, y empieza a dar color y estilo a tus páginas.",
    icon: "🎨",
    content: `
      <h2>🎨 ¿Qué es CSS?</h2>
      <p><strong>CSS</strong> son las siglas de <em>Cascading Style Sheets</em> (Hojas de Estilo en Cascada). Es el lenguaje que se usa para <strong>dar estilo</strong> y <strong>diseñar</strong> la apariencia de las páginas web.</p>
      <p>Si HTML es el esqueleto de una página, <strong>CSS es la ropa, el maquillaje y la decoración</strong>. Con CSS puedes cambiar colores, fuentes, tamaños, espaciados, crear animaciones y mucho más.</p>

      <h2>📎 3 formas de añadir CSS</h2>

      <h3>1. CSS en línea (inline)</h3>
      <p>Se aplica directamente en la etiqueta con el atributo <code>style</code>:</p>
      <pre><code>&lt;p style="color: blue; font-size: 18px;"&gt;Texto azul y grande&lt;/p&gt;</code></pre>
      <p>⚠️ <strong>No recomendado</strong> para proyectos grandes. Difícil de mantener y no es reutilizable.</p>

      <h3>2. CSS interno (en el &lt;head&gt;)</h3>
      <p>Se escribe dentro de una etiqueta <code>&lt;style&gt;</code> en el <code>&lt;head&gt;</code>:</p>
      <pre><code>&lt;head&gt;
    &lt;style&gt;
        p {
            color: green;
            font-size: 16px;
        }
        h1 {
            color: darkblue;
        }
    &lt;/style&gt;
&lt;/head&gt;</code></pre>
      <p>✅ Útil para páginas individuales o prototipos rápidos.</p>

      <h3>3. CSS externo (archivo .css separado)</h3>
      <p>Se enlaza un archivo <code>.css</code> externo desde el <code>&lt;head&gt;</code>:</p>
      <pre><code>&lt;head&gt;
    &lt;link rel="stylesheet" href="estilos.css"&gt;
&lt;/head&gt;</code></pre>
      <p>✅ <strong>La forma recomendada</strong>. Separa el contenido (HTML) del diseño (CSS). Reutilizable en múltiples páginas.</p>

      <h2>✏️ Sintaxis básica de CSS</h2>
      <p>Una regla CSS se compone de un <strong>selector</strong> y un <strong>bloque de declaraciones</strong>:</p>
      <pre><code>selector {
    propiedad: valor;
    otra-propiedad: otro-valor;
}

/* Ejemplo real */
h1 {
    color: #2c3e50;
    font-size: 32px;
    text-align: center;
}</code></pre>
      <ul>
        <li><strong>Selector</strong> — Indica a qué elemento(s) se aplica el estilo.</li>
        <li><strong>Propiedad</strong> — Qué aspecto quieres cambiar (color, tamaño, etc.).</li>
        <li><strong>Valor</strong> — El nuevo valor de esa propiedad.</li>
      </ul>

      <h2>🌈 Colores en CSS</h2>
      <p>Hay varias formas de definir colores:</p>
      <pre><code>/* Por nombre */
color: red;
color: tomato;
color: cornflowerblue;

/* Hexadecimal (#RRGGBB) */
color: #ff5733;
color: #2c3e50;
color: #e74c3c;

/* RGB (rojo, verde, azul: 0-255) */
color: rgb(46, 204, 113);

/* RGBA (con transparencia: 0 a 1) */
color: rgba(0, 0, 0, 0.5);    /* Negro al 50% */
background-color: rgba(255, 255, 255, 0.8);  /* Blanco al 80% */</code></pre>

      <h2>🔤 Propiedades de fuente</h2>
      <pre><code>p {
    /* Familia tipográfica (usa alternativas por si no está disponible) */
    font-family: 'Arial', 'Helvetica', sans-serif;

    /* Tamaño de fuente */
    font-size: 16px;     /* píxeles */
    font-size: 1.2em;    /* relativo al padre */
    font-size: 1.2rem;   /* relativo al root */

    /* Grosor de fuente */
    font-weight: normal;   /* 400 */
    font-weight: bold;     /* 700 */
    font-weight: 300;      /* ligero */

    /* Color del texto */
    color: #333333;

    /* Altura de línea (interlineado) */
    line-height: 1.6;

    /* Alineación del texto */
    text-align: center;    /* center, left, right, justify */

    /* Decoración */
    text-decoration: underline;  /* none, underline, line-through */

    /* Transformación */
    text-transform: uppercase;   /* uppercase, lowercase, capitalize */
}</code></pre>

      <h2>📌 Ejemplo completo</h2>
      <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="es"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Mi primera página con CSS&lt;/title&gt;
    &lt;style&gt;
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            background-color: #f0f0f0;
            color: #333;
            line-height: 1.6;
        }
        h1 {
            color: #2c3e50;
            text-align: center;
            text-transform: uppercase;
        }
        p {
            font-size: 18px;
            color: #555;
        }
        .destacado {
            color: #e74c3c;
            font-weight: bold;
            font-size: 20px;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Bienvenidos a CSS&lt;/h1&gt;
    &lt;p&gt;Este párrafo tiene estilos aplicados.&lt;/p&gt;
    &lt;p class="destacado"&gt;Este texto está destacado.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
    `,
    initialCode: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Introducción a CSS</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
        }
        h1 {
            color: #2c3e50;
            text-align: center;
        }
        p {
            color: #666;
            font-size: 18px;
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <h1>Mi primera página con CSS</h1>
    <p>Este párrafo tiene estilos aplicados con CSS interno.</p>
    <p>Puedes cambiar los colores, fuentes y tamaños.</p>
</body>
</html>`,
    challenge: "Crea una página con CSS interno que tenga: un fondo de color personalizado, un h1 con color hexadecimal y centrado, dos párrafos con distinto tamaño de fuente y color (uno usando rgb y otro usando hexadecimal), y un tercer párrafo con texto en negrita, cursiva y subrayado."
  },

  // ──────────────────────────────────────────────
  // LECCIÓN 7 — Selectores y propiedades básicas
  // ──────────────────────────────────────────────
  {
    id: 7,
    title: "Selectores y propiedades básicas",
    course: "html-css",
    category: "css",
    level: "Intermedio",
    xp: 130,
    description: "Domina los selectores CSS: elemento, clase, ID, descendiente y pseudo-clases.",
    icon: "🎯",
    content: `
      <h2>🎯 ¿Qué son los selectores?</h2>
      <p>Los selectores son la forma en que le dices a CSS <strong>a qué elementos</strong> quieres aplicar estilos. Es como apuntar con el dedo y decir: "quiero que <em>este</em> elemento se vea así".</p>

      <h2>📌 Selector de elemento</h2>
      <p>Selecciona <strong>todos</strong> los elementos de ese tipo en la página:</p>
      <pre><code>/* Todos los párrafos */
p {
    color: #333;
    font-size: 16px;
}

/* Todos los h2 */
h2 {
    color: navy;
    border-bottom: 2px solid navy;
}</code></pre>

      <h2>📌 Selector de clase (.)</h2>
      <p>Las clases son <strong>reutilizables</strong>. Puedes aplicar la misma clase a múltiples elementos. Se definen con un punto <code>.</code> en CSS y con el atributo <code>class</code> en HTML:</p>
      <pre><code>/* CSS */
.tarjeta {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.texto-rojo {
    color: #e74c3c;
}

/* HTML */
&lt;div class="tarjeta"&gt;Soy una tarjeta&lt;/div&gt;
&lt;div class="tarjeta texto-rojo"&gt;Tarjeta con texto rojo&lt;/div&gt;
&lt;p class="texto-rojo"&gt;Párrafo rojo&lt;/p&gt;</code></pre>
      <p>💡 Un elemento puede tener <strong>varias clases</strong> separadas por espacios.</p>

      <h2>📌 Selector de ID (#)</h2>
      <p>Los ID son <strong>únicos</strong> — cada ID solo debe aparecer una vez en toda la página. Se definen con <code>#</code> en CSS y con el atributo <code>id</code> en HTML:</p>
      <pre><code>/* CSS */
#encabezado-principal {
    background-color: #2c3e50;
    color: white;
    padding: 30px;
    text-align: center;
}

/* HTML */
&lt;header id="encabezado-principal"&gt;
    &lt;h1&gt;Mi sitio web&lt;/h1&gt;
&lt;/header&gt;</code></pre>
      <p>⚠️ <strong>Prefiere clases sobre IDs</strong> en la mayoría de los casos. Los IDs tienen mayor especificidad y pueden causar problemas al mantener el código.</p>

      <h2>📌 Selector descendiente (espacio)</h2>
      <p>Selecciona elementos que están <strong>dentro</strong> de otro elemento (a cualquier nivel de anidación):</p>
      <pre><code>/* Todos los &lt;a&gt; que estén dentro de un &lt;nav&gt; */
nav a {
    color: white;
    text-decoration: none;
    margin-right: 15px;
}

/* Todos los &lt;li&gt; dentro de un .menu */
.menu li {
    display: inline-block;
}</code></pre>

      <h2>📌 Selector hijo directo (&gt;)</h2>
      <p>Selecciona solo los hijos <strong>directos</strong> (primer nivel), no los nietos:</p>
      <pre><code>/* Solo los &lt;li&gt; directos del &lt;ul&gt;, no los anidados */
ul &gt; li {
    font-weight: bold;
    color: #2c3e50;
}</code></pre>

      <h2>📌 Pseudo-clases</h2>
      <p>Las pseudo-clases aplican estilos en <strong>estados específicos</strong> de un elemento. Se escriben con dos puntos <code>:</code>.</p>

      <h3>:hover — Cuando pasas el ratón por encima</h3>
      <pre><code>a:hover {
    color: #e74c3c;
    text-decoration: underline;
}

.boton:hover {
    background-color: #3498db;
    transform: scale(1.05);
    cursor: pointer;
}</code></pre>

      <h3>:active — Cuando se está haciendo clic</h3>
      <pre><code>.boton:active {
    transform: scale(0.95);
    background-color: #2980b9;
}</code></pre>

      <h3>:first-child y :nth-child</h3>
      <pre><code>/* Primer elemento hijo */
li:first-child {
    font-weight: bold;
    color: #e74c3c;
}

/* Cada segundo elemento (pares) */
tr:nth-child(even) {
    background-color: #f2f2f2;
}

/* Cada tercer elemento */
li:nth-child(3n) {
    color: #2ecc71;
}</code></pre>

      <h2>🖼️ Propiedades de fondo</h2>
      <pre><code>.seccion {
    /* Color de fondo */
    background-color: #ecf0f1;

    /* Imagen de fondo */
    background-image: url('fondo.jpg');
    background-size: cover;       /* Cubre todo el contenedor */
    background-position: center;  /* Centra la imagen */
    background-repeat: no-repeat; /* No se repite */
}

.degradado {
    background: linear-gradient(135deg, #667eea, #764ba2);
}</code></pre>

      <h2>📐 Dimensiones</h2>
      <pre><code>.contenedor {
    width: 80%;          /* 80% del elemento padre */
    max-width: 1200px;   /* Máximo 1200px */
    height: 400px;       /* Altura fija */
    min-height: 100vh;   /* Mínimo toda la pantalla */
}</code></pre>
    `,
    initialCode: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Selectores CSS</title>
    <style>
        body {
            font-family: 'Segoe UI', sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
        }

        /* Selector de elemento */
        h1 { color: #2c3e50; }

        /* Selector de clase */
        .destacado {
            background-color: #fff3cd;
            padding: 10px;
            border-left: 4px solid #ffc107;
        }

        /* Selector de ID */
        #intro { font-size: 20px; color: #555; }

        /* Selector descendiente */
        nav a {
            color: #3498db;
            text-decoration: none;
            margin-right: 15px;
        }

        /* Pseudo-clase hover */
        nav a:hover {
            color: #e74c3c;
            text-decoration: underline;
        }

        /* nth-child */
        li:nth-child(odd) {
            background-color: #eee;
        }
    </style>
</head>
<body>
    <h1>Selectores CSS en acción</h1>

    <nav>
        <a href="#">Inicio</a>
        <a href="#">Blog</a>
        <a href="#">Contacto</a>
    </nav>

    <p id="intro">Este párrafo usa un selector de ID.</p>
    <p class="destacado">Este párrafo usa una clase.</p>

    <ul>
        <li>Elemento 1</li>
        <li>Elemento 2</li>
        <li>Elemento 3</li>
        <li>Elemento 4</li>
    </ul>
</body>
</html>`,
    challenge: "Crea una página que demuestre al menos 5 tipos de selectores diferentes: selector de elemento, clase, ID, descendiente y pseudo-clases (:hover y :nth-child). Incluye una barra de navegación con enlaces que cambien de color al pasar el ratón, una lista donde los elementos alternos tengan distinto fondo, y al menos dos elementos con clases diferentes."
  },

  // ──────────────────────────────────────────────
  // LECCIÓN 8 — Box Model
  // ──────────────────────────────────────────────
  {
    id: 8,
    title: "Box Model: margin, padding y border",
    course: "html-css",
    category: "css",
    level: "Intermedio",
    xp: 150,
    description: "Comprende el modelo de caja CSS: contenido, padding, border y margin.",
    icon: "📦",
    content: `
      <h2>📦 El modelo de caja (Box Model)</h2>
      <p>En CSS, <strong>cada elemento es una caja rectangular</strong>. El modelo de caja define cómo se calcula el tamaño total de esa caja. Tiene cuatro capas, de adentro hacia afuera:</p>

      <pre><code>┌──────────────── margin ─────────────────┐
│ ┌──────────── border ─────────────────┐ │
│ │ ┌────────── padding ──────────────┐ │ │
│ │ │ ┌──────── content ────────────┐ │ │ │
│ │ │ │                             │ │ │ │
│ │ │ │   Aquí va tu contenido      │ │ │ │
│ │ │ │   (texto, imágenes, etc.)   │ │ │ │
│ │ │ │                             │ │ │ │
│ │ │ └─────────────────────────────┘ │ │ │
│ │ └─────────────────────────────────┘ │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘</code></pre>

      <ul>
        <li><strong>Content</strong> — El contenido real (texto, imagen).</li>
        <li><strong>Padding</strong> — Espacio interior entre el contenido y el borde. Es como el relleno de una almohada.</li>
        <li><strong>Border</strong> — El borde visible alrededor del elemento.</li>
        <li><strong>Margin</strong> — Espacio exterior entre el elemento y los elementos vecinos. Es como la distancia entre muebles en una habitación.</li>
      </ul>

      <h2>📏 Padding (relleno interno)</h2>
      <p>El padding crea espacio <strong>dentro</strong> del borde, alrededor del contenido:</p>
      <pre><code>/* Las 4 propiedades individuales */
.caja {
    padding-top: 10px;
    padding-right: 20px;
    padding-bottom: 10px;
    padding-left: 20px;
}

/* Atajo (shorthand) — 4 valores: arriba, derecha, abajo, izquierda (sentido del reloj) */
.caja {
    padding: 10px 20px 10px 20px;
}

/* 2 valores: vertical | horizontal */
.caja {
    padding: 10px 20px;
}

/* 1 valor: todos los lados iguales */
.caja {
    padding: 15px;
}</code></pre>

      <h2>📏 Margin (margen externo)</h2>
      <p>El margin crea espacio <strong>fuera</strong> del borde, separando el elemento de sus vecinos:</p>
      <pre><code>/* Misma sintaxis de atajos que padding */
.caja {
    margin: 20px;              /* Todos los lados */
    margin: 10px 20px;         /* Vertical | Horizontal */
    margin: 10px 20px 30px 40px;  /* Arriba Derecha Abajo Izquierda */
}

/* Centrar un elemento de bloque horizontalmente */
.contenedor {
    width: 80%;
    margin: 0 auto;   /* 0 arriba/abajo, auto a los lados = centrado */
}

/* Margen negativo (acerca elementos) */
.superpuesto {
    margin-top: -20px;
}</code></pre>

      <h2>🖼️ Border (borde)</h2>
      <p>El border dibuja una línea alrededor del elemento:</p>
      <pre><code>/* Atajo: grosor estilo color */
.caja {
    border: 2px solid #333;
}

/* Propiedades individuales */
.caja {
    border-width: 2px;
    border-style: solid;      /* solid, dashed, dotted, double, none */
    border-color: #e74c3c;
}

/* Solo un lado */
.caja {
    border-bottom: 3px solid #3498db;
    border-left: 5px solid #2ecc71;
}

/* Esquinas redondeadas */
.caja {
    border-radius: 8px;       /* Todas las esquinas */
    border-radius: 50%;       /* Círculo perfecto (si es cuadrado) */
    border-radius: 20px 0 20px 0;  /* Solo dos esquinas */
}</code></pre>

      <h2>⚙️ box-sizing: border-box</h2>
      <p>Por defecto, <code>width</code> y <code>height</code> solo se aplican al <strong>contenido</strong>. Esto significa que el padding y border se <strong>suman</strong> al tamaño total, lo cual es confuso:</p>
      <pre><code>/* Sin border-box: el tamaño real es 300 + 20 + 20 + 2 + 2 = 344px */
.caja {
    width: 300px;
    padding: 20px;
    border: 2px solid black;
    /* Tamaño real: 344px 😖 */
}</code></pre>

      <p>Con <code>box-sizing: border-box</code>, el padding y border se <strong>incluyen</strong> dentro del width:</p>
      <pre><code>/* Con border-box: el tamaño total es exactamente 300px ✅ */
.caja {
    box-sizing: border-box;
    width: 300px;
    padding: 20px;
    border: 2px solid black;
    /* Tamaño real: 300px 😊 */
}

/* 💡 Buena práctica: aplicar a TODOS los elementos */
*, *::before, *::after {
    box-sizing: border-box;
}</code></pre>

      <h2>📌 Ejemplo: Tarjetas con Box Model</h2>
      <pre><code>.tarjeta {
    width: 300px;
    padding: 25px;
    margin: 15px;
    border: 1px solid #ddd;
    border-radius: 12px;
    background-color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
}

.tarjeta h3 {
    margin-top: 0;
    color: #2c3e50;
    border-bottom: 2px solid #3498db;
    padding-bottom: 10px;
}

.tarjeta p {
    color: #666;
    line-height: 1.6;
}</code></pre>
    `,
    initialCode: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Box Model</title>
    <style>
        * {
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', sans-serif;
            background-color: #f0f0f0;
            padding: 20px;
        }
        .tarjeta {
            background-color: white;
            width: 350px;
            padding: 25px;
            margin: 20px auto;
            border: 1px solid #ddd;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .tarjeta h2 {
            margin-top: 0;
            color: #2c3e50;
            padding-bottom: 10px;
            border-bottom: 2px solid #3498db;
        }
        .tarjeta p {
            color: #555;
            line-height: 1.6;
        }
        .tarjeta .boton {
            display: inline-block;
            padding: 10px 25px;
            background-color: #3498db;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="tarjeta">
        <h2>Mi primera tarjeta</h2>
        <p>Esta tarjeta demuestra el uso de padding, margin, border y border-radius para crear un diseño limpio y moderno.</p>
        <a href="#" class="boton">Leer más</a>
    </div>
</body>
</html>`,
    challenge: "Crea 3 tarjetas de perfil diferentes, cada una con un borde de distinto color y estilo (solid, dashed, dotted). Cada tarjeta debe tener: padding interno, márgenes que las separen, border-radius para esquinas redondeadas, un nombre (h3), una descripción (p), y un botón con padding y borde propio. Usa box-sizing: border-box en todos los elementos."
  },

  // ──────────────────────────────────────────────
  // LECCIÓN 9 — Flexbox
  // ──────────────────────────────────────────────
  {
    id: 9,
    title: "Flexbox: layouts modernos",
    course: "html-css",
    category: "css",
    level: "Avanzado",
    xp: 180,
    description: "Domina Flexbox para crear diseños flexibles, alineados y responsivos.",
    icon: "📐",
    content: `
      <h2>📐 ¿Qué es Flexbox?</h2>
      <p><strong>Flexbox</strong> (Flexible Box Layout) es un sistema de CSS para crear layouts <strong>unidimensionales</strong> (en una dirección: fila o columna). Es perfecto para alinear, distribuir y organizar elementos de forma flexible.</p>
      <p>Piensa en Flexbox como una estantería: puedes organizar los libros (elementos) en una fila, distribuir el espacio entre ellos, centrarlos, o hacer que se apilen cuando no hay espacio.</p>

      <h2>🏗️ Contenedor flex vs Elementos flex</h2>
      <p>Para usar Flexbox, aplicas <code>display: flex</code> al <strong>contenedor padre</strong>. Todos sus hijos directos se convierten en <strong>elementos flex</strong>.</p>
      <pre><code>/* El contenedor */
.contenedor {
    display: flex;
}

/* Los hijos son automáticamente elementos flex */
&lt;div class="contenedor"&gt;
    &lt;div&gt;Elemento 1&lt;/div&gt;
    &lt;div&gt;Elemento 2&lt;/div&gt;
    &lt;div&gt;Elemento 3&lt;/div&gt;
&lt;/div&gt;</code></pre>
      <p>Por defecto, los elementos se colocan en una <strong>fila horizontal</strong> (uno al lado del otro).</p>

      <h2>➡️ flex-direction</h2>
      <p>Define la dirección del eje principal:</p>
      <pre><code>.contenedor {
    display: flex;
    flex-direction: row;            /* Fila horizontal (por defecto) */
    flex-direction: row-reverse;    /* Fila invertida */
    flex-direction: column;         /* Columna vertical */
    flex-direction: column-reverse; /* Columna invertida */
}</code></pre>

      <h2>↔️ justify-content (eje principal)</h2>
      <p>Controla cómo se <strong>distribuyen</strong> los elementos a lo largo del eje principal:</p>
      <pre><code>.contenedor {
    display: flex;
    justify-content: flex-start;     /* Al inicio (por defecto) */
    justify-content: flex-end;       /* Al final */
    justify-content: center;         /* Centrados */
    justify-content: space-between;  /* Espacio ENTRE elementos */
    justify-content: space-around;   /* Espacio ALREDEDOR de cada uno */
    justify-content: space-evenly;   /* Espacio IGUAL entre todos */
}</code></pre>

      <h3>Visualización:</h3>
      <pre><code>flex-start:     [A][B][C]                  
flex-end:                          [A][B][C]
center:              [A][B][C]             
space-between:  [A]       [B]       [C]
space-around:    [A]     [B]     [C]   
space-evenly:     [A]    [B]    [C]    </code></pre>

      <h2>↕️ align-items (eje perpendicular)</h2>
      <p>Controla la alineación en el eje <strong>perpendicular</strong> (si la dirección es fila, alinea verticalmente):</p>
      <pre><code>.contenedor {
    display: flex;
    height: 300px;
    align-items: stretch;     /* Estira al alto del contenedor (por defecto) */
    align-items: flex-start;  /* Arriba */
    align-items: flex-end;    /* Abajo */
    align-items: center;      /* Centrado verticalmente */
    align-items: baseline;    /* Alinea por la línea base del texto */
}</code></pre>

      <h2>🔄 flex-wrap</h2>
      <p>Por defecto, los elementos flex se comprimen para caber en una sola línea. Con <code>flex-wrap</code> puedes hacer que salten a la siguiente línea:</p>
      <pre><code>.contenedor {
    display: flex;
    flex-wrap: nowrap;   /* Sin salto de línea (por defecto) */
    flex-wrap: wrap;     /* Salta a nueva línea si no hay espacio */
    flex-wrap: wrap-reverse; /* Salta pero invierte el orden de las líneas */
}</code></pre>

      <h2>📏 gap</h2>
      <p>Establece el espacio entre los elementos flex (mucho más limpio que usar márgenes):</p>
      <pre><code>.contenedor {
    display: flex;
    gap: 20px;           /* Mismo espacio en ambas direcciones */
    gap: 20px 10px;      /* Filas | Columnas */
    row-gap: 20px;       /* Solo entre filas */
    column-gap: 10px;    /* Solo entre columnas */
}</code></pre>

      <h2>📊 La propiedad flex (en los hijos)</h2>
      <p>La propiedad <code>flex</code> en los elementos hijos controla cómo crecen, se encogen y su tamaño base:</p>
      <pre><code>.elemento {
    flex: 1;  /* Atajo: flex-grow: 1, flex-shrink: 1, flex-basis: 0% */
}

/* Desglose */
.elemento {
    flex-grow: 1;     /* Crecer para llenar espacio (0 = no crece) */
    flex-shrink: 1;   /* Encogerse si falta espacio (0 = no encoge) */
    flex-basis: 200px; /* Tamaño base antes de crecer/encoger */
}</code></pre>

      <h3>Ejemplo práctico:</h3>
      <pre><code>.sidebar {
    flex: 0 0 250px;   /* No crece, no encoge, siempre 250px */
}
.contenido {
    flex: 1;           /* Ocupa todo el espacio restante */
}</code></pre>

      <h2>🧭 Ejemplo: Barra de navegación</h2>
      <pre><code>nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 30px;
    background-color: #2c3e50;
}

nav .logo {
    font-size: 24px;
    font-weight: bold;
    color: white;
}

nav .enlaces {
    display: flex;
    gap: 20px;
}

nav .enlaces a {
    color: #ecf0f1;
    text-decoration: none;
    padding: 8px 16px;
    border-radius: 5px;
    transition: background-color 0.3s;
}

nav .enlaces a:hover {
    background-color: #34495e;
}</code></pre>

      <h2>📌 Centrar un elemento perfectamente</h2>
      <p>El truco más útil de Flexbox — centrar algo <strong>vertical y horizontalmente</strong>:</p>
      <pre><code>.contenedor {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}</code></pre>
    `,
    initialCode: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Flexbox</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Segoe UI', sans-serif; background-color: #f0f0f0; }

        /* Barra de navegación con Flexbox */
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #2c3e50;
            padding: 15px 30px;
        }
        nav .logo {
            color: white;
            font-size: 22px;
            font-weight: bold;
        }
        nav .enlaces {
            display: flex;
            gap: 15px;
        }
        nav .enlaces a {
            color: #ecf0f1;
            text-decoration: none;
            padding: 8px 16px;
            border-radius: 5px;
            transition: background-color 0.3s;
        }
        nav .enlaces a:hover {
            background-color: #34495e;
        }

        /* Contenido principal */
        main {
            max-width: 900px;
            margin: 30px auto;
            padding: 0 20px;
        }
        h1 { text-align: center; color: #2c3e50; margin-bottom: 30px; }

        /* Tarjetas con Flexbox */
        .tarjetas {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
            justify-content: center;
        }
        .tarjeta {
            flex: 1 1 250px;
            background: white;
            padding: 25px;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            text-align: center;
        }
        .tarjeta .icono { font-size: 40px; margin-bottom: 15px; }
        .tarjeta h3 { color: #2c3e50; margin-bottom: 10px; }
        .tarjeta p { color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <nav>
        <div class="logo">WebCraft</div>
        <div class="enlaces">
            <a href="#">Inicio</a>
            <a href="#">Cursos</a>
            <a href="#">Blog</a>
            <a href="#">Contacto</a>
        </div>
    </nav>

    <main>
        <h1>Aprendiendo Flexbox</h1>
        <div class="tarjetas">
            <div class="tarjeta">
                <div class="icono">📄</div>
                <h3>HTML</h3>
                <p>Estructura y contenido de tu página web.</p>
            </div>
            <div class="tarjeta">
                <div class="icono">🎨</div>
                <h3>CSS</h3>
                <p>Diseño, colores y estilos visuales.</p>
            </div>
            <div class="tarjeta">
                <div class="icono">⚡</div>
                <h3>JavaScript</h3>
                <p>Interactividad y lógica de programación.</p>
            </div>
        </div>
    </main>
</body>
</html>`,
    challenge: "Crea un layout que incluya: una barra de navegación con logo a la izquierda y enlaces a la derecha usando Flexbox con justify-content: space-between, y un contenedor principal con al menos 4 tarjetas que usen flex-wrap: wrap para adaptarse al ancho. Cada tarjeta debe tener un icono, título y descripción. Usa gap para el espaciado. Centra todo el contenido principal con Flexbox."
  },

  // ──────────────────────────────────────────────
  // LECCIÓN 10 — CSS Grid y diseño responsivo
  // ──────────────────────────────────────────────
  {
    id: 10,
    title: "CSS Grid y diseño responsivo",
    course: "html-css",
    category: "css",
    level: "Avanzado",
    xp: 200,
    description: "Aprende CSS Grid para layouts de dos dimensiones y media queries para diseño responsivo.",
    icon: "🔲",
    content: `
      <h2>🔲 ¿Qué es CSS Grid?</h2>
      <p><strong>CSS Grid</strong> es un sistema de layout <strong>bidimensional</strong>: controla filas <em>y</em> columnas al mismo tiempo. Mientras Flexbox es ideal para organizar en una dirección (fila o columna), Grid es perfecto para diseñar layouts completos de página.</p>
      <p>Imagina CSS Grid como una cuadrícula o rejilla, similar a una hoja de cálculo de Excel donde puedes colocar elementos en celdas específicas.</p>

      <h2>🏗️ Crear un Grid básico</h2>
      <p>Aplica <code>display: grid</code> al contenedor y define las columnas y filas:</p>
      <pre><code>.contenedor {
    display: grid;
    grid-template-columns: 200px 200px 200px; /* 3 columnas de 200px */
    grid-template-rows: 100px 100px;           /* 2 filas de 100px */
    gap: 10px;                                 /* Espacio entre celdas */
}</code></pre>

      <h2>📏 La unidad fr (fracción)</h2>
      <p>La unidad <code>fr</code> representa una <strong>fracción del espacio disponible</strong>. Es extremadamente útil para crear layouts proporcionales:</p>
      <pre><code>.contenedor {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;  /* Proporción 1:2:1 */
    /* La columna central es el doble de ancha que las laterales */
}

/* Layout clásico: sidebar + contenido */
.pagina {
    display: grid;
    grid-template-columns: 250px 1fr;  /* Sidebar fijo + contenido flexible */
}</code></pre>

      <h2>🔁 repeat() y minmax()</h2>
      <p>Funciones que simplifican la definición de columnas:</p>
      <pre><code>/* repeat(): repite un patrón */
grid-template-columns: repeat(3, 1fr);       /* Igual a: 1fr 1fr 1fr */
grid-template-columns: repeat(4, 200px);     /* 4 columnas de 200px */
grid-template-columns: repeat(2, 1fr 2fr);   /* 1fr 2fr 1fr 2fr */

/* minmax(): rango de tamaños */
grid-template-columns: repeat(3, minmax(200px, 1fr));
/* Cada columna mide entre 200px y 1fr (flexible) */

/* auto-fill y auto-fit: columnas automáticas */
grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
/* Crea tantas columnas como quepan, mínimo 250px cada una */

grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
/* Similar, pero las columnas se estiran si sobra espacio */</code></pre>

      <h2>📏 gap (espacio entre celdas)</h2>
      <pre><code>.contenedor {
    display: grid;
    gap: 20px;             /* Mismo espacio en filas y columnas */
    gap: 20px 10px;        /* Filas | Columnas */
    row-gap: 20px;         /* Solo entre filas */
    column-gap: 10px;      /* Solo entre columnas */
}</code></pre>

      <h2>↔️ Expandir elementos (spanning)</h2>
      <p>Puedes hacer que un elemento ocupe varias columnas o filas:</p>
      <pre><code>.encabezado {
    grid-column: 1 / 4;      /* De la línea 1 a la 4 (abarca 3 columnas) */
    /* También: */
    grid-column: 1 / -1;     /* De la primera a la última línea */
    grid-column: span 3;     /* Ocupa 3 columnas desde donde está */
}

.sidebar {
    grid-row: 2 / 4;         /* Ocupa las filas 2 y 3 */
    grid-row: span 2;        /* Ocupa 2 filas */
}</code></pre>

      <h3>Ejemplo de layout completo:</h3>
      <pre><code>.pagina {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
    gap: 10px;
}

.header   { grid-column: 1 / -1; }  /* Abarca todo el ancho */
.sidebar  { grid-row: 2; }
.main     { grid-row: 2; }
.footer   { grid-column: 1 / -1; }  /* Abarca todo el ancho */</code></pre>

      <h2>📱 Diseño responsivo con Media Queries</h2>
      <p>Las <strong>media queries</strong> permiten aplicar estilos <strong>según el tamaño de la pantalla</strong> del dispositivo. Es lo que hace que tu página se vea bien tanto en un teléfono como en una computadora de escritorio.</p>

      <h3>Sintaxis básica</h3>
      <pre><code>/* Estilos base (para móviles primero — mobile first) */
.contenedor {
    display: grid;
    grid-template-columns: 1fr;  /* Una columna en móvil */
    gap: 15px;
    padding: 10px;
}

/* Tablets (768px o más) */
@media (min-width: 768px) {
    .contenedor {
        grid-template-columns: repeat(2, 1fr);  /* 2 columnas */
        padding: 20px;
    }
}

/* Escritorio (1024px o más) */
@media (min-width: 1024px) {
    .contenedor {
        grid-template-columns: repeat(3, 1fr);  /* 3 columnas */
        max-width: 1200px;
        margin: 0 auto;
        padding: 30px;
    }
}

/* Pantallas grandes (1440px o más) */
@media (min-width: 1440px) {
    .contenedor {
        grid-template-columns: repeat(4, 1fr);  /* 4 columnas */
    }
}</code></pre>

      <h3>Otros usos de media queries</h3>
      <pre><code>/* Ocultar la barra lateral en móviles */
@media (max-width: 767px) {
    .sidebar {
        display: none;
    }
    nav .enlaces {
        flex-direction: column;
    }
}

/* Ajustar tamaño de fuente */
@media (max-width: 480px) {
    body { font-size: 14px; }
    h1 { font-size: 24px; }
}</code></pre>

      <h2>📌 Conceptos clave del diseño responsivo</h2>
      <ul>
        <li><strong>Mobile First</strong> — Diseña primero para móvil y luego añade complejidad para pantallas más grandes.</li>
        <li><strong>Unidades relativas</strong> — Usa <code>%</code>, <code>em</code>, <code>rem</code>, <code>vw</code>, <code>vh</code> en vez de píxeles fijos.</li>
        <li><strong>Viewport meta</strong> — Siempre incluye: <code>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</code></li>
        <li><strong>Imágenes flexibles</strong> — Usa <code>max-width: 100%</code> para que las imágenes se adapten.</li>
      </ul>

      <h2>📌 Ejemplo completo: Galería responsiva</h2>
      <pre><code>.galeria {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    padding: 20px;
}

.galeria-item {
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
    transition: transform 0.3s;
}

.galeria-item:hover {
    transform: translateY(-5px);
}

.galeria-item img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.galeria-item .info {
    padding: 15px;
}

@media (max-width: 600px) {
    .galeria {
        grid-template-columns: 1fr;
    }
}</code></pre>
    `,
    initialCode: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Grid y Responsivo</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Segoe UI', sans-serif;
            background-color: #f0f0f0;
            color: #333;
        }

        /* Layout con Grid */
        .galeria {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            padding: 30px;
            max-width: 1200px;
            margin: 0 auto;
        }

        h1 {
            text-align: center;
            padding: 30px;
            color: #2c3e50;
            font-size: 28px;
        }

        .tarjeta {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            transition: transform 0.3s, box-shadow 0.3s;
        }

        .tarjeta:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }

        .tarjeta .imagen {
            height: 160px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 48px;
        }

        .tarjeta .info {
            padding: 20px;
        }

        .tarjeta h3 {
            color: #2c3e50;
            margin-bottom: 8px;
        }

        .tarjeta p {
            color: #777;
            font-size: 14px;
            line-height: 1.5;
        }

        /* Responsivo */
        @media (max-width: 600px) {
            h1 { font-size: 22px; }
            .galeria { padding: 15px; gap: 15px; }
        }
    </style>
</head>
<body>
    <h1>Galería con CSS Grid</h1>
    <div class="galeria">
        <div class="tarjeta">
            <div class="imagen">🌄</div>
            <div class="info">
                <h3>Paisaje</h3>
                <p>Hermosa vista de las montañas al atardecer.</p>
            </div>
        </div>
        <div class="tarjeta">
            <div class="imagen" style="background: linear-gradient(135deg, #f093fb, #f5576c);">🌊</div>
            <div class="info">
                <h3>Playa</h3>
                <p>Arena blanca y aguas cristalinas del Caribe.</p>
            </div>
        </div>
        <div class="tarjeta">
            <div class="imagen" style="background: linear-gradient(135deg, #4facfe, #00f2fe);">🏙️</div>
            <div class="info">
                <h3>Ciudad</h3>
                <p>La vida urbana con rascacielos iluminados.</p>
            </div>
        </div>
        <div class="tarjeta">
            <div class="imagen" style="background: linear-gradient(135deg, #43e97b, #38f9d7);">🌳</div>
            <div class="info">
                <h3>Bosque</h3>
                <p>Senderos verdes llenos de tranquilidad.</p>
            </div>
        </div>
    </div>
</body>
</html>`,
    challenge: "Crea una galería responsiva de al menos 6 elementos usando CSS Grid. Usa repeat(auto-fit, minmax(280px, 1fr)) para que se adapte automáticamente. Cada elemento debe tener una imagen de fondo con gradiente, un título y descripción. Añade media queries para que en pantallas menores a 600px la galería muestre solo 1 columna, y haz que uno de los elementos ocupe 2 columnas en escritorio usando grid-column: span 2."
  }
  ,

  // ============================================================
  // CURSO 2: JAVASCRIPT Y LÓGICA (Lecciones 11-15)
  // ============================================================
  {
    id: 11,
    title: "Introducción a JavaScript y Variables",
    course: "javascript",
    category: "js",
    level: "Principiante",
    xp: 200,
    description: "Conoce el lenguaje de la web. Aprende a crear variables y mostrar mensajes.",
    icon: "🟨",
    content: `
      <h2>¿Qué es JavaScript?</h2>
      <p>Mientras que HTML es el esqueleto de la web y CSS es su ropa y estilo, <strong>JavaScript (JS) es el cerebro y los músculos</strong>. Es el lenguaje de programación que le da interactividad a las páginas.</p>
      
      <h3>La Consola</h3>
      <p>Para ver qué está pasando por dentro de JS, usamos la consola. El comando <code>console.log()</code> nos permite imprimir mensajes.</p>
      <pre><code>console.log("¡Hola desde la consola!");</code></pre>
      
      <h3>Variables: La memoria de JS</h3>
      <p>Una variable es como una "caja" donde guardamos datos para usarlos después. En JS moderno usamos <code>let</code> para variables que pueden cambiar y <code>const</code> para valores fijos.</p>
      <pre><code>let jugador = "Mario"; // Creamos la variable
jugador = "Luigi";   // Cambiamos su valor (no se vuelve a usar 'let')

const vidas = 3;     // Creamos una constante (no se puede cambiar)</code></pre>

      <h3>Ejemplo completo:</h3>
      <pre><code>let puntaje = 100;
console.log("Tu puntaje actual es:");
console.log(puntaje);</code></pre>
    `,
    initialCode: "<script>\n// Escribe tu código JS aquí\n\n</script>",
    challenge: "Dentro de la etiqueta <script>, crea una variable let llamada 'mensaje' con el texto 'Hola Mundo' y muéstrala usando console.log(mensaje)."
  },
  {
    id: 12,
    title: "Funciones y Reutilización",
    course: "javascript",
    category: "js",
    level: "Principiante",
    xp: 210,
    description: "Aprende a empaquetar código en funciones para no repetirte.",
    icon: "⚙️",
    content: `
      <h2>Funciones: Empaquetando código</h2>
      <p>Imagina que tienes que hacer limonada. Necesitas cortar limones, exprimirlos, agregar agua y azúcar. Si vas a hacer limonada 10 veces, no quieres escribir las mismas instrucciones 10 veces. <strong>Las funciones agrupan lógica</strong> para ser usada múltiples veces.</p>
      
      <h3>Creando una función</h3>
      <p>Usamos la palabra clave <code>function</code> seguida del nombre, paréntesis <code>()</code> y llaves <code>{}</code> que encierran las instrucciones.</p>
      <pre><code>function hacerLimonada() {
  console.log("Cortar limones");
  console.log("Exprimir y mezclar");
}

hacerLimonada(); // Llamamos a la función
hacerLimonada(); // ¡Llamarla es muy fácil!</code></pre>

      <h3>Retornando valores (Return)</h3>
      <p>A veces no queremos que la función solo imprima algo, sino que nos <strong>devuelva</strong> un resultado para guardarlo en una variable. Usamos <code>return</code>.</p>
      <pre><code>function sumar() {
  let resultado = 5 + 5;
  return resultado; // La función devuelve 10
}

let miSuma = sumar();
console.log(miSuma); // Imprime 10</code></pre>
    `,
    initialCode: "<script>\nfunction saludar() {\n\n}\n</script>",
    challenge: "Completa la función 'saludar' para que retorne (usando return) exactamente el texto 'Bienvenido a JS'. No necesitas llamar a la función, solo hacer que retorne el valor correcto."
  },
  {
    id: 13,
    title: "Condicionales (If / Else)",
    course: "javascript",
    category: "js",
    level: "Intermedio",
    xp: 220,
    description: "Toma decisiones en tu código basándote en condiciones lógicas.",
    icon: "🔀",
    content: `
      <h2>Tomando decisiones lógicas</h2>
      <p>Los programas necesitan tomar caminos diferentes dependiendo de lo que ocurra. <strong>Si (if)</strong> llueve, me pongo abrigo; <strong>sino (else)</strong>, me pongo camiseta.</p>
      
      <h3>Sintaxis Básica</h3>
      <p>Usamos <code>if (condicion) { ... }</code>. La condición debe ser algo que JS pueda evaluar como Verdadero o Falso.</p>
      <pre><code>let dinero = 50;

if (dinero >= 100) {
  console.log("¡Puedes comprar el juego!");
} else {
  console.log("Aún te falta ahorrar.");
}</code></pre>

      <h3>Operadores de comparación</h3>
      <ul>
        <li><code>></code> (Mayor que), <code><</code> (Menor que)</li>
        <li><code>>=</code> (Mayor o igual), <code><=</code> (Menor o igual)</li>
        <li><code>===</code> (Exactamente igual)</li>
        <li><code>!==</code> (Diferente a)</li>
      </ul>
      <pre><code>let password = "1234";
if (password === "secreta") {
  console.log("Acceso concedido");
}</code></pre>
    `,
    initialCode: "<script>\nlet edad = 18;\nlet resultado = '';\n// Escribe tu condicional if/else aquí\n\n</script>",
    challenge: "Escribe un condicional (if / else). Si 'edad' es mayor o igual a 18 (>=), asigna la palabra 'Mayor' a la variable 'resultado', sino (else) asígnale 'Menor'."
  },
  {
    id: 14,
    title: "Bucles y Arreglos",
    course: "javascript",
    category: "js",
    level: "Intermedio",
    xp: 230,
    description: "Aprende a repetir tareas automáticamente y almacenar listas de elementos.",
    icon: "🔁",
    content: `
      <h2>Arreglos (Arrays): Listas de datos</h2>
      <p>Un arreglo es una colección de elementos. Se declaran usando corchetes <code>[]</code> y separando los elementos con comas.</p>
      <pre><code>let colores = ["Rojo", "Azul", "Verde"];
console.log(colores[0]); // Imprime "Rojo" (¡empezamos a contar desde 0!)
console.log(colores.length); // Imprime 3 (la cantidad de elementos)</code></pre>

      <h2>Bucles (For): Repetición automática</h2>
      <p>Si quisieras imprimir 100 veces algo, no escribirías 100 <code>console.log</code>. Usas un bucle <code>for</code>.</p>
      <p>El bucle for tiene 3 partes separadas por <code>;</code></p>
      <ol>
        <li><strong>Inicio:</strong> <code>let i = 0</code> (Creamos un contador i en 0)</li>
        <li><strong>Condición:</strong> <code>i < 5</code> (Mientras i sea menor a 5, repite el bloque)</li>
        <li><strong>Avance:</strong> <code>i++</code> (Aumenta i en 1 en cada vuelta)</li>
      </ol>
      <pre><code>for (let i = 0; i < 3; i++) {
  console.log("Vuelta número: " + i);
}</code></pre>

      <h3>Iterando un arreglo</h3>
      <pre><code>let gatos = ["Luna", "Simba", "Milo"];
for (let i = 0; i < gatos.length; i++) {
  console.log("Hola gatito " + gatos[i]);
}</code></pre>
    `,
    initialCode: "<script>\nlet frutas = ['Manzana', 'Pera', 'Uva'];\n// Escribe tu bucle for aquí para iterar frutas\n\n</script>",
    challenge: "Dentro de <script>, usa un bucle 'for' para recorrer el arreglo frutas. Configura el inicio (let i = 0), la condición (i < frutas.length) y el incremento (i++). Dentro del bucle no importa qué pongas (ej. console.log(frutas[i]))."
  },
  {
    id: 15,
    title: "Manipulación del DOM",
    course: "javascript",
    category: "js",
    level: "Avanzado",
    xp: 300,
    description: "Conecta tu JavaScript con el HTML para crear interactividad real en pantalla.",
    icon: "🖱️",
    content: `
      <h2>El DOM (Document Object Model)</h2>
      <p>Hasta ahora, JavaScript ha estado corriendo en la consola, invisible en la pantalla. El DOM es el "puente" que permite que JS modifique el HTML de tu página en tiempo real.</p>
      
      <h3>Obtener elementos</h3>
      <p>Para cambiar algo, primero debemos seleccionarlo. La forma más común es asignándole un <code>id</code> en HTML y buscándolo con <code>document.getElementById()</code>.</p>
      <pre><code>// HTML: <p id="mensaje">Hola</p>

let parrafo = document.getElementById("mensaje");</code></pre>

      <h3>Modificar elementos</h3>
      <p>Una vez seleccionado, podemos cambiar su texto usando <code>.textContent</code> o inyectar HTML nuevo usando <code>.innerHTML</code>.</p>
      <pre><code>// Cambiar solo el texto
parrafo.textContent = "¡Texto cambiado por JS!";

// Inyectar HTML
parrafo.innerHTML = "<strong>Texto en negrita por JS</strong>";</code></pre>
    `,
    initialCode: "<body>\n  <h1 id='titulo'>Texto original</h1>\n  <script>\n  // Cambia el texto del h1 obteniéndolo por su ID\n  \n  </script>\n</body>",
    challenge: "Dentro de <script>, usa document.getElementById('titulo').textContent para seleccionar el <h1> y cambiar su texto exactamente a 'JS activado'."
  },

  // ============================================================
  // CURSO 3: BASES DE DATOS Y WEB (Lecciones 16-18)
  // ============================================================
  {
    id: 16,
    title: "¿Qué es una Base de Datos?",
    course: "database",
    category: "js",
    level: "Intermedio",
    xp: 250,
    description: "Conceptos básicos de tablas, filas y columnas simulando consultas con arreglos de objetos.",
    icon: "🗄️",
    content: `
      <h2>Bases de datos en el Frontend</h2>
      <p>En el backend se usan bases de datos formales (SQL, Mongo, Postgres). Cuando esos datos viajan al Frontend (tu página web), casi siempre llegan en forma de <strong>Arreglos de Objetos (JSON)</strong>.</p>
      
      <h3>Objetos en JavaScript</h3>
      <p>Un objeto agrupa características de una sola entidad usando propiedades y valores dentro de llaves <code>{}</code>.</p>
      <pre><code>let persona = {
  nombre: "Ana",
  edad: 25,
  activo: true
};
console.log(persona.nombre); // Imprime "Ana"</code></pre>

      <h3>Simulando una Tabla</h3>
      <p>Si combinamos Arreglos (listas) y Objetos (filas), ¡tenemos una tabla de Base de Datos!</p>
      <pre><code>// Esto equivale a una tabla "usuarios" con columnas id, nombre, edad
let usuarios = [
  { id: 1, nombre: "Ana", edad: 25 },
  { id: 2, nombre: "Luis", edad: 30 },
  { id: 3, nombre: "María", edad: 19 }
];</code></pre>
    `,
    initialCode: "<script>\n// Crea tu arreglo productos\n\n</script>",
    challenge: "Crea una variable let llamada 'productos' que sea un arreglo <code>[]</code>. Dentro del arreglo coloca al menos 2 objetos <code>{}</code>. Cada objeto debe tener una propiedad 'id' (número) y una propiedad 'nombre' (texto)."
  },
  {
    id: 17,
    title: "Consultas (SELECT WHERE)",
    course: "database",
    category: "js",
    level: "Avanzado",
    xp: 280,
    description: "Aprende a filtrar y buscar datos simulando consultas a una BD en el Frontend.",
    icon: "🔍",
    content: `
      <h2>Filtrado de Datos (Consultas WHERE)</h2>
      <p>Cuando recibes cientos de productos de la base de datos, a veces solo quieres mostrar "Los que cuestan menos de $50" o "Los usuarios activos".</p>
      <p>En bases de datos SQL usaríamos <code>SELECT * FROM usuarios WHERE activo = true</code>. En el Frontend usando JavaScript moderno, logramos lo mismo usando el método <strong><code>.filter()</code></strong>.</p>
      
      <h3>El método .filter()</h3>
      <p><code>.filter()</code> crea un nuevo arreglo con todos los elementos que pasen una prueba (condición).</p>
      <pre><code>let juegos = [
  { titulo: "Zelda", precio: 60 },
  { titulo: "Hollow Knight", precio: 15 },
  { titulo: "Stardew Valley", precio: 15 }
];

// Queremos los juegos baratos (precio menor a 20)
// Explicación: "De cada (juego) retorna los que (juego.precio < 20)"
let baratos = juegos.filter(juego => juego.precio < 20);

console.log(baratos); 
// Imprime un arreglo con Hollow Knight y Stardew Valley</code></pre>
    `,
    initialCode: "<script>\nlet usuarios = [\n  { id: 1, nombre: 'Ana', activo: true },\n  { id: 2, nombre: 'Luis', activo: false },\n  { id: 3, nombre: 'Marta', activo: true }\n];\n\n// Usa filter aquí\n\n</script>",
    challenge: "Usa el método <code>usuarios.filter(u => u.activo === true)</code> para buscar a los usuarios activos y guarda el resultado en una variable let llamada 'activos'."
  },
  {
    id: 18,
    title: "Renderizar Datos Dinámicos",
    course: "database",
    category: "html",
    level: "Experto",
    xp: 350,
    description: "Combina el poder de arreglos (BD simulada) y HTML para inyectar filas de una tabla dinámicamente.",
    icon: "📊",
    content: `
      <h2>Renderizado Dinámico: El paso final</h2>
      <p>Las aplicaciones modernas como Facebook, Netflix o Amazon no escriben el código HTML a mano para cada publicación, película o producto. En su lugar, <strong>JavaScript lee los datos de la Base de Datos y genera el HTML automáticamente.</strong></p>
      
      <h3>El bucle for para generar HTML</h3>
      <p>Podemos iterar nuestro arreglo de datos (simulando que llegaron de la BD) y sumar <code><tr></code> y <code><td></code> a la propiedad <code>innerHTML</code> de nuestra tabla.</p>
      <pre><code>let tareas = [
  { id: 1, texto: "Comprar pan" },
  { id: 2, texto: "Pasear al perro" }
];

let lista = document.getElementById("miLista"); // Seleccionamos <ul>

for(let i = 0; i < tareas.length; i++) {
  // Sumamos HTML nuevo conservando el anterior ( += )
  lista.innerHTML += "<li>" + tareas[i].texto + "</li>";
}</code></pre>
      <p>El código superior inyectará dos <code>&lt;li&gt;</code> al instante en la pantalla sin importar si hay 2 o 2,000 elementos en el arreglo.</p>
    `,
    initialCode: "<body>\n  <table border='1'>\n    <thead>\n      <tr><th>Nombre</th></tr>\n    </thead>\n    <tbody id='tablaDatos'></tbody>\n  </table>\n  \n  <script>\n  let datos = [\n    {nombre: 'Ana'},\n    {nombre: 'Luis'},\n    {nombre: 'Carlos'}\n  ];\n  let tbody = document.getElementById('tablaDatos');\n  \n  // Escribe tu bucle for aquí para iterar 'datos' e inyectar <tr><td>...\n  \n  </script>\n</body>",
    challenge: "Escribe un bucle for clásico (con let i = 0...) que itere sobre 'datos'. En cada vuelta usa <code>tbody.innerHTML += '&lt;tr&gt;&lt;td&gt;' + datos[i].nombre + '&lt;/td&gt;&lt;/tr&gt;'</code> para renderizar la base de datos en pantalla."
  }
];

// Hacer las lecciones accesibles globalmente
window.lessons = lessons;

