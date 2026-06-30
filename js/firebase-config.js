// ============================================
// Configuración de Firebase
// ============================================

// ⚠️ REEMPLAZA ESTOS VALORES CON LOS DE TU PROYECTO DE FIREBASE ⚠️
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
};

// Inicializar Firebase (solo si no se ha inicializado antes)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Instancias globales
window.auth = firebase.auth();
window.db = firebase.firestore();
