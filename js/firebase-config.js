// ============================================
// Configuración de Firebase
// ============================================

// ⚠️ REEMPLAZA ESTOS VALORES CON LOS DE TU PROYECTO DE FIREBASE ⚠️
const firebaseConfig = {
  apiKey: "AIzaSyC8gaARvqbfKPLURFBFG09V_GQTc6kyWvM",
  authDomain: "webcraft-85468.firebaseapp.com",
  projectId: "webcraft-85468",
  storageBucket: "webcraft-85468.firebasestorage.app",
  messagingSenderId: "794454105787",
  appId: "1:794454105787:web:ab2d0b8e7d2d870e2f15b6",
  measurementId: "G-HMPLEHTS1R"
};

// Inicializar Firebase (solo si no se ha inicializado antes)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Instancias globales
window.auth = firebase.auth();
window.db = firebase.firestore();
