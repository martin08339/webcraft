/**
 * ============================================
 * WebCraft - Lógica Principal (main.js)
 * ============================================
 * Cargado ÚLTIMO después de progress.js, badges.js, editor.js.
 *
 * Incluye:
 * - Efecto de scroll en el header
 * - Menú móvil (hamburguesa)
 * - Animaciones de scroll (IntersectionObserver)
 * - Contadores animados
 * - Navegación activa
 * - Scroll suave
 * - Notificaciones toast
 * - Modal de insignias con confetti
 * - Actualización de UI con progreso
 * - Lógica específica de leccion.html y lecciones.html
 * ============================================
 */

(function () {
  'use strict';

  // =====================
  // Utilidad de sanitización
  // =====================

  /**
   * Escapa entidades HTML para prevenir XSS.
   * Usar siempre al insertar texto dinámico en el DOM.
   * @param {string} str - Cadena a sanitizar
   * @returns {string} Cadena segura con entidades HTML escapadas
   */
  function sanitizeHTML(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Exponer globalmente
  window.sanitizeHTML = sanitizeHTML;

  // =====================
  // Efecto de scroll en el header
  // =====================

  /**
   * Agrega/remueve la clase 'scrolled' al header cuando el usuario hace scroll.
   * Esto permite aplicar un fondo más opaco al header.
   */
  function setupHeaderScroll() {
    var header = document.querySelector('.header');
    if (!header) return;

    function onScroll() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    // Ejecutar inmediatamente por si la página ya está scrolleada
    onScroll();
  }

  // =====================
  // Menú móvil (hamburguesa)
  // =====================

  /**
   * Configura el menú hamburguesa para dispositivos móviles.
   * - Toggle al hacer clic en .hamburger
   * - Cierra al hacer clic en un enlace de navegación
   * - Cierra al hacer clic fuera del menú
   */
  function setupMobileMenu() {
    var hamburger = document.querySelector('.hamburger');
    var navLinks = document.querySelector('.nav-links');

    if (!hamburger || !navLinks) return;

    // Toggle del menú
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });

    // Cerrar al hacer clic en un enlace
    var links = navLinks.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function () {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
      });
    }

    // Cerrar al hacer clic fuera del menú
    document.addEventListener('click', function (e) {
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
      }
    });
  }

  // =====================
  // Animaciones de scroll (IntersectionObserver)
  // =====================

  /**
   * Observa elementos con la clase .animate-on-scroll
   * y les agrega .visible cuando entran en el viewport.
   * Soporta data-delay para escalonar las animaciones.
   */
  function setupScrollAnimations() {
    var elements = document.querySelectorAll('.animate-on-scroll');
    if (elements.length === 0) return;

    // Verificar soporte de IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      // Fallback: mostrar todos los elementos inmediatamente
      for (var i = 0; i < elements.length; i++) {
        elements[i].classList.add('visible');
      }
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var delay = parseInt(el.getAttribute('data-delay'), 10) || 0;

          if (delay > 0) {
            setTimeout(function () {
              el.classList.add('visible');
            }, delay);
          } else {
            el.classList.add('visible');
          }

          // Dejar de observar una vez visible
          observer.unobserve(el);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    for (var j = 0; j < elements.length; j++) {
      observer.observe(elements[j]);
    }
  }

  // =====================
  // Contadores animados
  // =====================

  /**
   * Anima los contadores numéricos (.stat-number) de 0 al valor objetivo.
   * Usa requestAnimationFrame para animación suave.
   * Duración aproximada: 2 segundos con easing.
   */
  function setupAnimatedCounters() {
    var counters = document.querySelectorAll('.stat-number[data-target]');
    if (counters.length === 0) return;

    // Verificar soporte de IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      // Fallback: mostrar valores finales directamente
      for (var i = 0; i < counters.length; i++) {
        var target = parseInt(counters[i].getAttribute('data-target'), 10) || 0;
        counters[i].textContent = target;
      }
      return;
    }

    /**
     * Función de easing (ease-out cubic)
     */
    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    /**
     * Anima un solo contador
     */
    function animateCounter(element) {
      var target = parseInt(element.getAttribute('data-target'), 10) || 0;
      var duration = 2000; // 2 segundos
      var startTime = null;

      function step(currentTime) {
        if (!startTime) startTime = currentTime;
        var elapsed = currentTime - startTime;
        var progress = Math.min(elapsed / duration, 1);
        var easedProgress = easeOutCubic(progress);
        var currentValue = Math.floor(easedProgress * target);

        element.textContent = currentValue;

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          element.textContent = target;
        }
      }

      requestAnimationFrame(step);
    }

    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3
    });

    for (var j = 0; j < counters.length; j++) {
      counterObserver.observe(counters[j]);
    }
  }

  // =====================
  // Navegación activa
  // =====================

  /**
   * Resalta el enlace de navegación correspondiente a la página actual.
   */
  function setupActiveNavLink() {
    var currentPath = window.location.pathname;
    var navLinks = document.querySelectorAll('.nav-links a');

    for (var i = 0; i < navLinks.length; i++) {
      var link = navLinks[i];
      var href = link.getAttribute('href');

      if (!href) continue;

      // Comparar la ruta actual con el href del enlace
      var isActive = false;

      if (href === '/' || href === '/index.html' || href === 'index.html') {
        // Página de inicio
        isActive = currentPath === '/' ||
          currentPath.endsWith('/index.html') ||
          currentPath.endsWith('/webcraft/');
      } else {
        // Otras páginas
        isActive = currentPath.endsWith(href) || currentPath.endsWith('/' + href);
      }

      if (isActive) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  }

  // =====================
  // Scroll suave
  // =====================

  /**
   * Configura scroll suave para enlaces ancla (href="#seccion").
   */
  function setupSmoothScroll() {
    document.addEventListener('click', function (e) {
      var target = e.target.closest('a[href^="#"]');
      if (!target) return;

      var href = target.getAttribute('href');
      if (!href || href === '#') return;

      var section = document.querySelector(href);
      if (!section) return;

      e.preventDefault();
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  }

  // =====================
  // Notificaciones Toast
  // =====================

  /**
   * Muestra una notificación toast en la pantalla.
   * @param {string} message - Mensaje a mostrar
   * @param {string} type - Tipo: 'success', 'info', 'warning'
   */
  function showToast(message, type) {
    type = type || 'info';

    // Crear el elemento toast
    var toast = document.createElement('div');
    toast.className = 'toast toast-' + sanitizeHTML(type);

    // Icono según el tipo
    var icons = {
      success: '✅',
      info: 'ℹ️',
      warning: '⚠️'
    };
    var icon = icons[type] || icons.info;

    toast.innerHTML = '<span class="toast-icon">' + icon + '</span>' +
      '<span class="toast-message">' + sanitizeHTML(message) + '</span>';

    // Estilos del toast
    toast.style.cssText = [
      'position: fixed',
      'bottom: 30px',
      'right: 30px',
      'padding: 16px 24px',
      'border-radius: 12px',
      'color: #fff',
      'font-size: 14px',
      'font-weight: 500',
      'display: flex',
      'align-items: center',
      'gap: 10px',
      'z-index: 10000',
      'transform: translateX(120%)',
      'transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
      'box-shadow: 0 8px 32px rgba(0,0,0,0.3)',
      'max-width: 400px',
      'backdrop-filter: blur(10px)',
      'font-family: inherit'
    ].join(';');

    // Colores según el tipo
    var colors = {
      success: 'linear-gradient(135deg, #00c853, #00e676)',
      info: 'linear-gradient(135deg, #2979ff, #448aff)',
      warning: 'linear-gradient(135deg, #ff6d00, #ff9100)'
    };
    toast.style.background = colors[type] || colors.info;

    document.body.appendChild(toast);

    // Animar entrada
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        toast.style.transform = 'translateX(0)';
      });
    });

    // Auto-ocultar después de 3 segundos
    setTimeout(function () {
      toast.style.transform = 'translateX(120%)';
      setTimeout(function () {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 400);
    }, 3000);
  }

  // Exponer globalmente
  window.showToast = showToast;

  // =====================
  // Animación de Confetti
  // =====================

  /**
   * Muestra una animación de confetti con CSS puro.
   * Crea 50 piezas de confetti con colores, posiciones y delays aleatorios.
   */
  function showConfetti() {
    var container = document.createElement('div');
    container.className = 'confetti-container';
    container.style.cssText = [
      'position: fixed',
      'top: 0',
      'left: 0',
      'width: 100%',
      'height: 100%',
      'pointer-events: none',
      'z-index: 10001',
      'overflow: hidden'
    ].join(';');

    // Inyectar estilos de animación si no existen
    if (!document.getElementById('confetti-styles')) {
      var style = document.createElement('style');
      style.id = 'confetti-styles';
      style.textContent = [
        '@keyframes confetti-fall {',
        '  0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }',
        '  100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }',
        '}',
        '@keyframes confetti-sway {',
        '  0%, 100% { margin-left: 0; }',
        '  50% { margin-left: 30px; }',
        '}'
      ].join('\n');
      document.head.appendChild(style);
    }

    var colores = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6bff',
      '#ff9f43', '#0abde3', '#ee5a24', '#7c3aed', '#10b981'];
    var formas = ['circle', 'square', 'rectangle'];

    // Crear 50 piezas de confetti
    for (var i = 0; i < 50; i++) {
      var pieza = document.createElement('div');
      var color = colores[Math.floor(Math.random() * colores.length)];
      var forma = formas[Math.floor(Math.random() * formas.length)];
      var left = Math.random() * 100;
      var delay = Math.random() * 2;
      var duration = 2 + Math.random() * 2;
      var size = 6 + Math.random() * 8;

      var width = size;
      var height = forma === 'rectangle' ? size * 2 : size;
      var borderRadius = forma === 'circle' ? '50%' : '2px';

      pieza.style.cssText = [
        'position: absolute',
        'top: -10px',
        'left: ' + left + '%',
        'width: ' + width + 'px',
        'height: ' + height + 'px',
        'background: ' + color,
        'border-radius: ' + borderRadius,
        'animation: confetti-fall ' + duration + 's ease-in ' + delay + 's forwards, confetti-sway ' + (duration * 0.5) + 's ease-in-out ' + delay + 's infinite'
      ].join(';');

      container.appendChild(pieza);
    }

    document.body.appendChild(container);

    // Remover el contenedor después de que termine la animación
    setTimeout(function () {
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
    }, 5000);
  }

  // Exponer globalmente
  window.showConfetti = showConfetti;

  // =====================
  // Modal de Insignia
  // =====================

  /**
   * Muestra un modal con la insignia desbloqueada y confetti.
   * @param {object} badge - Objeto de insignia { icon, name, description }
   */
  function showBadgeModal(badge) {
    if (!badge) return;

    // Mostrar confetti
    showConfetti();

    // Crear el overlay del modal
    var overlay = document.createElement('div');
    overlay.className = 'badge-modal-overlay';
    overlay.style.cssText = [
      'position: fixed',
      'top: 0',
      'left: 0',
      'width: 100%',
      'height: 100%',
      'background: rgba(0, 0, 0, 0.7)',
      'display: flex',
      'align-items: center',
      'justify-content: center',
      'z-index: 10002',
      'opacity: 0',
      'transition: opacity 0.3s ease',
      'backdrop-filter: blur(5px)'
    ].join(';');

    // Crear el contenido del modal
    var modal = document.createElement('div');
    modal.className = 'badge-modal';
    modal.style.cssText = [
      'background: linear-gradient(135deg, #1a1a2e, #16213e)',
      'border-radius: 24px',
      'padding: 48px 40px',
      'text-align: center',
      'max-width: 380px',
      'width: 90%',
      'transform: scale(0.5)',
      'transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
      'box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(124, 58, 237, 0.2)',
      'border: 1px solid rgba(255, 255, 255, 0.1)'
    ].join(';');

    modal.innerHTML = [
      '<div style="font-size: 72px; margin-bottom: 16px; animation: badge-bounce 0.6s ease 0.3s both;">',
      sanitizeHTML(badge.icon),
      '</div>',
      '<h3 style="color: #ffd93d; font-size: 24px; margin-bottom: 8px; font-weight: 700;">',
      '¡Insignia Desbloqueada!</h3>',
      '<h4 style="color: #fff; font-size: 20px; margin-bottom: 12px; font-weight: 600;">',
      sanitizeHTML(badge.name),
      '</h4>',
      '<p style="color: rgba(255,255,255,0.7); font-size: 15px; line-height: 1.5;">',
      sanitizeHTML(badge.description),
      '</p>'
    ].join('');

    // Inyectar animación de rebote si no existe
    if (!document.getElementById('badge-modal-styles')) {
      var style = document.createElement('style');
      style.id = 'badge-modal-styles';
      style.textContent = [
        '@keyframes badge-bounce {',
        '  0% { transform: scale(0); }',
        '  50% { transform: scale(1.3); }',
        '  70% { transform: scale(0.9); }',
        '  100% { transform: scale(1); }',
        '}'
      ].join('\n');
      document.head.appendChild(style);
    }

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Animar entrada
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        overlay.style.opacity = '1';
        modal.style.transform = 'scale(1)';
      });
    });

    /**
     * Cierra y remueve el modal
     */
    function closeModal() {
      overlay.style.opacity = '0';
      modal.style.transform = 'scale(0.5)';
      setTimeout(function () {
        if (overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
        }
      }, 300);
    }

    // Cerrar al hacer clic en el overlay
    overlay.addEventListener('click', function () {
      closeModal();
    });

    // Auto-cerrar después de 4 segundos
    setTimeout(function () {
      closeModal();
    }, 4000);
  }

  // Exponer globalmente
  window.showBadgeModal = showBadgeModal;

  // =====================
  // Actualizar UI con progreso
  // =====================

  /**
   * Actualiza los elementos de la UI que muestran el progreso actual.
   * Busca: .progress-bar, .xp-display, .streak-display
   */
  function updateProgressUI() {
    if (!window.WebCraftProgress) return;

    // Actualizar barras de progreso
    var progressBars = document.querySelectorAll('.progress-bar');
    for (var i = 0; i < progressBars.length; i++) {
      var totalLessons = parseInt(progressBars[i].getAttribute('data-total'), 10) || 10;
      var percentage = window.WebCraftProgress.getPercentage(totalLessons);
      var fill = progressBars[i].querySelector('.progress-fill') || progressBars[i];
      fill.style.width = percentage + '%';

      // Actualizar texto de porcentaje si existe
      var percentText = progressBars[i].querySelector('.progress-text') ||
        progressBars[i].parentElement && progressBars[i].parentElement.querySelector('.progress-text');
      if (percentText) {
        percentText.textContent = percentage + '%';
      }
    }

    // Actualizar display de XP
    var xpDisplays = document.querySelectorAll('.xp-display');
    for (var j = 0; j < xpDisplays.length; j++) {
      xpDisplays[j].textContent = window.WebCraftProgress.getTotalXP();
    }

    // Actualizar display de racha
    var streakDisplays = document.querySelectorAll('.streak-display');
    for (var k = 0; k < streakDisplays.length; k++) {
      streakDisplays[k].textContent = window.WebCraftProgress.getStreak();
    }
  }

  // Exponer globalmente
  window.updateProgressUI = updateProgressUI;

  // =====================
  // Lógica de la página de lección (leccion.html)
  // =====================

  /**
   * Inicializa la lógica específica de la página de lección individual.
   * Carga los datos de la lección, configura el editor y el botón de completar.
   */
  function initLessonPage() {
    // Verificar que estamos en la página de lección
    if (!window.location.pathname.includes('leccion.html') &&
      !window.location.pathname.includes('leccion')) {
      return;
    }

    // Obtener el ID de la lección de la URL
    var params = new URLSearchParams(window.location.search);
    var lessonId = parseInt(params.get('id'), 10);

    if (!lessonId || isNaN(lessonId)) {
      console.warn('[WebCraft] No se encontró un ID de lección válido en la URL');
      return;
    }

    // Verificar que existe el array de lecciones
    if (!window.lessons || !Array.isArray(window.lessons)) {
      console.warn('[WebCraft] No se encontró el array de lecciones (window.lessons)');
      return;
    }

    // Buscar la lección por ID
    var lesson = null;
    for (var i = 0; i < window.lessons.length; i++) {
      if (window.lessons[i].id === lessonId) {
        lesson = window.lessons[i];
        break;
      }
    }

    if (!lesson) {
      console.warn('[WebCraft] No se encontró la lección con ID: ' + lessonId);
      return;
    }

    // --- Poblar la información de la lección ---
    var titleEl = document.querySelector('#lessonTitle') || document.querySelector('.lesson-title');
    if (titleEl) {
      titleEl.textContent = lesson.title || '';
    }

    var contentEl = document.querySelector('#lessonContent') || document.querySelector('.lesson-content');
    if (contentEl && lesson.content) {
      // El contenido puede ser HTML seguro (generado por nosotros, no por el usuario)
      contentEl.innerHTML = lesson.content;
    }

    // Meta información (categoría, duración, XP)
    var categoryEl = document.querySelector('#lessonCategory') || document.querySelector('.lesson-category');
    if (categoryEl && lesson.category) {
      categoryEl.textContent = lesson.category.toUpperCase();
      // Update chip color
      categoryEl.className = 'chip chip-' + lesson.category.toLowerCase();
    }

    var levelEl = document.querySelector('#lessonLevel') || document.querySelector('.lesson-level');
    if (levelEl && lesson.level) {
      levelEl.textContent = '📊 ' + lesson.level;
    }

    var xpEl = document.querySelector('#lessonXP') || document.querySelector('.lesson-xp');
    if (xpEl && lesson.xp) {
      xpEl.textContent = '⚡ ' + lesson.xp + ' XP';
    }

    var numberEl = document.querySelector('#lessonNumber');
    if (numberEl) {
      numberEl.textContent = '📚 Lección ' + lessonId + ' de ' + window.lessons.length;
    }
    
    var challengeEl = document.querySelector('#lessonChallenge');
    if (challengeEl && lesson.challenge) {
      challengeEl.textContent = lesson.challenge;
    }

    // --- Inicializar el editor con el código de la lección ---
    var editorTextarea = document.querySelector('#editorTextarea') || document.querySelector('.editor-textarea');
    if (editorTextarea && lesson.initialCode) {
      editorTextarea.value = lesson.initialCode;
    }

    // Inicializar el editor
    if (window.WebCraftEditor) {
      window.WebCraftEditor.init('#codeEditor');
    }

    // --- Botón de completar lección ---
    var completeBtn = document.querySelector('#completeLesson') || document.querySelector('.btn-complete');
    if (completeBtn) {
      // Verificar si ya está completada
      if (window.WebCraftProgress && window.WebCraftProgress.isCompleted(lessonId)) {
        completeBtn.textContent = 'Completada ✅';
        completeBtn.disabled = true;
        completeBtn.classList.add('completed');
      } else {
        completeBtn.addEventListener('click', function () {
          if (!window.WebCraftProgress) return;

          // Verificar si el usuario ha modificado el código
          var currentCode = editorTextarea ? editorTextarea.value.trim() : '';
          var initialCode = lesson.initialCode ? lesson.initialCode.trim() : '';
          
          if (currentCode === initialCode) {
            if (window.showToast) {
              window.showToast('¡Intenta modificar el código primero para completar el reto! 👨‍💻', 'warning');
            }
            return;
          }

          // Validación específica por lección para asegurar que cumplieron el reto
          var codeLower = currentCode.toLowerCase();
          var isValid = true;
          var missingMessage = 'Faltan elementos requeridos en tu código.';

          // Funciones de ayuda
          var count = function(str) {
            var matches = codeLower.match(new RegExp(str, 'g'));
            return matches ? matches.length : 0;
          };

          switch (lessonId) {
            case 1:
              // Deben cambiar el texto original
              isValid = !codeLower.includes('mi primera página') && 
                        !codeLower.includes('¡hola mundo!') && 
                        !codeLower.includes('esta es mi primera página web');
              missingMessage = 'Debes cambiar el texto original del título, el h1 y el párrafo con tus propios datos.';
              break;
            case 2:
              isValid = codeLower.includes('<hr>') && 
                        codeLower.includes('target="_blank"') && 
                        codeLower.includes('href="#') && 
                        count('<h2') >= 2;
              missingMessage = 'Asegúrate de incluir una línea <hr>, un enlace con target="_blank", un enlace interno (href="#..."), y al menos dos subtítulos <h2>.';
              break;
            case 3:
              isValid = codeLower.includes('<header>') && codeLower.includes('<nav>') && 
                        codeLower.includes('<main>') && codeLower.includes('<section>') && 
                        codeLower.includes('<footer>') && codeLower.includes('<ol>');
              missingMessage = 'Faltan etiquetas semánticas (header, nav, main, section, footer) o la lista ordenada (<ol>).';
              break;
            case 4:
              isValid = codeLower.includes('type="password"') && codeLower.includes('type="radio"') && 
                        codeLower.includes('type="checkbox"') && codeLower.includes('<select');
              missingMessage = 'Tu formulario debe incluir un campo password, botones radio, un checkbox y un select (desplegable).';
              break;
            case 5:
              isValid = codeLower.includes('colspan') && codeLower.includes('rowspan') && 
                        (codeLower.includes('<video') || codeLower.includes('<audio'));
              missingMessage = 'La tabla necesita los atributos colspan y rowspan. También debes añadir un <video> o <audio>.';
              break;
            case 6:
              isValid = codeLower.includes('rgb') && codeLower.includes('text-decoration: underline');
              missingMessage = 'Asegúrate de usar un color rgb() y aplicar text-decoration: underline a un texto.';
              break;
            case 7:
              isValid = codeLower.includes(':hover') && codeLower.includes(':nth-child');
              missingMessage = 'Debes usar las pseudo-clases :hover y :nth-child en tu CSS.';
              break;
            case 8:
              isValid = count('border-radius') >= 1 && codeLower.includes('box-sizing: border-box');
              missingMessage = 'Asegúrate de aplicar border-radius y usar box-sizing: border-box.';
              break;
            case 9:
              isValid = codeLower.includes('justify-content: space-between') && codeLower.includes('flex-wrap: wrap') && codeLower.includes('gap');
              missingMessage = 'Falta aplicar Flexbox correctamente: asegúrate de usar justify-content: space-between, flex-wrap: wrap y gap.';
              break;
            case 10:
              isValid = codeLower.includes('@media') && codeLower.includes('grid-column: span 2');
              missingMessage = 'Debes incluir una regla @media para móviles y usar grid-column: span 2 en uno de los elementos.';
              break;
          }

          if (!isValid) {
            if (window.showToast) {
              window.showToast('❌ ' + missingMessage, 'warning');
            }
            return;
          }

          var xpReward = lesson.xp || 50;
          var result = window.WebCraftProgress.completeLesson(lessonId, xpReward);

          if (result.alreadyCompleted) {
            showToast('Ya completaste esta lección', 'info');
            return;
          }

          // Mostrar confetti
          showConfetti();

          // Mostrar toast con XP ganado
          showToast('¡+' + result.newXP + ' XP ganados!', 'success');

          // Mostrar modal para cada nueva insignia
          if (result.newBadges && result.newBadges.length > 0) {
            result.newBadges.forEach(function (badge, index) {
              setTimeout(function () {
                showBadgeModal(badge);
              }, (index + 1) * 1500);
            });
          }

          // Actualizar botón
          completeBtn.textContent = 'Completada ✅';
          completeBtn.disabled = true;
          completeBtn.classList.add('completed');

          // Actualizar UI
          updateProgressUI();
        });
      }
    }

    // --- Navegación anterior/siguiente ---
    var prevBtn = document.querySelector('#prevLesson') || document.querySelector('.btn-prev');
    var nextBtn = document.querySelector('#nextLesson') || document.querySelector('.btn-next');

    if (prevBtn) {
      if (lessonId > 1) {
        prevBtn.setAttribute('href', 'leccion.html?id=' + (lessonId - 1));
        prevBtn.classList.remove('disabled');
      } else {
        prevBtn.classList.add('disabled');
        prevBtn.style.pointerEvents = 'none';
        prevBtn.style.opacity = '0.5';
      }
    }

    if (nextBtn) {
      // Verificar si hay una siguiente lección
      var hasNext = false;
      for (var n = 0; n < window.lessons.length; n++) {
        if (window.lessons[n].id === lessonId + 1) {
          hasNext = true;
          break;
        }
      }

      if (hasNext) {
        nextBtn.setAttribute('href', 'leccion.html?id=' + (lessonId + 1));
        nextBtn.classList.remove('disabled');
      } else {
        nextBtn.classList.add('disabled');
        nextBtn.style.pointerEvents = 'none';
        nextBtn.style.opacity = '0.5';
      }
    }
  }

  // =====================
  // Lógica de la página de lecciones (lecciones.html)
  // =====================

  /**
   * Inicializa la lógica específica de la página del roadmap de lecciones.
   * Renderiza las lecciones con su estado (completada, disponible, bloqueada).
   */
  function initLessonsPage() {
    // Verificar que estamos en la página de lecciones
    var path = window.location.pathname;
    if (!path.includes('lecciones.html') && !path.includes('lecciones')) {
      return;
    }

    // Verificar que existe el array de lecciones
    if (!window.lessons || !Array.isArray(window.lessons)) {
      console.warn('[WebCraft] No se encontró el array de lecciones (window.lessons)');
      return;
    }

    var roadmapContainer = document.querySelector('#roadmapContainer') ||
      document.querySelector('.roadmap-container') ||
      document.querySelector('.roadmap');

    if (!roadmapContainer) {
      console.warn('[WebCraft] No se encontró el contenedor del roadmap');
      return;
    }

    // Construir el roadmap
    var html = '';
    for (var i = 0; i < window.lessons.length; i++) {
      var lesson = window.lessons[i];
      var lessonId = lesson.id;

      // Determinar el estado de la lección
      var isCompleted = window.WebCraftProgress && window.WebCraftProgress.isCompleted(lessonId);
      var prevCompleted = lessonId === 1 ||
        (window.WebCraftProgress && window.WebCraftProgress.isCompleted(lessonId - 1));
      var isAvailable = prevCompleted && !isCompleted;
      var isLocked = !isCompleted && !prevCompleted;

      var stateClass = isCompleted ? 'completed' : (isAvailable ? 'available' : 'locked');
      var stateIcon = isCompleted ? '✅' : (isAvailable ? '▶️' : '🔒');
      var stateText = isCompleted ? 'Completada' : (isAvailable ? 'Disponible' : 'Bloqueada');

      html += '<div class="lesson-card ' + stateClass + ' animate-on-scroll" data-delay="' + (i * 100) + '">';
      html += '  <div class="lesson-card-header">';
      html += '    <span class="lesson-number">' + lessonId + '</span>';
      html += '    <span class="lesson-state-icon">' + stateIcon + '</span>';
      html += '  </div>';
      html += '  <h3 class="lesson-card-title">' + sanitizeHTML(lesson.title || '') + '</h3>';

      if (lesson.description) {
        html += '  <p class="lesson-card-desc">' + sanitizeHTML(lesson.description) + '</p>';
      }

      html += '  <div class="lesson-card-meta">';
      if (lesson.category) {
        html += '    <span class="lesson-meta-category">' + sanitizeHTML(lesson.category) + '</span>';
      }
      if (lesson.xp) {
        html += '    <span class="lesson-meta-xp">⚡ ' + lesson.xp + ' XP</span>';
      }
      html += '  </div>';

      html += '  <div class="lesson-card-footer">';
      if (isCompleted) {
        html += '    <span class="lesson-status completed">' + stateText + '</span>';
      } else if (isAvailable) {
        html += '    <a href="leccion.html?id=' + lessonId + '" class="btn-start-lesson">Comenzar</a>';
      } else {
        html += '    <span class="lesson-status locked">' + stateText + '</span>';
      }
      html += '  </div>';
      html += '</div>';
    }

    roadmapContainer.innerHTML = html;

    // --- Actualizar barra de progreso ---
    updateProgressUI();

    // --- Mostrar XP y racha ---
    var xpElements = document.querySelectorAll('.xp-display, .total-xp');
    for (var x = 0; x < xpElements.length; x++) {
      xpElements[x].textContent = window.WebCraftProgress ? window.WebCraftProgress.getTotalXP() : 0;
    }

    var streakElements = document.querySelectorAll('.streak-display, .current-streak');
    for (var s = 0; s < streakElements.length; s++) {
      streakElements[s].textContent = window.WebCraftProgress ? window.WebCraftProgress.getStreak() : 0;
    }

    // --- Renderizar insignias ---
    var badgesContainer = document.querySelector('.badges-grid') ||
      document.querySelector('.badges-container');

    if (badgesContainer && window.WebCraftBadges) {
      var allBadges = window.WebCraftBadges.getAll();
      var badgesHTML = '';

      for (var b = 0; b < allBadges.length; b++) {
        var badge = allBadges[b];
        var badgeClass = badge.unlocked ? 'badge-card unlocked' : 'badge-card locked';

        badgesHTML += '<div class="' + badgeClass + '">';
        badgesHTML += '  <span class="badge-icon">' + badge.icon + '</span>';
        badgesHTML += '  <span class="badge-name">' + sanitizeHTML(badge.name) + '</span>';
        badgesHTML += '  <span class="badge-desc">' + sanitizeHTML(badge.description) + '</span>';
        badgesHTML += '</div>';
      }

      badgesContainer.innerHTML = badgesHTML;
    }

    // --- Funcionalidad del botón de reiniciar progreso ---
    var resetBtn = document.querySelector('#resetProgress');
    if (resetBtn && window.WebCraftProgress) {
      resetBtn.addEventListener('click', function () {
        if (confirm('¿Estás seguro de que quieres reiniciar todo tu progreso? Perderás todas tus lecciones completadas, insignias, XP y rachas. Esta acción no se puede deshacer.')) {
          window.WebCraftProgress.reset();
          if (window.showToast) {
            window.showToast('Progreso reiniciado correctamente', 'success');
          }
          // Recargar la página después de un breve momento para reflejar los cambios
          setTimeout(function() {
            window.location.reload();
          }, 1000);
        }
      });
    }

    // Re-inicializar animaciones de scroll para los nuevos elementos
    setupScrollAnimations();
  }

  // =====================
  // Inicialización principal
  // =====================

  document.addEventListener('DOMContentLoaded', function () {
    try {
      // --- Inicializar sistemas ---
      if (window.WebCraftProgress) {
        window.WebCraftProgress.init();
      }

      if (window.WebCraftBadges) {
        window.WebCraftBadges.init();
      }

      // --- Configurar funcionalidades globales ---
      setupHeaderScroll();
      setupMobileMenu();
      setupScrollAnimations();
      setupAnimatedCounters();
      setupActiveNavLink();
      setupSmoothScroll();
      updateProgressUI();

      // --- Inicializar lógica específica de página ---
      initLessonPage();
      initLessonsPage();

    } catch (e) {
      console.error('[WebCraft] Error durante la inicialización:', e);
    }
  });

})();
