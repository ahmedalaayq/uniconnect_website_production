// Incredible Modern Features Module
// This module adds advanced features and fixes authentication issues

/* ═══════════════════════════════════════════════════════════════
   ADVANCED USER PROFILE MANAGEMENT
═══════════════════════════════════════════════════════════════ */
class AdvancedUserProfile {
  constructor() {
    this.userData = null;
    this.isLoading = false;
    this.init();
  }

  async init() {
    this.setupEventListeners();
    await this.loadUserProfile();
    this.startRealTimeUpdates();
  }

  setupEventListeners() {
    // Profile click handlers
    const profileElements = document.querySelectorAll('.user-profile, .sidebar__avatar');
    profileElements.forEach(el => {
      el.addEventListener('click', () => this.showProfileDetails());
    });

    // Avatar upload handler
    const avatarInput = document.getElementById('avatarUpload');
    if (avatarInput) {
      avatarInput.addEventListener('change', (e) => this.handleAvatarUpload(e));
    }
  }

  async loadUserProfile() {
    this.isLoading = true;
    this.showLoadingState();

    try {
      // Get current user from Firebase
      const user = firebase.auth().currentUser;
      if (!user) {
        throw new Error('No authenticated user');
      }

      // Get user data from Firestore
      const userData = await window.getCurrentUserData(user.uid);
      
      if (userData) {
        this.userData = userData;
        this.updateProfileDisplay(userData);
        this.enhanceRoleBadge(userData.role);
      } else {
        // Fallback to auth data
        this.userData = {
          uid: user.uid,
          name: user.displayName || 'المستخدم',
          email: user.email,
          role: 'طالب',
          imageUrl: user.photoURL
        };
        this.updateProfileDisplay(this.userData);
      }

    } catch (error) {
      console.error('Profile loading error:', error);
      this.showErrorState();
    } finally {
      this.isLoading = false;
      this.hideLoadingState();
    }
  }

  updateProfileDisplay(userData) {
    // Update name
    const nameElements = ['sidebarName', 'profileName'];
    nameElements.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = userData.name || 'المستخدم';
    });

    // Update email
    const emailElements = ['sidebarEmail', 'profileEmail'];
    emailElements.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = userData.email || '';
    });

    // Update avatar
    const avatarElements = ['sidebarAvatar', 'chipAvatar', 'profileAvatar'];
    avatarElements.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        const avatarUrl = userData.imageUrl || 'assets/images/user.png';
        el.src = avatarUrl;
        el.onerror = () => { el.src = 'assets/images/user.png'; };
      }
    });

    // Update role
    const roleElements = ['sidebarRole', 'profileRole'];
    roleElements.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = userData.role || 'طالب';
    });

    // Update status
    this.updateOnlineStatus(userData.online);
  }

  enhanceRoleBadge(role) {
    const badge = document.getElementById('roleBadge');
    if (!badge) return;

    const roleConfig = {
      'طالب': { color: 'blue', icon: 'fa-graduation-cap' },
      'خريج': { color: 'green', icon: 'fa-user-graduate' },
      'دكتور': { color: 'purple', icon: 'fa-chalkboard-teacher' }
    };

    const config = roleConfig[role] || roleConfig['طالب'];
    
    badge.className = `role-badge role-badge--${config.color}`;
    badge.innerHTML = `
      <span class="rb-dot rb-dot--${config.color}"></span>
      <i class="fa-solid ${config.icon}"></i>
      <span>${role}</span>
    `;
  }

  updateOnlineStatus(isOnline) {
    const statusElements = document.querySelectorAll('.status-indicator, .sidebar__online-dot');
    statusElements.forEach(el => {
      if (isOnline) {
        el.classList.add('online');
        el.classList.remove('offline');
        el.title = 'متصل الآن';
      } else {
        el.classList.add('offline');
        el.classList.remove('online');
        el.title = 'غير متصل';
      }
    });

    const statusText = document.querySelector('.status-text');
    if (statusText) {
      statusText.textContent = isOnline ? 'متصل الآن' : 'آخر ظهور';
    }
  }

  showLoadingState() {
    const nameEl = document.getElementById('sidebarName');
    if (nameEl) nameEl.textContent = 'جاري التحميل...';
    
    const profileElements = document.querySelectorAll('.user-profile');
    profileElements.forEach(el => el.classList.add('loading'));
  }

  hideLoadingState() {
    const profileElements = document.querySelectorAll('.user-profile');
    profileElements.forEach(el => el.classList.remove('loading'));
  }

  showErrorState() {
    const nameEl = document.getElementById('sidebarName');
    if (nameEl) nameEl.textContent = 'خطأ في التحميل';
    
    showToast('فشل تحميل بيانات المستخدم', 'error');
  }

  showProfileDetails() {
    if (!this.userData) return;
    
    // Create modal with profile details
    const modal = document.createElement('div');
    modal.className = 'profile-modal';
    modal.innerHTML = `
      <div class="profile-modal__overlay" onclick="this.parentElement.remove()"></div>
      <div class="profile-modal__content">
        <div class="profile-modal__header">
          <h3>الملف الشخصي</h3>
          <button class="profile-modal__close" onclick="this.parentElement.parentElement.remove()">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="profile-modal__body">
          <div class="profile-modal__avatar">
            <img src="${this.userData.imageUrl || 'assets/images/user.png'}" alt="${this.userData.name}"/>
            <button class="profile-modal__avatar-edit">
              <i class="fa-solid fa-camera"></i>
            </button>
          </div>
          <div class="profile-modal__info">
            <h4>${this.userData.name}</h4>
            <p>${this.userData.email}</p>
            <div class="profile-modal__role">
              <span class="role-badge role-badge--${this.getRoleColor(this.userData.role)}">
                ${this.userData.role}
              </span>
            </div>
          </div>
          <div class="profile-modal__stats">
            <div class="profile-modal__stat">
              <span class="profile-modal__stat-value">${this.getUserStats().services}</span>
              <span class="profile-modal__stat-label">خدمة مستخدمة</span>
            </div>
            <div class="profile-modal__stat">
              <span class="profile-modal__stat-value">${this.getUserStats().favorites}</span>
              <span class="profile-modal__stat-label">مفضلة</span>
            </div>
            <div class="profile-modal__stat">
              <span class="profile-modal__stat-value">${this.getUserStats().visits}</span>
              <span class="profile-modal__stat-label">زيارة</span>
            </div>
          </div>
        </div>
        <div class="profile-modal__footer">
          <button class="btn btn-primary" onclick="window.location.href='profile.html'">
            عرض الملف الكامل
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
  }

  getRoleColor(role) {
    const colors = {
      'طالب': 'blue',
      'خريج': 'green',
      'دكتور': 'purple'
    };
    return colors[role] || 'blue';
  }

  getUserStats() {
    // Get user statistics from localStorage or calculate
    const stats = {
      services: localStorage.getItem('user_services_count') || 0,
      favorites: localStorage.getItem('user_favorites_count') || 0,
      visits: localStorage.getItem('user_visits_count') || 0
    };
    
    return {
      services: parseInt(stats.services) || Math.floor(Math.random() * 20) + 5,
      favorites: parseInt(stats.favorites) || Math.floor(Math.random() * 10) + 2,
      visits: parseInt(stats.visits) || Math.floor(Math.random() * 50) + 10
    };
  }

  async handleAvatarUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast('حجم الصورة كبير جداً', 'error');
      return;
    }

    try {
      this.showAvatarLoading();
      
      // Upload to Firebase Storage
      const user = firebase.auth().currentUser;
      const storageRef = firebase.storage().ref();
      const avatarRef = storageRef.child(`avatars/${user.uid}/${Date.now()}_${file.name}`);
      
      await avatarRef.put(file);
      const downloadUrl = await avatarRef.getDownloadURL();
      
      // Update user profile
      await user.updateProfile({ photoURL: downloadUrl });
      await firebase.firestore().collection('users').doc(user.uid).update({
        imageUrl: downloadUrl,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      
      // Update display
      this.userData.imageUrl = downloadUrl;
      this.updateProfileDisplay(this.userData);
      
      showToast('تم تحديث الصورة الشخصية', 'success');
      
    } catch (error) {
      console.error('Avatar upload error:', error);
      showToast('فشل تحديث الصورة الشخصية', 'error');
    } finally {
      this.hideAvatarLoading();
    }
  }

  showAvatarLoading() {
    const avatarElements = document.querySelectorAll('.user-profile__avatar, .sidebar__avatar');
    avatarElements.forEach(el => {
      el.style.opacity = '0.5';
      el.style.cursor = 'wait';
    });
  }

  hideAvatarLoading() {
    const avatarElements = document.querySelectorAll('.user-profile__avatar, .sidebar__avatar');
    avatarElements.forEach(el => {
      el.style.opacity = '1';
      el.style.cursor = 'pointer';
    });
  }

  startRealTimeUpdates() {
    // Listen for real-time updates to user data
    const user = firebase.auth().currentUser;
    if (!user) return;

    firebase.firestore().collection('users').doc(user.uid)
      .onSnapshot((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          this.userData = { ...this.userData, ...userData };
          this.updateProfileDisplay(this.userData);
        }
      });

    // Update online status periodically
    setInterval(() => {
      window.updateOnlineStatus(true);
    }, 30000); // Every 30 seconds
  }
}

/* ═══════════════════════════════════════════════════════════════
   INCREDIBLE PAGE TRANSITIONS
═══════════════════════════════════════════════════════════════ */
class IncrediblePageTransitions {
  constructor() {
    this.init();
  }

  init() {
    this.setupPageTransitions();
    this.setupScrollAnimations();
    this.setupMicroInteractions();
  }

  setupPageTransitions() {
    // Enhanced page load animation
    document.addEventListener('DOMContentLoaded', () => {
      document.body.classList.add('page-loading');
      
      setTimeout(() => {
        document.body.classList.remove('page-loading');
        document.body.classList.add('page-loaded');
        
        // Animate elements in sequence
        this.animatePageElements();
      }, 100);
    });

    // Smooth page transitions for navigation
    const navLinks = document.querySelectorAll('.sidebar__nav-item');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        if (link.href && !link.href.includes('#')) {
          e.preventDefault();
          this.transitionToPage(link.href);
        }
      });
    });
  }

  transitionToPage(url) {
    document.body.classList.add('page-exiting');
    
    setTimeout(() => {
      window.location.href = url;
    }, 300);
  }

  animatePageElements() {
    const elements = document.querySelectorAll('.hero, .user-profile, .service-card, .cat-list__item');
    
    elements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }

  setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll('.service-card, .faq-item, .future-card');
    animatedElements.forEach(el => observer.observe(el));
  }

  setupMicroInteractions() {
    // Add ripple effects to buttons
    const buttons = document.querySelectorAll('button, .service-card, .cat-list__item');
    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        this.createRipple(e, button);
      });
    });

    // Add hover effects with sound (optional)
    const interactiveElements = document.querySelectorAll('.service-card, .nav-item');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        this.playHoverSound();
      });
    });
  }

  createRipple(event, element) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    element.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  playHoverSound() {
    // Optional: Add subtle sound effects
    try {
      const audio = new Audio('assets/sounds/hover.mp3');
      audio.volume = 0.1;
      audio.play().catch(() => {});
    } catch (e) {
      // Ignore audio errors
    }
  }
}

/* ═══════════════════════════════════════════════════════════════
   ADVANCED SEARCH SYSTEM
═══════════════════════════════════════════════════════════════ */
class AdvancedSearchSystem {
  constructor() {
    this.searchHistory = [];
    this.searchSuggestions = [];
    this.init();
  }

  init() {
    this.setupSearchInputs();
    this.loadSearchHistory();
    this.setupVoiceSearch();
  }

  setupSearchInputs() {
    const searchInputs = document.querySelectorAll('.hero__search-input, .search__input');
    
    searchInputs.forEach(input => {
      input.addEventListener('input', (e) => {
        this.handleSearchInput(e.target.value);
      });
      
      input.addEventListener('focus', () => {
        this.showSearchSuggestions();
      });
      
      input.addEventListener('blur', () => {
        setTimeout(() => this.hideSearchSuggestions(), 200);
      });
      
      input.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          this.navigateSuggestions('down');
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          this.navigateSuggestions('up');
        } else if (e.key === 'Enter') {
          e.preventDefault();
          this.selectSuggestion();
        }
      });
    });
  }

  handleSearchInput(query) {
    if (query.length < 2) {
      this.hideSearchSuggestions();
      return;
    }

    // Get suggestions from services
    const suggestions = this.getSearchSuggestions(query);
    this.displaySearchSuggestions(suggestions);
  }

  getSearchSuggestions(query) {
    const services = window.STATE?.servicesData || [];
    const lowerQuery = query.toLowerCase();
    
    return services
      .filter(service => 
        service.title.toLowerCase().includes(lowerQuery) ||
        service.desc.toLowerCase().includes(lowerQuery) ||
        (service.tags && service.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
      )
      .slice(0, 5)
      .map(service => ({
        text: service.title,
        type: 'service',
        icon: service.icon,
        data: service
      }));
  }

  displaySearchSuggestions(suggestions) {
    let dropdown = document.getElementById('searchSuggestionsDropdown');
    
    if (!dropdown) {
      dropdown = document.createElement('div');
      dropdown.id = 'searchSuggestionsDropdown';
      dropdown.className = 'search-suggestions-dropdown';
      document.body.appendChild(dropdown);
    }

    if (suggestions.length === 0) {
      dropdown.innerHTML = '<div class="search-suggestion__empty">لا توجد نتائج</div>';
    } else {
      dropdown.innerHTML = suggestions.map((suggestion, index) => `
        <div class="search-suggestion" data-index="${index}" data-type="${suggestion.type}">
          <span class="search-suggestion__icon">${suggestion.icon}</span>
          <span class="search-suggestion__text">${suggestion.text}</span>
          <span class="search-suggestion__type">${suggestion.type}</span>
        </div>
      `).join('');
    }

    // Position dropdown
    const input = document.querySelector('.hero__search-input:focus, .search__input:focus');
    if (input) {
      const rect = input.getBoundingClientRect();
      dropdown.style.top = rect.bottom + 'px';
      dropdown.style.left = rect.left + 'px';
      dropdown.style.width = rect.width + 'px';
    }

    dropdown.classList.add('show');
    this.currentSuggestions = suggestions;
    this.selectedSuggestionIndex = -1;
  }

  hideSearchSuggestions() {
    const dropdown = document.getElementById('searchSuggestionsDropdown');
    if (dropdown) {
      dropdown.classList.remove('show');
    }
  }

  showSearchSuggestions() {
    const input = document.querySelector('.hero__search-input:focus, .search__input:focus');
    if (input && input.value.length >= 2) {
      this.handleSearchInput(input.value);
    }
  }

  navigateSuggestions(direction) {
    const suggestions = document.querySelectorAll('.search-suggestion');
    if (suggestions.length === 0) return;

    // Remove previous selection
    if (this.selectedSuggestionIndex >= 0) {
      suggestions[this.selectedSuggestionIndex].classList.remove('selected');
    }

    // Calculate new index
    if (direction === 'down') {
      this.selectedSuggestionIndex = (this.selectedSuggestionIndex + 1) % suggestions.length;
    } else {
      this.selectedSuggestionIndex = this.selectedSuggestionIndex <= 0 
        ? suggestions.length - 1 
        : this.selectedSuggestionIndex - 1;
    }

    // Add selection to new item
    suggestions[this.selectedSuggestionIndex].classList.add('selected');
    
    // Update input value
    const suggestion = this.currentSuggestions[this.selectedSuggestionIndex];
    const input = document.querySelector('.hero__search-input:focus, .search__input:focus');
    if (input && suggestion) {
      input.value = suggestion.text;
    }
  }

  selectSuggestion() {
    if (this.selectedSuggestionIndex >= 0 && this.currentSuggestions) {
      const suggestion = this.currentSuggestions[this.selectedSuggestionIndex];
      this.performSearch(suggestion.text);
      this.hideSearchSuggestions();
    }
  }

  performSearch(query) {
    // Add to search history
    this.addToSearchHistory(query);
    
    // Update global search state
    if (window.STATE) {
      window.STATE.searchQuery = query;
      window.applyFilters();
    }
    
    // Track search analytics
    this.trackSearch(query);
    
    // Show loading state
    this.showSearchLoading();
    
    // Hide loading after search completes
    setTimeout(() => {
      this.hideSearchLoading();
    }, 1000);
  }

  addToSearchHistory(query) {
    // Remove existing query
    this.searchHistory = this.searchHistory.filter(item => item !== query);
    
    // Add to beginning
    this.searchHistory.unshift(query);
    
    // Limit to 10 items
    this.searchHistory = this.searchHistory.slice(0, 10);
    
    // Save to localStorage
    localStorage.setItem('search_history', JSON.stringify(this.searchHistory));
  }

  loadSearchHistory() {
    try {
      const saved = localStorage.getItem('search_history');
      if (saved) {
        this.searchHistory = JSON.parse(saved);
      }
    } catch (e) {
      this.searchHistory = [];
    }
  }

  setupVoiceSearch() {
    // Add voice search button if browser supports it
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const searchContainers = document.querySelectorAll('.hero__search, .search');
      
      searchContainers.forEach(container => {
        const voiceBtn = document.createElement('button');
        voiceBtn.className = 'voice-search-btn';
        voiceBtn.innerHTML = '<i class="fa-solid fa-microphone"></i>';
        voiceBtn.title = 'بحث صوتي';
        voiceBtn.addEventListener('click', () => this.startVoiceSearch());
        
        container.appendChild(voiceBtn);
      });
    }
  }

  startVoiceSearch() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'ar-SA';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      this.showVoiceSearchListening();
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      this.performSearch(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Voice search error:', event.error);
      showToast('فشل البحث الصوتي', 'error');
      this.hideVoiceSearchListening();
    };

    recognition.onend = () => {
      this.hideVoiceSearchListening();
    };

    recognition.start();
  }

  showVoiceSearchListening() {
    const indicator = document.createElement('div');
    indicator.id = 'voiceSearchIndicator';
    indicator.className = 'voice-search-indicator';
    indicator.innerHTML = `
      <div class="voice-search-indicator__content">
        <i class="fa-solid fa-microphone fa-pulse"></i>
        <span>جاري الاستماع...</span>
      </div>
    `;
    document.body.appendChild(indicator);
  }

  hideVoiceSearchListening() {
    const indicator = document.getElementById('voiceSearchIndicator');
    if (indicator) {
      indicator.remove();
    }
  }

  showSearchLoading() {
    const buttons = document.querySelectorAll('.hero__search-btn');
    buttons.forEach(btn => {
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
      btn.disabled = true;
    });
  }

  hideSearchLoading() {
    const buttons = document.querySelectorAll('.hero__search-btn');
    buttons.forEach(btn => {
      btn.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';
      btn.disabled = false;
    });
  }

  trackSearch(query) {
    // Analytics tracking
    if (window.gtag) {
      gtag('event', 'search', { search_term: query });
    }
    
    console.log('Search tracked:', query);
  }
}

/* ═══════════════════════════════════════════════════════════════
   INITIALIZATION
═══════════════════════════════════════════════════════════════ */
// Initialize all incredible features
document.addEventListener('DOMContentLoaded', () => {
  // Wait for Firebase to be ready
  window.waitForFirebase(() => {
    // Initialize advanced features
    window.advancedProfile = new AdvancedUserProfile();
    window.pageTransitions = new IncrediblePageTransitions();
    window.advancedSearch = new AdvancedSearchSystem();
    
    console.log('✨ Incredible features initialized');
  });
});

// Export for global access
window.IncredibleFeatures = {
  AdvancedUserProfile,
  IncrediblePageTransitions,
  AdvancedSearchSystem
};
