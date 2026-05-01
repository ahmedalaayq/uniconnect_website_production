/* ═══════════════════════════════════════════════════════════════════
   ENHANCED SERVICES FUNCTIONALITY
   ═══════════════════════════════════════════════════════════════════ */

// Enhanced Services Data
const ENHANCED_SERVICES_DATA = {
  student: [
    {
      id: 's1',
      title: 'الجدول الدراسي',
      description: 'عرض وتحميل جداول المحاضرات والامتحانات للفصل الحالي',
      icon: 'fa-calendar-days',
      iconType: 'primary',
      url: 'https://fsed.bu.edu.eg/students/study-schedules',
      badge: 'new',
      category: 'academic'
    },
    {
      id: 's2',
      title: 'نتائج الامتحانات',
      description: 'الاطلاع على نتائج الامتحانات النهائية والفصلية',
      icon: 'fa-chart-line',
      iconType: 'success',
      url: 'https://fsed.bu.edu.eg/students/exams-results',
      badge: 'popular',
      category: 'academic'
    },
    {
      id: 's3',
      title: 'التسجيل في المقررات',
      description: 'تسجيل وإضافة وحذف المقررات الدراسية للفصل الدراسي',
      icon: 'fa-user-plus',
      iconType: 'warning',
      url: 'http://mis.bu.edu.eg/benha_new/Registration/ED_Login.aspx',
      category: 'academic'
    },
    {
      id: 's4',
      title: 'المكتبة الرقمية',
      description: 'الوصول إلى الكتب والمصادر التعليمية الإلكترونية',
      icon: 'fa-book',
      iconType: 'secondary',
      url: 'https://fsed.bu.edu.eg/library/library-services',
      badge: 'featured',
      category: 'academic'
    },
    {
      id: 's5',
      title: 'المنصات التعليمية',
      description: 'الوصول إلى منصات التعلم الإلكتروني والمحاضرات المسجلة',
      icon: 'fa-laptop',
      iconType: 'primary',
      url: 'https://fsed.bu.edu.eg/students/learning',
      category: 'academic'
    },
    {
      id: 's6',
      title: 'نماذج الامتحانات',
      description: 'تحميل نماذج امتحانات سابقة لجميع المقررات',
      icon: 'fa-file-lines',
      iconType: 'success',
      url: 'https://fsed.bu.edu.eg/students/models-answers',
      category: 'academic'
    },
    {
      id: 's7',
      title: 'الأنشطة الطلابية',
      description: 'المشاركة في الأنشطة والفعاليات الطلابية',
      icon: 'fa-users',
      iconType: 'primary',
      url: 'https://fsed.bu.edu.eg/students/youth-care',
      category: 'academic'
    },
    {
      id: 's8',
      title: 'الإرشاد الأكاديمي',
      description: 'حجز مواعيد الإرشاد الأكاديمي والدعم الدراسي',
      icon: 'fa-chalkboard-teacher',
      iconType: 'secondary',
      url: 'https://fsed.bu.edu.eg/students/complaints-receiving-mechanism',
      category: 'academic'
    }
  ],
  graduate: [
    {
      id: 'g1',
      title: 'شهادة التخرج',
      description: 'طلب واستخراج شهادة التخرج والبيانات التكميلية',
      icon: 'fa-graduation-cap',
      iconType: 'success',
      url: 'https://fsed.bu.edu.eg/students/graduate-follow-up-office',
      badge: 'new',
      category: 'academic'
    },
    {
      id: 'g2',
      title: 'توثيق الشهادات',
      description: 'خدمات توثيق الشهادات للخريجين للسفر والعمل',
      icon: 'fa-certificate',
      iconType: 'warning',
      url: 'https://fsed.bu.edu.eg/students/graduate-follow-up-office',
      category: 'academic'
    },
    {
      id: 'g3',
      title: 'فرص العمل للخريجين',
      description: 'تصفح فرص العمل والتوظيف المتاحة لخريجي الكلية',
      icon: 'fa-briefcase',
      iconType: 'success',
      url: 'https://fsed.bu.edu.eg/students/graduate-follow-up-office',
      badge: 'popular',
      category: 'careers'
    },
    {
      id: 'g4',
      title: 'الدراسات العليا',
      description: 'التسجيل في برامج الماجستير والدكتوراه بالكلية',
      icon: 'fa-user-graduate',
      iconType: 'primary',
      url: 'https://fsed.bu.edu.eg/graduate-studies',
      badge: 'featured',
      category: 'academic'
    },
    {
      id: 'g5',
      title: 'المجلة العلمية',
      description: 'نشر الأبحاث في المجلة العلمية المحكمة للكلية',
      icon: 'fa-flask',
      iconType: 'secondary',
      url: 'https://sjse.journals.ekb.eg/',
      category: 'academic'
    }
  ],
  doctor: [
    {
      id: 'd1',
      title: 'إدارة المقررات',
      description: 'رفع المحاضرات والمواد التعليمية وإدارة المحتوى',
      icon: 'fa-book-open',
      iconType: 'secondary',
      url: 'https://fsed.bu.edu.eg/students/learning',
      category: 'academic'
    },
    {
      id: 'd2',
      title: 'المجلة العلمية',
      description: 'نشر الأبحاث في المجلة العلمية المحكمة للكلية',
      icon: 'fa-flask',
      iconType: 'secondary',
      url: 'https://sjse.journals.ekb.eg/',
      badge: 'featured',
      category: 'academic'
    },
    {
      id: 'd3',
      title: 'سجلات الطلاب',
      description: 'متابعة سجلات الحضور والدرجات والتقارير الأكاديمية',
      icon: 'fa-users',
      iconType: 'warning',
      url: 'http://mis.bu.edu.eg/benha_new/Registration/ED_Login.aspx',
      category: 'academic'
    },
    {
      id: 'd4',
      title: 'الجداول الدراسية',
      description: 'إدارة جداول المحاضرات والامتحانات والساعات المكتبية',
      icon: 'fa-calendar',
      iconType: 'primary',
      url: 'https://fsed.bu.edu.eg/study-schedules',
      category: 'academic'
    },
    {
      id: 'd5',
      title: 'البحث العلمي',
      description: 'إدارة المشاريع البحثية والنشر العلمي',
      icon: 'fa-microscope',
      iconType: 'success',
      url: 'https://fsed.bu.edu.eg/graduate-studies/scientific-research-ethics-charter',
      badge: 'hot',
      category: 'academic'
    },
    {
      id: 'd6',
      title: 'ضمان الجودة',
      description: 'التواصل مع وحدة ضمان الجودة ومراجعة البرامج الأكاديمية',
      icon: 'fa-award',
      iconType: 'primary',
      url: 'https://fsed.bu.edu.eg/units-and-centers/quality-assurance-unit',
      category: 'academic'
    }
  ],
  internship: [
    {
      id: 'i1',
      company: 'شركة الاتصالات',
      position: 'متدرب في تطوير البرمجيات',
      type: 'هجين',
      location: 'القاهرة',
      duration: '3 أشهر',
      deadline: '2024-12-30',
      logo: 'fa-phone',
      description: 'فرصة تدريب في تطوير تطبيقات الويب والموبايل باستخدام أحدث التقنيات',
      requirements: ['HTML/CSS', 'JavaScript', 'React/Angular', 'Git'],
      applyUrl: 'https://fsed.bu.edu.eg/ar/internship-apply',
      isFree: true,
      eligibleFor: ['student', 'graduate']
    },
    {
      id: 'i2',
      company: 'بنك الأهلي',
      position: 'متدرب في تحليل البيانات',
      type: 'عن بُعد',
      location: 'القاهرة',
      duration: '6 أشهر',
      deadline: '2024-12-25',
      logo: 'fa-university',
      description: 'تدريب عملي في تحليل البيانات المالية وإعداد التقارير',
      requirements: ['Excel', 'SQL', 'Power BI', 'Python basics'],
      applyUrl: 'https://fsed.bu.edu.eg/ar/internship-apply',
      isFree: true,
      eligibleFor: ['student', 'graduate']
    },
    {
      id: 'i3',
      company: 'شركة البرمجيات',
      position: 'متدرب في واجهة المستخدم',
      type: 'في الموقع',
      location: 'الإسكندرية',
      duration: '4 أشهر',
      deadline: '2024-12-20',
      logo: 'fa-code',
      description: 'تصميم وتطوير واجهات مستخدم حديثة ومتجاوبة',
      requirements: ['Figma', 'Adobe XD', 'HTML/CSS', 'JavaScript'],
      applyUrl: 'https://fsed.bu.edu.eg/ar/internship-apply',
      isFree: true,
      eligibleFor: ['student', 'graduate']
    },
    {
      id: 'i4',
      company: 'وزارة التعليم العالي',
      position: 'متدرب في تطوير المنصات التعليمية',
      type: 'عن بُعد',
      location: 'القاهرة',
      duration: '6 أشهر',
      deadline: '2025-01-15',
      logo: 'fa-graduation-cap',
      description: 'المشاركة في تطوير منصات التعلم الإلكتروني للجامعات المصرية',
      requirements: ['Web Development', 'Database', 'UI/UX', 'Project Management'],
      applyUrl: 'https://fsed.bu.edu.eg/ar/internship-apply',
      isFree: true,
      eligibleFor: ['student', 'graduate']
    }
  ]
};

// Initialize Enhanced Services
function initEnhancedServices() {
  console.log('🚀 Initializing Enhanced Services...');
  
  // Initialize role navigation
  initRoleNavigation();
  
  // Load default student services
  loadServicesByRole('student');
  
  // Load internship opportunities
  loadInternshipOpportunities();
  
  // Setup quick actions
  setupQuickActions();
  
  console.log('✅ Enhanced Services initialized successfully');
}

// Role Navigation System
function initRoleNavigation() {
  const roleNavItems = document.querySelectorAll('.role-nav__item');
  
  roleNavItems.forEach(item => {
    item.addEventListener('click', function() {
      const role = this.dataset.role;
      
      // Update active state
      roleNavItems.forEach(nav => {
        nav.classList.remove('is-active');
        nav.setAttribute('aria-selected', 'false');
      });
      
      this.classList.add('is-active');
      this.setAttribute('aria-selected', 'true');
      
      // Load services for selected role
      loadServicesByRole(role);
      
      // Show/hide internship section
      const internshipSection = document.getElementById('internshipShowcase');
      if (internshipSection) {
        internshipSection.style.display = role === 'internship' ? 'block' : 'none';
      }
    });
  });
}

// Load Services by Role
function loadServicesByRole(role) {
  console.log(`📋 Loading services for role: ${role}`);
  
  const grid = document.getElementById('studentServicesGrid');
  const loading = document.getElementById('servicesLoading');
  
  // Show loading state
  if (loading) loading.classList.remove('hidden');
  if (grid) grid.innerHTML = '';
  
  // Simulate loading delay
  setTimeout(() => {
    const services = ENHANCED_SERVICES_DATA[role] || ENHANCED_SERVICES_DATA.student;
    
    if (grid) {
      grid.innerHTML = services.map(service => createServiceCard(service)).join('');
    }
    
    // Hide loading state
    if (loading) loading.classList.add('hidden');
    
    console.log(`✅ Loaded ${services.length} services for ${role}`);
  }, 800);
}

// Create Service Card HTML
function createServiceCard(service) {
  const badgeHtml = service.badge ? 
    `<span class="service-card-modern__badge service-card-modern__badge--${service.badge}">${getBadgeText(service.badge)}</span>` : '';
  
  return `
    <article class="service-card-modern" onclick="openService('${service.url}')" role="button" tabindex="0">
      <div class="service-card-modern__header">
        <div class="service-card-modern__icon service-card-modern__icon--${service.iconType}">
          <i class="fa-solid ${service.icon}"></i>
        </div>
        <div class="service-card-modern__content">
          <h3 class="service-card-modern__title">${service.title}</h3>
        </div>
        ${badgeHtml}
      </div>
      <p class="service-card-modern__description">${service.description}</p>
      <div class="service-card-modern__footer">
        <span class="service-card-modern__action">
          <span>فتح الخدمة</span>
          <i class="fa-solid fa-arrow-left"></i>
        </span>
      </div>
    </article>
  `;
}

// Get Badge Text in Arabic
function getBadgeText(badge) {
  const badgeTexts = {
    'new': 'جديد',
    'popular': 'شائع',
    'featured': 'مميز'
  };
  return badgeTexts[badge] || badge;
}

// Load Internship Opportunities
// NOTE: internshipGrid is managed by student-services.js → renderInternships()
// This function is intentionally a no-op to avoid overwriting the real data.
function loadInternshipOpportunities() {
  console.log('ℹ️ loadInternshipOpportunities: skipped — managed by student-services.js');
}

// Create Internship Card HTML
function createInternshipCard(internship) {
  const deadlineDate = new Date(internship.deadline);
  const today = new Date();
  const daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
  const deadlineColor = daysLeft <= 7 ? 'var(--error-400)' : 'var(--warning-400)';
  
  // Check if user is eligible
  const userRole = document.body.getAttribute('data-role') || 'طالب';
  const isEligible = internship.eligibleFor.includes(userRole) || internship.eligibleFor.includes('student');
  
  const freeBadge = internship.isFree ? 
    `<span class="internship-card__free-badge">
      <i class="fa-solid fa-gift"></i>
      مجاني
    </span>` : '';
  
  const eligibilityInfo = internship.eligibleFor.includes('student') && internship.eligibleFor.includes('graduate') ? 
    '<span class="internship-card__eligibility"><i class="fa-solid fa-users"></i> للطلاب والخريجين</span>' : '';
  
  return `
    <article class="internship-card">
      <div class="internship-card__header">
        <div class="internship-card__company">
          <div class="internship-card__logo">
            <i class="fa-solid ${internship.logo}"></i>
          </div>
          <div class="internship-card__info">
            <h3>${internship.company}</h3>
            <p>${internship.position}</p>
            ${eligibilityInfo}
          </div>
        </div>
        <div class="internship-card__header-badges">
          <span class="internship-card__type">${internship.type}</span>
          ${freeBadge}
        </div>
      </div>
      
      <p class="internship-card__description">${internship.description}</p>
      
      <div class="internship-card__requirements">
        <h4><i class="fa-solid fa-list-check"></i> المتطلبات:</h4>
        <div class="internship-requirements-list">
          ${internship.requirements.map(req => `<span class="requirement-tag">${req}</span>`).join('')}
        </div>
      </div>
      
      <div class="internship-card__details">
        <div class="internship-detail">
          <i class="fa-solid fa-location-dot"></i>
          <span>${internship.location}</span>
        </div>
        <div class="internship-detail">
          <i class="fa-solid fa-clock"></i>
          <span>${internship.duration}</span>
        </div>
      </div>
      
      <div class="internship-card__footer">
        <span class="internship-card__deadline" style="color: ${deadlineColor}">
          <i class="fa-solid fa-calendar-xmark"></i>
          ${daysLeft > 0 ? `${daysLeft} يوم متبقي` : 'آخر يوم للتقديم'}
        </span>
        <button class="internship-card__apply ${!isEligible ? 'disabled' : ''}" 
                onclick="applyForInternship('${internship.id}')" 
                ${!isEligible ? 'disabled' : ''}>
          <span>${isEligible ? 'تقديم الآن' : 'غير متاح لك'}</span>
          <i class="fa-solid fa-arrow-left"></i>
        </button>
      </div>
    </article>
  `;
}

// Setup Quick Actions
function setupQuickActions() {
  const quickActions = document.querySelectorAll('.quick-action');
  
  quickActions.forEach(action => {
    action.addEventListener('click', function() {
      const actionText = this.querySelector('span').textContent;
      handleQuickAction(actionText);
    });
  });
}

// Handle Quick Actions
function handleQuickAction(action) {
  console.log(`⚡ Quick action clicked: ${action}`);
  
  switch(action) {
    case 'طلب جديد':
      showToast('جاري فتح نموذج الطلب الجديد...', 'info');
      break;
    case 'الطلبات السابقة':
      showToast('جاري تحميل الطلبات السابقة...', 'info');
      break;
    case 'المحفوظات':
      showToast('جاري تحميل الخدمات المحفوظة...', 'info');
      break;
    case 'الدعم الفني':
      showToast('جاري الاتصال بالدعم الفني...', 'success');
      break;
    default:
      showToast(`تنفيذ: ${action}`, 'info');
  }
}

// Service Actions — receives the URL directly from the card onclick
function openService(url) {
  if (url && url !== '#' && url.startsWith('http')) {
    window.open(url, '_blank', 'noopener,noreferrer');
  } else {
    // Fallback to the faculty homepage
    window.open('https://fsed.bu.edu.eg', '_blank', 'noopener,noreferrer');
    showToast('جاري فتح موقع الكلية...', 'info');
  }
}

// Find service by ID
function findService(serviceId) {
  for (const category in ENHANCED_SERVICES_DATA) {
    const service = ENHANCED_SERVICES_DATA[category].find(s => s.id === serviceId);
    if (service) return service;
  }
  return null;
}

// Internship Actions
function applyForInternship(internshipId) {
  console.log(`📝 Applying for internship: ${internshipId}`);
  
  // Find the internship data
  const internship = ENHANCED_SERVICES_DATA.internship.find(i => i.id === internshipId);
  if (!internship) {
    showToast('فرصة التدريب غير موجودة', 'error');
    return;
  }
  
  // Check user eligibility
  const userRole = document.body.getAttribute('data-role') || 'طالب';
  const isEligible = internship.eligibleFor.includes(userRole) || internship.eligibleFor.includes('student');
  
  if (!isEligible) {
    showToast('هذه الفرصة غير متاحة للدور الحالي', 'warning');
    return;
  }
  
  // Check if it's free
  if (internship.isFree) {
    showToast('🎁 فرصة تدريب مجانية - جاري فتح نموذج التقديم...', 'success');
  } else {
    showToast('جاري فتح نموذج التقديم...', 'info');
  }
  
  // Open application form in new tab
  setTimeout(() => {
    if (internship.applyUrl && internship.applyUrl !== '#') {
      window.open(internship.applyUrl, '_blank');
      showToast('تم فتح صفحة التقديم بنجاح', 'success');
    } else {
      // Fallback: show application modal or redirect
      showApplicationModal(internship);
    }
  }, 1000);
}

// Show Application Modal (fallback)
function showApplicationModal(internship) {
  // Create modal if it doesn't exist
  let modal = document.getElementById('internshipModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'internshipModal';
    modal.className = 'internship-modal';
    modal.innerHTML = `
      <div class="internship-modal__content">
        <div class="internship-modal__header">
          <h3>تقديم على فرصة التدريب</h3>
          <button class="internship-modal__close" onclick="closeInternshipModal()">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="internship-modal__body">
          <div class="internship-info">
            <h4>${internship.company} - ${internship.position}</h4>
            <p>${internship.description}</p>
          </div>
          <form id="internshipApplicationForm">
            <div class="form-group">
              <label>الاسم الكامل</label>
              <input type="text" required>
            </div>
            <div class="form-group">
              <label>البريد الإلكتروني</label>
              <input type="email" required>
            </div>
            <div class="form-group">
              <label>رقم الهاتف</label>
              <input type="tel" required>
            </div>
            <div class="form-group">
              <label>رسالة تعريفية</label>
              <textarea rows="4" placeholder="أخبرنا لماذا تريد الانضمام إلى هذه الفرصة..."></textarea>
            </div>
            <button type="submit" class="btn btn--primary">
              <i class="fa-solid fa-paper-plane"></i>
              إرسال الطلب
            </button>
          </form>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    
    // Add form submit handler
    document.getElementById('internshipApplicationForm').addEventListener('submit', function(e) {
      e.preventDefault();
      showToast('تم إرسال طلبك بنجاح! سنتواصل معك قريباً', 'success');
      closeInternshipModal();
    });
  }
  
  // Update modal content with current internship
  modal.querySelector('.internship-info h4').textContent = `${internship.company} - ${internship.position}`;
  modal.querySelector('.internship-info p').textContent = internship.description;
  
  // Show modal
  modal.classList.add('show');
}

// Close Internship Modal
function closeInternshipModal() {
  const modal = document.getElementById('internshipModal');
  if (modal) {
    modal.classList.remove('show');
  }
}

// Toast Notification System
function showToast(message, type = 'info') {
  const toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) return;
  
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <i class="fa-solid ${getToastIcon(type)}"></i>
    <span>${message}</span>
  `;
  
  toastContainer.appendChild(toast);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    toast.style.animation = 'toastOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Get Toast Icon
function getToastIcon(type) {
  const icons = {
    'success': 'fa-check-circle',
    'error': 'fa-exclamation-circle',
    'warning': 'fa-exclamation-triangle',
    'info': 'fa-info-circle'
  };
  return icons[type] || 'fa-info-circle';
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Wait for existing initialization to complete
  setTimeout(() => {
    initEnhancedServices();
  }, 1000);
});

// Add CSS animation for toast out
const style = document.createElement('style');
style.textContent = `
  @keyframes toastOut {
    to {
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
  }
`;
document.head.appendChild(style);
