// Enhanced Student Services JavaScript Module
// This file contains additional enhancements for the student services page

/* ═══════════════════════════════════════════════════════════════
   ENHANCED SEARCH FUNCTIONALITY
═══════════════════════════════════════════════════════════════ */
function initEnhancedSearch() {
  const searchInput = document.querySelector('.hero__search-input');
  const searchBtn = document.querySelector('.hero__search-btn');
  const serviceCards = document.querySelectorAll('.service-card');
  
  if (!searchInput || !searchBtn) return;
  
  let searchTimeout;
  
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    const query = e.target.value.toLowerCase().trim();
    
    searchTimeout = setTimeout(() => {
      filterServices(query);
    }, 300);
  });
  
  searchBtn.addEventListener('click', () => {
    const query = searchInput.value.toLowerCase().trim();
    if (query) {
      performSearch(query);
    }
  });
  
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const query = searchInput.value.toLowerCase().trim();
      if (query) {
        performSearch(query);
      }
    }
  });
}

function filterServices(query) {
  const serviceCards = document.querySelectorAll('.service-card');
  const categoryItems = document.querySelectorAll('.cat-list__item');
  let visibleCount = 0;
  
  serviceCards.forEach(card => {
    const title = card.querySelector('.service-card__title')?.textContent.toLowerCase() || '';
    const desc = card.querySelector('.service-card__desc')?.textContent.toLowerCase() || '';
    const tags = Array.from(card.querySelectorAll('.service-card__tag')).map(tag => tag.textContent.toLowerCase()).join(' ');
    
    const isMatch = title.includes(query) || desc.includes(query) || tags.includes(query);
    
    if (isMatch) {
      card.style.display = 'flex';
      card.style.animation = 'cardIn 0.4s var(--ease) both';
      visibleCount++;
      
      // Highlight matching text
      if (query) {
        highlightSearchTerm(card, query);
      }
    } else {
      card.style.display = 'none';
    }
  });
  
  // Update services count
  updateServicesCount(visibleCount);
  
  // Show empty state if no results
  if (visibleCount === 0 && query) {
    showEmptyState(query);
  } else {
    hideEmptyState();
  }
}

function highlightSearchTerm(card, query) {
  const title = card.querySelector('.service-card__title');
  const desc = card.querySelector('.service-card__desc');
  
  [title, desc].forEach(element => {
    if (element) {
      const text = element.textContent;
      const regex = new RegExp(`(${query})`, 'gi');
      element.innerHTML = text.replace(regex, '<mark>$1</mark>');
    }
  });
}

function performSearch(query) {
  // Track search analytics
  trackSearch(query);
  
  // Show loading state
  showSearchLoading();
  
  // Simulate search delay
  setTimeout(() => {
    filterServices(query);
    hideSearchLoading();
  }, 500);
}

function updateServicesCount(count) {
  const countElement = document.querySelector('.services-toolbar__count strong');
  if (countElement) {
    countElement.textContent = count;
  }
}

function showEmptyState(query) {
  const servicesGrid = document.querySelector('.services-grid');
  if (servicesGrid && !document.querySelector('.empty-state')) {
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state';
    emptyState.innerHTML = `
      <div class="empty-state__icon">🔍</div>
      <h3 class="empty-state__title">لا توجد نتائج لـ "${query}"</h3>
      <p class="empty-state__desc">جرب البحث بكلمات مختلفة أو تصفح جميع الخدمات</p>
      <button class="empty-state__reset-btn" onclick="clearSearch()">
        <i class="fas fa-redo"></i>
        عرض جميع الخدمات
      </button>
    `;
    servicesGrid.appendChild(emptyState);
  }
}

function hideEmptyState() {
  const emptyState = document.querySelector('.empty-state');
  if (emptyState) {
    emptyState.remove();
  }
}

function clearSearch() {
  const searchInput = document.querySelector('.hero__search-input');
  if (searchInput) {
    searchInput.value = '';
    filterServices('');
  }
}

function showSearchLoading() {
  const searchBtn = document.querySelector('.hero__search-btn');
  if (searchBtn) {
    searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    searchBtn.disabled = true;
  }
}

function hideSearchLoading() {
  const searchBtn = document.querySelector('.hero__search-btn');
  if (searchBtn) {
    searchBtn.innerHTML = '<i class="fas fa-search"></i>';
    searchBtn.disabled = false;
  }
}

function trackSearch(query) {
  // Analytics tracking (placeholder)
  console.log('Search tracked:', query);
  // In production, this would send to analytics service
}

/* ═══════════════════════════════════════════════════════════════
   ENHANCED CATEGORY FILTERING
═══════════════════════════════════════════════════════════════ */
function initEnhancedCategoryFilter() {
  const categoryItems = document.querySelectorAll('.cat-list__item');
  const serviceCards = document.querySelectorAll('.service-card');
  
  categoryItems.forEach(item => {
    item.addEventListener('click', () => {
      const category = item.dataset.category;
      
      // Update active state with animation
      categoryItems.forEach(cat => {
        cat.classList.remove('is-active');
      });
      item.classList.add('is-active');
      
      // Filter services with animation
      filterServicesByCategory(category);
      
      // Track category selection
      trackCategorySelection(category);
    });
  });
}

function filterServicesByCategory(category) {
  const serviceCards = document.querySelectorAll('.service-card');
  let visibleCount = 0;
  
  // Add loading state
  showCategoryLoading();
  
  setTimeout(() => {
    serviceCards.forEach((card, index) => {
      const cardCategory = card.dataset.category;
      
      if (category === 'all' || cardCategory === category) {
        card.style.display = 'flex';
        card.style.animation = `cardIn 0.4s var(--ease) ${index * 0.05}s both`;
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });
    
    updateServicesCount(visibleCount);
    hideCategoryLoading();
    
    // Update mobile category button
    updateMobileCategoryButton(category);
  }, 300);
}

function showCategoryLoading() {
  const servicesGrid = document.querySelector('.services-grid');
  if (servicesGrid) {
    servicesGrid.style.opacity = '0.5';
    servicesGrid.style.pointerEvents = 'none';
  }
}

function hideCategoryLoading() {
  const servicesGrid = document.querySelector('.services-grid');
  if (servicesGrid) {
    servicesGrid.style.opacity = '1';
    servicesGrid.style.pointerEvents = 'auto';
  }
}

function updateMobileCategoryButton(category) {
  const activeCategoryBtn = document.querySelector('.cat-toggle-mobile__active');
  if (activeCategoryBtn) {
    const categoryName = getCategoryDisplayName(category);
    activeCategoryBtn.textContent = categoryName;
  }
}

function getCategoryDisplayName(category) {
  const names = {
    'all': 'جميع الخدمات',
    'academic': 'أكاديمي',
    'exam': 'امتحانات',
    'financial': 'مالي',
    'activities': 'أنشطة',
    'support': 'دعم',
    'courses': 'مقررات',
    'research': 'بحث',
    'students': 'طلاب',
    'postgrad': 'دراسات عليا',
    'quality': 'جودة',
    'links': 'روابط'
  };
  return names[category] || category;
}

function trackCategorySelection(category) {
  // Analytics tracking (placeholder)
  console.log('Category selected:', category);
  // In production, this would send to analytics service
}

/* ═══════════════════════════════════════════════════════════════
   ENHANCED SERVICE CARD INTERACTIONS
═══════════════════════════════════════════════════════════════ */
function initEnhancedServiceCardInteractions() {
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach(card => {
    // Store original icon
    const icon = card.querySelector('.service-card__icon');
    if (icon) {
      card.dataset.originalIcon = icon.textContent;
    }
    
    // Click handler with ripple effect
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.service-card__link')) {
        createRippleEffect(card, e);
        handleServiceClick(card);
      }
    });
    
    // Hover effect with sound feedback (optional)
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-4px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
    
    // Keyboard navigation
    card.setAttribute('tabindex', '0');
    card.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleServiceClick(card);
      }
    });
  });
}

function createRippleEffect(element, event) {
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

function handleServiceClick(card) {
  const serviceId = card.dataset.serviceId;
  const serviceUrl = card.dataset.url;
  
  // Track service interaction
  trackServiceInteraction(serviceId);
  
  // Show loading state
  showServiceLoading(card);
  
  // Simulate loading delay
  setTimeout(() => {
    if (serviceUrl) {
      window.open(serviceUrl, '_blank');
    }
    hideServiceLoading(card);
  }, 300);
}

function showServiceLoading(card) {
  const icon = card.querySelector('.service-card__icon');
  if (icon) {
    icon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
  }
}

function hideServiceLoading(card) {
  const icon = card.querySelector('.service-card__icon');
  if (icon) {
    // Restore original icon
    icon.textContent = card.dataset.originalIcon || '📋';
  }
}

function trackServiceInteraction(serviceId) {
  // Analytics tracking (placeholder)
  console.log('Service interaction:', serviceId);
  // In production, this would send to analytics service
}

/* ═══════════════════════════════════════════════════════════════
   ENHANCED ACCESSIBILITY
═══════════════════════════════════════════════════════════════ */
function initEnhancedAccessibility() {
  // Add ARIA labels to service cards
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    const title = card.querySelector('.service-card__title')?.textContent || '';
    const desc = card.querySelector('.service-card__desc')?.textContent || '';
    card.setAttribute('aria-label', `${title}: ${desc}`);
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
  });
  
  // Add keyboard navigation for category items
  const categoryItems = document.querySelectorAll('.cat-list__item');
  categoryItems.forEach(item => {
    item.setAttribute('role', 'tab');
    item.setAttribute('tabindex', '0');
    item.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });
  
  // Add focus management
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });
  
  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
  });
}

/* ═══════════════════════════════════════════════════════════════
   ENHANCED PERFORMANCE OPTIMIZATIONS
═══════════════════════════════════════════════════════════════ */
function initPerformanceOptimizations() {
  // Lazy load images
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
  
  // Preload critical resources
  const criticalResources = [
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
  ];
  
  criticalResources.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = url;
    document.head.appendChild(link);
  });
  
  // Optimize animations
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty('--t-base', '0.01ms');
    document.documentElement.style.setProperty('--t-fast', '0.01ms');
    document.documentElement.style.setProperty('--t-slow', '0.01ms');
  }
}

/* ═══════════════════════════════════════════════════════════════
   INITIALIZATION
═══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize enhanced features
  initEnhancedSearch();
  initEnhancedCategoryFilter();
  initEnhancedServiceCardInteractions();
  initEnhancedAccessibility();
  initPerformanceOptimizations();
  
  // Add smooth scroll behavior
  document.documentElement.style.scrollBehavior = 'smooth';
  
  // Add loading states to all interactive elements
  const interactiveElements = document.querySelectorAll('button, .service-card, .cat-list__item');
  interactiveElements.forEach(element => {
    element.addEventListener('click', function() {
      this.classList.add('micro-bounce');
      setTimeout(() => {
        this.classList.remove('micro-bounce');
      }, 300);
    });
  });
  
  console.log('Enhanced Student Services features initialized');
});

/* ═══════════════════════════════════════════════════════════════
   UTILITY FUNCTIONS
═══════════════════════════════════════════════════════════════ */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

function animateValue(element, start, end, duration) {
  const range = end - start;
  const increment = range / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
      element.textContent = end;
      clearInterval(timer);
    } else {
      element.textContent = Math.round(current);
    }
  }, 16);
}

// Export functions for global access
window.StudentServicesEnhanced = {
  initEnhancedSearch,
  initEnhancedCategoryFilter,
  initEnhancedServiceCardInteractions,
  initEnhancedAccessibility,
  initPerformanceOptimizations,
  filterServices,
  clearSearch,
  createRippleEffect
};
