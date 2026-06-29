/**
 * ============================================
 * WebCraft - Sistema de Sonidos (Web Audio API)
 * ============================================
 * Genera efectos de sonido proceduralmente sin
 * necesidad de archivos mp3/wav externos.
 * ============================================
 */

(function () {
  'use strict';

  var audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      // Inicializar el contexto solo al primer intento de uso
      // para cumplir con las políticas de auto-play del navegador
      var AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    // Si estaba suspendido por política del navegador, reanudar
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playTone(freq, type, duration, vol) {
    if (!audioCtx) return;

    var oscillator = audioCtx.createOscillator();
    var gainNode = audioCtx.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);

    // Fade out para evitar "clics"
    gainNode.gain.setValueAtTime(vol, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration);
  }

  var WebCraftSounds = {
    // Sonido al completar una lección (Acorde feliz)
    playSuccess: function () {
      initAudio();
      if (!audioCtx) return;
      
      // Arpegio ascendente rápido
      playTone(523.25, 'sine', 0.15, 0.1); // C5
      setTimeout(function() { playTone(659.25, 'sine', 0.15, 0.1); }, 100); // E5
      setTimeout(function() { playTone(783.99, 'sine', 0.3, 0.1); }, 200); // G5
      setTimeout(function() { playTone(1046.50, 'sine', 0.5, 0.1); }, 300); // C6
    },

    // Sonido al desbloquear insignia (Tintineo brillante)
    playBadgeUnlock: function () {
      initAudio();
      if (!audioCtx) return;

      playTone(880.00, 'triangle', 0.1, 0.1); // A5
      setTimeout(function() { playTone(1108.73, 'triangle', 0.1, 0.1); }, 80); // C#6
      setTimeout(function() { playTone(1318.51, 'triangle', 0.4, 0.1); }, 160); // E6
    },

    // Sonido de error suave
    playError: function() {
      initAudio();
      if (!audioCtx) return;
      
      playTone(300, 'sawtooth', 0.1, 0.05);
      setTimeout(function() { playTone(250, 'sawtooth', 0.2, 0.05); }, 100);
    }
  };

  // Exponer globalmente
  window.WebCraftSounds = WebCraftSounds;

})();
