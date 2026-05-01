// ═══════════════════════════════════════════════════════════════════
//  GradConnect — Firebase Configuration
//  All HTML files are in root — paths are relative to root.
// ═══════════════════════════════════════════════════════════════════

(function () {
  if (window._firebaseReady) return;
  window._firebaseReady = false;

  // Config inline — no env.js needed for plain HTML projects
  var firebaseConfig = {
    apiKey:            "AIzaSyCTGf4QYLHf-27HzkkMXkKYiEDrAoAhAvE",
    authDomain:        "uniconnect-c7571.firebaseapp.com",
    projectId:         "uniconnect-c7571",
    storageBucket:     "uniconnect-c7571.firebasestorage.app",
    messagingSenderId: "868329860787",
    appId:             "1:868329860787:web:499a491e98ce9df4bd0ac6"
  };

  try {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    window.auth    = firebase.auth();
    window.db      = firebase.firestore();
    window.storage = firebase.storage();
    window.auth.languageCode = 'ar';

    // Offline persistence
    window.db.enablePersistence({ synchronizeTabs: true }).catch(function(e) {
      if (e.code !== 'failed-precondition' && e.code !== 'unimplemented') {
        console.warn('Persistence error:', e);
      }
    });

    window._firebaseReady = true;
    console.log('✓ Firebase ready');
    // أطلق الحدث لأي مستمع سجّل نفسه قبل اكتمال التهيئة
    window.dispatchEvent(new Event('firebaseReady'));

  } catch (e) {
    console.error('✗ Firebase init failed:', e);
  }
}());

window.waitForFirebase = function(cb) {
  if (window._firebaseReady) { cb(); }
  else { window.addEventListener('firebaseReady', cb, { once: true }); }
};

window.getCurrentUserData = async function(uid) {
  if (!uid) return null;
  try {
    var doc = await window.db.collection('users').doc(uid).get();
    return doc.exists ? Object.assign({ uid: uid }, doc.data()) : null;
  } catch(e) { console.error('getUserData error:', e); return null; }
};

window.updateOnlineStatus = async function(isOnline) {
  var user = window.auth && window.auth.currentUser;
  if (!user) return;
  try {
    await window.db.collection('users').doc(user.uid).update({
      online: isOnline,
      lastSeen: firebase.firestore.FieldValue.serverTimestamp()
    });
  } catch(_) {}
};
