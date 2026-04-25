// Users Module - FIXED VERSION

async function getUserData(userId) {
  try {
    const doc = await db.collection('users').doc(userId).get();

    if (!doc.exists) {
      return { success: false, error: "User not found" };
    }

    return {
      success: true,
      user: { uid: doc.id, ...doc.data() }
    };

  } catch (error) {
    return { success: false, error: "Failed to load user" };
  }
}

async function updateUserProfile(userId, data) {
  try {
    await db.collection('users').doc(userId).update({
      ...data,
      lastSeen: firebase.firestore.FieldValue.serverTimestamp()
    });

    return { success: true };

  } catch (error) {
    return { success: false, error: "Failed to update profile" };
  }
}

function listenToOnlineUsers(callback) {
  return db.collection('users')
    .where('online', '==', true)
    .onSnapshot(snapshot => {
      const users = snapshot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data()
      }));

      callback(users);
    });
}

async function setUserOnlineStatus(userId, isOnline) {
  try {
    await db.collection('users').doc(userId).update({
      online: isOnline,
      lastSeen: firebase.firestore.FieldValue.serverTimestamp()
    });

    return { success: true };

  } catch (error) {
    return { success: false };
  }
}

async function getAllUsers() {
  try {
    const snap = await db.collection('users').get();

    return {
      success: true,
      users: snap.docs.map(doc => ({
        uid: doc.id,
        ...doc.data()
      }))
    };

  } catch (error) {
    return { success: false, error: "Failed to load users" };
  }
}

// Real-time listener for ALL users (for DM list)
function listenToAllUsers(callback) {
  return db.collection('users')
    .onSnapshot(snapshot => {
      const users = snapshot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data()
      }));
      callback({ success: true, users });
    }, error => {
      console.error('listenToAllUsers error:', error);
      callback({ success: false, users: [] });
    });
}

window.getUserData = getUserData;
window.updateUserProfile = updateUserProfile;
window.listenToOnlineUsers = listenToOnlineUsers;
window.setUserOnlineStatus = setUserOnlineStatus;
window.getAllUsers = getAllUsers;
window.listenToAllUsers = listenToAllUsers;