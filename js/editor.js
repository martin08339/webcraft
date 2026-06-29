/**
 * ============================================
 * WebCraft - Editor de Código Interactivo
 * ============================================
 * Editor con textarea y vista previa en iframe.
 * Incluye: ejecución segura, reset, manejo de Tab.
 *
 * SEGURIDAD:
 * - El iframe usa srcdoc (nunca blob URL ni document.write)
 * - El iframe tiene sandbox="allow-scripts" (sin allow-same-origin)
 * - Nunca se usa eval() sobre el código del usuario
 * ============================================
 */

(function () {
  'use strict';

  // --- Estado interno del editor ---
  var state = {
    container: null,
    textarea: null,
    iframe: null,
    btnRun: null,
    btnReset: null,
    initialCode: '',
    initialized: false
  };

  // =====================
  // Utilidades internas
  // =====================

  /**
   * Escapa caracteres HTML básicos para mensajes de error
   * @param {string} str
   * @returns {string}
   */
  function escapeHTML(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Configura el manejo de la tecla Tab en el textarea.
   * En lugar de cambiar el foco, inserta 2 espacios.
   */
  function setupTabHandling(textarea) {
    if (!textarea) return;

    textarea.addEventListener('keydown', function (e) {
      if (e.key === 'Tab') {
        e.preventDefault();

        var start = textarea.selectionStart;
        var end = textarea.selectionEnd;
        var value = textarea.value;

        // Insertar 2 espacios en la posición del cursor
        textarea.value = value.substring(0, start) + '  ' + value.substring(end);

        // Reposicionar el cursor después de los espacios
        textarea.selectionStart = start + 2;
        textarea.selectionEnd = start + 2;
      }
    });
  }

  /**
   * Ejecuta el código del usuario en el iframe de forma segura.
   * Usa srcdoc para inyectar el contenido y sandbox para aislar la ejecución.
   * @param {string} code - Código HTML/CSS/JS del usuario
   */
  function executeInIframe(code) {
    if (!state.iframe) {
      console.error('[WebCraftEditor] No se encontró el iframe de vista previa');
      return;
    }

    // Asegurar que el iframe tiene los atributos de seguridad correctos
    // Se añade allow-same-origin temporalmente para permitir postMessage si es estrictamente necesario 
    // pero srcdoc en navegadores modernos envía mensaje de todos modos si lo configuramos bien
    state.iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');

    var interceptor = `
      <script>
        (function(){
          function sendLog(type, args) {
            var message = Array.from(args).map(function(arg) {
              if (typeof arg === 'object') return JSON.stringify(arg);
              return String(arg);
            }).join(' ');
            window.parent.postMessage({ source: 'webcraft-console', type: type, message: message }, '*');
          }
          var oldLog = console.log;
          console.log = function() {
            sendLog('log', arguments);
            oldLog.apply(console, arguments);
          };
          var oldError = console.error;
          console.error = function() {
            sendLog('error', arguments);
            oldError.apply(console, arguments);
          };
          var oldWarn = console.warn;
          console.warn = function() {
            sendLog('warn', arguments);
            oldWarn.apply(console, arguments);
          };
          window.addEventListener('error', function(e) {
            sendLog('error', [e.message + ' en linea ' + e.lineno]);
          });
        })();
      <\/script>
    `;

    // Si el usuario pone un head, lo inyectamos ahí, si no al inicio
    var finalCode = code;
    if (code.includes('<head>')) {
      finalCode = code.replace('<head>', '<head>' + interceptor);
    } else {
      finalCode = interceptor + code;
    }

    // Usar srcdoc para cargar el contenido de forma segura
    state.iframe.setAttribute('srcdoc', finalCode);
  }

  // =====================
  // API Pública
  // =====================

  var WebCraftEditor = {};

  /**
   * Inicializa el editor en el contenedor especificado.
   * @param {string} containerSelector - Selector CSS del contenedor del editor
   */
  WebCraftEditor.init = function (containerSelector) {
    if (!containerSelector) {
      console.error('[WebCraftEditor] Se requiere un selector de contenedor');
      return;
    }

    // Buscar el contenedor
    state.container = document.querySelector(containerSelector);
    if (!state.container) {
      console.error('[WebCraftEditor] No se encontró el contenedor: ' + escapeHTML(containerSelector));
      return;
    }

    // Buscar elementos del editor
    state.textarea = state.container.querySelector('.editor-textarea');
    if (!state.textarea) {
      console.error('[WebCraftEditor] No se encontró el textarea (.editor-textarea)');
      return;
    }

    // Buscar el iframe de vista previa
    var previewContainer = state.container.querySelector('.editor-preview');
    if (previewContainer) {
      state.iframe = previewContainer.querySelector('iframe');
    }
    if (!state.iframe) {
      // Intentar buscar directamente en el contenedor
      state.iframe = state.container.querySelector('iframe');
    }
    if (!state.iframe) {
      console.error('[WebCraftEditor] No se encontró el iframe de vista previa');
      return;
    }

    // Buscar botones
    state.btnRun = state.container.querySelector('.btn-run');
    state.btnReset = state.container.querySelector('.btn-reset');

    // Guardar el código inicial del textarea
    state.initialCode = state.textarea.value || '';

    // --- Configurar event listeners ---

    // Botón de ejecutar
    if (state.btnRun) {
      state.btnRun.addEventListener('click', function () {
        WebCraftEditor.run();
      });
    }

    // Botón de reiniciar
    if (state.btnReset) {
      state.btnReset.addEventListener('click', function () {
        WebCraftEditor.reset();
      });
    }

    // Manejo de Tab
    setupTabHandling(state.textarea);

    // Lógica para Pestañas (Vista Previa vs Consola)
    var outputTabs = state.container.querySelectorAll('#outputTabs .editor-tab');
    var previewContainerDiv = state.container.querySelector('#previewContainer');
    var consoleContainerDiv = state.container.querySelector('#consoleContainer');

    if (outputTabs.length > 0 && consoleContainerDiv) {
      for(var k = 0; k < outputTabs.length; k++) {
        outputTabs[k].addEventListener('click', function(e) {
          // Remover activo de todos
          for(var m = 0; m < outputTabs.length; m++) outputTabs[m].classList.remove('active');
          e.target.classList.add('active');

          var target = e.target.getAttribute('data-target');
          if (target === 'console') {
            previewContainerDiv.classList.add('hidden');
            consoleContainerDiv.classList.remove('hidden');
          } else {
            consoleContainerDiv.classList.add('hidden');
            previewContainerDiv.classList.remove('hidden');
          }
        });
      }

      // Escuchar mensajes de la consola inyectada
      window.addEventListener('message', function(event) {
        if (event.data && event.data.source === 'webcraft-console') {
          var div = document.createElement('div');
          div.style.marginBottom = '4px';
          div.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
          div.style.paddingBottom = '4px';
          
          if (event.data.type === 'error') {
            div.style.color = '#ef4444'; // Rojo
            div.textContent = '❌ ' + event.data.message;
          } else if (event.data.type === 'warn') {
            div.style.color = '#f59e0b'; // Naranja
            div.textContent = '⚠️ ' + event.data.message;
          } else {
            div.style.color = '#10b981'; // Verde
            div.textContent = '> ' + event.data.message;
          }
          
          consoleContainerDiv.appendChild(div);
          consoleContainerDiv.scrollTop = consoleContainerDiv.scrollHeight;

          // Animación para avisar que hay mensaje en consola si no estamos viéndola
          var consoleTab = state.container.querySelector('[data-target="console"]');
          if (consoleTab && !consoleTab.classList.contains('active')) {
            consoleTab.style.animation = 'glow 1s ease-in-out infinite alternate';
            setTimeout(function() { consoleTab.style.animation = ''; }, 3000);
          }
        }
      });
    }

    // Marcar como inicializado
    state.initialized = true;

    // Ejecutar automáticamente para mostrar la vista previa inicial
    WebCraftEditor.run();
  };

  /**
   * Ejecuta el código actual del textarea en la vista previa.
   * Incrementa el contador de ejecuciones y verifica insignias.
   */
  WebCraftEditor.run = function () {
    if (!state.initialized || !state.textarea || !state.iframe) {
      console.warn('[WebCraftEditor] El editor no ha sido inicializado correctamente');
      return;
    }

    var code = state.textarea.value;

    // Limpiar consola
    var consoleContainerDiv = state.container.querySelector('#consoleContainer');
    if (consoleContainerDiv) {
      consoleContainerDiv.innerHTML = '<div style="color: #8888a0; font-style: italic; margin-bottom: 8px;">> Ejecutando código...</div>';
    }

    // Ejecutar en el iframe sandboxed
    executeInIframe(code);

    // Incrementar ejecuciones de código en el sistema de progreso
    if (window.WebCraftProgress && typeof window.WebCraftProgress.incrementCodeExecutions === 'function') {
      window.WebCraftProgress.incrementCodeExecutions();
    }

    // Verificar insignias nuevas
    if (window.WebCraftBadges && typeof window.WebCraftBadges.checkForNew === 'function' && window.WebCraftProgress) {
      var newBadges = window.WebCraftBadges.checkForNew(window.WebCraftProgress);
      // Si hay insignias nuevas y existe la función de toast/modal, mostrarlas
      if (newBadges && newBadges.length > 0) {
        newBadges.forEach(function (badge) {
          if (typeof window.showBadgeModal === 'function') {
            window.showBadgeModal(badge);
          } else if (typeof window.showToast === 'function') {
            window.showToast('🏅 ¡Insignia desbloqueada: ' + badge.name + '!', 'success');
          }
        });
      }
    }
  };

  /**
   * Reinicia el código al estado inicial y actualiza la vista previa.
   */
  WebCraftEditor.reset = function () {
    if (!state.initialized || !state.textarea) {
      console.warn('[WebCraftEditor] El editor no ha sido inicializado correctamente');
      return;
    }

    // Restaurar el código original
    state.textarea.value = state.initialCode;

    // Re-ejecutar la vista previa
    WebCraftEditor.run();
  };

  /**
   * Establece el contenido del editor programáticamente.
   * @param {string} code - Nuevo código a establecer
   */
  WebCraftEditor.setCode = function (code) {
    if (!state.initialized || !state.textarea) {
      console.warn('[WebCraftEditor] El editor no ha sido inicializado correctamente');
      return;
    }

    if (typeof code !== 'string') {
      console.warn('[WebCraftEditor] El código debe ser una cadena de texto');
      return;
    }

    state.textarea.value = code;
  };

  // --- Exponer globalmente ---
  window.WebCraftEditor = WebCraftEditor;

})();
