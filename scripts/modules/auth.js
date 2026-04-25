// Authentication Module - ROOT NAVIGATION VERSION

const errorMessages = {
  'auth/user-not-found': 'البريد الإلكتروني غير مسجل',
  'auth/wrong-password': 'كلمة المرور غير صحيحة',
  'auth/invalid-email': 'البريد الإلكتروني غير صالح',
  'auth/invalid-credential': 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
  'auth/email-already-in-use': 'البريد الإلكتروني مستخدم بالفعل',
  'auth/weak-password': 'كلمة المرور ضعيفة جداً',
  'auth/too-many-requests': 'محاولات كثيرة، حاول لاحقاً',
  'auth/user-disabled': 'هذا الحساب معطل',
  'auth/network-request-failed': 'خطأ في الاتصال بالإنترنت',
  'permission-denied': 'ليس لديك صلاحية لهذا الإجراء',
  'not-found': 'البيانات غير موجودة'
};

function translateError(code) {
  return errorMessages[code] || 'حدث خطأ غير متوقع';
}

function isFirebaseReady() {
  return typeof auth !== "undefined" && typeof db !== "undefined";
}

function ensureFirebase() {
  if (!isFirebaseReady()) {
    throw new Error("Firebase not initialized");
  }
}

/* =========================
   LOGIN
========================= */
async function loginUser(email, password) {
  try {
    ensureFirebase();

    const userCredential =
      await auth.signInWithEmailAndPassword(email, password);

    const user = userCredential.user;

    await db.collection('users').doc(user.uid).set({
      online: true,
      lastSeen: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    return { success: true, user };

  } catch (error) {
    console.error('[Login Error]', error);

    return {
      success: false,
      error: translateError(error.code)
    };
  }
}

/* =========================
   SIGNUP
========================= */
async function signupUser(name, email, password, role) {
  try {
    ensureFirebase();

    const { user } =
      await auth.createUserWithEmailAndPassword(email, password);

    await user.updateProfile({
      displayName: name
    });

    await db.collection('users').doc(user.uid).set({
      name,
      email,
      role,
      imageUrl: null,
      online: true,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      lastSeen: firebase.firestore.FieldValue.serverTimestamp()
    });

    return { success: true, user };

  } catch (error) {
    console.error('[Signup Error]', error);

    return {
      success: false,
      error: translateError(error.code)
    };
  }
}

/* =========================
   LOGOUT
========================= */
async function logoutUser() {
  try {
    const user = auth.currentUser;

    if (user) {
      await db.collection('users').doc(user.uid).update({
        online: false,
        lastSeen: firebase.firestore.FieldValue.serverTimestamp()
      });
    }

    await auth.signOut();

    return { success: true };

  } catch (error) {
    return {
      success: false,
      error: translateError(error.code)
    };
  }
}

/* =========================
   RESET PASSWORD
========================= */
async function resetPassword(email) {
  try {
    await auth.sendPasswordResetEmail(email);
    return { success: true };

  } catch (error) {
    return {
      success: false,
      error: translateError(error.code)
    };
  }
}

function redirectIfNotAuthenticated() {
  waitForFirebase(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      unsub(); // check once only
      if (!user) {
        window.location.href = "index.html";
      }
    });
  });
}

/* =========================
   EXPORTS
========================= */
window.loginUser = loginUser;
window.signupUser = signupUser;
window.logoutUser = logoutUser;
window.resetPassword = resetPassword;
window.redirectIfNotAuthenticated = redirectIfNotAuthenticated;