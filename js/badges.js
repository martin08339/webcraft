/**
 * ============================================
 * WebCraft - Sistema de Insignias (Badges)
 * ============================================
 * Gestiona las insignias/logros del usuario.
 * Depende de progress.js (debe cargarse primero).
 *
 * Clave en localStorage: 'webcraft_badges'
 * ============================================
 */

(function () {
  'use strict';

  // --- Clave de almacenamiento ---
  var STORAGE_KEY = 'webcraft_badges';

  // --- Definición de todas las insignias disponibles ---
  var BADGES = [
    {
      id: 'first_step',
      name: 'Primer Paso',
      icon: '🌱',
      description: 'Completa tu primera lección',
      condition: function (progress) {
        return progress.getCompletedLessons().length >= 1;
      }
    },
    {
      id: 'html_master',
      name: 'Escritor HTML',
      icon: '📝',
      description: 'Completa todas las lecciones de HTML',
      condition: function (progress) {
        var completed = progress.getCompletedLessons();
        return [1, 2, 3, 4, 5].every(function (id) {
          return completed.indexOf(id) !== -1;
        });
      }
    },
    {
      id: 'css_artist',
      name: 'Artista CSS',
      icon: '🎨',
      description: 'Completa todas las lecciones de CSS',
      condition: function (progress) {
        var completed = progress.getCompletedLessons();
        return [6, 7, 8, 9, 10].every(function (id) {
          return completed.indexOf(id) !== -1;
        });
      }
    },
    {
      id: 'streak_3',
      name: 'Racha de 3',
      icon: '🔥',
      description: 'Practica 3 días seguidos',
      condition: function (progress) {
        return progress.getStreak() >= 3;
      }
    },
    {
      id: 'halfway',
      name: 'Mitad del Camino',
      icon: '⭐',
      description: 'Completa el 50% de las lecciones',
      condition: function (progress) {
        return progress.getPercentage(10) >= 50;
      }
    },
    {
      id: 'graduate',
      name: 'Graduado',
      icon: '🏆',
      description: 'Completa todas las lecciones',
      condition: function (progress) {
        return progress.getCompletedLessons().length >= 10;
      }
    },
    {
      id: 'first_code',
      name: 'Primer Código',
      icon: '💻',
      description: 'Ejecuta código en el editor por primera vez',
      condition: function (progress) {
        return progress.getCodeExecutions() >= 1;
      }
    },
    {
      id: 'speedster',
      name: 'Velocista',
      icon: '🚀',
      description: 'Completa 3 lecciones en un día',
      condition: function (progress) {
        return progress.getLessonsCompletedToday() >= 3;
      }
    }
  ];

  // --- Insignias desbloqueadas (array de IDs) ---
  var unlockedIds = [];

  // =====================
  // Utilidades internas
  // =====================

  /**
   * Carga las insignias desbloqueadas desde localStorage
   * @returns {string[]} Array de IDs de insignias desbloqueadas
   */
  function loadUnlocked() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw === null) {
        return [];
      }
      var parsed = JSON.parse(raw);

      // Validar que sea un array de strings
      if (!Array.isArray(parsed)) {
        return [];
      }

      // Filtrar solo strings válidos que correspondan a IDs existentes
      var validIds = BADGES.map(function (b) { return b.id; });
      return parsed.filter(function (id) {
        return typeof id === 'string' && validIds.indexOf(id) !== -1;
      });
    } catch (e) {
      console.error('[WebCraftBadges] Error al leer localStorage:', e);
      return [];
    }
  }

  /**
   * Guarda las insignias desbloqueadas en localStorage
   */
  function saveUnlocked() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(unlockedIds));
    } catch (e) {
      console.error('[WebCraftBadges] Error al guardar en localStorage:', e);
    }
  }

  /**
   * Busca un badge por su ID en la lista BADGES
   * @param {string} badgeId
   * @returns {object|null}
   */
  function findBadgeById(badgeId) {
    for (var i = 0; i < BADGES.length; i++) {
      if (BADGES[i].id === badgeId) {
        return BADGES[i];
      }
    }
    return null;
  }

  /**
   * Crea una copia segura del badge sin la función condition
   * @param {object} badge
   * @param {boolean} unlocked
   * @returns {object}
   */
  function safeBadgeCopy(badge, unlocked) {
    return {
      id: badge.id,
      name: badge.name,
      icon: badge.icon,
      description: badge.description,
      unlocked: unlocked
    };
  }

  // =====================
  // API Pública
  // =====================

  var WebCraftBadges = {};

  /**
   * Inicializa el sistema de insignias.
   * Carga las insignias desbloqueadas desde localStorage.
   */
  WebCraftBadges.init = function () {
    unlockedIds = loadUnlocked();
  };

  /**
   * Verifica todas las insignias y devuelve las NUEVAMENTE desbloqueadas.
   * Las insignias que ya estaban desbloqueadas no se incluyen.
   * @param {object} progress - Instancia de WebCraftProgress
   * @returns {object[]} Array de insignias recién desbloqueadas
   */
  WebCraftBadges.checkForNew = function (progress) {
    if (!progress) {
      console.warn('[WebCraftBadges] Se requiere el objeto de progreso para verificar insignias');
      return [];
    }

    var newlyUnlocked = [];

    for (var i = 0; i < BADGES.length; i++) {
      var badge = BADGES[i];

      // Saltar si ya está desbloqueada
      if (unlockedIds.indexOf(badge.id) !== -1) {
        continue;
      }

      // Evaluar la condición de la insignia
      try {
        if (badge.condition(progress)) {
          unlockedIds.push(badge.id);
          newlyUnlocked.push(safeBadgeCopy(badge, true));
        }
      } catch (e) {
        console.error('[WebCraftBadges] Error al evaluar condición de "' + badge.id + '":', e);
      }
    }

    // Guardar si hubo cambios
    if (newlyUnlocked.length > 0) {
      saveUnlocked();
    }

    return newlyUnlocked;
  };

  /**
   * Devuelve las insignias desbloqueadas como objetos completos
   * @returns {object[]}
   */
  WebCraftBadges.getUnlocked = function () {
    var result = [];
    for (var i = 0; i < BADGES.length; i++) {
      if (unlockedIds.indexOf(BADGES[i].id) !== -1) {
        result.push(safeBadgeCopy(BADGES[i], true));
      }
    }
    return result;
  };

  /**
   * Devuelve las insignias bloqueadas como objetos completos
   * @returns {object[]}
   */
  WebCraftBadges.getLocked = function () {
    var result = [];
    for (var i = 0; i < BADGES.length; i++) {
      if (unlockedIds.indexOf(BADGES[i].id) === -1) {
        result.push(safeBadgeCopy(BADGES[i], false));
      }
    }
    return result;
  };

  /**
   * Devuelve todas las insignias con su estado de desbloqueo
   * @returns {object[]}
   */
  WebCraftBadges.getAll = function () {
    var result = [];
    for (var i = 0; i < BADGES.length; i++) {
      var isUnlocked = unlockedIds.indexOf(BADGES[i].id) !== -1;
      result.push(safeBadgeCopy(BADGES[i], isUnlocked));
    }
    return result;
  };

  /**
   * Verifica si una insignia específica está desbloqueada
   * @param {string} badgeId
   * @returns {boolean}
   */
  WebCraftBadges.isUnlocked = function (badgeId) {
    return unlockedIds.indexOf(badgeId) !== -1;
  };

  /**
   * Reinicia todas las insignias al estado bloqueado
   */
  WebCraftBadges.reset = function () {
    unlockedIds = [];
    saveUnlocked();
  };

  // --- Exponer globalmente ---
  window.WebCraftBadges = WebCraftBadges;

  // Exponer la lista de badges para referencia externa
  window.BADGES = BADGES;

})();
