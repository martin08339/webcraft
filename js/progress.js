/**
 * ============================================
 * WebCraft - Sistema de Progreso del Usuario
 * ============================================
 * Gestiona el seguimiento del progreso usando localStorage.
 * Incluye: lecciones completadas, XP, rachas, ejecuciones de código.
 *
 * Clave en localStorage: 'webcraft_progress'
 * ============================================
 */

(function () {
  'use strict';

  // --- Clave de almacenamiento ---
  var STORAGE_KEY = 'webcraft_progress';

  // --- Estructura de datos por defecto ---
  function getDefaultData() {
    var today = getTodayISO();
    return {
      completedLessons: [],
      totalXP: 0,
      lastActivity: '',
      streak: 0,
      streakLastDate: '',
      codeExecutions: 0,
      lessonsCompletedToday: 0,
      todayDate: today
    };
  }

  // --- Datos en memoria ---
  var data = null;

  // =====================
  // Utilidades internas
  // =====================

  /**
   * Devuelve la fecha de hoy en formato ISO (YYYY-MM-DD)
   */
  function getTodayISO() {
    var now = new Date();
    var year = now.getFullYear();
    var month = String(now.getMonth() + 1).padStart(2, '0');
    var day = String(now.getDate()).padStart(2, '0');
    return year + '-' + month + '-' + day;
  }

  /**
   * Calcula la diferencia en días entre dos fechas ISO
   * Retorna NaN si alguna fecha es inválida
   */
  function daysDifference(dateA, dateB) {
    var a = new Date(dateA + 'T00:00:00');
    var b = new Date(dateB + 'T00:00:00');
    if (isNaN(a.getTime()) || isNaN(b.getTime())) {
      return NaN;
    }
    var diffMs = Math.abs(a.getTime() - b.getTime());
    return Math.round(diffMs / (1000 * 60 * 60 * 24));
  }

  /**
   * Valida y sanitiza los datos cargados desde localStorage.
   * Si la estructura está corrupta, devuelve los valores por defecto.
   */
  function validateAndSanitize(raw) {
    // Si no es un objeto válido, devolver defaults
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
      return getDefaultData();
    }

    var defaults = getDefaultData();
    var sanitized = {};

    // completedLessons: debe ser un array de números
    if (Array.isArray(raw.completedLessons)) {
      sanitized.completedLessons = raw.completedLessons
        .filter(function (item) {
          return typeof item === 'number' && isFinite(item);
        })
        .map(function (item) {
          return Math.floor(item);
        });
    } else {
      sanitized.completedLessons = defaults.completedLessons;
    }

    // totalXP: debe ser un número no negativo
    sanitized.totalXP = (typeof raw.totalXP === 'number' && isFinite(raw.totalXP) && raw.totalXP >= 0)
      ? Math.floor(raw.totalXP)
      : defaults.totalXP;

    // lastActivity: debe ser un string con formato de fecha válido
    sanitized.lastActivity = (typeof raw.lastActivity === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(raw.lastActivity))
      ? raw.lastActivity
      : defaults.lastActivity;

    // streak: debe ser un número no negativo
    sanitized.streak = (typeof raw.streak === 'number' && isFinite(raw.streak) && raw.streak >= 0)
      ? Math.floor(raw.streak)
      : defaults.streak;

    // streakLastDate: debe ser un string con formato de fecha válido
    sanitized.streakLastDate = (typeof raw.streakLastDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(raw.streakLastDate))
      ? raw.streakLastDate
      : defaults.streakLastDate;

    // codeExecutions: debe ser un número no negativo
    sanitized.codeExecutions = (typeof raw.codeExecutions === 'number' && isFinite(raw.codeExecutions) && raw.codeExecutions >= 0)
      ? Math.floor(raw.codeExecutions)
      : defaults.codeExecutions;

    // lessonsCompletedToday: debe ser un número no negativo
    sanitized.lessonsCompletedToday = (typeof raw.lessonsCompletedToday === 'number' && isFinite(raw.lessonsCompletedToday) && raw.lessonsCompletedToday >= 0)
      ? Math.floor(raw.lessonsCompletedToday)
      : defaults.lessonsCompletedToday;

    // todayDate: debe ser un string con formato de fecha válido
    sanitized.todayDate = (typeof raw.todayDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(raw.todayDate))
      ? raw.todayDate
      : defaults.todayDate;

    return sanitized;
  }

  /**
   * Guarda los datos actuales en localStorage y en la Nube
   */
  function saveData() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      // Sincronización a la nube si el usuario está autenticado
      if (window.auth && window.auth.currentUser && window.db) {
        window.db.collection('users').doc(window.auth.currentUser.uid).set(data, { merge: true })
          .catch(function(err) { console.error("Error guardando en la nube:", err); });
      }
    } catch (e) {
      console.error('[WebCraftProgress] Error al guardar en localStorage:', e);
    }
  }

  /**
   * Carga los datos desde localStorage
   */
  function loadData() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw === null) {
        return null;
      }
      return JSON.parse(raw);
    } catch (e) {
      console.error('[WebCraftProgress] Error al leer localStorage, datos posiblemente corruptos:', e);
      return null;
    }
  }

  /**
   * Sincroniza desde la Nube (llamado desde auth.js al iniciar sesión)
   */
  function syncFromCloud(uid) {
    if (!window.db) return;
    window.db.collection('users').doc(uid).get().then(function(doc) {
      if (doc.exists) {
        var cloudData = doc.data();
        // Fusionar nube con local si nube tiene más XP (lógica básica)
        if (cloudData.totalXP >= data.totalXP) {
          data = Object.assign(data, cloudData);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
          if (typeof renderAll === 'function') renderAll(); // Actualizar UI
          console.log("Progreso sincronizado desde la nube");
        } else {
          // Si local es más avanzado, subimos a la nube
          saveData();
        }
      }
    });
  }

  /**
   * Actualiza el contador de lecciones completadas hoy.
   * Si la fecha almacenada no coincide con hoy, reinicia el contador.
   */
  function refreshTodayCount() {
    var today = getTodayISO();
    if (data.todayDate !== today) {
      data.lessonsCompletedToday = 0;
      data.todayDate = today;
    }
  }

  /**
   * Actualiza la racha según la lógica de días consecutivos.
   * - Si la última actividad fue ayer → incrementar racha
   * - Si fue hoy → la racha no cambia
   * - Si fue hace más de 1 día o no hay fecha → reiniciar a 1
   */
  function updateStreak() {
    var today = getTodayISO();
    var last = data.streakLastDate;

    if (!last) {
      // Primera actividad registrada
      data.streak = 1;
      data.streakLastDate = today;
      return;
    }

    if (last === today) {
      // Ya se registró actividad hoy, no modificar racha
      return;
    }

    var diff = daysDifference(today, last);

    if (diff === 1) {
      // Día consecutivo → incrementar
      data.streak += 1;
    } else {
      // Más de un día sin actividad → reiniciar
      data.streak = 1;
    }

    data.streakLastDate = today;
  }

  // =====================
  // API Pública
  // =====================

  var WebCraftProgress = {};

  /**
   * Inicializa el sistema de progreso.
   * Carga datos existentes o crea datos por defecto.
   */
  WebCraftProgress.init = function () {
    var raw = loadData();
    if (raw !== null) {
      data = validateAndSanitize(raw);
    } else {
      data = getDefaultData();
    }
    // Refrescar el contador de hoy por si cambió de día
    refreshTodayCount();
    saveData();
  };

  /**
   * Marca una lección como completada y otorga XP.
   * @param {number} lessonId - ID de la lección
   * @param {number} xp - Puntos de experiencia a otorgar
   * @returns {{ alreadyCompleted: boolean, newXP: number, newBadges: Array }}
   */
  WebCraftProgress.completeLesson = function (lessonId, xp) {
    if (data === null) {
      WebCraftProgress.init();
    }

    // Sanitizar parámetros
    lessonId = (typeof lessonId === 'number' && isFinite(lessonId)) ? Math.floor(lessonId) : 0;
    xp = (typeof xp === 'number' && isFinite(xp) && xp >= 0) ? Math.floor(xp) : 0;

    var result = {
      alreadyCompleted: false,
      newXP: 0,
      newBadges: []
    };

    // Verificar si ya fue completada
    if (data.completedLessons.indexOf(lessonId) !== -1) {
      result.alreadyCompleted = true;
      return result;
    }

    // Registrar lección completada
    data.completedLessons.push(lessonId);

    // Otorgar XP
    data.totalXP += xp;
    result.newXP = xp;

    // Actualizar racha
    updateStreak();

    // Actualizar fecha de última actividad
    data.lastActivity = getTodayISO();

    // Actualizar lecciones completadas hoy
    refreshTodayCount();
    data.lessonsCompletedToday += 1;

    // Guardar datos
    saveData();

    // Verificar insignias nuevas (si el sistema de badges está disponible)
    if (window.WebCraftBadges && typeof window.WebCraftBadges.checkForNew === 'function') {
      result.newBadges = window.WebCraftBadges.checkForNew(WebCraftProgress);
    }

    return result;
  };

  /**
   * Verifica si una lección ya fue completada
   * @param {number} lessonId
   * @returns {boolean}
   */
  WebCraftProgress.isCompleted = function (lessonId) {
    if (data === null) return false;
    lessonId = (typeof lessonId === 'number' && isFinite(lessonId)) ? Math.floor(lessonId) : 0;
    return data.completedLessons.indexOf(lessonId) !== -1;
  };

  /**
   * Devuelve la lista de lecciones completadas
   * @returns {number[]}
   */
  WebCraftProgress.getCompletedLessons = function () {
    if (data === null) return [];
    return data.completedLessons.slice(); // Copia defensiva
  };

  /**
   * Devuelve el total de XP acumulado
   * @returns {number}
   */
  WebCraftProgress.getTotalXP = function () {
    if (data === null) return 0;
    return data.totalXP;
  };

  /**
   * Devuelve el porcentaje de progreso (0-100)
   * @param {number} totalLessons - Total de lecciones disponibles (fallback si no hay curso)
   * @param {string} courseName - (Opcional) Nombre del curso para calcular el progreso específico
   * @returns {number}
   */
  WebCraftProgress.getPercentage = function (totalLessons, courseName) {
    if (data === null) return 0;

    if (courseName && window.lessons) {
      var courseLessons = window.lessons.filter(function(l) { return l.course === courseName; });
      var completedCourseLessons = courseLessons.filter(function(l) { 
        return data.completedLessons.indexOf(l.id) !== -1; 
      });
      var courseTotal = courseLessons.length > 0 ? courseLessons.length : 1;
      var percentage = (completedCourseLessons.length / courseTotal) * 100;
      return Math.min(100, Math.max(0, Math.round(percentage)));
    }

    totalLessons = (typeof totalLessons === 'number' && isFinite(totalLessons) && totalLessons > 0)
      ? totalLessons
      : 1;
    var percentage = (data.completedLessons.length / totalLessons) * 100;
    return Math.min(100, Math.max(0, Math.round(percentage)));
  };

  /**
   * Devuelve la racha actual de días consecutivos
   * @returns {number}
   */
  WebCraftProgress.getStreak = function () {
    if (data === null) return 0;
    return data.streak;
  };

  /**
   * Incrementa el contador de ejecuciones de código
   */
  WebCraftProgress.incrementCodeExecutions = function () {
    if (data === null) {
      WebCraftProgress.init();
    }
    data.codeExecutions += 1;
    saveData();
  };

  /**
   * Devuelve el número de ejecuciones de código
   * @returns {number}
   */
  WebCraftProgress.getCodeExecutions = function () {
    if (data === null) return 0;
    return data.codeExecutions;
  };

  /**
   * Devuelve el número de lecciones completadas hoy
   * @returns {number}
   */
  WebCraftProgress.getLessonsCompletedToday = function () {
    if (data === null) return 0;
    refreshTodayCount();
    return data.lessonsCompletedToday;
  };

  /**
   * Reinicia todo el progreso a valores por defecto.
   * La UI se encarga de la confirmación.
   */
  WebCraftProgress.reset = function () {
    data = getDefaultData();
    saveData();
  };

  /**
   * Devuelve el objeto de datos completo (copia defensiva)
   * @returns {object}
   */
  WebCraftProgress.getData = function () {
    if (data === null) return getDefaultData();
    return JSON.parse(JSON.stringify(data));
  };

  /**
   * Sincroniza los datos desde la nube (Firestore)
   */
  WebCraftProgress.syncFromCloud = function(uid) {
    syncFromCloud(uid);
  };

  // --- Exponer globalmente ---
  window.WebCraftProgress = WebCraftProgress;

})();
