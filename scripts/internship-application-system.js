/* ═══════════════════════════════════════════════════════════════════
   INTERNSHIP APPLICATION SYSTEM - Firestore Integration
   ═══════════════════════════════════════════════════════════════════ */

// Firestore Collection Names
const COLLECTIONS = {
  applications: 'internship_applications',
  internships: 'internships',
  users: 'users'
};

// Application Status Constants
const APPLICATION_STATUS = {
  PENDING: 'pending',
  UNDER_REVIEW: 'under_review',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  WITHDRAWN: 'withdrawn'
};

// Enhanced Internship Application System
class InternshipApplicationSystem {
  constructor() {
    this.db = null;
    this.currentUser = null;
    this.applications = [];
    // لا نستدعي init() تلقائياً لتجنب تشغيل auth listeners متعددة
    // يجب استدعاءها صراحةً: إما في DOMContentLoaded أو في showMyApplications
  }

  async init() {
    try {
      // Wait for Firebase to be ready
      if (typeof firebase !== 'undefined' && firebase.firestore) {
        this.db = firebase.firestore();
        console.log('🔥 Firestore initialized for internship applications');

        // Resolve with current user once auth state is known
        await new Promise((resolve) => {
          firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
              this.currentUser = user;
              console.log('👤 User authenticated:', user.email);
              await this.loadUserApplications();
            }
            resolve();
          });
        });
      }
    } catch (error) {
      console.error('❌ Error initializing internship system:', error);
    }
  }

  // Submit new internship application
  async submitApplication(internshipId, formData) {
    try {
      if (!this.currentUser) {
        throw new Error('User not authenticated');
      }

      // Get internship details from INTERNSHIP_DATA (defined in student-services.js)
      const internship = (typeof INTERNSHIP_DATA !== 'undefined')
        ? INTERNSHIP_DATA.find(i => i.id === internshipId)
        : null;
      if (!internship) {
        throw new Error('Internship not found');
      }

      // Check if already applied
      const existingApplication = this.applications.find(
        app => app.internshipId === internshipId && 
        app.status !== APPLICATION_STATUS.WITHDRAWN
      );

      if (existingApplication) {
        throw new Error('لقد قدمت بالفعل على هذه الفرصة');
      }

      // Create application document (بدون id مخصص — نترك Firestore يولده)
      const applicationData = {
        userId: this.currentUser.uid,
        userEmail: this.currentUser.email,
        userName: formData.fullName,
        userPhone: formData.phone,
        internshipId: internshipId,
        internshipCompany: internship.company,
        internshipPosition: internship.title,
        internshipType: internship.type,
        internshipLocation: internship.location,
        internshipDuration: internship.salary || '',
        coverLetter: formData.coverLetter,
        status: APPLICATION_STATUS.PENDING,
        appliedAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      };

      // Save to Firestore — .add() يرجع docRef بالـ ID الحقيقي
      const docRef = await this.db.collection(COLLECTIONS.applications).add(applicationData);

      // نحفظ الـ Firestore document ID (مش custom ID) عشان withdraw يشتغل صح
      const savedApplication = { id: docRef.id, ...applicationData };
      this.applications.unshift(savedApplication); // نضيفه في الأول (أحدث)

      console.log('✅ Application submitted successfully — Firestore ID:', docRef.id);

      return {
        success: true,
        applicationId: docRef.id,
        message: 'تم تقديم طلبك بنجاح!'
      };

    } catch (error) {
      console.error('❌ Error submitting application:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Load user's applications
  async loadUserApplications() {
    try {
      // إذا لم يكن هناك مستخدم أو DB، انتظر auth state أولاً
      if (!this.currentUser) {
        this.currentUser = await new Promise((resolve) => {
          const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            unsubscribe();
            resolve(user);
          });
        });
      }

      if (!this.currentUser || !this.db) {
        console.warn('⚠️ loadUserApplications: لا يوجد مستخدم أو DB');
        return;
      }

      // ملاحظة: تم إزالة orderBy('appliedAt') لتجنب Composite Index
      // نقوم بالترتيب client-side بعد التحميل
      const snapshot = await this.db
        .collection(COLLECTIONS.applications)
        .where('userId', '==', this.currentUser.uid)
        .get();

      this.applications = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => {
          // الترتيب من الأحدث للأقدم client-side
          const timeA = a.appliedAt?.toMillis?.() || a.appliedAt?.seconds * 1000 || 0;
          const timeB = b.appliedAt?.toMillis?.() || b.appliedAt?.seconds * 1000 || 0;
          return timeB - timeA;
        });

      console.log(`📋 Loaded ${this.applications.length} applications from Firestore`);

      // Update UI if applications view exists
      this.updateApplicationsUI();
      updateApplicationsCount();

    } catch (error) {
      console.error('❌ Error loading applications:', error);
      // أظهر رسالة خطأ واضحة للمستخدم
      const container = document.getElementById('myApplications');
      if (container) {
        container.innerHTML = `
          <div class="empty-applications">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <h3>فشل تحميل الطلبات</h3>
            <p>${error.message || 'تحقق من اتصالك بالإنترنت'}</p>
            <button class="btn btn--primary" onclick="internshipAppSystem.loadUserApplications()">إعادة المحاولة</button>
          </div>
        `;
      }
    }
  }

  // Get user's applications
  getUserApplications() {
    return this.applications;
  }

  // Get application by ID
  getApplication(applicationId) {
    return this.applications.find(app => app.id === applicationId);
  }

  // Withdraw application
  async withdrawApplication(applicationId) {
    try {
      // Fallback: استخدم firebase.firestore() مباشرة لو this.db لم يُهيَّأ بعد
      const db = this.db || (typeof firebase !== 'undefined' ? firebase.firestore() : null);
      if (!db) throw new Error('Firestore غير متاح — تحقق من الاتصال بالإنترنت');

      // نُحدّث مباشرة — Firestore يرفض تلقائياً لو الـ document غير موجود
      await db
        .collection(COLLECTIONS.applications)
        .doc(applicationId)
        .update({
          status: APPLICATION_STATUS.WITHDRAWN,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

      // تحديث المصفوفة المحلية فوراً بدون انتظار
      const appIndex = this.applications.findIndex(app => app.id === applicationId);
      if (appIndex !== -1) {
        this.applications[appIndex].status = APPLICATION_STATUS.WITHDRAWN;
        this.applications[appIndex].updatedAt = new Date();
      }

      console.log('✅ Application withdrawn successfully:', applicationId);
      return { success: true };

    } catch (error) {
      console.error('❌ Error withdrawing application:', error);
      return { success: false, message: error.message };
    }
  }

  // Update applications UI
  updateApplicationsUI() {
    const applicationsContainer = document.getElementById('myApplications');
    if (!applicationsContainer) return;

    if (this.applications.length === 0) {
      applicationsContainer.innerHTML = `
        <div class="empty-applications">
          <i class="fa-solid fa-file-lines"></i>
          <h3>لا توجد طلبات مقدمة</h3>
          <p>ابدأ بالتقديم على فرص التدريب المتاحة</p>
        </div>
      `;
      return;
    }

    const applicationsHTML = this.applications.map(app => this.createApplicationCard(app)).join('');
    applicationsContainer.innerHTML = applicationsHTML;
  }

  // Create application card HTML
  createApplicationCard(application) {
    const statusConfig = this.getStatusConfig(application.status);
    const appliedDate = application.appliedAt?.toDate() || new Date();
    
    return `
      <div class="application-card" data-application-id="${application.id}">
        <div class="application-card__header">
          <div class="application-card__company">
            <div class="application-card__logo">
              <i class="fa-solid fa-briefcase"></i>
            </div>
            <div class="application-card__info">
              <h4>${application.internshipCompany}</h4>
              <p>${application.internshipPosition}</p>
            </div>
          </div>
          <span class="application-card__status ${statusConfig.class}">
            <i class="${statusConfig.icon}"></i>
            ${statusConfig.text}
          </span>
        </div>
        
        <div class="application-card__details">
          <div class="application-detail">
            <i class="fa-solid fa-location-dot"></i>
            <span>${application.internshipLocation}</span>
          </div>
          <div class="application-detail">
            <i class="fa-solid fa-clock"></i>
            <span>${application.internshipDuration}</span>
          </div>
          <div class="application-detail">
            <i class="fa-solid fa-calendar"></i>
            <span>قدم في ${appliedDate.toLocaleDateString('ar-EG')}</span>
          </div>
        </div>
        
        <div class="application-card__footer">
          <button class="application-card__view" onclick="viewApplicationDetails('${application.id}')">
            <i class="fa-solid fa-eye"></i>
            عرض التفاصيل
          </button>
          ${application.status === APPLICATION_STATUS.PENDING ? 
            `<button class="application-card__withdraw" onclick="withdrawApplication('${application.id}')">
              <i class="fa-solid fa-xmark"></i>
              سحب الطلب
            </button>` : ''
          }
        </div>
      </div>
    `;
  }

  // Get status configuration
  getStatusConfig(status) {
    const configs = {
      [APPLICATION_STATUS.PENDING]: {
        text: 'قيد المراجعة',
        class: 'status-pending',
        icon: 'fa-solid fa-clock'
      },
      [APPLICATION_STATUS.UNDER_REVIEW]: {
        text: 'قيد المعالجة',
        class: 'status-review',
        icon: 'fa-solid fa-search'
      },
      [APPLICATION_STATUS.ACCEPTED]: {
        text: 'مقبول',
        class: 'status-accepted',
        icon: 'fa-solid fa-check-circle'
      },
      [APPLICATION_STATUS.REJECTED]: {
        text: 'مرفوض',
        class: 'status-rejected',
        icon: 'fa-solid fa-times-circle'
      },
      [APPLICATION_STATUS.WITHDRAWN]: {
        text: 'مسحوب',
        class: 'status-withdrawn',
        icon: 'fa-solid fa-ban'
      }
    };
    
    return configs[status] || configs[APPLICATION_STATUS.PENDING];
  }

  // Generate unique ID
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

// Initialize the system
let internshipAppSystem;

// Enhanced application function
async function applyForInternship(internshipId) {
  console.log(`📝 Applying for internship: ${internshipId}`);
  
  try {
    // Check if system is initialized
    if (!internshipAppSystem) {
      internshipAppSystem = new InternshipApplicationSystem();
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for initialization
    }

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

    // Show application modal
    showApplicationModal(internship);

  } catch (error) {
    console.error('❌ Error in applyForInternship:', error);
    showToast('حدث خطأ أثناء فتح نموذج التقديم', 'error');
  }
}

// Enhanced application modal
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
            <div class="internship-badges">
              ${internship.isFree ? '<span class="free-badge">🎁 مجاني</span>' : ''}
              <span class="type-badge">${internship.type}</span>
              <span class="location-badge">${internship.location}</span>
            </div>
          </div>
          <form id="internshipApplicationForm">
            <div class="form-row">
              <div class="form-group">
                <label>الاسم الكامل *</label>
                <input type="text" name="fullName" required placeholder="أدخل اسمك الكامل">
              </div>
              <div class="form-group">
                <label>البريد الإلكتروني *</label>
                <input type="email" name="email" required placeholder="example@email.com">
              </div>
            </div>
            <div class="form-group">
              <label>رقم الهاتف *</label>
              <input type="tel" name="phone" required placeholder="01xxxxxxxxx">
            </div>
            <div class="form-group">
              <label>رسالة تعريفية *</label>
              <textarea name="coverLetter" rows="4" required 
                placeholder="أخبرنا لماذا تريد الانضمام إلى هذه الفرصة ومؤهلاتك..."></textarea>
            </div>
            <div class="form-actions">
              <button type="button" class="btn btn--secondary" onclick="closeInternshipModal()">
                إلغاء
              </button>
              <button type="submit" class="btn btn--primary" id="submitBtn">
                <i class="fa-solid fa-paper-plane"></i>
                إرسال الطلب
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    
    // Add form submit handler
    document.getElementById('internshipApplicationForm').addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitBtn = document.getElementById('submitBtn');
      const originalText = submitBtn.innerHTML;
      
      // Show loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جاري الإرسال...';
      
      // Get form data
      const formData = {
        fullName: e.target.fullName.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
        coverLetter: e.target.coverLetter.value
      };
      
      // Submit application
      const result = await internshipAppSystem.submitApplication(internship.id, formData);
      
      if (result.success) {
        showToast('🎉 تم تقديم طلبك بنجاح! يمكنك تتبع حالتك من قسم "طلباتي"', 'success');
        closeInternshipModal();
        
        // Reset form
        e.target.reset();
        
        // Update applications count
        updateApplicationsCount();
        
      } else {
        showToast(result.error || 'حدث خطأ أثناء إرسال الطلب', 'error');
      }
      
      // Restore button
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    });
  }
  
  // Update modal content with current internship
  modal.querySelector('.internship-info h4').textContent = `${internship.company} - ${internship.position}`;
  modal.querySelector('.internship-info p').textContent = internship.description;
  
  // Pre-fill user data if available
  const userNameElement = document.getElementById('sidebarName');
  const userEmailElement = document.getElementById('sidebarEmail');
  
  if (userNameElement && userNameElement.textContent !== 'جاري التحميل...') {
    modal.querySelector('input[name="fullName"]').value = userNameElement.textContent;
  }
  
  if (userEmailElement && userEmailElement.textContent !== 'email@example.com') {
    modal.querySelector('input[name="email"]').value = userEmailElement.textContent;
  }
  
  // Show modal
  modal.classList.add('show');
}

// ═══════════════════════════════════════════════════════
//  Modal تفاصيل الطلب
// ═══════════════════════════════════════════════════════
function viewApplicationDetails(applicationId) {
  if (!internshipAppSystem) {
    showToast('جاري تحميل النظام، حاول مرة أخرى', 'info');
    return;
  }
  const application = internshipAppSystem.getApplication(applicationId);
  if (!application) {
    // قد يكون الطلب محملاً من Firestore لكن غير موجود في الذاكرة — أعد التحميل
    showToast('جاري تحميل تفاصيل الطلب...', 'info');
    internshipAppSystem.loadUserApplications().then(() => {
      const app = internshipAppSystem.getApplication(applicationId);
      if (app) viewApplicationDetails(applicationId);
      else showToast('لم يتم العثور على تفاصيل الطلب', 'error');
    });
    return;
  }

  const statusConfig = internshipAppSystem.getStatusConfig(application.status);
  let appliedDate = 'غير محدد';
  try {
    const d = application.appliedAt?.toDate
      ? application.appliedAt.toDate()
      : application.appliedAt?.seconds
        ? new Date(application.appliedAt.seconds * 1000)
        : new Date();
    appliedDate = d.toLocaleDateString('ar-EG', { year:'numeric', month:'long', day:'numeric' });
  } catch(_) {}

  // حذف أي modal تفاصيل قديم وأعد إنشاءه
  const old = document.getElementById('applicationDetailsModal');
  if (old) old.remove();

  const modal = document.createElement('div');
  modal.id = 'applicationDetailsModal';
  modal.className = 'app-details-modal';
  modal.innerHTML = `
    <div class="app-details-modal__backdrop" onclick="closeApplicationDetailsModal()"></div>
    <div class="app-details-modal__content">
      <div class="app-details-modal__header">
        <h3><i class="fa-solid fa-file-lines"></i> تفاصيل الطلب</h3>
        <button class="app-details-modal__close" onclick="closeApplicationDetailsModal()">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div class="app-details-modal__body">

        <div class="app-details-company">
          <div class="app-details-company__logo">
            <i class="fa-solid fa-briefcase"></i>
          </div>
          <div class="app-details-company__info">
            <h4>${application.internshipCompany || 'غير محدد'}</h4>
            <p>${application.internshipPosition || ''}</p>
          </div>
          <span class="app-details-modal__status ${statusConfig.class}">
            <i class="${statusConfig.icon}"></i>
            ${statusConfig.text}
          </span>
        </div>

        <div class="app-details-grid">
          <div class="app-details-item">
            <span class="app-details-label"><i class="fa-solid fa-location-dot"></i> الموقع</span>
            <span class="app-details-value">${application.internshipLocation || 'غير محدد'}</span>
          </div>
          <div class="app-details-item">
            <span class="app-details-label"><i class="fa-solid fa-money-bill-wave"></i> الراتب</span>
            <span class="app-details-value">${application.internshipDuration || 'غير محدد'}</span>
          </div>
          <div class="app-details-item">
            <span class="app-details-label"><i class="fa-solid fa-tag"></i> نوع التدريب</span>
            <span class="app-details-value">${application.internshipType || 'غير محدد'}</span>
          </div>
          <div class="app-details-item">
            <span class="app-details-label"><i class="fa-solid fa-calendar-check"></i> تاريخ التقديم</span>
            <span class="app-details-value">${appliedDate}</span>
          </div>
          <div class="app-details-item">
            <span class="app-details-label"><i class="fa-solid fa-envelope"></i> البريد الإلكتروني</span>
            <span class="app-details-value">${application.userEmail || 'غير محدد'}</span>
          </div>
          <div class="app-details-item">
            <span class="app-details-label"><i class="fa-solid fa-phone"></i> رقم الهاتف</span>
            <span class="app-details-value">${application.userPhone || 'لم يذكر'}</span>
          </div>
        </div>

        ${application.coverLetter ? `
          <div class="app-details-cover">
            <span class="app-details-label"><i class="fa-solid fa-pen-to-square"></i> الرسالة التعريفية</span>
            <p class="app-details-cover__text">${application.coverLetter}</p>
          </div>
        ` : ''}

      </div>

      <div class="app-details-modal__footer">
        ${application.status === 'pending' || application.status === 'under_review' ? `
          <button class="btn btn--danger" onclick="confirmWithdrawApplication('${application.id}')">
            <i class="fa-solid fa-xmark"></i> سحب الطلب
          </button>
        ` : ''}
        <button class="btn btn--secondary" onclick="closeApplicationDetailsModal()">
          <i class="fa-solid fa-arrow-left"></i> إغلاق
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  requestAnimationFrame(() => modal.classList.add('show'));
}

function closeApplicationDetailsModal() {
  const modal = document.getElementById('applicationDetailsModal');
  if (!modal) return;
  modal.classList.remove('show');
  setTimeout(() => modal.remove(), 300);
}

// ═══════════════════════════════════════════════════════
//  تأكيد سحب الطلب (in-app بدل confirm())
// ═══════════════════════════════════════════════════════
function confirmWithdrawApplication(applicationId) {
  // حذف أي confirm modal قديم
  const old = document.getElementById('withdrawConfirmModal');
  if (old) old.remove();

  const modal = document.createElement('div');
  modal.id = 'withdrawConfirmModal';
  modal.className = 'app-details-modal';
  modal.innerHTML = `
    <div class="app-details-modal__backdrop"></div>
    <div class="app-details-modal__content app-details-modal__content--sm">
      <div class="app-details-modal__header">
        <h3><i class="fa-solid fa-triangle-exclamation" style="color:var(--danger,#ef4444)"></i> تأكيد سحب الطلب</h3>
      </div>
      <div class="app-details-modal__body">
        <p style="text-align:center;padding:1rem 0;color:var(--text-secondary,#94a3b8);line-height:1.8">
          هل أنت متأكد من سحب هذا الطلب؟<br/>
          <small>لا يمكن التراجع عن هذه العملية.</small>
        </p>
      </div>
      <div class="app-details-modal__footer">
        <button class="btn btn--danger" id="confirmWithdrawBtn" onclick="executeWithdraw('${applicationId}')">
          <i class="fa-solid fa-check"></i> نعم، سحب الطلب
        </button>
        <button class="btn btn--secondary" onclick="document.getElementById('withdrawConfirmModal').remove()">
          إلغاء
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  requestAnimationFrame(() => modal.classList.add('show'));
}

async function executeWithdraw(applicationId) {
  const confirmModal = document.getElementById('withdrawConfirmModal');
  const btn = document.getElementById('confirmWithdrawBtn');
  if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جاري السحب...'; }

  if (!internshipAppSystem) {
    if (confirmModal) confirmModal.remove();
    showToast('النظام غير جاهز، حاول مرة أخرى', 'error');
    return;
  }

  const result = await internshipAppSystem.withdrawApplication(applicationId);

  // أغلق الـ modals في كل الأحوال
  if (confirmModal) confirmModal.remove();
  closeApplicationDetailsModal();

  if (result && result.success) {
    showToast('تم سحب الطلب بنجاح ✅', 'success');
    internshipAppSystem.updateApplicationsUI();
    updateApplicationsCount();
  } else {
    const errMsg = result?.message || 'حدث خطأ غير متوقع أثناء سحب الطلب';
    showToast('❌ ' + errMsg, 'error', 4000);
    console.error('Withdraw failed:', errMsg);
  }
}

// Withdraw application (legacy — للتوافق مع application cards القديمة)
async function withdrawApplication(applicationId) {
  confirmWithdrawApplication(applicationId);
}

// Update applications count
function updateApplicationsCount() {
  const countElement = document.getElementById('applicationsCount');
  if (countElement && internshipAppSystem) {
    const activeApplications = internshipAppSystem.getUserApplications().filter(
      app => app.status !== APPLICATION_STATUS.WITHDRAWN
    );
    countElement.textContent = activeApplications.length;
  }
}

// Close modal function
function closeInternshipModal() {
  const modal = document.getElementById('internshipModal');
  if (modal) {
    modal.classList.remove('show');
  }
}

// Show/Hide My Applications
async function showMyApplications() {
  // Hide other sections
  document.getElementById('studentServicesSection').style.display = 'none';
  const internshipEl = document.getElementById('internshipShowcase');
  if (internshipEl) internshipEl.style.display = 'none';

  // Show applications section
  document.getElementById('myApplicationsSection').style.display = 'block';

  // Show loading state
  const container = document.getElementById('myApplications');
  if (container) {
    container.innerHTML = `
      <div class="empty-applications">
        <i class="fa-solid fa-spinner fa-spin"></i>
        <h3>جاري تحميل طلباتك...</h3>
      </div>
    `;
  }

  // إذا لم يكن النظام جاهزاً، انتظر auth حقيقي بدلاً من setTimeout
  if (!internshipAppSystem) {
    internshipAppSystem = new InternshipApplicationSystem();
    // init() تنتظر auth state بنفسها، لا نحتاج setTimeout
    await internshipAppSystem.init();
  } else {
    // النظام موجود مسبقاً — فقط أعد التحميل
    await internshipAppSystem.loadUserApplications();
  }
}

function hideMyApplications() {
  // Show other sections
  document.getElementById('studentServicesSection').style.display = 'block';
  document.getElementById('internshipShowcase').style.display = 'block';
  
  // Hide applications section
  document.getElementById('myApplicationsSection').style.display = 'none';
}

// Initialize system when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  internshipAppSystem = new InternshipApplicationSystem();
  // نستدعي init() صراحةً بعد إنشاء الكائن
  internshipAppSystem.init();
});
