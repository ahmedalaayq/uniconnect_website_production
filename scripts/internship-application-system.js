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
    this.init();
  }

  async init() {
    try {
      // Wait for Firebase to be ready
      if (typeof firebase !== 'undefined' && firebase.firestore) {
        this.db = firebase.firestore();
        console.log('🔥 Firestore initialized for internship applications');
        
        // Get current user
        firebase.auth().onAuthStateChanged(async (user) => {
          if (user) {
            this.currentUser = user;
            await this.loadUserApplications();
            console.log('👤 User authenticated:', user.email);
          }
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

      // Create application document
      const applicationData = {
        id: this.generateId(),
        userId: this.currentUser.uid,
        userEmail: this.currentUser.email,
        userName: formData.fullName,
        userPhone: formData.phone,
        internshipId: internshipId,
        internshipCompany: internship.company,
        internshipPosition: internship.title,      // INTERNSHIP_DATA uses 'title'
        internshipType: internship.type,
        internshipLocation: internship.location,
        internshipDuration: internship.salary || '',
        coverLetter: formData.coverLetter,
        status: APPLICATION_STATUS.PENDING,
        appliedAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        eligibility: internship.eligibleFor,
        isFree: internship.isFree
      };

      // Save to Firestore
      await this.db.collection(COLLECTIONS.applications).add(applicationData);
      
      // Update local applications array
      this.applications.push(applicationData);

      console.log('✅ Application submitted successfully:', applicationData.id);
      
      return {
        success: true,
        applicationId: applicationData.id,
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
      if (!this.currentUser || !this.db) return;

      const snapshot = await this.db
        .collection(COLLECTIONS.applications)
        .where('userId', '==', this.currentUser.uid)
        .orderBy('appliedAt', 'desc')
        .get();

      this.applications = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      console.log(`📋 Loaded ${this.applications.length} applications`);
      
      // Update UI if applications view exists
      this.updateApplicationsUI();

    } catch (error) {
      console.error('❌ Error loading applications:', error);
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
      if (!this.db) throw new Error('Firestore not initialized');

      await this.db
        .collection(COLLECTIONS.applications)
        .doc(applicationId)
        .update({
          status: APPLICATION_STATUS.WITHDRAWN,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

      // Update local array
      const appIndex = this.applications.findIndex(app => app.id === applicationId);
      if (appIndex !== -1) {
        this.applications[appIndex].status = APPLICATION_STATUS.WITHDRAWN;
        this.applications[appIndex].updatedAt = new Date();
      }

      console.log('✅ Application withdrawn successfully');
      return true;

    } catch (error) {
      console.error('❌ Error withdrawing application:', error);
      return false;
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

// View application details
function viewApplicationDetails(applicationId) {
  const application = internshipAppSystem.getApplication(applicationId);
  if (!application) return;
  
  const statusConfig = internshipAppSystem.getStatusConfig(application.status);
  const appliedDate = application.appliedAt?.toDate() || new Date();
  
  showToast(`تفاصيل الطلب: ${application.internshipCompany} - ${statusConfig.text}`, 'info');
}

// Withdraw application
async function withdrawApplication(applicationId) {
  if (!confirm('هل أنت متأكد من سحب هذا الطلب؟')) return;
  
  const success = await internshipAppSystem.withdrawApplication(applicationId);
  if (success) {
    showToast('تم سحب الطلب بنجاح', 'success');
    internshipAppSystem.updateApplicationsUI();
    updateApplicationsCount();
  } else {
    showToast('حدث خطأ أثناء سحب الطلب', 'error');
  }
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

  // Ensure system is ready then LOAD from Firestore FIRST
  if (!internshipAppSystem) {
    internshipAppSystem = new InternshipApplicationSystem();
    await new Promise(resolve => setTimeout(resolve, 1500));
  }
  
  await internshipAppSystem.loadUserApplications();
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
  setTimeout(() => {
    internshipAppSystem = new InternshipApplicationSystem();
    
    // Update applications count after loading
    setTimeout(() => {
      updateApplicationsCount();
    }, 3000);
  }, 2000);
});
