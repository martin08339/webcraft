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
            
            <div style="display: flex; gap: 12px; flex-direction: column;">
              <button id="btnSignIn" class="btn btn-primary" style="width: 100%;">Ingresar</button>
              <button id="btnSignUp" class="btn btn-secondary" style="width: 100%;">Crear Cuenta</button>
            </div>
            
            <p id="authErrorMsg" style="color: var(--danger); margin-top: 16px; font-size: 0.9rem; text-align: center; display: none;"></p>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // Capturar referencias
    loginModal = document.getElementById('loginModal');
    emailInput = document.getElementById('authEmail');
    passwordInput = document.getElementById('authPassword');
    var btnSignIn = document.getElementById('btnSignIn');
    var btnSignUp = document.getElementById('btnSignUp');
    var closeLoginModal = document.getElementById('closeLoginModal');
    
    // Eventos del modal
    closeLoginModal.addEventListener('click', closeLogin);
    
    btnSignIn.addEventListener('click', function() {
      var email = emailInput.value;
      var pass = passwordInput.value;
      if (!email || !pass) return showError("Completa ambos campos");
      
      window.auth.signInWithEmailAndPassword(email, pass)
        .then(function(userCredential) {
          closeLogin();
        })
        .catch(function(error) {
          showError(error.message);
        });
    });

    btnSignUp.addEventListener('click', function() {
      var email = emailInput.value;
      var pass = passwordInput.value;
      if (!email || !pass) return showError("Completa ambos campos");
      
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
          closeLogin();
        })
        .catch(function(error) {
          showError(error.message);
        });
    });
  }

  function showError(msg) {
    var errorP = document.getElementById('authErrorMsg');
    if (errorP) {
      errorP.textContent = msg;
      errorP.style.display = 'block';
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
    // Buscar el botón 'Comenzar' o equivalente en el Nav
    var navCta = document.querySelector('.nav-cta');
    if (navCta) {
      // Reemplazar por UI del usuario
      var wrapper = navCta.parentNode;
      
      var profileUI = document.createElement('div');
      profileUI.id = "userProfileNav";
      profileUI.style.display = "flex";
      profileUI.style.alignItems = "center";
      profileUI.style.gap = "12px";
      
      profileUI.innerHTML = `
        <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--accent-cyan); color: #000; display: flex; align-items: center; justify-content: center; font-weight: bold;">
          ${user.email.charAt(0).toUpperCase()}
        </div>
        <button id="btnSignOut" class="btn btn-ghost" style="padding: 6px 12px; font-size: 0.9rem;">Salir</button>
      `;
      
      wrapper.replaceChild(profileUI, navCta);
      
      document.getElementById('btnSignOut').addEventListener('click', function() {
        window.auth.signOut();
      });
    }

    // Si progress.js ya cargó, forzamos sincronización con Firebase
    if (window.WebCraftProgress && window.WebCraftProgress.syncFromCloud) {
      window.WebCraftProgress.syncFromCloud(user.uid);
    }
  }

  function handleUserLoggedOut() {
    var profileUI = document.getElementById('userProfileNav');
    if (profileUI) {
      var wrapper = profileUI.parentNode;
      var ctaBtn = document.createElement('button');
      ctaBtn.className = "btn btn-primary nav-cta";
      ctaBtn.textContent = "Iniciar Sesión";
      ctaBtn.onclick = showLogin;
      wrapper.replaceChild(ctaBtn, profileUI);
    } else {
      // Si estamos en la carga inicial y no estaba logueado, cambiar el link "Comenzar" a botón de login
      var navCta = document.querySelector('.nav-cta');
      if (navCta) {
        navCta.textContent = "Iniciar Sesión";
        navCta.href = "#";
        navCta.onclick = function(e) {
          e.preventDefault();
          showLogin();
        };
      }
    }
  }

  // Inicializar Auth UI
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuthUI);
  } else {
    initAuthUI();
  }

})();
