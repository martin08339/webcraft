// ============================================
// Configuración de Firebase
// ============================================

const firebaseConfig = {
  apiKey: "AIzaSyC8gaARVqbfKPLURFBFG09V_GQTc6kyWvM",
  authDomain: "webcraft-85468.firebaseapp.com",
  projectId: "webcraft-85468",
  storageBucket: "webcraft-85468.firebasestorage.app",
  messagingSenderId: "794454105787",
  appId: "1:794454105787:web:ab2d0b8e7d2d870e2f15b6",
  measurementId: "G-HMPLEHTS1R"
};

try {
  // Verificar que Firebase se cargó correctamente
  if (typeof firebase === 'undefined') {
    console.error('[WebCraft] Firebase SDK no se cargó. Revisa tu conexión a internet.');
  } else {
    // Inicializar Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    
    // Instancias globales
    window.auth = firebase.auth();
    window.db = firebase.firestore();
    console.log('[WebCraft] Firebase inicializado correctamente');
  }
} catch (e) {
  console.error('[WebCraft] Error al inicializar Firebase:', e);
}
