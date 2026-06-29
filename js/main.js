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

          // Validación específica usando DOMParser para evitar trampas
          var parser = new DOMParser();
          var doc = parser.parseFromString(currentCode, 'text/html');
          
          var isValid = true;
          var missingMessage = 'Faltan elementos requeridos en tu código.';

          switch (lessonId) {
            case 1:
              var titleEl = doc.querySelector('title');
              var h1El = doc.querySelector('h1');
              var pEl = doc.querySelector('p');
              
              if (!titleEl || !h1El || !pEl) {
                isValid = false;
                missingMessage = 'Tu código debe incluir al menos un <title>, un <h1> y un <p>.';
              } else {
                var tText = titleEl.textContent.toLowerCase();
                var hText = h1El.textContent.toLowerCase();
                var pText = pEl.textContent.toLowerCase();
                
                if (tText.includes('primera') || hText.includes('mundo') || pText.includes('página')) {
                  isValid = false;
                  missingMessage = '¡Borra las frases originales y escribe tu propio título, nombre y ciudad!';
                } else if (tText.length < 3 || hText.length < 3 || pText.length < 3) {
                  isValid = false;
                  missingMessage = 'El texto que escribiste es muy corto. Intenta ser más descriptivo.';
                }
              }
              break;

            case 2:
              if (!doc.querySelector('h1')) { isValid = false; missingMessage = 'Falta el <h1>.'; break; }
              if (doc.querySelectorAll('h2').length < 2) { isValid = false; missingMessage = 'Necesitas al menos dos <h2>.'; break; }
              if (doc.querySelectorAll('p').length < 3) { isValid = false; missingMessage = 'Necesitas al menos tres párrafos <p>.'; break; }
              if (!doc.querySelector('strong')) { isValid = false; missingMessage = 'Usa la etiqueta <strong>.'; break; }
              if (!doc.querySelector('em')) { isValid = false; missingMessage = 'Usa la etiqueta <em>.'; break; }
              if (!doc.querySelector('a[target="_blank"]')) { isValid = false; missingMessage = 'Falta un enlace con target="_blank".'; break; }
              if (!doc.querySelector('a[href^="#"]')) { isValid = false; missingMessage = 'Falta un enlace interno (href="#...").'; break; }
              if (!doc.querySelector('hr')) { isValid = false; missingMessage = 'Falta la línea horizontal <hr>.'; break; }
              break;

            case 3:
              if (!doc.querySelector('header') || !doc.querySelector('nav') || !doc.querySelector('main') || !doc.querySelector('section') || !doc.querySelector('footer')) {
                isValid = false; missingMessage = 'Usa TODAS las etiquetas semánticas: header, nav, main, section, footer.'; break;
              }
              if (!doc.querySelector('img[alt]')) { isValid = false; missingMessage = 'Falta una <img> con el atributo alt.'; break; }
              if (doc.querySelectorAll('ul li').length < 4) { isValid = false; missingMessage = 'Tu lista desordenada <ul> necesita al menos 4 elementos <li>.'; break; }
              if (doc.querySelectorAll('ol li').length < 3) { isValid = false; missingMessage = 'Tu lista ordenada <ol> necesita al menos 3 pasos <li>.'; break; }
              if (doc.querySelectorAll('nav a').length < 3) { isValid = false; missingMessage = 'Tu menú <nav> necesita al menos 3 enlaces <a>.'; break; }
              break;

            case 4:
              if (!doc.querySelector('form')) { isValid = false; missingMessage = 'Envuelve todo en una etiqueta <form>.'; break; }
              if (!doc.querySelector('input[type="email"]')) { isValid = false; missingMessage = 'Falta un input de tipo email.'; break; }
              if (!doc.querySelector('input[type="password"]')) { isValid = false; missingMessage = 'Falta un input de tipo password.'; break; }
              if (!doc.querySelector('select')) { isValid = false; missingMessage = 'Falta un menú desplegable <select>.'; break; }
              if (!doc.querySelector('input[type="radio"]')) { isValid = false; missingMessage = 'Falta al menos un botón de radio.'; break; }
              if (!doc.querySelector('input[type="checkbox"]')) { isValid = false; missingMessage = 'Falta una casilla de verificación (checkbox).'; break; }
              if (doc.querySelectorAll('label').length < 5) { isValid = false; missingMessage = 'Usa al menos 5 etiquetas <label> para tus campos.'; break; }
              break;

            case 5:
              if (!doc.querySelector('table')) { isValid = false; missingMessage = 'Falta la etiqueta <table>.'; break; }
              if (!doc.querySelector('thead') || !doc.querySelector('tbody')) { isValid = false; missingMessage = 'La tabla debe tener <thead> y <tbody>.'; break; }
              if (!doc.querySelector('th[colspan]') && !doc.querySelector('td[colspan]')) { isValid = false; missingMessage = 'Falta usar el atributo colspan.'; break; }
              if (!doc.querySelector('th[rowspan]') && !doc.querySelector('td[rowspan]')) { isValid = false; missingMessage = 'Falta usar el atributo rowspan.'; break; }
              if (!doc.querySelector('video[controls]') && !doc.querySelector('audio[controls]')) { isValid = false; missingMessage = 'Falta un <video> o <audio> con controles.'; break; }
              break;
              
            case 6:
              var style6 = doc.querySelector('style');
              if (!style6) { isValid = false; missingMessage = 'Falta la etiqueta <style>.'; break; }
              var cssText6 = style6.textContent.toLowerCase();
              if (!cssText6.includes('background-color')) { isValid = false; missingMessage = 'Usa background-color en tu CSS.'; break; }
              if (!cssText6.includes('rgb')) { isValid = false; missingMessage = 'Falta usar un color rgb().'; break; }
              if (!cssText6.includes('text-decoration: underline')) { isValid = false; missingMessage = 'Falta usar text-decoration: underline.'; break; }
              break;
              
            case 7:
              var style7 = doc.querySelector('style');
              if (!style7) { isValid = false; missingMessage = 'Falta la etiqueta <style>.'; break; }
              var cssText7 = style7.textContent.toLowerCase();
              if (!cssText7.includes(':hover')) { isValid = false; missingMessage = 'Falta usar la pseudo-clase :hover.'; break; }
              if (!cssText7.includes(':nth-child')) { isValid = false; missingMessage = 'Falta usar la pseudo-clase :nth-child.'; break; }
              break;
              
            case 8:
              var style8 = doc.querySelector('style');
              if (!style8) { isValid = false; missingMessage = 'Falta la etiqueta <style>.'; break; }
              var cssText8 = style8.textContent.toLowerCase();
              if (!cssText8.includes('border-radius')) { isValid = false; missingMessage = 'Usa border-radius para redondear las esquinas.'; break; }
              if (!cssText8.includes('box-sizing: border-box')) { isValid = false; missingMessage = 'Asegúrate de incluir box-sizing: border-box.'; break; }
              break;

            case 9:
              var style9 = doc.querySelector('style');
              if (!style9) { isValid = false; missingMessage = 'Falta la etiqueta <style>.'; break; }
              var cssText9 = style9.textContent.toLowerCase();
              if (!cssText9.includes('justify-content: space-between')) { isValid = false; missingMessage = 'Falta justify-content: space-between.'; break; }
              if (!cssText9.includes('flex-wrap: wrap')) { isValid = false; missingMessage = 'Falta flex-wrap: wrap.'; break; }
              if (!cssText9.includes('gap')) { isValid = false; missingMessage = 'Usa la propiedad gap.'; break; }
              break;

            case 10:
              var style10 = doc.querySelector('style');
              if (!style10) { isValid = false; missingMessage = 'Falta la etiqueta <style>.'; break; }
              var cssText10 = style10.textContent.toLowerCase();
              if (!cssText10.includes('@media')) { isValid = false; missingMessage = 'Falta la media query (@media).'; break; }
              if (!cssText10.includes('grid-column: span 2')) { isValid = false; missingMessage = 'Haz que un elemento ocupe dos columnas con grid-column: span 2.'; break; }
              break;

            case 11:
              var script11 = doc.querySelector('script');
              if (!script11) { isValid = false; missingMessage = 'Escribe tu código dentro de <script>.'; break; }
              var code11 = script11.textContent;
              if (!code11.includes('let mensaje')) { isValid = false; missingMessage = 'Debes declarar una variable let llamada mensaje.'; break; }
              if (!code11.includes('console.log(mensaje)')) { isValid = false; missingMessage = 'Usa console.log(mensaje) para mostrarla.'; break; }
              break;

            case 12:
              var script12 = doc.querySelector('script');
              if (!script12) { isValid = false; missingMessage = 'Falta <script>.'; break; }
              var code12 = script12.textContent;
              if (!code12.includes('return')) { isValid = false; missingMessage = 'Debes usar la palabra clave return.'; break; }
              if (!code12.includes('Bienvenido a JS')) { isValid = false; missingMessage = 'Debes retornar exactamente "Bienvenido a JS".'; break; }
              break;

            case 13:
              var script13 = doc.querySelector('script');
              if (!script13) { isValid = false; missingMessage = 'Falta <script>.'; break; }
              var code13 = script13.textContent;
              if (!code13.includes('if')) { isValid = false; missingMessage = 'Falta el if.'; break; }
              if (!code13.includes('else')) { isValid = false; missingMessage = 'Falta el else.'; break; }
              if (!code13.includes('Mayor') || !code13.includes('Menor')) { isValid = false; missingMessage = 'Asigna "Mayor" y "Menor" a la variable resultado.'; break; }
              break;

            case 14:
              var script14 = doc.querySelector('script');
              if (!script14) { isValid = false; missingMessage = 'Falta <script>.'; break; }
              var code14 = script14.textContent;
              if (!code14.includes('for')) { isValid = false; missingMessage = 'Debes usar un bucle for.'; break; }
              break;

            case 15:
              var script15 = doc.querySelector('script');
              if (!script15) { isValid = false; missingMessage = 'Falta <script>.'; break; }
              var code15 = script15.textContent;
              if (!code15.includes('getElementById')) { isValid = false; missingMessage = 'Falta document.getElementById.'; break; }
              if (!code15.includes('textContent') && !code15.includes('innerHTML')) { isValid = false; missingMessage = 'Modifica el textContent o innerHTML.'; break; }
              if (!code15.includes('JS activado')) { isValid = false; missingMessage = 'El texto debe ser "JS activado".'; break; }
              break;

            case 16:
              var script16 = doc.querySelector('script');
              if (!script16) { isValid = false; missingMessage = 'Falta <script>.'; break; }
              var code16 = script16.textContent;
              if (!code16.includes('let productos') && !code16.includes('const productos')) { isValid = false; missingMessage = 'Debes crear un arreglo productos.'; break; }
              if (!code16.includes('{') || !code16.includes('id') || !code16.includes('nombre')) { isValid = false; missingMessage = 'El arreglo debe contener objetos con id y nombre.'; break; }
              break;

            case 17:
              var script17 = doc.querySelector('script');
              if (!script17) { isValid = false; missingMessage = 'Falta <script>.'; break; }
              var code17 = script17.textContent;
              if (!code17.includes('.filter')) { isValid = false; missingMessage = 'Debes usar el método .filter().'; break; }
              if (!code17.includes('activos')) { isValid = false; missingMessage = 'Guárdalo en la variable activos.'; break; }
              break;

            case 18:
              var script18 = doc.querySelector('script');
              if (!script18) { isValid = false; missingMessage = 'Falta <script>.'; break; }
              var code18 = script18.textContent;
              if (!code18.includes('for')) { isValid = false; missingMessage = 'Falta el bucle sobre los datos.'; break; }
              if (!code18.includes('innerHTML')) { isValid = false; missingMessage = 'Usa innerHTML para inyectar los <tr> y <td>.'; break; }
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

          // Sonido de éxito
          if (window.WebCraftSounds) window.WebCraftSounds.playSuccess();

          // Mostrar confetti
          showConfetti();

          // Mostrar toast con XP ganado
          showToast('¡+' + result.newXP + ' XP ganados!', 'success');

          // Mostrar modal para cada nueva insignia
          if (result.newBadges && result.newBadges.length > 0) {
            result.newBadges.forEach(function (badge, index) {
              setTimeout(function () {
                // Sonido de insignia
                if (window.WebCraftSounds) window.WebCraftSounds.playBadgeUnlock();
                showToast('🏆 ¡Insignia desbloqueada: ' + badge.name + '!', 'success');
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
  var activeCourse = 'html-css';

  /**
   * Inicializa la lógica específica de la página del roadmap de lecciones.
   */
  function initLessonsPage() {
    var path = window.location.pathname;
    if (!path.includes('lecciones.html') && !path.includes('lecciones')) return;
    if (!window.lessons || !Array.isArray(window.lessons)) return;

    var tabs = document.querySelectorAll('.course-tab');
    if (tabs.length > 0) {
      for(var i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener('click', function(e) {
          var tabsArr = document.querySelectorAll('.course-tab');
          for(var j = 0; j < tabsArr.length; j++) {
            tabsArr[j].classList.remove('active');
            tabsArr[j].classList.remove('btn-primary');
            tabsArr[j].classList.add('btn-ghost');
          }
          e.target.classList.remove('btn-ghost');
          e.target.classList.add('active');
          e.target.classList.add('btn-primary');
          
          activeCourse = e.target.getAttribute('data-course');
          renderRoadmap(activeCourse);
        });
      }
    }

    renderRoadmap(activeCourse);

    // --- Funcionalidad del botón de reiniciar progreso ---
    var resetBtn = document.querySelector('#resetProgress');
    if (resetBtn && window.WebCraftProgress) {
      resetBtn.addEventListener('click', function () {
        if (confirm('¿Estás seguro de que quieres reiniciar todo tu progreso? Perderás todas tus lecciones completadas, insignias, XP y rachas. Esta acción no se puede deshacer.')) {
          window.WebCraftProgress.reset();
          if (window.WebCraftBadges && typeof window.WebCraftBadges.reset === 'function') {
            window.WebCraftBadges.reset();
          }
          if (window.showToast) {
            window.showToast('Progreso reiniciado correctamente', 'success');
          }
          setTimeout(function() {
            window.location.reload();
          }, 1000);
        }
      });
    }
  }

  function renderRoadmap(courseId) {
    var roadmapContainer = document.querySelector('#roadmapContainer') ||
      document.querySelector('.roadmap-container') ||
      document.querySelector('.roadmap');

    if (!roadmapContainer) return;

    var html = '';
    var courseLessons = window.lessons.filter(function(l) { return l.course === courseId; });

    for (var i = 0; i < courseLessons.length; i++) {
      var lesson = courseLessons[i];
      var lessonId = lesson.id;

      // Determinar el estado de la lección
      var isCompleted = window.WebCraftProgress && window.WebCraftProgress.isCompleted(lessonId);
      var prevCompleted = i === 0 ||
        (window.WebCraftProgress && window.WebCraftProgress.isCompleted(courseLessons[i-1].id));
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

    setupScrollAnimations();

    // --- Lógica del Certificado ---
    var progressPercent = window.WebCraftProgress ? window.WebCraftProgress.getPercentage(10, courseId) : 0;
    
    if (progressPercent === 100) {
      var certBtnHtml = '<div class="lesson-card animate-on-scroll" style="text-align: center; border-color: var(--accent-cyan); background: var(--bg-card-hover);"><h3 style="color: var(--accent-cyan); margin-bottom: 12px;">🎓 ¡Felicidades! Has completado el curso</h3><p style="margin-bottom: 20px; color: var(--text-secondary);">Reclama tu certificado de graduación.</p><button class="btn btn-primary" id="btnOpenCertModal">Generar Certificado</button></div>';
      roadmapContainer.insertAdjacentHTML('afterbegin', certBtnHtml);

      var btnOpenCert = document.getElementById('btnOpenCertModal');
      var certModal = document.getElementById('certModal');
      var btnCloseCert = document.getElementById('btnCloseCert');
      var btnGenCert = document.getElementById('btnGenerateCert');
      var certName = document.getElementById('certName');

      if (btnOpenCert && certModal) {
        btnOpenCert.addEventListener('click', function() {
          certModal.classList.add('active');
          if (window.WebCraftSounds) window.WebCraftSounds.playBadgeUnlock();
        });

        if (btnCloseCert) {
          // Remover event listeners anteriores para no duplicarlos (usando cloneNode o simplemente asignando de nuevo)
          var newBtnClose = btnCloseCert.cloneNode(true);
          btnCloseCert.parentNode.replaceChild(newBtnClose, btnCloseCert);
          newBtnClose.addEventListener('click', function() {
            certModal.classList.remove('active');
          });
        }

        if (btnGenCert) {
          var newBtnGen = btnGenCert.cloneNode(true);
          btnGenCert.parentNode.replaceChild(newBtnGen, btnGenCert);
          newBtnGen.addEventListener('click', function() {
            var name = certName.value.trim();
            if (!name) {
              showToast('❌ Por favor ingresa tu nombre', 'warning');
              if (window.WebCraftSounds) window.WebCraftSounds.playError();
              return;
            }
            generateCertificate(name, courseId);
          });
        }
      }
    }
  }

  /**
   * Genera y descarga un certificado usando Canvas
   */
  function generateCertificate(name, courseId) {
    var canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 800;
    var ctx = canvas.getContext('2d');

    // Fondo oscuro premium
    ctx.fillStyle = '#0a0a0f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Borde brillante
    var grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#00d4ff');
    grad.addColorStop(1, '#7c3aed');
    ctx.strokeStyle = grad;
    ctx.lineWidth = 20;
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

    // Detalles decorativos
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(40, 40, canvas.width - 80, canvas.height - 80);

    // Texto: WebCraft
    ctx.font = 'bold 40px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText('Web', canvas.width / 2 - 45, 120);
    ctx.fillStyle = '#00d4ff';
    ctx.fillText('Craft', canvas.width / 2 + 35, 120);

    // Título
    ctx.font = 'bold 60px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('CERTIFICADO DE FINALIZACIÓN', canvas.width / 2, 250);

    // Subtítulo
    ctx.font = '30px sans-serif';
    ctx.fillStyle = '#8888a0';
    ctx.fillText('Se otorga el presente certificado a:', canvas.width / 2, 350);

    // Nombre del estudiante
    ctx.font = 'italic bold 70px serif';
    ctx.fillStyle = '#00d4ff';
    ctx.fillText(name, canvas.width / 2, 450);

    // Descripción del curso basada en el courseId
    var courseName = "Fundamentos de HTML y CSS";
    if (courseId === 'javascript') courseName = "Lógica y Programación JavaScript";
    if (courseId === 'database') courseName = "Integración de Datos Web";

    ctx.font = '24px sans-serif';
    ctx.fillStyle = '#e8e8ed';
    ctx.fillText('Por haber completado con éxito el curso "' + courseName + '"', canvas.width / 2, 550);
    ctx.fillText('demostrando dominio sobresaliente en desarrollo web.', canvas.width / 2, 590);

    // Fecha
    var today = new Date().toLocaleDateString('es-ES');
    ctx.font = '20px sans-serif';
    ctx.fillStyle = '#8888a0';
    ctx.fillText('Fecha de emisión: ' + today, canvas.width / 2, 700);

    // Descargar imagen
    var link = document.createElement('a');
    link.download = 'Certificado_' + courseId + '_' + name.replace(/\s+/g, '_') + '.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    if (window.showToast) window.showToast('✅ Certificado descargado', 'success');
  }

  // =====================
  // Inicialización principal
  // =====================

  document.addEventListener('DOMContentLoaded', function () {
    try {
      // --- Tema Claro / Oscuro ---
      var themeToggle = document.getElementById('themeToggle');
      if (themeToggle) {
        var currentTheme = localStorage.getItem('webcraft_theme') || 'dark';
        if (currentTheme === 'light') {
          document.body.setAttribute('data-theme', 'light');
          themeToggle.textContent = '🌙';
        }
        
        themeToggle.addEventListener('click', function() {
          var isLight = document.body.getAttribute('data-theme') === 'light';
          if (isLight) {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('webcraft_theme', 'dark');
            themeToggle.textContent = '☀️';
          } else {
            document.body.setAttribute('data-theme', 'light');
            localStorage.setItem('webcraft_theme', 'light');
            themeToggle.textContent = '🌙';
          }
        });
      }

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
      initPlaygroundPage();

    } catch (e) {
      console.error('[WebCraft] Error durante la inicialización:', e);
    }
  });

  /**
   * Inicializa la lógica específica de la página del playground
   */
  function initPlaygroundPage() {
    if (!window.location.pathname.includes('playground.html') && 
        !window.location.pathname.includes('playground')) {
      return;
    }
    
    // Inicializar el editor
    if (window.WebCraftEditor) {
      window.WebCraftEditor.init('#codeEditor');
    }
  }

})();
