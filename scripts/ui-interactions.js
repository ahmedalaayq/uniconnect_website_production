/* ═══════════════════════════════════════════════════════════════════
   SIDEBAR & NOTIFICATIONS SYSTEM
   ═══════════════════════════════════════════════════════════════════ */

// Sidebar Functions
function openSidebar() {
  const sidebar = document.getElementById('mainSidebar');
  const overlay = document.getElementById('mobileOverlay');
  
  if (sidebar) {
    sidebar.classList.add('open');
    document.body.style.overflow = 'hidden';
    
    // Update menu button state
    const menuBtn = document.getElementById('menuToggle');
    if (menuBtn) {
      menuBtn.setAttribute('aria-expanded', 'true');
    }
  }
  
  if (overlay) {
    overlay.classList.remove('hidden');
  }
  
  console.log('📂 Sidebar opened');
}

function closeSidebar() {
  const sidebar = document.getElementById('mainSidebar');
  const overlay = document.getElementById('mobileOverlay');
  
  if (sidebar) {
    sidebar.classList.remove('open');
    document.body.style.overflow = '';
    
    // Update menu button state
    const menuBtn = document.getElementById('menuToggle');
    if (menuBtn) {
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  }
  
  if (overlay) {
    overlay.classList.add('hidden');
  }
  
  console.log('📂 Sidebar closed');
}

// Toggle sidebar
function toggleSidebar() {
  const sidebar = document.getElementById('mainSidebar');
  if (sidebar && sidebar.classList.contains('open')) {
    closeSidebar();
  } else {
    openSidebar();
  }
}

// Notifications System
function toggleNotifications() {
  const notifPanel = document.getElementById('notifPanel');
  const notifOverlay = document.getElementById('notifOverlay');
  const notifToggle = document.getElementById('notifToggle');
  
  if (notifPanel) {
    const isOpen = notifPanel.classList.contains('show');
    
    if (isOpen) {
      notifPanel.classList.remove('show');
      notifOverlay.classList.add('hidden');
      notifToggle.setAttribute('aria-expanded', 'false');
    } else {
      notifPanel.classList.add('show');
      notifOverlay.classList.remove('hidden');
      notifToggle.setAttribute('aria-expanded', 'true');
      
      // Load notifications
      loadNotifications();
    }
  }
}

function closeNotifications() {
  const notifPanel = document.getElementById('notifPanel');
  const notifOverlay = document.getElementById('notifOverlay');
  const notifToggle = document.getElementById('notifToggle');
  
  if (notifPanel) {
    notifPanel.classList.remove('show');
  }
  
  if (notifOverlay) {
    notifOverlay.classList.add('hidden');
  }
  
  if (notifToggle) {
    notifToggle.setAttribute('aria-expanded', 'false');
  }
}

// Load notifications
function loadNotifications() {
  const notifList = document.getElementById('notifList');
  const notifEmpty = document.querySelector('.notif__empty');
  
  if (!notifList) return;
  
  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: 'تم قبول طلب التدريب',
      message: 'تهانينا! تم قبولك في برنامج التدريب بشركة الاتصالات',
      time: 'منذ ساعتين',
      type: 'success',
      read: false
    },
    {
      id: 2,
      title: 'جدول الامتحانات',
      message: 'تم تحديث جدول الامتحانات النهائية للفصل الدراسي الحالي',
      time: 'منذ 5 ساعات',
      type: 'info',
      read: false
    },
    {
      id: 3,
      title: 'فرصة عمل جديدة',
      message: 'فرصة عمل جديدة في مجالك متاحة في شركة البرمجيات',
      time: 'منذ يوم',
      type: 'warning',
      read: true
    }
  ];
  
  if (notifications.length === 0) {
    if (notifEmpty) notifEmpty.style.display = 'block';
    notifList.innerHTML = '';
  } else {
    if (notifEmpty) notifEmpty.style.display = 'none';
    
    const notificationsHTML = notifications.map(notif => `
      <div class="notif-item ${notif.read ? 'read' : 'unread'}" data-notif-id="${notif.id}">
        <div class="notif-item__icon">
          <i class="fa-solid ${getNotificationIcon(notif.type)}"></i>
        </div>
        <div class="notif-item__content">
          <h4 class="notif-item__title">${notif.title}</h4>
          <p class="notif-item__message">${notif.message}</p>
          <span class="notif-item__time">${notif.time}</span>
        </div>
        <button class="notif-item__mark-read" onclick="markAsRead(${notif.id})">
          <i class="fa-solid fa-check"></i>
        </button>
      </div>
    `).join('');
    
    notifList.innerHTML = notificationsHTML;
  }
  
  // Update notification badge
  updateNotificationBadge();
}

function getNotificationIcon(type) {
  const icons = {
    success: 'fa-check-circle',
    info: 'fa-info-circle',
    warning: 'fa-exclamation-triangle',
    error: 'fa-times-circle'
  };
  return icons[type] || 'fa-info-circle';
}

function markAsRead(notifId) {
  const notifItem = document.querySelector(`[data-notif-id="${notifId}"]`);
  if (notifItem) {
    notifItem.classList.remove('unread');
    notifItem.classList.add('read');
  }
  updateNotificationBadge();
}

function markAllAsRead() {
  const unreadItems = document.querySelectorAll('.notif-item.unread');
  unreadItems.forEach(item => {
    item.classList.remove('unread');
    item.classList.add('read');
  });
  updateNotificationBadge();
  showToast('تم تحديد جميع الإشعارات كمقروءة', 'success');
}

function updateNotificationBadge() {
  const notifBadge = document.getElementById('notifBadge');
  const unreadCount = document.querySelectorAll('.notif-item.unread').length;
  
  if (notifBadge) {
    if (unreadCount > 0) {
      notifBadge.textContent = unreadCount;
      notifBadge.classList.remove('hidden');
    } else {
      notifBadge.classList.add('hidden');
    }
  }
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function() {
  // Sidebar event listeners
  const menuToggle = document.getElementById('menuToggle');
  const sidebarClose = document.getElementById('sidebarCloseBtn');
  const mobileOverlay = document.getElementById('mobileOverlay');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function(e) {
      e.preventDefault();
      toggleSidebar();
    });
  }
  
  if (sidebarClose) {
    sidebarClose.addEventListener('click', function(e) {
      e.preventDefault();
      closeSidebar();
    });
  }
  
  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', function(e) {
      e.preventDefault();
      closeSidebar();
    });
  }
  
  // Notifications event listeners
  const notifToggle = document.getElementById('notifToggle');
  const notifOverlay = document.getElementById('notifOverlay');
  const notifMarkAll = document.querySelector('.notif__mark-all');
  
  if (notifToggle) {
    notifToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      toggleNotifications();
    });
  }
  
  if (notifOverlay) {
    notifOverlay.addEventListener('click', function(e) {
      e.preventDefault();
      closeNotifications();
    });
  }
  
  if (notifMarkAll) {
    notifMarkAll.addEventListener('click', function(e) {
      e.preventDefault();
      markAllAsRead();
    });
  }
  
  // Close notifications when clicking outside
  document.addEventListener('click', function(e) {
    const notifPanel = document.getElementById('notifPanel');
    const notifToggle = document.getElementById('notifToggle');
    
    if (notifPanel && notifToggle && 
        !notifPanel.contains(e.target) && 
        !notifToggle.contains(e.target)) {
      closeNotifications();
    }
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeSidebar();
      closeNotifications();
    }
  });
  
  console.log('🔧 Sidebar and Notifications system initialized');
});

// Utility functions
function logout() {
  if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
    showToast('جاري تسجيل الخروج...', 'info');
    
    // Simulate logout
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
  }
}

function showToast(message, type = 'info') {
  const toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) return;
  
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `
    <div class="toast__icon">
      <i class="fa-solid ${getToastIcon(type)}"></i>
    </div>
    <div class="toast__message">${message}</div>
    <button class="toast__close" onclick="this.parentElement.remove()">
      <i class="fa-solid fa-times"></i>
    </button>
  `;
  
  toastContainer.appendChild(toast);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (toast.parentElement) {
      toast.remove();
    }
  }, 5000);
}

function getToastIcon(type) {
  const icons = {
    success: 'fa-check-circle',
    error: 'fa-times-circle',
    warning: 'fa-exclamation-triangle',
    info: 'fa-info-circle'
  };
  return icons[type] || 'fa-info-circle';
}
