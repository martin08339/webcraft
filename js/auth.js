// ============================================
// Autenticación de Firebase (auth.js)
// ============================================

(function () {
  'use strict';

  // Modal elements
  var loginModal;
  var emailInput;
  var passwordInput;
  var loginBtn;
  var registerBtn;
  var logoutBtn;
  var userInfoSpan;
  var navCtaContainer; // Donde está el botón Comenzar / Info del usuario

  function initAuthUI() {
    // Escuchar cambios de estado en Auth
    if (window.auth) {
      window.auth.onAuthStateChanged(function (user) {
        if (user) {
          console.log("Usuario autenticado:", user.email);
          handleUserLoggedIn(user);
        } else {
          console.log("No hay usuario activo.");
          handleUserLoggedOut();
        }
      });
    }

    // Insertar el modal de login en el DOM si no existe
    if (!document.getElementById('loginModal')) {
      var modalHTML = `
        <div id="loginModal" class="modal-overlay" style="z-index: 9999;">
          <div class="modal" style="text-align: left;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
              <h2>Iniciar Sesión</h2>
              <button id="closeLoginModal" class="btn-ghost" style="border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
            </div>
            
            <div style="margin-bottom: 16px;">
              <label style="display: block; margin-bottom: 8px; color: var(--text-secondary);">Email</label>
              <input type="email" id="authEmail" style="width: 100%; padding: 12px; border-radius: var(--radius); border: 1px solid var(--border); background: var(--bg-primary); color: var(--text-primary);" placeholder="correo@ejemplo.com">
            </div>
            
            <div style="margin-bottom: 24px;">
              <label style="display: block; margin-bottom: 8px; color: var(--text-secondary);">Contraseña</label>
              <input type="password" id="authPassword" style="width: 100%; padding: 12px; border-radius: var(--radius); border: 1px solid var(--border); background: var(--bg-primary); color: var(--text-primary);" placeholder="********">
            </div>
            
            <button id="authLoginBtn" class="btn btn-primary" style="width: 100%; margin-bottom: 16px;">Ingresar</button>
            <button id="authRegisterBtn" class="btn btn-secondary" style="width: 100%;">Crear Cuenta</button>
            
            <p id="authError" style="color: var(--danger); margin-top: 16px; font-size: 0.9rem; text-align: center; display: none;"></p>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // Capturar referencias
    loginModal = document.getElementById('loginModal');
    emailInput = document.getElementById('authEmail');
    passwordInput = document.getElementById('authPassword');
    loginBtn = document.getElementById('authLoginBtn');
    registerBtn = document.getElementById('authRegisterBtn');
    
    // Add debug info if auth fails
    if (!window.auth) {
      document.getElementById('authError').innerHTML = "Debug: auth is undefined. Firebase: " + (typeof firebase !== 'undefined' ? "exists" : "missing") + ". Apps: " + (typeof firebase !== 'undefined' ? firebase.apps.length : 0);
      document.getElementById('authError').style.display = 'block';
    }
    var closeLoginModal = document.getElementById('closeLoginModal');
    
    // Eventos del modal
    closeLoginModal.addEventListener('click', closeLogin);
    
    loginBtn.addEventListener('click', function() {
      var email = emailInput.value.trim();
      var pass = passwordInput.value;
      if (!email || !pass) return showError("Completa ambos campos");
      if (!window.auth) return showError("Error: Firebase no está disponible.");
      
      showError("Iniciando sesión...", "info");
      window.auth.signInWithEmailAndPassword(email, pass)
        .then(function() {
          loginModal.classList.remove('active');
          showError("");
        })
        .catch(function(error) {
          showError(translateFirebaseError(error.code));
        });
    });
    
    registerBtn.addEventListener('click', function() {
      var email = emailInput.value.trim();
      var pass = passwordInput.value;
      if (!email || !pass) return showError("Completa ambos campos");
      if (pass.length < 6) return showError("La contraseña debe tener al menos 6 caracteres");
      if (!window.auth) return showError("Error: Firebase no está disponible.");
      
      showError("Creando cuenta...", "info");
      window.auth.createUserWithEmailAndPassword(email, pass)
        .then(function(userCredential) {
          // Inicializar perfil en BD
          if (window.db) {
            window.db.collection('users').doc(userCredential.user.uid).set({
              email: email,
              xp: 0,
              level: 1,
              completedLessons: []
            });
          }
          loginModal.classList.remove('active');
          showError("");
        })
        .catch(function(error) {
          showError(translateFirebaseError(error.code));
        });
    });
  }

  // Traducir errores de Firebase al español
  function translateFirebaseError(code) {
    var errors = {
      'auth/user-not-found': '❌ No existe ninguna cuenta con ese correo. Usa "Crear Cuenta" para registrarte.',
      'auth/wrong-password': '❌ Contraseña incorrecta. Inténtalo de nuevo.',
      'auth/invalid-email': '❌ El formato del correo no es válido.',
      'auth/email-already-in-use': '❌ Ya existe una cuenta con ese correo. Usa "Ingresar".',
      'auth/weak-password': '❌ La contraseña es muy débil. Usa al menos 6 caracteres.',
      'auth/too-many-requests': '⚠️ Demasiados intentos. Espera un momento e inténtalo de nuevo.',
      'auth/network-request-failed': '⚠️ Error de conexión a internet. Revisa tu red.',
      'auth/invalid-credential': '❌ Correo o contraseña incorrectos.',
      'auth/operation-not-allowed': '⚠️ El método de autenticación no está habilitado. Activa Email/Password en la consola de Firebase.'
    };
    return errors[code] || '❌ Error: ' + code;
  }

  function showError(msg, type) {
    var errorP = document.getElementById('authErrorMsg');
    if (errorP) {
      errorP.textContent = msg;
      errorP.style.display = 'block';
      if (type === 'info') {
        errorP.style.color = 'var(--accent-cyan)';
      } else {
        errorP.style.color = 'var(--danger)';
      }
    }
  }

  function showLogin() {
    if (loginModal) loginModal.classList.add('active');
    var errorP = document.getElementById('authErrorMsg');
    if (errorP) errorP.style.display = 'none';
  }

  function closeLogin() {
    if (loginModal) loginModal.classList.remove('active');
  }

  function handleUserLoggedIn(user) {
    // Esconder botón de login y mostrar perfil
    var loginBtn = document.getElementById('loginBtn');
    if (loginBtn) loginBtn.style.display = 'none';

    // Esconder botón Comenzar y reemplazar con perfil
    var navCta = document.querySelector('.nav-cta');
    if (navCta) navCta.style.display = 'none';

    // Crear UI de perfil si no existe
    var existing = document.getElementById('userProfileNav');
    if (!existing) {
      var profileUI = document.createElement('div');
      profileUI.id = "userProfileNav";
      profileUI.style.display = "flex";
      profileUI.style.alignItems = "center";
      profileUI.style.gap = "12px";
      
      profileUI.innerHTML = '<div style="width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple)); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1rem;">' +
        user.email.charAt(0).toUpperCase() +
        '</div>' +
        '<span style="color: var(--text-secondary); font-size: 0.85rem;">' + user.email.split('@')[0] + '</span>' +
        '<button id="btnSignOut" class="btn btn-ghost" style="padding: 6px 12px; font-size: 0.85rem; color: var(--danger);">Salir</button>';
      
      var container = loginBtn ? loginBtn.parentNode : (navCta ? navCta.parentNode : null);
      if (container) container.appendChild(profileUI);
      
      document.getElementById('btnSignOut').addEventListener('click', function() {
        window.auth.signOut();
      });
    }

    // Sincronizar progreso desde la nube
    if (window.WebCraftProgress && window.WebCraftProgress.syncFromCloud) {
      window.WebCraftProgress.syncFromCloud(user.uid);
    }
  }

  function handleUserLoggedOut() {
    // Mostrar botón de login
    var loginBtn = document.getElementById('loginBtn');
    if (loginBtn) loginBtn.style.display = '';

    // Mostrar botón Comenzar
    var navCta = document.querySelector('.nav-cta');
    if (navCta) navCta.style.display = '';

    // Eliminar perfil
    var profileUI = document.getElementById('userProfileNav');
    if (profileUI) profileUI.remove();
  }

  // Inicializar Auth UI
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuthUI);
  } else {
    initAuthUI();
  }

})();
