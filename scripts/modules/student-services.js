/* ═══════════════════════════════════════════════════════════════
   STUDENT SERVICES MODULE
   GradConnect | كلية التربية النوعية
═══════════════════════════════════════════════════════════════ */

'use strict';

/* ── DATA ─────────────────────────────────────────────────── */
const SERVICES = [
  /* ══ ACADEMIC ══════════════════════════════════════════════ */
  {
    id: 'ac1', cat: 'academic',
    icon: '📖', iconBg: 'icon-bg-brand',
    title: 'الجدول الدراسي',
    desc: 'اطلع على الجدول الدراسي الأسبوعي لجميع الأقسام والفرق الدراسية.',
    tags: ['أكاديمي', 'جداول'],
    btn: 'عرض الجدول', btnStyle: 'btn-card'
  },
  {
    id: 'ac2', cat: 'academic',
    icon: '📜', iconBg: 'icon-bg-brand',
    title: 'شهادات القيد والدراسة',
    desc: 'طلب شهادة قيد رسمية أو ما يفيد بالدراسة معتمدة من الكلية.',
    tags: ['أكاديمي', 'وثائق'],
    btn: 'طلب شهادة', btnStyle: 'btn-card'
  },
  {
    id: 'ac3', cat: 'academic',
    icon: '🗂️', iconBg: 'icon-bg-brand',
    title: 'السجل الأكاديمي (الترانسكريبت)',
    desc: 'استخراج نسخة رسمية من سجلك الأكاديمي بجميع درجاتك ومقرراتك.',
    tags: ['أكاديمي', 'درجات'],
    btn: 'طلب الترانسكريبت', btnStyle: 'btn-card'
  },
  {
    id: 'ac4', cat: 'academic',
    icon: '📚', iconBg: 'icon-bg-brand',
    title: 'المكتبة الإلكترونية',
    desc: 'وصول مباشر لآلاف الكتب والمجلات والمراجع العلمية الرقمية.',
    tags: ['أكاديمي', 'مكتبة'],
    btn: 'الدخول للمكتبة', btnStyle: 'btn-card'
  },
  {
    id: 'ac5', cat: 'academic',
    icon: '🗺️', iconBg: 'icon-bg-brand',
    title: 'خطة الدراسة والمقررات',
    desc: 'تصفح خطة الدراسة وتوزيع المقررات على الفصول الدراسية لكل قسم.',
    tags: ['أكاديمي', 'مقررات'],
    btn: 'استعراض الخطة', btnStyle: 'btn-card outline'
  },
  {
    id: 'ac6', cat: 'academic',
    icon: '🔬', iconBg: 'icon-bg-brand',
    title: 'المعامل والمختبرات',
    desc: 'حجز جلسات في مختبرات الحاسب والمعامل التخصصية للكلية.',
    tags: ['أكاديمي', 'حجز'],
    btn: 'حجز موعد', btnStyle: 'btn-card'
  },
  {
    id: 'ac7', cat: 'academic',
    icon: '📊', iconBg: 'icon-bg-brand',
    title: 'تقييم المقررات والأساتذة',
    desc: 'شارك في استطلاعات تقييم جودة التدريس وتطوير العملية التعليمية.',
    tags: ['أكاديمي', 'تقييم'],
    btn: 'تقييم الآن', btnStyle: 'btn-card outline'
  },
  {
    id: 'ac8', cat: 'academic',
    icon: '🎓', iconBg: 'icon-bg-brand',
    title: 'شروط التخرج والمتطلبات',
    desc: 'تحقق من متطلبات التخرج والساعات المعتمدة المطلوبة لحصولك على الدرجة.',
    tags: ['أكاديمي', 'تخرج'],
    btn: 'استعراض الشروط', btnStyle: 'btn-card outline'
  },

  /* ══ EXAMS ══════════════════════════════════════════════════ */
  {
    id: 'ex1', cat: 'exam',
    icon: '📋', iconBg: 'icon-bg-amber',
    title: 'جداول الامتحانات',
    desc: 'الاطلاع على مواعيد امتحانات نهاية الفصل الدراسي وخرائط لجان الامتحانات.',
    tags: ['امتحانات', 'جداول'],
    btn: 'عرض الجدول', btnStyle: 'btn-card'
  },
  {
    id: 'ex2', cat: 'exam',
    icon: '📝', iconBg: 'icon-bg-amber',
    title: 'تسجيل الامتحانات',
    desc: 'سجّل في امتحانات الفصل الدراسي وتأكد من تأهلك واستيفاء متطلبات الحضور.',
    tags: ['امتحانات', 'تسجيل'],
    btn: 'تسجيل الآن', btnStyle: 'btn-card'
  },
  {
    id: 'ex3', cat: 'exam',
    icon: '✅', iconBg: 'icon-bg-amber',
    title: 'نتائج الامتحانات',
    desc: 'استعرض نتائجك ودرجاتك بعد الإعلان الرسمي عنها من إدارة الامتحانات.',
    tags: ['امتحانات', 'نتائج'],
    btn: 'عرض النتائج', btnStyle: 'btn-card'
  },
  {
    id: 'ex4', cat: 'exam',
    icon: '🔁', iconBg: 'icon-bg-amber',
    title: 'طلب إعادة الفحص',
    desc: 'تقدم بطلب رسمي لإعادة فحص ورقة إجابتك خلال المدة المحددة بعد الإعلان.',
    tags: ['امتحانات', 'تظلمات'],
    btn: 'تقديم طلب', btnStyle: 'btn-card outline'
  },
  {
    id: 'ex5', cat: 'exam',
    icon: '🪪', iconBg: 'icon-bg-amber',
    title: 'كارنيه الامتحانات',
    desc: 'استخراج بيانات وطباعة ورقة الجلوس والكارنيه الخاص بامتحانات هذا الفصل.',
    tags: ['امتحانات', 'وثائق'],
    btn: 'طباعة الكارنيه', btnStyle: 'btn-card'
  },
  {
    id: 'ex6', cat: 'exam',
    icon: '📅', iconBg: 'icon-bg-amber',
    title: 'امتحانات التقدير للتحسين',
    desc: 'تعرف على شروط وإجراءات الالتحاق بامتحانات تحسين الدرجات للمواد السابقة.',
    tags: ['امتحانات', 'تحسين'],
    btn: 'معرفة التفاصيل', btnStyle: 'btn-card outline'
  },

  /* ══ STUDENT AFFAIRS ════════════════════════════════════════ */
  {
    id: 'sa1', cat: 'affairs',
    icon: '👥', iconBg: 'icon-bg-cyan',
    title: 'الاتحاد الطلابي',
    desc: 'تعرف على أعضاء الاتحاد الطلابي للكلية وأنشطته وكيفية التواصل معهم.',
    tags: ['شؤون طلاب', 'اتحاد'],
    btn: 'التواصل', btnStyle: 'btn-card'
  },
  {
    id: 'sa2', cat: 'affairs',
    icon: '🏅', iconBg: 'icon-bg-cyan',
    title: 'الأنشطة الطلابية',
    desc: 'سجّل في الأنشطة الثقافية والاجتماعية والرياضية التي تنظمها الكلية.',
    tags: ['شؤون طلاب', 'أنشطة'],
    btn: 'استعراض الأنشطة', btnStyle: 'btn-card'
  },
  {
    id: 'sa3', cat: 'affairs',
    icon: '💰', iconBg: 'icon-bg-cyan',
    title: 'المنح والإعانات الطلابية',
    desc: 'تقدم للحصول على المنح الدراسية والإعانات المالية المتاحة لطلاب الكلية.',
    tags: ['شؤون طلاب', 'منح'],
    btn: 'التقديم', btnStyle: 'btn-card'
  },
  {
    id: 'sa4', cat: 'affairs',
    icon: '🏥', iconBg: 'icon-bg-cyan',
    title: 'الخدمات الصحية للطلاب',
    desc: 'تعرف على الخدمات الطبية المتاحة وكيفية الاستفادة من التأمين الصحي الطلابي.',
    tags: ['شؤون طلاب', 'صحة'],
    btn: 'معرفة المزيد', btnStyle: 'btn-card outline'
  },
  {
    id: 'sa5', cat: 'affairs',
    icon: '📞', iconBg: 'icon-bg-cyan',
    title: 'الإرشاد الأكاديمي',
    desc: 'تواصل مع المرشد الأكاديمي لاستفساراتك الدراسية ووضع خطة مستقبلية.',
    tags: ['شؤون طلاب', 'إرشاد'],
    btn: 'حجز جلسة', btnStyle: 'btn-card'
  },

  /* ══ TRAINING ═══════════════════════════════════════════════ */
  {
    id: 'tr1', cat: 'training',
    icon: '🏆', iconBg: 'icon-bg-green',
    title: 'التدريب الميداني',
    desc: 'سجّل في برنامج التدريب الميداني الإلزامي وتعرف على متطلباته وشروطه.',
    tags: ['تدريب', 'ميداني'],
    btn: 'التسجيل', btnStyle: 'btn-card'
  },
  {
    id: 'tr2', cat: 'training',
    icon: '💼', iconBg: 'icon-bg-green',
    title: 'فرص التدريب الصيفي',
    desc: 'تصفح فرص التدريب الصيفي المتاحة في المؤسسات والشركات الشريكة للكلية.',
    tags: ['تدريب', 'صيفي'],
    btn: 'استعراض الفرص', btnStyle: 'btn-card'
  },
  {
    id: 'tr3', cat: 'training',
    icon: '🎓', iconBg: 'icon-bg-green',
    title: 'الدورات والورش التدريبية',
    desc: 'سجّل في ورش العمل والدورات التدريبية المعتمدة التي تنظمها الكلية.',
    tags: ['تدريب', 'دورات'],
    btn: 'عرض الدورات', btnStyle: 'btn-card'
  },
  {
    id: 'tr4', cat: 'training',
    icon: '📜', iconBg: 'icon-bg-green',
    title: 'شهادات وتراخيص ICDL',
    desc: 'التقدم لامتحانات ICDL لاعتماد كفاءتك في مجال تكنولوجيا المعلومات.',
    tags: ['تدريب', 'ICDL'],
    btn: 'التقديم', btnStyle: 'btn-card'
  },
  {
    id: 'tr5', cat: 'training',
    icon: '🌐', iconBg: 'icon-bg-green',
    title: 'برامج التبادل والزمالات',
    desc: 'تعرف على برامج التبادل الدولي والزمالات الأكاديمية المتاحة للطلاب.',
    tags: ['تدريب', 'دولي'],
    btn: 'التفاصيل', btnStyle: 'btn-card outline'
  },

  /* ══ E-LEARNING ═════════════════════════════════════════════ */
  {
    id: 'el1', cat: 'elearning',
    icon: '🖥️', iconBg: 'icon-bg-indigo',
    title: 'منصة التعلم Moodle',
    desc: 'الوصول إلى محتوى المقررات والواجبات والمحاضرات المسجلة عبر المنصة التعليمية.',
    tags: ['إلكتروني', 'Moodle'],
    btn: 'الدخول للمنصة', btnStyle: 'btn-card'
  },
  {
    id: 'el2', cat: 'elearning',
    icon: '🎥', iconBg: 'icon-bg-indigo',
    title: 'المحاضرات المسجلة',
    desc: 'مكتبة شاملة من المحاضرات والفيديوهات التعليمية لجميع المقررات.',
    tags: ['إلكتروني', 'فيديو'],
    btn: 'مشاهدة', btnStyle: 'btn-card'
  },
  {
    id: 'el3', cat: 'elearning',
    icon: '💻', iconBg: 'icon-bg-indigo',
    title: 'الاختبارات الإلكترونية',
    desc: 'تأدية الاختبارات والكويزات الإلكترونية لمتابعة مستواك الدراسي.',
    tags: ['إلكتروني', 'اختبارات'],
    btn: 'الدخول', btnStyle: 'btn-card'
  },
  {
    id: 'el4', cat: 'elearning',
    icon: '📱', iconBg: 'icon-bg-indigo',
    title: 'تطبيق الكلية على الجوال',
    desc: 'حمّل التطبيق الرسمي للكلية للوصول الفوري للخدمات من هاتفك.',
    tags: ['إلكتروني', 'تطبيق'],
    btn: 'التحميل', btnStyle: 'btn-card'
  },
  {
    id: 'el5', cat: 'elearning',
    icon: '🔐', iconBg: 'icon-bg-indigo',
    title: 'البريد الإلكتروني الجامعي',
    desc: 'استخراج بيانات وتفعيل بريدك الإلكتروني الجامعي الرسمي.',
    tags: ['إلكتروني', 'بريد'],
    btn: 'تفعيل الحساب', btnStyle: 'btn-card outline'
  },

  /* ══ FORMS ══════════════════════════════════════════════════ */
  {
    id: 'fo1', cat: 'forms',
    icon: '📄', iconBg: 'icon-bg-pink',
    title: 'نموذج استمارة التقديم',
    desc: 'تحميل استمارة التقديم الرسمية للخدمات المختلفة من إدارة الكلية.',
    tags: ['نماذج', 'تحميل'],
    btn: 'تحميل النموذج', btnStyle: 'btn-card'
  },
  {
    id: 'fo2', cat: 'forms',
    icon: '📋', iconBg: 'icon-bg-pink',
    title: 'نموذج تغيير بيانات',
    desc: 'طلب تعديل أو تحديث بياناتك الشخصية الرسمية في سجلات الكلية.',
    tags: ['نماذج', 'تعديل'],
    btn: 'تحميل', btnStyle: 'btn-card'
  },
  {
    id: 'fo3', cat: 'forms',
    icon: '🔄', iconBg: 'icon-bg-pink',
    title: 'نموذج التحويل بين الأقسام',
    desc: 'استمارة طلب التحويل من قسم دراسي لآخر وفق شروط القبول المحددة.',
    tags: ['نماذج', 'تحويل'],
    btn: 'تحميل', btnStyle: 'btn-card'
  },
  {
    id: 'fo4', cat: 'forms',
    icon: '🚫', iconBg: 'icon-bg-pink',
    title: 'نموذج الانسحاب والإجازة',
    desc: 'نموذج طلب الانسحاب المؤقت أو الإجازة الدراسية بالأسباب المقبولة.',
    tags: ['نماذج', 'إجراءات'],
    btn: 'تحميل', btnStyle: 'btn-card outline'
  },
  {
    id: 'fo5', cat: 'forms',
    icon: '📥', iconBg: 'icon-bg-pink',
    title: 'لوائح وقوانين الكلية',
    desc: 'تحميل اللائحة الداخلية للكلية ونظام الساعات المعتمدة وقوانين الغياب.',
    tags: ['نماذج', 'لوائح'],
    btn: 'تحميل', btnStyle: 'btn-card'
  },
  {
    id: 'fo6', cat: 'forms',
    icon: '📬', iconBg: 'icon-bg-pink',
    title: 'نموذج تقديم شكوى',
    desc: 'تقديم شكوى رسمية للإدارة بطريقة منظمة وضمان متابعتها حتى الحل.',
    tags: ['نماذج', 'شكاوى'],
    btn: 'تقديم', btnStyle: 'btn-card outline'
  },
  {
    id: 'fo7', cat: 'forms',
    icon: '🖨️', iconBg: 'icon-bg-pink',
    title: 'طباعة وثائق الكلية',
    desc: 'طلب طباعة أي وثيقة رسمية أو ختمها بالختم الرسمي للكلية.',
    tags: ['نماذج', 'طباعة'],
    btn: 'طلب طباعة', btnStyle: 'btn-card'
  },

  /* ══ ANNOUNCEMENTS ══════════════════════════════════════════ */
  {
    id: 'an1', cat: 'announcements',
    icon: '📢', iconBg: 'icon-bg-red',
    title: 'لوحة الإعلانات',
    desc: 'جميع إعلانات وإشعارات الكلية الرسمية في مكان واحد محدّث باستمرار.',
    tags: ['إعلانات', 'أخبار'],
    btn: 'عرض الكل', btnStyle: 'btn-card'
  },
  {
    id: 'an2', cat: 'announcements',
    icon: '📰', iconBg: 'icon-bg-red',
    title: 'النشرة الإخبارية',
    desc: 'اشترك في النشرة الدورية للكلية لاستقبال آخر الأخبار والفعاليات.',
    tags: ['إعلانات', 'نشرة'],
    btn: 'اشتراك', btnStyle: 'btn-card outline'
  },

  /* ══ LINKS ══════════════════════════════════════════════════ */
  {
    id: 'li1', cat: 'links',
    icon: '🔗', iconBg: 'icon-bg-purple',
    title: 'بوابة الجامعة الإلكترونية',
    desc: 'الدخول لبوابة جامعة بنها الرسمية والوصول لجميع خدمات الجامعة المركزية.',
    tags: ['روابط', 'جامعة'],
    btn: 'الانتقال', btnStyle: 'btn-card'
  },
  {
    id: 'li2', cat: 'links',
    icon: '🌐', iconBg: 'icon-bg-purple',
    title: 'الروابط الخارجية المهمة',
    desc: 'تجميعة للروابط الحيوية: وزارة التعليم، هيئة الاعتماد، المنح والفرص.',
    tags: ['روابط', 'خارجية'],
    btn: 'استعراض', btnStyle: 'btn-card outline'
  }
];

/* ── FAQ DATA ─────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'كيف يمكنني الحصول على شهادة قيد رسمية؟',
    a: 'يمكنك التقدم بطلب رسمي عبر قسم شؤون الطلاب بالكلية أو من خلال قسم الخدمات الأكاديمية في هذه المنصة. تستغرق العملية عادةً 3-5 أيام عمل.'
  },
  {
    q: 'متى يفتح باب تسجيل الامتحانات؟',
    a: 'يفتح باب التسجيل عادةً قبل أسبوعين من بدء الامتحانات. ستصلك إشعارات تلقائية على المنصة عند فتح التسجيل.'
  },
  {
    q: 'كيف أتقدم للحصول على المنحة الدراسية؟',
    a: 'اذهب لقسم شؤون الطلاب، استوفِ النماذج المطلوبة وأرفق المستندات المطلوبة (كشف درجات، إثبات الدخل). الموعد النهائي عادةً في أول أسبوعين من الفصل الدراسي.'
  },
  {
    q: 'هل يمكنني تغيير قسمي الدراسي؟',
    a: 'نعم، بشروط محددة تشمل: اجتياز سنة دراسية كاملة، الحصول على الحد الأدنى من المجموع، وتوافر أماكن في القسم المراد التحويل إليه. راجع نموذج التحويل لمزيد من التفاصيل.'
  },
  {
    q: 'كيف أحصل على بريدي الإلكتروني الجامعي؟',
    a: 'توجه لمعمل الحاسب الآلي بالكلية بصورة بطاقة الرقم القومي وكارنيه الكلية. يتم تفعيل البريد فور التسجيل.'
  },
  {
    q: 'ما هي ساعات الدعم والإرشاد الأكاديمي؟',
    a: 'يتواجد المرشد الأكاديمي أيام الأحد والثلاثاء والخميس من 10 صباحاً حتى 2 ظهراً. يمكنك أيضاً حجز موعد إلكتروني عبر هذه المنصة.'
  }
];

/* ── FUTURE FEATURES DATA ─────────────────────────────────── */
const FUTURE_FEATURES = [
  {
    icon: '🎓', iconBg: 'icon-bg-brand',
    title: 'خدمات الخريجين',
    badge: 'قريباً',
    desc: 'منصة متكاملة للخريجين تشمل التحقق من الشهادات، شبكة التواصل، وفرص العمل الحصرية.',
    tags: ['خريجون', 'شبكة', 'توظيف']
  },
  {
    icon: '🌐', iconBg: 'icon-bg-cyan',
    title: 'مجتمع الخريجين Alumni',
    badge: 'قريباً',
    desc: 'منصة تواصل اجتماعي مخصصة لخريجي كلية التربية النوعية للتشبيك المهني وتبادل الخبرات.',
    tags: ['مجتمع', 'تواصل', 'شبكة']
  },
  {
    icon: '💼', iconBg: 'icon-bg-green',
    title: 'نظام التدريب والتوظيف',
    badge: 'تحت التطوير',
    desc: 'منصة ربط الطلاب بفرص التدريب والتوظيف الحصرية مع الشركات الشريكة للكلية.',
    tags: ['توظيف', 'تدريب', 'شركات']
  },
  {
    icon: '🤝', iconBg: 'icon-bg-amber',
    title: 'نظام الإرشاد والمنتورينج',
    badge: 'مقترح',
    desc: 'ربط الطلاب الجدد بالطلاب المتقدمين والخريجين الناجحين لتبادل الخبرات والتوجيه.',
    tags: ['إرشاد', 'منتور', 'مجتمع']
  },
  {
    icon: '🎨', iconBg: 'icon-bg-pink',
    title: 'معرض الأعمال (Portfolio)',
    badge: 'مقترح',
    desc: 'منصة لعرض أعمال الطلاب والخريجين في مجالات التصميم والإعلام والتربية الفنية.',
    tags: ['portfolio', 'أعمال', 'إبداع']
  },
  {
    icon: '📊', iconBg: 'icon-bg-indigo',
    title: 'لوحة التحليلات الأكاديمية',
    badge: 'مقترح',
    desc: 'تحليلات ذكية لأدائك الأكاديمي مع توقعات ونصائح مخصصة لتحسين مستواك.',
    tags: ['تحليلات', 'ذكاء اصطناعي', 'أكاديمي']
  }
];

/* ═══════════════════════════════════════════════════════════════
   STATE
═══════════════════════════════════════════════════════════════ */
const state = {
  activeCategory: 'all',
  searchQuery: '',
  currentView: 'grid',
  notifOpen: false,
  notifCount: 3
};

/* ═══════════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════════ */
function $(id) { return document.getElementById(id); }
function sanitize(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

/* ═══════════════════════════════════════════════════════════════
   RENDER SERVICES
═══════════════════════════════════════════════════════════════ */
function getFilteredServices() {
  return SERVICES.filter(s => {
    const catMatch = state.activeCategory === 'all' || s.cat === state.activeCategory;
    const q = state.searchQuery.toLowerCase();
    const textMatch = !q
      || s.title.toLowerCase().includes(q)
      || s.desc.toLowerCase().includes(q)
      || s.tags.some(t => t.toLowerCase().includes(q));
    return catMatch && textMatch;
  });
}

function renderServices() {
  const grid = $('servicesGrid');
  const empty = $('emptyState');
  const countEl = $('resultCount');
  const filtered = getFilteredServices();

  countEl.textContent = `${filtered.length} خدمة`;

  if (filtered.length === 0) {
    grid.innerHTML = '';
    grid.classList.add('hidden');
    empty.classList.remove('hidden');
    return;
  }

  empty.classList.add('hidden');
  grid.classList.remove('hidden');

  const listView = state.currentView === 'list';
  grid.className = `services-grid${listView ? ' list-view' : ''}`;

  grid.innerHTML = filtered.map((s, i) => `
    <article class="service-card" role="listitem"
             style="--delay:${Math.min(i * 40, 400)}ms"
             data-id="${s.id}">
      <div class="card-icon ${s.iconBg}">${s.icon}</div>
      <div class="card-body">
        <h3 class="card-title">${sanitize(s.title)}</h3>
        <p class="card-desc">${sanitize(s.desc)}</p>
        <div class="card-tags">${s.tags.map(t => `<span class="card-tag">${sanitize(t)}</span>`).join('')}</div>
      </div>
      <div class="card-action">
        <button class="btn-card ${s.btnStyle.includes('outline') ? 'outline' : ''}"
                onclick="handleCardAction('${s.id}')">
          ${sanitize(s.btn)}
        </button>
      </div>
    </article>
  `).join('');
}

/* ═══════════════════════════════════════════════════════════════
   RENDER FAQ
═══════════════════════════════════════════════════════════════ */
function renderFAQ() {
  const grid = $('faqGrid');
  if (!grid) return;
  grid.innerHTML = FAQS.map((f, i) => `
    <div class="faq-item" data-faq="${i}">
      <button class="faq-question" onclick="toggleFAQ(${i})" aria-expanded="false">
        <span>${sanitize(f.q)}</span>
        <span class="faq-chevron">▼</span>
      </button>
      <div class="faq-answer" id="faq-ans-${i}">
        <p>${sanitize(f.a)}</p>
      </div>
    </div>
  `).join('');
}

/* ═══════════════════════════════════════════════════════════════
   RENDER FUTURE FEATURES
═══════════════════════════════════════════════════════════════ */
function renderFuture() {
  const grid = $('futureGrid');
  if (!grid) return;
  grid.innerHTML = FUTURE_FEATURES.map(f => `
    <div class="future-card">
      <span class="future-card-badge">${sanitize(f.badge)}</span>
      <div class="future-icon ${f.iconBg}">${f.icon}</div>
      <h3>${sanitize(f.title)}</h3>
      <p>${sanitize(f.desc)}</p>
      <div class="future-tags">
        ${f.tags.map(t => `<span class="future-tag">${sanitize(t)}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

/* ═══════════════════════════════════════════════════════════════
   CATEGORY INTERACTION
═══════════════════════════════════════════════════════════════ */
function setupCategories() {
  /* Desktop sidebar */
  const list = $('catList');
  if (list) {
    list.querySelectorAll('.cat-item').forEach(item => {
      item.addEventListener('click', () => selectCategory(item.dataset.cat));
      item.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectCategory(item.dataset.cat);
        }
      });
    });
  }

  /* Mobile drawer */
  const mobileList = $('catListMobile');
  if (mobileList) {
    // Clone desktop cat items into mobile drawer
    mobileList.innerHTML = list ? list.innerHTML : '';
    mobileList.querySelectorAll('.cat-item').forEach(item => {
      item.addEventListener('click', () => {
        selectCategory(item.dataset.cat);
        closeDrawer();
      });
    });
  }
}

function selectCategory(cat) {
  state.activeCategory = cat;

  /* Update desktop sidebar items */
  document.querySelectorAll('#catList .cat-item').forEach(i => {
    const isActive = i.dataset.cat === cat;
    i.classList.toggle('active', isActive);
    i.setAttribute('aria-selected', String(isActive));
  });

  /* Update mobile drawer items */
  document.querySelectorAll('#catListMobile .cat-item').forEach(i => {
    const isActive = i.dataset.cat === cat;
    i.classList.toggle('active', isActive);
  });

  /* Update label */
  const labelMap = {
    all: 'جميع الخدمات', academic: 'الخدمات الأكاديمية',
    exam: 'خدمات الامتحانات', affairs: 'شؤون الطلاب',
    training: 'التدريب والورش', elearning: 'التعلم الإلكتروني',
    forms: 'النماذج والتحميلات', announcements: 'الإعلانات',
    links: 'الروابط المهمة'
  };
  const el = $('activeCatLabel');
  if (el) el.textContent = labelMap[cat] || 'الخدمات';

  renderServices();

  /* Scroll to grid on mobile */
  if (window.innerWidth < 1100) {
    const grid = $('servicesLayout');
    if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/* ═══════════════════════════════════════════════════════════════
   SEARCH
═══════════════════════════════════════════════════════════════ */
function setupSearch() {
  const input  = $('searchInput');
  const hero   = $('heroSearch');
  const heroBtn = $('heroSearchBtn');
  const dropdown = $('searchDropdown');

  function performSearch(val) {
    state.searchQuery = val.trim();
    state.activeCategory = 'all';
    document.querySelectorAll('.cat-item').forEach(i => {
      i.classList.toggle('active', i.dataset.cat === 'all');
    });
    const el = $('activeCatLabel');
    if (el) el.textContent = 'جميع الخدمات';
    renderServices();

    // Scroll to results
    const layout = $('servicesLayout');
    if (layout) layout.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function buildDropdown(val) {
    if (!dropdown) return;
    if (!val.trim()) { dropdown.innerHTML = ''; return; }
    const matches = SERVICES.filter(s =>
      s.title.toLowerCase().includes(val.toLowerCase()) ||
      s.tags.some(t => t.toLowerCase().includes(val.toLowerCase()))
    ).slice(0, 6);

    dropdown.innerHTML = matches.length
      ? matches.map(s => `
          <li data-id="${s.id}" role="option" tabindex="-1">
            <span>${s.icon}</span>
            <span>${sanitize(s.title)}</span>
            <span class="sd-cat">${sanitize(s.tags[0] || '')}</span>
          </li>`).join('')
      : `<li style="pointer-events:none;color:var(--text-muted)">لا توجد نتائج</li>`;

    dropdown.querySelectorAll('li[data-id]').forEach(li => {
      li.addEventListener('click', () => {
        performSearch(li.querySelector('span:nth-child(2)').textContent);
        dropdown.innerHTML = '';
        if (input) input.value = li.querySelector('span:nth-child(2)').textContent;
      });
    });
  }

  if (input) {
    input.addEventListener('input', e => {
      buildDropdown(e.target.value);
      if (!e.target.value.trim()) {
        state.searchQuery = '';
        renderServices();
      }
    });
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') { performSearch(e.target.value); dropdown.innerHTML = ''; }
      if (e.key === 'Escape') { dropdown.innerHTML = ''; }
    });
  }

  document.addEventListener('click', e => {
    if (dropdown && !e.target.closest('.search-wrap')) dropdown.innerHTML = '';
  });

  if (hero) {
    hero.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        performSearch(e.target.value);
        if (input) input.value = e.target.value;
      }
    });
  }
  if (heroBtn) {
    heroBtn.addEventListener('click', () => {
      if (hero) {
        performSearch(hero.value);
        if (input) input.value = hero.value;
      }
    });
  }
}

/* ═══════════════════════════════════════════════════════════════
   VIEW TOGGLE
═══════════════════════════════════════════════════════════════ */
function setupViewToggle() {
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.currentView = btn.dataset.view;
      renderServices();
    });
  });
}

/* ═══════════════════════════════════════════════════════════════
   WIDGET CLICKS → QUICK FILTER
═══════════════════════════════════════════════════════════════ */
function setupWidgets() {
  const map = {
    'widget-academic': 'academic',
    'widget-exam': 'exam',
    'widget-elearning': 'elearning',
    'widget-forms': 'forms'
  };
  document.querySelectorAll('.widget-card').forEach(card => {
    const classes = [...card.classList];
    const key = classes.find(c => map[c]);
    if (key) {
      card.addEventListener('click', () => selectCategory(map[key]));
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectCategory(map[key]);
        }
      });
    }
  });
}

/* ═══════════════════════════════════════════════════════════════
   NOTIFICATION PANEL
═══════════════════════════════════════════════════════════════ */
function setupNotifications() {
  const btn     = $('notifBtn');
  const panel   = $('notifPanel');
  const overlay = $('notifOverlay');
  const badge   = $('notifBadge');
  const markAll = $('markAllRead');
  const empty   = $('notifEmpty');

  function open() {
    state.notifOpen = true;
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    overlay.classList.remove('hidden');
  }
  function close() {
    state.notifOpen = false;
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    overlay.classList.add('hidden');
  }

  btn.addEventListener('click', e => {
    e.stopPropagation();
    state.notifOpen ? close() : open();
  });

  overlay.addEventListener('click', close);

  /* Remove individual notification */
  panel.addEventListener('click', e => {
    const closeBtn = e.target.closest('.notif-close');
    if (!closeBtn) return;
    e.stopPropagation();
    const id = closeBtn.dataset.id;
    const item = panel.querySelector(`.notif-item[data-id="${id}"]`);
    if (item) {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-20px)';
      item.style.transition = 'all 0.25s ease';
      setTimeout(() => {
        item.remove();
        updateNotifCount();
        if (!panel.querySelector('.notif-item')) {
          $('notifList').classList.add('hidden');
          if (empty) empty.classList.remove('hidden');
        }
      }, 250);
    }
  });

  /* Mark all read */
  if (markAll) {
    markAll.addEventListener('click', () => {
      panel.querySelectorAll('.notif-item.unread').forEach(i => i.classList.remove('unread'));
      state.notifCount = 0;
      if (badge) badge.textContent = '0';
      badge.style.display = 'none';
    });
  }

  function updateNotifCount() {
    const count = panel.querySelectorAll('.notif-item').length;
    state.notifCount = count;
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  }
}

/* ═══════════════════════════════════════════════════════════════
   FAQ TOGGLE
═══════════════════════════════════════════════════════════════ */
window.toggleFAQ = function(idx) {
  const item = document.querySelector(`.faq-item[data-faq="${idx}"]`);
  if (!item) return;
  const isOpen = item.classList.contains('open');
  /* Close all */
  document.querySelectorAll('.faq-item.open').forEach(i => {
    i.classList.remove('open');
    i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
  });
  /* Open clicked if it was closed */
  if (!isOpen) {
    item.classList.add('open');
    item.querySelector('.faq-question').setAttribute('aria-expanded', 'true');
  }
};

/* ═══════════════════════════════════════════════════════════════
   MOBILE SIDEBAR + DRAWER
═══════════════════════════════════════════════════════════════ */
function setupMobileNav() {
  const toggle  = $('menuToggle');
  const sidebar = document.querySelector('.main-sidebar');

  if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
    /* Close on outside click */
    document.addEventListener('click', e => {
      if (sidebar.classList.contains('open')
          && !e.target.closest('.main-sidebar')
          && !e.target.closest('#menuToggle')) {
        sidebar.classList.remove('open');
      }
    });
  }
}

window.closeDrawer = function() {
  const drawer  = $('catDrawer');
  const overlay = $('drawerOverlay');
  if (drawer)  { drawer.classList.remove('open'); drawer.setAttribute('aria-hidden', 'true'); }
  if (overlay) overlay.classList.add('hidden');
};

function setupCatDrawer() {
  const btn     = $('catToggleMobile');
  const drawer  = $('catDrawer');
  const overlay = $('drawerOverlay');
  const closeBtn = $('closeDrawer');

  if (btn && drawer) {
    btn.addEventListener('click', () => {
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      if (overlay) overlay.classList.remove('hidden');
    });
  }
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay)  overlay.addEventListener('click', closeDrawer);
}

/* ═══════════════════════════════════════════════════════════════
   CARD ACTION HANDLER
═══════════════════════════════════════════════════════════════ */
window.handleCardAction = function(id) {
  const service = SERVICES.find(s => s.id === id);
  if (!service) return;
  // Placeholder — in production this would link to real pages
  showToast(`تم الانتقال إلى: ${service.title}`, 'info');
};

/* ═══════════════════════════════════════════════════════════════
   TOAST NOTIFICATION
═══════════════════════════════════════════════════════════════ */
function showToast(msg, type = 'info') {
  /* Try platform's showMessage first */
  if (typeof showMessage === 'function') { showMessage(msg, type); return; }

  /* Fallback */
  const t = document.createElement('div');
  t.className = 'ss-toast';
  t.textContent = msg;
  const colors = { info: '#667eea', success: '#10b981', error: '#ef4444', warning: '#f59e0b' };
  t.style.cssText = `
    position:fixed;top:80px;left:50%;transform:translateX(-50%);
    background:${colors[type]||colors.info};color:#fff;
    padding:10px 22px;border-radius:999px;font-size:.85rem;font-weight:600;
    z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,0.3);
    animation:fadeUp .3s ease;font-family:inherit;
  `;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

/* ═══════════════════════════════════════════════════════════════
   RESET FILTERS
═══════════════════════════════════════════════════════════════ */
window.resetFilters = function() {
  state.searchQuery = '';
  const searchInput = $('searchInput');
  if (searchInput) searchInput.value = '';
  const heroSearch = $('heroSearch');
  if (heroSearch) heroSearch.value = '';
  selectCategory('all');
};

/* ═══════════════════════════════════════════════════════════════
   AUTH GUARD + USER UI
═══════════════════════════════════════════════════════════════ */
function initAuth() {
  if (typeof waitForFirebase !== 'function') return;

  waitForFirebase(() => {
    const unsub = auth.onAuthStateChanged(async user => {
      unsub();
      if (!user) { window.location.href = 'index.html'; return; }

      const data = await getCurrentUserData(user.uid);
      if (!data) return;

      /* Sidebar */
      const nameEl  = $('sidebarName');
      const roleEl  = $('sidebarRole');
      const imgEl   = $('sidebarAvatar');
      const chipEl  = $('chipAvatar');

      if (nameEl) nameEl.textContent = data.name || user.email;
      if (roleEl) roleEl.textContent = data.role || 'طالب';
      if (data.imageUrl) {
        if (imgEl) imgEl.src = data.imageUrl;
        if (chipEl) chipEl.src = data.imageUrl;
      }

      /* Update online status */
      if (db) {
        db.collection('users').doc(user.uid).update({
          online: true,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp()
        }).catch(() => {});

        window.addEventListener('beforeunload', () => {
          if (typeof updateOnlineStatus === 'function') updateOnlineStatus(false);
        });
      }
    });
  });
}

/* ═══════════════════════════════════════════════════════════════
   LOGOUT
═══════════════════════════════════════════════════════════════ */
window.logout = async function() {
  if (!confirm('هل تريد تسجيل الخروج؟')) return;
  if (typeof logoutUser === 'function') {
    const res = await logoutUser();
    if (res.success) window.location.href = 'index.html';
  }
};

/* ═══════════════════════════════════════════════════════════════
   SIMULATED LOADING
═══════════════════════════════════════════════════════════════ */
function simulateLoading() {
  const skeleton = $('skeletonGrid');
  const grid     = $('servicesGrid');

  setTimeout(() => {
    if (skeleton) skeleton.classList.add('hidden');
    if (grid)     grid.classList.remove('hidden');
  }, 900);
}

/* ═══════════════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  /* Render content */
  renderServices();
  renderFAQ();
  renderFuture();

  /* Bind interactions */
  setupCategories();
  setupSearch();
  setupViewToggle();
  setupWidgets();
  setupNotifications();
  setupMobileNav();
  setupCatDrawer();

  /* Auth */
  initAuth();

  /* Show real grid after skeleton */
  simulateLoading();
});
