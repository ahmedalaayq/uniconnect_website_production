// Chat Module - FIXED VERSION

function isFirebaseReady() {
  return typeof db !== "undefined";
}

function ensureFirebase() {
  if (!isFirebaseReady()) throw new Error("Firebase not ready");
}

async function sendGlobalMessage(userId, name, role, text) {
  try {
    if (!text?.trim()) {
      return { success: false, error: "Message empty" };
    }

    ensureFirebase();

    const docRef = await db.collection('globalChat').add({
      userId,
      name,
      role,
      text: text.trim(),
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    return { success: true, messageId: docRef.id };

  } catch (error) {
    console.error('[Global Chat Error]', error);
    return { success: false, error: "فشل إرسال الرسالة" };
  }
}

function listenToGlobalChat(callback) {
  if (!isFirebaseReady()) return () => {};

  return db.collection('globalChat')
    .orderBy('timestamp', 'asc')
    .onSnapshot(snapshot => {
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      callback(messages);
    });
}

function getConversationId(a, b) {
  return [a, b].sort().join('_');
}

async function sendDirectMessage(fromId, toId, text) {
  try {
    if (!text?.trim()) {
      return { success: false, error: "Message empty" };
    }

    const conversationId = getConversationId(fromId, toId);

    const docRef = await db.collection('directMessages')
      .doc(conversationId)
      .collection('messages')
      .add({
        fromId,
        toId,
        text: text.trim(),
        read: false,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });

    return { success: true, messageId: docRef.id };

  } catch (error) {
    console.error('[DM Error]', error);
    return { success: false, error: "فشل إرسال الرسالة" };
  }
}

function listenToDirectMessages(userId, otherId, callback) {
  const conversationId = getConversationId(userId, otherId);

  return db.collection('directMessages')
    .doc(conversationId)
    .collection('messages')
    .orderBy('timestamp', 'asc')
    .onSnapshot(snapshot => {
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      callback(messages);
    });
}

window.sendGlobalMessage = sendGlobalMessage;
window.listenToGlobalChat = listenToGlobalChat;
window.getConversationId = getConversationId;
window.sendDirectMessage = sendDirectMessage;
window.listenToDirectMessages = listenToDirectMessages;