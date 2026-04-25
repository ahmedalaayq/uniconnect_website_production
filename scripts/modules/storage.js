// Storage Module - FIXED VERSION

async function uploadProfileImage(userId, file) {
  try {
    if (!file) return { success: false };

    const allowed = ['image/jpeg','image/png','image/jpg','image/gif'];
    if (!allowed.includes(file.type)) {
      return { success: false, error: "Invalid file type" };
    }

    if (file.size > 5 * 1024 * 1024) {
      return { success: false, error: "File too large" };
    }

    const ext = file.name.split('.').pop();
    const ref = storage.ref(`profile_images/${userId}.${ext}`);

    await ref.put(file);

    const url = await ref.getDownloadURL();

    // Also update Firestore user document with new imageUrl
    await db.collection('users').doc(userId).update({ imageUrl: url });

    return { success: true, url };

  } catch (error) {
    return { success: false, error: "Upload failed" };
  }
}

async function deleteProfileImage(userId) {
  try {
    const list = await storage.ref("profile_images").listAll();

    const tasks = list.items
      .filter(i => i.name.startsWith(userId))
      .map(i => i.delete());

    await Promise.all(tasks);

    return { success: true };

  } catch (error) {
    return { success: false, error: "Delete failed" };
  }
}

window.uploadProfileImage = uploadProfileImage;
window.deleteProfileImage = deleteProfileImage;