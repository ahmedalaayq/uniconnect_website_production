/* ═══════════════════════════════════════════════════════════════
   SERVICES HUB — ROLE-AWARE MODULE v3
   GradConnect | كلية التربية النوعية — جامعة بنها
   Real URLs: fsed.bu.edu.eg | mis.bu.edu.eg | bu.edu.eg
═══════════════════════════════════════════════════════════════ */
'use strict';

/* ═══════════════════════════════════════════════════════════════
   ROLE CONFIG
═══════════════════════════════════════════════════════════════ */
const ROLE_CONFIG = {
  'طالب': {
    heroTitle:  'كل ما تحتاجه <span class="ht-grad">كطالب</span>',
    heroPill:   '✨ منصة خدمات الطلاب',
    heroSub:    'خدمات أكاديمية، امتحانات، تدريب، نماذج وأكثر — مصممة لتسهيل رحلتك التعليمية في كلية التربية النوعية بجامعة بنها.',
    heroSearch: 'ابحث: جداول، امتحانات، نتائج، نماذج...',
    stats:      [{ val:'+45', label:'خدمة متاحة' }, { val:'10', label:'تصنيف' }, { val:'24/7', label:'وصول مستمر' }],
    dataKey:    'student',
    quickWidgets:[
      { icon:'📋', label:'جدول الامتحانات', count:'الفصل الحالي', url:'https://fsed.bu.edu.eg/exam-schedules' },
      { icon:'✅', label:'نتائج الامتحانات', count:'اطلع على درجاتك', url:'https://fsed.bu.edu.eg/exams-results' },
      { icon:'📖', label:'الجداول الدراسية', count:'كل الأقسام', url:'https://fsed.bu.edu.eg/study-schedules' },
      { icon:'👤', label:'صفحة الطالب', count:'بياناتك الكاملة', url:'http://mis.bu.edu.eg/benha_new/Registration/ED_Login.aspx' },
    ]
  },
  'خريج': {
    heroTitle:  'خدمات <span class="ht-grad">الخريجين</span> المتكاملة',
    heroPill:   '🎓 بوابة الخريجين',
    heroSub:    'توثيق الشهادات، شبكة التواصل، فرص العمل، الزمالات والمزيد — كل ما تحتاجه بعد التخرج في مكان واحد.',
    heroSearch: 'ابحث: توثيق شهادة، فرص عمل، زمالات...',
    stats:      [{ val:'+30', label:'خدمة للخريجين' }, { val:'7', label:'تصنيفات' }, { val:'مجاني', label:'للخريجين' }],
    dataKey:    'graduate',
    quickWidgets:[
      { icon:'📜', label:'توثيق الشهادة', count:'ابدأ الإجراءات', url:'https://fsed.bu.edu.eg/graduate-follow-up-office' },
      { icon:'💼', label:'فرص العمل', count:'وظائف حصرية', url:'https://bu.edu.eg/students/f10' },
      { icon:'🌐', label:'مجتمع الخريجين', count:'تواصل معنا', url:'https://fsed.bu.edu.eg/students/graduate-follow-up-office' },
      { icon:'🔬', label:'الدراسات العليا', count:'ماجستير ودكتوراه', url:'https://fsed.bu.edu.eg/graduate-studies' },
    ]
  },
  'دكتور': {
    heroTitle:  'لوحة خدمات <span class="ht-grad">أعضاء هيئة التدريس</span>',
    heroPill:   '👑 بوابة هيئة التدريس',
    heroSub:    'إدارة المقررات، نشر الأبحاث، متابعة الطلاب، جداول المحاضرات وأدوات التدريس الإلكتروني.',
    heroSearch: 'ابحث: إدارة مقرر، بحث، جدول...',
    stats:      [{ val:'+35', label:'خدمة أكاديمية' }, { val:'8', label:'أقسام' }, { val:'كلية', label:'التربية النوعية' }],
    dataKey:    'doctor',
    quickWidgets:[
      { icon:'📖', label:'إدارة المقررات', count:'رفع المحتوى', url:'https://fsed.bu.edu.eg/students/learning' },
      { icon:'👥', label:'سجلات الطلاب', count:'متابعة شاملة', url:'http://mis.bu.edu.eg/benha_new/Registration/ED_Login.aspx' },
      { icon:'🔬', label:'نشر الأبحاث', count:'المجلة العلمية', url:'https://sjse.journals.ekb.eg/' },
      { icon:'📅', label:'الجداول', count:'جداول المحاضرات', url:'https://fsed.bu.edu.eg/study-schedules' },
    ]
  }
};

/* ═══════════════════════════════════════════════════════════════
   SERVICES DATA — STUDENT (طالب)
   روابط حقيقية من fsed.bu.edu.eg
═══════════════════════════════════════════════════════════════ */
const STUDENT_CATS = [
  { id:'all',          label:'جميع الخدمات',       icon:'⊞' },
  { id:'electronic',   label:'الخدمات الإلكترونية', icon:'💻' },
  { id:'academic',     label:'الشؤون الأكاديمية',   icon:'📖' },
  { id:'exam',         label:'خدمات الامتحانات',    icon:'📋' },
  { id:'affairs',      label:'شؤون الطلاب',         icon:'👥' },
  { id:'library',      label:'المكتبة والمعرفة',    icon:'📚' },
  { id:'forms',        label:'النماذج والتحميلات',  icon:'⬇️' },
  { id:'announcements',label:'الإعلانات والأخبار',  icon:'📢' },
  { id:'links',        label:'الروابط المهمة',       icon:'🔗' },
  { id:'fees',         label:'المصروفات والرسوم',   icon:'💳' },
];

const STUDENT_SERVICES = [
  /* ── ELECTRONIC ── */
  {
    id:'s-e1', cat:'electronic', icon:'👤', ib:'ib-student',
    title:'صفحة الطالب الإلكترونية',
    desc:'الدخول لبوابة الطالب لعرض جميع بياناتك الأكاديمية، السجل الدراسي، والخدمات الجامعية.',
    tags:['إلكتروني','بوابة','بيانات'],
    btn:'الدخول للبوابة',
    url:'http://mis.bu.edu.eg/benha_new/Registration/ED_Login.aspx',
    hot:true,
  },
  {
    id:'s-e2', cat:'electronic', icon:'📧', ib:'ib-elearn',
    title:'معرفة البريد التعليمي',
    desc:'استخراج وتفعيل بريدك الإلكتروني الجامعي الرسمي من بوابة جامعة بنها.',
    tags:['إلكتروني','بريد','جامعي'],
    btn:'استخراج الإيميل',
    url:'https://bu.edu.eg/portal/index.php?act=139',
  },
  {
    id:'s-e3', cat:'electronic', icon:'🛡️', ib:'ib-student',
    title:'الميثاق الأخلاقي للطالب',
    desc:'اطلع على ميثاق أخلاقيات الطالب الجامعي الصادر عن جامعة بنها.',
    tags:['إلكتروني','أخلاق','لوائح'],
    btn:'عرض الميثاق',
    url:'https://bu.edu.eg/e-services/University_Student_Ethical_Charter.php',
  },
  {
    id:'s-e4', cat:'electronic', icon:'📊', ib:'ib-student',
    title:'تقييم المقررات الدراسية',
    desc:'شارك في استطلاع تقييم المقررات وأعضاء هيئة التدريس بشكل إلكتروني.',
    tags:['إلكتروني','تقييم','استطلاع'],
    btn:'تقييم الآن',
    url:'https://bu.edu.eg/student/logCode.php',
  },
  {
    id:'s-e5', cat:'electronic', icon:'📖', ib:'ib-elearn',
    title:'المحاضرات والمقررات الإلكترونية',
    desc:'الوصول لجميع المحاضرات المسجلة والمواد التعليمية الإلكترونية للمقررات.',
    tags:['إلكتروني','محاضرات','مقررات'],
    btn:'الدخول للمحاضرات',
    url:'https://fsed.bu.edu.eg/students/learning',
  },
  {
    id:'s-e6', cat:'electronic', icon:'📄', ib:'ib-student',
    title:'دليل الطالب 2026',
    desc:'تحميل دليل الطالب المحدث لعام 2026 المشتمل على كافة اللوائح والإجراءات.',
    tags:['إلكتروني','دليل','تحميل'],
    btn:'تحميل الدليل',
    url:'https://drive.google.com/file/d/12pstEld4I1q21sVBUbbdlISP16YgFJfi/view',
    isNew:true,
  },
  /* ── ACADEMIC ── */
  {
    id:'s-ac1', cat:'academic', icon:'🗺️', ib:'ib-student',
    title:'البرامج والمقررات الدراسية',
    desc:'تصفح خطط الدراسة وتوزيع المقررات على الفصول لكل قسم دراسي بالكلية.',
    tags:['أكاديمي','مقررات','خطة'],
    btn:'استعراض البرامج',
    url:'https://fsed.bu.edu.eg/students/students-programs-and-courses',
  },
  {
    id:'s-ac2', cat:'academic', icon:'📋', ib:'ib-student',
    title:'لائحة طلاب البكالوريوس',
    desc:'الاطلاع على اللائحة الرسمية المنظِّمة للدراسة في مرحلة البكالوريوس.',
    tags:['أكاديمي','لائحة','بكالوريوس'],
    btn:'عرض اللائحة',
    url:'https://fsed.bu.edu.eg/students/a-list-of-undergraduate-students',
  },
  {
    id:'s-ac3', cat:'academic', icon:'📅', ib:'ib-student',
    title:'الجداول الدراسية الأسبوعية',
    desc:'الاطلاع على الجدول الدراسي الأسبوعي لجميع الأقسام والفرق الدراسية.',
    tags:['أكاديمي','جداول','أسبوعي'],
    btn:'عرض الجدول',
    url:'https://fsed.bu.edu.eg/students/study-schedules',
    hot:true,
  },
  {
    id:'s-ac4', cat:'academic', icon:'⚖️', ib:'ib-student',
    title:'شروط القبول ونظام الدراسة',
    desc:'تعرف على شروط القبول ونظام الساعات المعتمدة ومتطلبات التخرج.',
    tags:['أكاديمي','قبول','شروط'],
    btn:'استعراض',
    url:'https://fsed.bu.edu.eg/students/conditions-of-admission-and-study-system',
    outline:true,
  },
  {
    id:'s-ac5', cat:'academic', icon:'📊', ib:'ib-student',
    title:'استطلاع رأي الطالب في المقرر',
    desc:'شارك في استطلاعات جودة التدريس للمساهمة في تطوير العملية التعليمية.',
    tags:['أكاديمي','استطلاع','جودة'],
    btn:'المشاركة',
    url:'https://fsed.bu.edu.eg/students/polling-the-student-opinion-on-the-course',
    outline:true,
  },
  {
    id:'s-ac6', cat:'academic', icon:'🔬', ib:'ib-student',
    title:'الأبحاث العلمية للطلاب',
    desc:'الاطلاع على الأبحاث العلمية المتاحة ونتائج الأبحاث المقدمة من الطلاب.',
    tags:['أكاديمي','أبحاث','علمي'],
    btn:'استعراض الأبحاث',
    url:'https://fsed.bu.edu.eg/students/research',
    outline:true,
  },
  {
    id:'s-ac7', cat:'academic', icon:'🏆', ib:'ib-student',
    title:'نتائج الأبحاث',
    desc:'مشاهدة نتائج الأبحاث والمشاريع العلمية المقدمة لمتطلبات المقررات.',
    tags:['أكاديمي','نتائج','أبحاث'],
    btn:'عرض النتائج',
    url:'https://fsed.bu.edu.eg/students/research-results',
    outline:true,
  },
  /* ── EXAMS ── */
  {
    id:'s-ex1', cat:'exam', icon:'📋', ib:'ib-exam',
    title:'جداول الامتحانات',
    desc:'الاطلاع على مواعيد امتحانات نهاية الفصل الدراسي وخرائط لجان الامتحانات الرسمية.',
    tags:['امتحانات','جداول','مواعيد'],
    btn:'عرض جدول الامتحانات',
    url:'https://fsed.bu.edu.eg/students/exam-schedules',
    hot:true,
  },
  {
    id:'s-ex2', cat:'exam', icon:'🔢', ib:'ib-exam',
    title:'أرقام الجلوس',
    desc:'الاستعلام عن رقم جلوسك في امتحانات الفصل الدراسي.',
    tags:['امتحانات','رقم جلوس','كارنيه'],
    btn:'استعراض أرقام الجلوس',
    url:'https://fsed.bu.edu.eg/students/seating-numbers',
  },
  {
    id:'s-ex3', cat:'exam', icon:'🗺️', ib:'ib-exam',
    title:'أماكن لجان الامتحانات',
    desc:'معرفة أماكن وقاعات لجان الامتحانات المخصصة لكل قسم وفرقة.',
    tags:['امتحانات','لجان','قاعات'],
    btn:'عرض الأماكن',
    url:'https://fsed.bu.edu.eg/students/places-of-committees',
  },
  {
    id:'s-ex4', cat:'exam', icon:'✅', ib:'ib-exam',
    title:'نتائج الامتحانات',
    desc:'استعرض درجاتك ونتائجك بعد الإعلان الرسمي عنها من إدارة الامتحانات.',
    tags:['امتحانات','نتائج','درجات'],
    btn:'عرض النتائج',
    url:'https://fsed.bu.edu.eg/students/exams-results',
    hot:true,
  },
  {
    id:'s-ex5', cat:'exam', icon:'📝', ib:'ib-exam',
    title:'نماذج الإجابات النموذجية',
    desc:'الاطلاع على نماذج الأسئلة والإجابات النموذجية لمقررات الكلية.',
    tags:['امتحانات','نماذج','إجابات'],
    btn:'عرض النماذج',
    url:'https://fsed.bu.edu.eg/students/models-answers',
    outline:true,
  },
  {
    id:'s-ex6', cat:'exam', icon:'📄', ib:'ib-exam',
    title:'قوائم الطلاب',
    desc:'الاطلاع على قوائم الطلاب المقيدين في كل قسم وفرقة دراسية.',
    tags:['امتحانات','قوائم','طلاب'],
    btn:'عرض القوائم',
    url:'https://fsed.bu.edu.eg/students/students-lists',
    outline:true,
  },
  /* ── AFFAIRS ── */
  {
    id:'s-sa1', cat:'affairs', icon:'👥', ib:'ib-affairs',
    title:'اتحاد الطلاب',
    desc:'تعرف على اتحاد طلاب الكلية، أنشطته وفعالياته وكيفية التواصل مع قيادته.',
    tags:['شؤون','اتحاد','أنشطة'],
    btn:'التواصل مع الاتحاد',
    url:'https://fsed.bu.edu.eg/students/students-union',
  },
  {
    id:'s-sa2', cat:'affairs', icon:'🏅', ib:'ib-youth',
    title:'رعاية الشباب',
    desc:'الأنشطة الثقافية والاجتماعية والرياضية التي ترعاها إدارة رعاية شباب الكلية.',
    tags:['شؤون','رعاية','رياضة'],
    btn:'استعراض الأنشطة',
    url:'https://fsed.bu.edu.eg/students/youth-care',
  },
  {
    id:'s-sa3', cat:'affairs', icon:'💬', ib:'ib-affairs',
    title:'منتديات الطلاب',
    desc:'المشاركة في منتديات النقاش الطلابية والتواصل مع زملائك بشأن الشأن الأكاديمي.',
    tags:['شؤون','منتديات','نقاش'],
    btn:'الانضمام للمنتديات',
    url:'https://fsed.bu.edu.eg/students/student-forums',
    outline:true,
  },
  {
    id:'s-sa4', cat:'affairs', icon:'⚠️', ib:'ib-affairs',
    title:'آلية تلقي الشكاوى والمقترحات',
    desc:'تقديم الشكاوى والمقترحات بطريقة رسمية وضمان متابعتها حتى الحل.',
    tags:['شؤون','شكاوى','مقترحات'],
    btn:'تقديم شكوى',
    url:'https://fsed.bu.edu.eg/students/complaints-receiving-mechanism',
    outline:true,
  },
  {
    id:'s-sa5', cat:'affairs', icon:'🌍', ib:'ib-affairs',
    title:'الطلاب الوافدون',
    desc:'خدمات ومعلومات مخصصة للطلاب الوافدين الملتحقين بكلية التربية النوعية.',
    tags:['شؤون','وافدون','دولي'],
    btn:'خدمات الوافدين',
    url:'https://foreigners.bu.edu.eg/',
    outline:true,
  },
  {
    id:'s-sa6', cat:'affairs', icon:'🎓', ib:'ib-grad',
    title:'مكتب متابعة الخريجين',
    desc:'التواصل مع مكتب شؤون الخريجين لمتابعة مساراتهم المهنية وتقديم الدعم.',
    tags:['شؤون','خريجون','متابعة'],
    btn:'التواصل',
    url:'https://fsed.bu.edu.eg/students/graduate-follow-up-office',
    outline:true,
  },
  /* ── LIBRARY ── */
  {
    id:'s-lb1', cat:'library', icon:'📚', ib:'ib-library',
    title:'بنك المعرفة المصري',
    desc:'الدخول المجاني لبنك المعرفة المصري والاطلاع على آلاف الكتب والمجلات العلمية.',
    tags:['مكتبة','معرفة','كتب'],
    btn:'الدخول لبنك المعرفة',
    url:'https://www.ekb.eg/ar/home',
    hot:true,
  },
  {
    id:'s-lb2', cat:'library', icon:'🏛️', ib:'ib-library',
    title:'خدمات مكتبة الكلية',
    desc:'تعرف على خدمات مكتبة الكلية من إعارة وبحث ومراجع ومصادر إلكترونية.',
    tags:['مكتبة','خدمات','إعارة'],
    btn:'خدمات المكتبة',
    url:'https://fsed.bu.edu.eg/library/library-services',
  },
  {
    id:'s-lb3', cat:'library', icon:'🕐', ib:'ib-library',
    title:'مواعيد عمل المكتبة',
    desc:'الاطلاع على مواعيد فتح مكتبة الكلية وسياسة الدخول وقواعد الاستخدام.',
    tags:['مكتبة','مواعيد','سياسة'],
    btn:'عرض المواعيد',
    url:'https://fsed.bu.edu.eg/library/working-hours',
    outline:true,
  },
  {
    id:'s-lb4', cat:'library', icon:'📖', ib:'ib-library',
    title:'إمكانات المكتبة',
    desc:'تعرف على مقتنيات المكتبة من كتب ومجلات ومصادر رقمية ومكتبات متخصصة.',
    tags:['مكتبة','مقتنيات','مصادر'],
    btn:'استعراض',
    url:'https://fsed.bu.edu.eg/library/library-capabilities',
    outline:true,
  },
  /* ── FORMS ── */
  {
    id:'s-fo1', cat:'forms', icon:'📄', ib:'ib-forms',
    title:'نماذج الأسئلة والإجابات',
    desc:'تحميل نماذج الأسئلة والإجابات النموذجية للمقررات لمساعدتك في الاستذكار.',
    tags:['نماذج','تحميل','أسئلة'],
    btn:'تحميل النماذج',
    url:'https://fsed.bu.edu.eg/index.php/models-answers',
  },
  {
    id:'s-fo2', cat:'forms', icon:'📋', ib:'ib-forms',
    title:'دليل الطالب المحدث',
    desc:'تحميل أحدث إصدار من دليل الطالب المشتمل على اللوائح والإجراءات الرسمية.',
    tags:['نماذج','دليل','لوائح'],
    btn:'تحميل الدليل',
    url:'https://drive.google.com/file/d/12pstEld4I1q21sVBUbbdlISP16YgFJfi/view',
    isNew:true,
  },
  {
    id:'s-fo3', cat:'forms', icon:'📝', ib:'ib-forms',
    title:'نموذج طلب تسجيل مقرر',
    desc:'نموذج رسمي لطلب تسجيل مقرر إضافي أو الاعتراض على التسجيل الحالي.',
    tags:['نماذج','تسجيل','مقرر'],
    btn:'تحميل النموذج',
    url:'https://fsed.bu.edu.eg/graduate-studies/course-registration-application',
    outline:true,
  },
  /* ── ANNOUNCEMENTS ── */
  {
    id:'s-an1', cat:'announcements', icon:'📢', ib:'ib-announce',
    title:'الأخبار الهامة',
    desc:'جميع الأخبار والبيانات والإعلانات الرسمية الصادرة عن الكلية.',
    tags:['إعلانات','أخبار','رسمي'],
    btn:'عرض الأخبار',
    url:'https://fsed.bu.edu.eg/home/important-news',
  },
  {
    id:'s-an2', cat:'announcements', icon:'📅', ib:'ib-announce',
    title:'الأنشطة المجتمعية',
    desc:'تصفح الأنشطة والفعاليات المجتمعية التي تنظمها الكلية خلال العام الدراسي.',
    tags:['إعلانات','أنشطة','فعاليات'],
    btn:'استعراض',
    url:'https://fsed.bu.edu.eg/community-service/community-activities',
    outline:true,
  },
  /* ── LINKS ── */
  {
    id:'s-li1', cat:'links', icon:'🌐', ib:'ib-links',
    title:'بوابة جامعة بنها الرسمية',
    desc:'الدخول لموقع جامعة بنها الرسمي للاطلاع على خدمات الجامعة المركزية.',
    tags:['روابط','جامعة','بوابة'],
    btn:'الانتقال للبوابة',
    url:'https://bu.edu.eg',
  },
  {
    id:'s-li2', cat:'links', icon:'🔗', ib:'ib-links',
    title:'موقع الكلية الرسمي',
    desc:'الموقع الرسمي لكلية التربية النوعية جامعة بنها بكافة تفاصيله ومحتوياته.',
    tags:['روابط','كلية','موقع'],
    btn:'زيارة الموقع',
    url:'https://fsed.bu.edu.eg',
  },
  {
    id:'s-li3', cat:'links', icon:'🎓', ib:'ib-links',
    title:'بوابة الطلاب — جامعة بنها',
    desc:'البوابة الإلكترونية المركزية لخدمات طلاب جامعة بنها.',
    tags:['روابط','طلاب','خدمات'],
    btn:'الانتقال',
    url:'https://bu.edu.eg/students/f10',
    outline:true,
  },
  {
    id:'s-li4', cat:'links', icon:'📡', ib:'ib-links',
    title:'مكتب العلاقات الدولية',
    desc:'تواصل مع مكتب العلاقات الدولية للاستفسار عن برامج التبادل والزمالات.',
    tags:['روابط','دولي','علاقات'],
    btn:'زيارة',
    url:'https://iro.bu.edu.eg/',
    outline:true,
  },
  /* ── FEES ── */
  {
    id:'s-fe1', cat:'fees', icon:'💳', ib:'ib-payment',
    title:'المصروفات الدراسية',
    desc:'الاطلاع على جداول الرسوم والمصروفات الدراسية المقررة للعام الجامعي الحالي.',
    tags:['مصروفات','رسوم','دراسي'],
    btn:'عرض المصروفات',
    url:'https://fsed.bu.edu.eg/students/educational-expenses',
  },
  {
    id:'s-fe2', cat:'fees', icon:'💰', ib:'ib-payment',
    title:'مصروفات الدراسات العليا',
    desc:'الاطلاع على رسوم الالتحاق ببرامج الدراسات العليا والماجستير والدكتوراه.',
    tags:['مصروفات','رسوم','دراسات عليا'],
    btn:'عرض الرسوم',
    url:'https://fsed.bu.edu.eg/graduate-studies/educational-expenses-postgraduate',
    outline:true,
  },
];

/* ═══════════════════════════════════════════════════════════════
   SERVICES DATA — GRADUATE (خريج)
═══════════════════════════════════════════════════════════════ */
const GRADUATE_CATS = [
  { id:'all',        label:'جميع الخدمات',       icon:'⊞' },
  { id:'docs',       label:'توثيق الشهادات',      icon:'📜' },
  { id:'jobs',       label:'فرص العمل والتوظيف',  icon:'💼' },
  { id:'postgrad',   label:'الدراسات العليا',      icon:'🎓' },
  { id:'research',   label:'الأبحاث والنشر',       icon:'🔬' },
  { id:'network',    label:'شبكة الخريجين',        icon:'🌐' },
  { id:'links',      label:'الروابط المهمة',       icon:'🔗' },
];

const GRADUATE_SERVICES = [
  {
    id:'g-do1', cat:'docs', icon:'📜', ib:'ib-grad',
    title:'مكتب متابعة الخريجين',
    desc:'التواصل المباشر مع مكتب شؤون الخريجين للحصول على وثائق التخرج والمتابعة.',
    tags:['توثيق','خريجون','مكتب'],
    btn:'التواصل مع المكتب',
    url:'https://fsed.bu.edu.eg/students/graduate-follow-up-office',
    hot:true,
  },
  {
    id:'g-do2', cat:'docs', icon:'🗂️', ib:'ib-grad',
    title:'السجل الأكاديمي (الترانسكريبت)',
    desc:'طلب استخراج نسخة رسمية من السجل الأكاديمي الكامل بعد التخرج.',
    tags:['توثيق','ترانسكريبت','رسمي'],
    btn:'طلب النسخة',
    url:'http://mis.bu.edu.eg/benha_new/Registration/ED_Login.aspx',
  },
  {
    id:'g-do3', cat:'docs', icon:'🛡️', ib:'ib-grad',
    title:'الميثاق الأخلاقي للطالب',
    desc:'الاطلاع على ميثاق الأخلاقيات الجامعية الصادر عن جامعة بنها.',
    tags:['توثيق','ميثاق','أخلاق'],
    btn:'عرض الميثاق',
    url:'https://bu.edu.eg/e-services/University_Student_Ethical_Charter.php',
    outline:true,
  },
  {
    id:'g-jo1', cat:'jobs', icon:'💼', ib:'ib-grad',
    title:'مواقع الطلاب والخريجين',
    desc:'تصفح المنصات الإلكترونية والمواقع المتاحة لطلاب وخريجي جامعة بنها.',
    tags:['توظيف','مواقع','خريجون'],
    btn:'استعراض المواقع',
    url:'https://bu.edu.eg/students/f10',
  },
  {
    id:'g-po1', cat:'postgrad', icon:'🎓', ib:'ib-grad',
    title:'لائحة الدراسات العليا',
    desc:'الاطلاع على اللائحة المنظمة لبرامج الماجستير والدكتوراه بالكلية.',
    tags:['دراسات عليا','لائحة','ماجستير'],
    btn:'عرض اللائحة',
    url:'https://fsed.bu.edu.eg/graduate-studies/list-of-graduate-studies',
    hot:true,
  },
  {
    id:'g-po2', cat:'postgrad', icon:'📋', ib:'ib-grad',
    title:'آليات التسجيل في الدراسات العليا',
    desc:'خطوات وإجراءات التسجيل في برامج الدراسات العليا بكلية التربية النوعية.',
    tags:['دراسات عليا','تسجيل','إجراءات'],
    btn:'معرفة الخطوات',
    url:'https://fsed.bu.edu.eg/graduate-studies/registration-mechanisms',
  },
  {
    id:'g-po3', cat:'postgrad', icon:'📚', ib:'ib-grad',
    title:'برامج الدراسات العليا ومقرراتها',
    desc:'تصفح البرامج الأكاديمية والمقررات المتاحة لطلاب الدراسات العليا.',
    tags:['دراسات عليا','برامج','مقررات'],
    btn:'استعراض البرامج',
    url:'https://fsed.bu.edu.eg/graduate-studies/graduate-studies-programs-and-courses',
  },
  {
    id:'g-po4', cat:'postgrad', icon:'📅', ib:'ib-grad',
    title:'الجداول الدراسية — الدراسات العليا',
    desc:'الاطلاع على الجداول الدراسية لمحاضرات الماجستير والدكتوراه.',
    tags:['دراسات عليا','جداول','محاضرات'],
    btn:'عرض الجداول',
    url:'https://fsed.bu.edu.eg/graduate-studies/academic-schedules',
    outline:true,
  },
  {
    id:'g-po5', cat:'postgrad', icon:'📋', ib:'ib-grad',
    title:'الأوراق المطلوبة للالتحاق',
    desc:'قائمة الوثائق والأوراق الرسمية المطلوبة للتسجيل في الدراسات العليا.',
    tags:['دراسات عليا','وثائق','أوراق'],
    btn:'عرض المتطلبات',
    url:'https://fsed.bu.edu.eg/graduate-studies/papers-required-postgraduate-studies',
    outline:true,
  },
  {
    id:'g-po6', cat:'postgrad', icon:'✏️', ib:'ib-grad',
    title:'معايير كتابة الرسالة العلمية',
    desc:'الدليل الرسمي لمعايير وقواعد كتابة رسائل الماجستير والدكتوراه.',
    tags:['دراسات عليا','رسالة','معايير'],
    btn:'عرض المعايير',
    url:'https://fsed.bu.edu.eg/graduate-studies/criteria-for-writing-a-dissertation',
    outline:true,
  },
  {
    id:'g-po7', cat:'postgrad', icon:'📊', ib:'ib-grad',
    title:'نتائج امتحانات الدراسات العليا',
    desc:'الاطلاع على نتائج امتحانات برامج الماجستير والدكتوراه بعد الإعلان الرسمي.',
    tags:['دراسات عليا','نتائج','امتحانات'],
    btn:'عرض النتائج',
    url:'https://fsed.bu.edu.eg/graduate-studies/results-graduate-studies',
  },
  {
    id:'g-po8', cat:'postgrad', icon:'💳', ib:'ib-payment',
    title:'مصروفات الدراسات العليا',
    desc:'الاطلاع على جداول الرسوم الدراسية لبرامج الدراسات العليا والإجراءات المالية.',
    tags:['دراسات عليا','مصروفات','رسوم'],
    btn:'عرض المصروفات',
    url:'https://fsed.bu.edu.eg/graduate-studies/educational-expenses-postgraduate',
    outline:true,
  },
  {
    id:'g-re1', cat:'research', icon:'🔬', ib:'ib-grad',
    title:'المجلة العلمية للكلية',
    desc:'النشر في المجلة العلمية المحكمة لكلية التربية النوعية — شروط وإجراءات النشر.',
    tags:['بحث','مجلة','نشر'],
    btn:'الدخول للمجلة',
    url:'https://sjse.journals.ekb.eg/',
    hot:true,
  },
  {
    id:'g-re2', cat:'research', icon:'⚖️', ib:'ib-grad',
    title:'ميثاق أخلاقيات البحث العلمي',
    desc:'الاطلاع على قواعد وأخلاقيات البحث العلمي المعتمدة في الكلية.',
    tags:['بحث','أخلاق','ميثاق'],
    btn:'عرض الميثاق',
    url:'https://fsed.bu.edu.eg/graduate-studies/scientific-research-ethics-charter',
    outline:true,
  },
  {
    id:'g-re3', cat:'research', icon:'📚', ib:'ib-library',
    title:'بنك المعرفة المصري',
    desc:'الوصول لآلاف الكتب والمجلات والأبحاث العلمية الرقمية مجاناً.',
    tags:['بحث','مكتبة','رقمي'],
    btn:'الدخول',
    url:'https://www.ekb.eg/ar/home',
  },
  {
    id:'g-re4', cat:'research', icon:'🏛️', ib:'ib-grad',
    title:'اللجان العلمية',
    desc:'التعرف على اللجان العلمية المختصة في الكلية وأدوارها في الإشراف البحثي.',
    tags:['بحث','لجان','إشراف'],
    btn:'عرض اللجان',
    url:'https://fsed.bu.edu.eg/graduate-studies/scientific-committees',
    outline:true,
  },
  {
    id:'g-ne1', cat:'network', icon:'🌐', ib:'ib-grad',
    title:'بوابة جامعة بنها',
    desc:'الدخول للبوابة الرسمية لجامعة بنها والوصول لجميع خدمات الخريجين.',
    tags:['شبكة','جامعة','بوابة'],
    btn:'الانتقال للبوابة',
    url:'https://bu.edu.eg',
  },
  {
    id:'g-ne2', cat:'network', icon:'📡', ib:'ib-grad',
    title:'مكتب العلاقات الدولية',
    desc:'التواصل مع مكتب العلاقات الدولية لبرامج التبادل والزمالات والفرص الخارجية.',
    tags:['شبكة','دولي','زمالات'],
    btn:'زيارة المكتب',
    url:'https://iro.bu.edu.eg/',
    outline:true,
  },
  {
    id:'g-li1', cat:'links', icon:'🔗', ib:'ib-links',
    title:'موقع الكلية الرسمي',
    desc:'الموقع الرسمي لكلية التربية النوعية جامعة بنها.',
    tags:['روابط','كلية','رسمي'],
    btn:'زيارة الموقع',
    url:'https://fsed.bu.edu.eg',
  },
  {
    id:'g-li2', cat:'links', icon:'🎓', ib:'ib-links',
    title:'صفحة الطالب — بوابة الجامعة',
    desc:'الدخول لبوابة الطالب الإلكترونية لعرض بياناتك وسجلاتك الكاملة.',
    tags:['روابط','بوابة','طالب'],
    btn:'الدخول',
    url:'http://mis.bu.edu.eg/benha_new/Registration/ED_Login.aspx',
    outline:true,
  },
];

/* ═══════════════════════════════════════════════════════════════
   SERVICES DATA — DOCTOR (دكتور)
═══════════════════════════════════════════════════════════════ */
const DOCTOR_CATS = [
  { id:'all',        label:'جميع الخدمات',           icon:'⊞' },
  { id:'courses',    label:'إدارة المقررات',           icon:'📖' },
  { id:'research',   label:'البحث العلمي والنشر',      icon:'🔬' },
  { id:'students',   label:'متابعة الطلاب',            icon:'👥' },
  { id:'postgrad',   label:'الدراسات العليا',          icon:'🎓' },
  { id:'quality',    label:'ضمان الجودة',              icon:'🏆' },
  { id:'links',      label:'الروابط المهمة',            icon:'🔗' },
];

const DOCTOR_SERVICES = [
  {
    id:'d-co1', cat:'courses', icon:'📖', ib:'ib-doctor',
    title:'إدارة المحاضرات والمقررات',
    desc:'رفع وإدارة محتوى المقررات الدراسية والمحاضرات على المنصة الإلكترونية للكلية.',
    tags:['مقررات','محتوى','محاضرات'],
    btn:'إدارة المحتوى',
    url:'https://fsed.bu.edu.eg/students/learning',
    hot:true,
  },
  {
    id:'d-co2', cat:'courses', icon:'📅', ib:'ib-doctor',
    title:'الجداول الدراسية',
    desc:'الاطلاع على جداول المحاضرات وتوزيع الأعباء التدريسية لأعضاء هيئة التدريس.',
    tags:['مقررات','جداول','محاضرات'],
    btn:'عرض الجداول',
    url:'https://fsed.bu.edu.eg/study-schedules',
  },
  {
    id:'d-co3', cat:'courses', icon:'📚', ib:'ib-doctor',
    title:'البرامج والمقررات الدراسية',
    desc:'استعراض خطط الدراسة والمقررات المقررة لكل برنامج وقسم دراسي.',
    tags:['مقررات','برامج','خطط'],
    btn:'استعراض',
    url:'https://fsed.bu.edu.eg/students/students-programs-and-courses',
    outline:true,
  },
  {
    id:'d-co4', cat:'courses', icon:'📊', ib:'ib-doctor',
    title:'استطلاعات تقييم المقررات',
    desc:'الاطلاع على نتائج تقييم الطلاب للمقررات الدراسية وأداء هيئة التدريس.',
    tags:['مقررات','تقييم','جودة'],
    btn:'عرض التقييمات',
    url:'https://fsed.bu.edu.eg/students/polling-the-student-opinion-on-the-course',
    outline:true,
  },
  {
    id:'d-re1', cat:'research', icon:'🔬', ib:'ib-doctor',
    title:'المجلة العلمية للكلية',
    desc:'النشر في المجلة العلمية المحكمة لكلية التربية النوعية — شروط وإجراءات تفصيلية.',
    tags:['بحث','مجلة','نشر'],
    btn:'الدخول للمجلة',
    url:'https://sjse.journals.ekb.eg/',
    hot:true,
  },
  {
    id:'d-re2', cat:'research', icon:'⚖️', ib:'ib-doctor',
    title:'ميثاق أخلاقيات البحث العلمي',
    desc:'الاطلاع على معايير وأخلاقيات البحث العلمي الجامعي المعتمدة رسمياً.',
    tags:['بحث','أخلاق','معايير'],
    btn:'عرض الميثاق',
    url:'https://fsed.bu.edu.eg/graduate-studies/scientific-research-ethics-charter',
  },
  {
    id:'d-re3', cat:'research', icon:'✏️', ib:'ib-doctor',
    title:'معايير الرسالة العلمية',
    desc:'المعايير والقواعد الرسمية لكتابة وتقييم رسائل الماجستير والدكتوراه.',
    tags:['بحث','رسالة','معايير'],
    btn:'عرض المعايير',
    url:'https://fsed.bu.edu.eg/graduate-studies/criteria-for-writing-a-dissertation',
    outline:true,
  },
  {
    id:'d-re4', cat:'research', icon:'📚', ib:'ib-library',
    title:'بنك المعرفة المصري',
    desc:'الوصول الفوري لآلاف الكتب والمجلات والمراجع الأكاديمية الدولية.',
    tags:['بحث','مكتبة','مراجع'],
    btn:'الدخول',
    url:'https://www.ekb.eg/ar/home',
  },
  {
    id:'d-re5', cat:'research', icon:'📡', ib:'ib-doctor',
    title:'المجالات البحثية بالجامعة',
    desc:'الاطلاع على المجالات البحثية المعتمدة في الجامعة والكليات المشاركة.',
    tags:['بحث','مجالات','جامعة'],
    btn:'استعراض',
    url:'https://bu.edu.eg/researchfields/10',
    outline:true,
  },
  {
    id:'d-st1', cat:'students', icon:'👥', ib:'ib-doctor',
    title:'بوابة الطالب وبياناته',
    desc:'الدخول لمنظومة بيانات الطلاب لعرض السجلات الأكاديمية ومتابعة المستوى.',
    tags:['طلاب','سجلات','بيانات'],
    btn:'دخول البوابة',
    url:'http://mis.bu.edu.eg/benha_new/Registration/ED_Login.aspx',
    hot:true,
  },
  {
    id:'d-st2', cat:'students', icon:'📋', ib:'ib-doctor',
    title:'قوائم الطلاب',
    desc:'الاطلاع على قوائم الطلاب المقيدين في المقررات وكشوف الحضور الرسمية.',
    tags:['طلاب','قوائم','حضور'],
    btn:'عرض القوائم',
    url:'https://fsed.bu.edu.eg/students/students-lists',
  },
  {
    id:'d-st3', cat:'students', icon:'💬', ib:'ib-doctor',
    title:'آلية تلقي الشكاوى',
    desc:'الاطلاع على آلية تلقي الشكاوى ومتابعة المقترحات المقدمة من الطلاب.',
    tags:['طلاب','شكاوى','متابعة'],
    btn:'عرض الآلية',
    url:'https://fsed.bu.edu.eg/students/complaints-receiving-mechanism',
    outline:true,
  },
  {
    id:'d-po1', cat:'postgrad', icon:'🎓', ib:'ib-grad',
    title:'لوائح وبرامج الدراسات العليا',
    desc:'الاطلاع على اللوائح الرسمية المنظمة لبرامج الماجستير والدكتوراه.',
    tags:['دراسات عليا','لوائح','برامج'],
    btn:'عرض البرامج',
    url:'https://fsed.bu.edu.eg/graduate-studies',
    hot:true,
  },
  {
    id:'d-po2', cat:'postgrad', icon:'📅', ib:'ib-doctor',
    title:'جداول امتحانات الدراسات العليا',
    desc:'الاطلاع على مواعيد امتحانات الماجستير والدكتوراه وترتيبات اللجان.',
    tags:['دراسات عليا','امتحانات','جداول'],
    btn:'عرض الجداول',
    url:'https://fsed.bu.edu.eg/graduate-studies/schedules-graduate-exams',
  },
  {
    id:'d-po3', cat:'postgrad', icon:'🏛️', ib:'ib-doctor',
    title:'اللجان العلمية',
    desc:'إدارة الإشراف على رسائل الماجستير والدكتوراه ومتابعة مراحل التقديم.',
    tags:['دراسات عليا','لجان','إشراف'],
    btn:'عرض اللجان',
    url:'https://fsed.bu.edu.eg/graduate-studies/scientific-committees',
    outline:true,
  },
  {
    id:'d-qu1', cat:'quality', icon:'🏆', ib:'ib-quality',
    title:'وحدة ضمان الجودة',
    desc:'التعاون مع وحدة ضمان الجودة في مراجعة البرامج الأكاديمية واعتمادها.',
    tags:['جودة','اعتماد','وحدة'],
    btn:'التواصل',
    url:'https://fsed.bu.edu.eg/units-and-centers/quality-assurance-unit',
  },
  {
    id:'d-qu2', cat:'quality', icon:'📊', ib:'ib-quality',
    title:'وحدة القياس والتقويم',
    desc:'أدوات ومعايير قياس وتقويم الأداء الأكاديمي والمؤسسي في الكلية.',
    tags:['جودة','قياس','تقويم'],
    btn:'استعراض',
    url:'https://fsed.bu.edu.eg/units-and-centers/measurement-evaluation-unit',
    outline:true,
  },
  {
    id:'d-qu3', cat:'quality', icon:'🌐', ib:'ib-quality',
    title:'وحدة تكنولوجيا المعلومات',
    desc:'التواصل مع وحدة IT للدعم التقني ومنظومات التعليم الإلكتروني.',
    tags:['جودة','تقنية','دعم'],
    btn:'التواصل',
    url:'https://fsed.bu.edu.eg/units-and-centers/information-technology-unit',
    outline:true,
  },
  {
    id:'d-li1', cat:'links', icon:'🔗', ib:'ib-links',
    title:'موقع الكلية الرسمي',
    desc:'الموقع الرسمي لكلية التربية النوعية جامعة بنها.',
    tags:['روابط','كلية','رسمي'],
    btn:'زيارة الموقع',
    url:'https://fsed.bu.edu.eg',
  },
  {
    id:'d-li2', cat:'links', icon:'🌐', ib:'ib-links',
    title:'بوابة أعضاء هيئة التدريس',
    desc:'بوابة جامعة بنها الخاصة بأعضاء هيئة التدريس ومساعديهم.',
    tags:['روابط','هيئة تدريس','بوابة'],
    btn:'الانتقال',
    url:'https://bu.edu.eg/portal/index.php?act=104&fid=10',
    outline:true,
  },
];

/* ═══════════════════════════════════════════════════════════════
   FAQ DATA
═══════════════════════════════════════════════════════════════ */
const FAQ_DATA = {
  student: [
    { q:'كيف أجد جدول الامتحانات؟', icon:'📋', a:'انتقل لقسم "خدمات الامتحانات" واختر "جداول الامتحانات"، أو اضغط على الرابط المباشر لموقع الكلية.' },
    { q:'من أين أعرف نتيجتي؟', icon:'✅', a:'من قسم "خدمات الامتحانات" اختر "نتائج الامتحانات" للوصول المباشر لنتائجك من موقع الكلية الرسمي.' },
    { q:'كيف أحصل على دليل الطالب؟', icon:'📄', a:'يمكنك تحميل دليل الطالب المحدث 2026 من قسم "النماذج والتحميلات" مباشرةً.' },
    { q:'كيف أعرف بريدي التعليمي؟', icon:'📧', a:'من قسم "الخدمات الإلكترونية" اختر "معرفة البريد التعليمي" للوصول لبوابة استخراج الإيميل.' },
    { q:'أين أجد رقم جلوسي؟', icon:'🔢', a:'من قسم "خدمات الامتحانات" اختر "أرقام الجلوس" لعرض رقمك في كل مادة.' },
    { q:'كيف أقدم شكوى؟', icon:'⚠️', a:'من قسم "شؤون الطلاب" اختر "آلية تلقي الشكاوى" لتقديم شكواك بشكل رسمي ومتابعتها.' },
  ],
  graduate: [
    { q:'كيف أوثق شهادتي؟', icon:'📜', a:'تواصل مع مكتب متابعة الخريجين عبر رابط مكتب الخريجين لمعرفة إجراءات التوثيق الكاملة.' },
    { q:'كيف أسجل في الماجستير؟', icon:'🎓', a:'من قسم "الدراسات العليا" تعرف على شروط القبول، الأوراق المطلوبة، وآليات التسجيل.' },
    { q:'كيف أنشر بحثي في مجلة الكلية؟', icon:'🔬', a:'من قسم "الأبحاث والنشر" ادخل على المجلة العلمية للكلية لمعرفة شروط وإجراءات النشر.' },
    { q:'هل بنك المعرفة متاح للخريجين؟', icon:'📚', a:'نعم، يمكن للخريجين الوصول لبنك المعرفة المصري عبر الرابط المتاح في قسم الأبحاث.' },
  ],
  doctor: [
    { q:'كيف أرفع محتوى مقرري؟', icon:'📖', a:'من قسم "إدارة المقررات" ادخل على منصة المحاضرات الإلكترونية لرفع محتوى مقرراتك.' },
    { q:'كيف أنشر في مجلة الكلية؟', icon:'🔬', a:'من قسم "البحث العلمي" ادخل على المجلة العلمية للكلية للاطلاع على شروط النشر.' },
    { q:'كيف أتابع طلابي في الدراسات العليا؟', icon:'🎓', a:'من قسم "الدراسات العليا" تجد اللجان العلمية وبيانات الطلاب المسجلين تحت إشرافك.' },
    { q:'كيف أتواصل مع وحدة ضمان الجودة؟', icon:'🏆', a:'من قسم "ضمان الجودة" ستجد رابط وحدة ضمان الجودة بالكلية للتواصل المباشر.' },
  ],
};

/* ═══════════════════════════════════════════════════════════════
   FUTURE FEATURES
═══════════════════════════════════════════════════════════════ */
const FUTURE_FEATURES = [
  { icon:'🤖', title:'مساعد ذكاء اصطناعي أكاديمي', desc:'مساعد AI يجيب على استفساراتك الأكاديمية ويساعدك في جدولة مذاكرتك.', status:'soon' },
  { icon:'📱', title:'تطبيق الجوال الرسمي', desc:'تطبيق متكامل لخدمات المنصة على iOS وAndroid مع إشعارات فورية.', status:'dev' },
  { icon:'🗓️', title:'التقويم الأكاديمي التفاعلي', desc:'تقويم ذكي يتزامن مع جداولك ومواعيد امتحاناتك وتسليم واجباتك.', status:'soon' },
  { icon:'💬', title:'غرف النقاش الجماعي', desc:'منصة مناقشة مباشرة بين الطلاب والأساتذة لكل مقرر دراسي.', status:'planned' },
  { icon:'🏅', title:'نظام الشارات والإنجازات', desc:'اكسب شارات تحفيزية عند استخدامك للخدمات وإتمامك للمهام الأكاديمية.', status:'planned' },
  { icon:'📊', title:'لوحة التحليلات الشخصية', desc:'تتبع تقدمك الأكاديمي، معدلاتك، ومقارنتها بإحصائيات الكلية.', status:'dev' },
];

/* ═══════════════════════════════════════════════════════════════
   MINI PROGRESS CONFIG
═══════════════════════════════════════════════════════════════ */
const MINI_PROGRESS_DATA = {
  student: [
    { label:'الخدمات الإلكترونية', val:85 },
    { label:'خدمات الامتحانات',    val:72 },
    { label:'الشؤون الأكاديمية',   val:68 },
  ],
  graduate: [
    { label:'توثيق الشهادات',  val:60 },
    { label:'الدراسات العليا', val:88 },
    { label:'الأبحاث والنشر',  val:75 },
  ],
  doctor: [
    { label:'إدارة المقررات', val:90 },
    { label:'البحث العلمي',   val:80 },
    { label:'متابعة الطلاب',  val:65 },
  ],
};

/* ═══════════════════════════════════════════════════════════════
   STATE
═══════════════════════════════════════════════════════════════ */
let STATE = {
  role: 'طالب',
  activeCategory: 'all',
  searchQuery: '',
  view: 'grid',
  favorites: new Set(),
  notifCount: 3,
  servicesData: [],
  catsData: [],
  filteredServices: [],
};

/* ═══════════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════════ */
function getServicesForRole(role) {
  switch(role) {
    case 'خريج':  return { services: GRADUATE_SERVICES, cats: GRADUATE_CATS };
    case 'دكتور': return { services: DOCTOR_SERVICES,  cats: DOCTOR_CATS   };
    default:       return { services: STUDENT_SERVICES, cats: STUDENT_CATS  };
  }
}

function showToast(msg, type = 'info', duration = 2800) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const icons = { success:'✅', error:'❌', info:'ℹ️' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type]||'ℹ️'}</span><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'toastOut .3s ease forwards';
    setTimeout(() => toast.remove(), 350);
  }, duration);
}

function openUrl(url) {
  if (!url) return;
  window.open(url, '_blank', 'noopener,noreferrer');
}

function debounce(fn, ms) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

/* ═══════════════════════════════════════════════════════════════
   FIREBASE AUTH
═══════════════════════════════════════════════════════════════ */
function initFirebaseAuth() {
  if (typeof firebase === 'undefined' || !firebase.auth) {
    // Dev fallback
    loadRoleUI('طالب', { displayName:'طالب تجريبي', photoURL:null });
    return;
  }
  firebase.auth().onAuthStateChanged(async user => {
    if (!user) { window.location.href = 'login.html'; return; }
    let role = 'طالب';
    try {
      const db = firebase.firestore();
      const snap = await db.collection('users').doc(user.uid).get();
      if (snap.exists) role = snap.data().role || 'طالب';
    } catch(e) { console.warn('Firestore read failed, using default role'); }
    loadRoleUI(role, user);
  });
}

function loadRoleUI(role, user) {
  STATE.role = role;
  document.body.setAttribute('data-role', role);

  // Sidebar user
  const name = user?.displayName || 'المستخدم';
  const avatar = user?.photoURL || 'assets/images/user.png';
  setEl('sidebarName', name);
  setEl('sidebarRole', role);
  const avatarEls = [document.getElementById('sidebarAvatar'), document.getElementById('chipAvatar')];
  avatarEls.forEach(el => { if(el) el.src = avatar; });

  // Role badge
  const badge = document.getElementById('roleBadge');
  if (badge) badge.innerHTML = `<span class="rb-dot"></span>${role}`;

  // Load all role-specific UI
  applyRoleContent();
  const data = getServicesForRole(role);
  STATE.servicesData = data.services;
  STATE.catsData = data.cats;
  STATE.filteredServices = [...data.services];

  renderQuickWidgets();
  renderCategories();
  renderMiniProgress();
  renderServices();
  renderFAQ();
  renderFutureFeatures();
  loadFavorites();
}

/* ═══════════════════════════════════════════════════════════════
   ROLE CONTENT
═══════════════════════════════════════════════════════════════ */
function applyRoleContent() {
  const cfg = ROLE_CONFIG[STATE.role] || ROLE_CONFIG['طالب'];
  setHtml('heroPill',    cfg.heroPill);
  setHtml('heroTitle',   cfg.heroTitle);
  setHtml('heroSub',     cfg.heroSub);
  const hsi = document.getElementById('heroSearchInput');
  if (hsi) hsi.placeholder = cfg.heroSearch;
  const si = document.getElementById('searchInput');
  if (si) si.placeholder = cfg.heroSearch.split('،')[0] + '...';

  // Stats
  const statsEl = document.getElementById('heroStats');
  if (statsEl && cfg.stats) {
    statsEl.innerHTML = cfg.stats.map((s,i) =>
      `${i>0?'<div class="hero-stat-div"></div>':''}<div class="hero-stat"><strong>${s.val}</strong><span>${s.label}</span></div>`
    ).join('');
  }
}

/* ═══════════════════════════════════════════════════════════════
   QUICK WIDGETS
═══════════════════════════════════════════════════════════════ */
function renderQuickWidgets() {
  const container = document.getElementById('quickWidgets');
  if (!container) return;
  const cfg = ROLE_CONFIG[STATE.role];
  const widgets = cfg?.quickWidgets || [];
  container.innerHTML = widgets.map(w => `
    <div class="widget-card" onclick="openUrl('${w.url}')">
      <div class="widget-icon">${w.icon}</div>
      <div class="widget-info">
        <span class="widget-label">${w.label}</span>
        <span class="widget-count">${w.count}</span>
      </div>
      <span class="widget-arrow ni ni-external"></span>
    </div>
  `).join('');
}

/* ═══════════════════════════════════════════════════════════════
   CATEGORIES
═══════════════════════════════════════════════════════════════ */
function renderCategories() {
  const lists = ['catList', 'catListMobile'];
  lists.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = STATE.catsData.map(cat => {
      const count = cat.id === 'all'
        ? STATE.servicesData.length
        : STATE.servicesData.filter(s => s.cat === cat.id).length;
      return `
        <li class="cat-item ${STATE.activeCategory === cat.id ? 'active' : ''}"
            data-cat="${cat.id}" role="tab" aria-selected="${STATE.activeCategory === cat.id}">
          <span class="ci-icon">${cat.icon}</span>
          <span class="ci-label">${cat.label}</span>
          ${count > 0 ? `<span class="ci-count">${count}</span>` : ''}
        </li>
      `;
    }).join('');
    el.querySelectorAll('.cat-item').forEach(item => {
      item.addEventListener('click', () => {
        selectCategory(item.dataset.cat);
        // Close mobile drawer
        const drawer = document.getElementById('catDrawer');
        if (drawer?.classList.contains('open')) toggleDrawer(false);
      });
    });
  });
}

function selectCategory(catId) {
  STATE.activeCategory = catId;
  applyFilters();
  renderCategories();
  const catName = STATE.catsData.find(c => c.id === catId)?.label || 'جميع الخدمات';
  setEl('activeCatName', catName);
}

/* ═══════════════════════════════════════════════════════════════
   MINI PROGRESS
═══════════════════════════════════════════════════════════════ */
function renderMiniProgress() {
  const el = document.getElementById('miniProgress');
  if (!el) return;
  const key = ROLE_CONFIG[STATE.role]?.dataKey || 'student';
  const rows = MINI_PROGRESS_DATA[key] || [];
  el.innerHTML = `<h4>📈 نسبة الاستخدام</h4>` + rows.map(r => `
    <div class="mp-row">
      <div class="mp-top"><span>${r.label}</span><span>${r.val}%</span></div>
      <div class="mp-bar"><div class="mp-fill" style="--w:${r.val}%;width:${r.val}%"></div></div>
    </div>
  `).join('');
}

/* ═══════════════════════════════════════════════════════════════
   SERVICES RENDERING
═══════════════════════════════════════════════════════════════ */
function applyFilters() {
  let list = [...STATE.servicesData];
  if (STATE.activeCategory !== 'all') {
    list = list.filter(s => s.cat === STATE.activeCategory);
  }
  if (STATE.searchQuery.trim()) {
    const q = STATE.searchQuery.trim().toLowerCase();
    list = list.filter(s =>
      s.title.toLowerCase().includes(q) ||
      s.desc.toLowerCase().includes(q)  ||
      (s.tags||[]).some(t => t.toLowerCase().includes(q))
    );
  }
  STATE.filteredServices = list;
  renderServices();
}

function renderServices() {
  const skeleton   = document.getElementById('skeletonGrid');
  const grid       = document.getElementById('servicesGrid');
  const emptyState = document.getElementById('emptyState');
  const countEl    = document.getElementById('resultCount');

  if (!grid) return;
  if (skeleton) skeleton.classList.add('hidden');
  grid.classList.remove('hidden');

  const total = STATE.filteredServices.length;
  if (countEl) countEl.textContent = `${total} خدمة`;

  if (total === 0) {
    grid.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }
  if (emptyState) emptyState.classList.add('hidden');

  grid.innerHTML = STATE.filteredServices.map(svc => buildServiceCard(svc)).join('');

  // Animate cards in
  grid.querySelectorAll('.svc-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(18px)';
    setTimeout(() => {
      card.style.transition = 'opacity .35s ease, transform .35s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, i * 40);
  });

  // Attach fav listeners
  grid.querySelectorAll('.fav-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      toggleFavorite(btn.dataset.id);
      btn.classList.toggle('active');
    });
  });
}

function buildServiceCard(svc) {
  const isFav = STATE.favorites.has(svc.id);
  const badge = svc.hot    ? 'hot-badge'
               : svc.isNew ? 'new-badge'
               : '';
  return `
    <article class="svc-card ${badge}" role="listitem" onclick="openUrl('${svc.url}')">
      <div class="svc-card-top">
        <div class="svc-icon ${svc.ib}">${svc.icon}</div>
        <span class="svc-ext-badge"><i class="ni ni-external"></i> رابط خارجي</span>
      </div>
      <div class="svc-card-body">
        <h3>${svc.title}</h3>
        <p>${svc.desc}</p>
        ${svc.tags?.length ? `<div class="svc-tags">${svc.tags.map(t=>`<span class="svc-tag">${t}</span>`).join('')}</div>` : ''}
      </div>
      <div class="svc-card-footer">
        ${svc.outline
          ? `<button class="svc-btn-outline" onclick="event.stopPropagation();openUrl('${svc.url}')">${svc.btn}</button>`
          : `<button class="svc-btn" onclick="event.stopPropagation();openUrl('${svc.url}')">${svc.btn}</button>`
        }
        <button class="fav-btn ${isFav ? 'active' : ''}" data-id="${svc.id}" title="${isFav ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}">⭐</button>
      </div>
    </article>
  `;
}

/* ═══════════════════════════════════════════════════════════════
   FAVORITES (localStorage)
═══════════════════════════════════════════════════════════════ */
function loadFavorites() {
  try {
    const saved = localStorage.getItem(`gc_favs_${STATE.role}`);
    if (saved) STATE.favorites = new Set(JSON.parse(saved));
  } catch(e) {}
}

function saveFavorites() {
  try {
    localStorage.setItem(`gc_favs_${STATE.role}`, JSON.stringify([...STATE.favorites]));
  } catch(e) {}
}

function toggleFavorite(id) {
  if (STATE.favorites.has(id)) {
    STATE.favorites.delete(id);
    showToast('تمت الإزالة من المفضلة', 'info');
  } else {
    STATE.favorites.add(id);
    showToast('تمت الإضافة للمفضلة ⭐', 'success');
  }
  saveFavorites();
}

/* ═══════════════════════════════════════════════════════════════
   SEARCH
═══════════════════════════════════════════════════════════════ */
function initSearch() {
  const heroInput = document.getElementById('heroSearchInput');
  const heroBtn   = document.getElementById('heroSearchBtn');
  const topInput  = document.getElementById('searchInput');
  const dropdown  = document.getElementById('searchDropdown');

  const handleHeroSearch = () => {
    const q = heroInput?.value || '';
    STATE.searchQuery = q;
    STATE.activeCategory = 'all';
    applyFilters();
    renderCategories();
    // Scroll to services
    document.getElementById('servicesLayout')?.scrollIntoView({ behavior:'smooth', block:'start' });
  };

  heroInput?.addEventListener('keydown', e => { if(e.key === 'Enter') handleHeroSearch(); });
  heroBtn?.addEventListener('click', handleHeroSearch);

  // Topbar search with dropdown
  const handleTopSearch = debounce(q => {
    if (!dropdown) return;
    if (!q.trim()) { dropdown.innerHTML = ''; return; }
    const results = STATE.servicesData.filter(s =>
      s.title.toLowerCase().includes(q.toLowerCase()) ||
      (s.tags||[]).some(t => t.includes(q))
    ).slice(0, 7);

    if (!results.length) { dropdown.innerHTML = '<li style="padding:12px;color:var(--text-muted);font-size:.8rem">لا توجد نتائج</li>'; return; }
    dropdown.innerHTML = results.map(s => `
      <li onclick="openUrl('${s.url}')">
        <span>${s.icon}</span>
        <span style="flex:1">${s.title}</span>
        <span class="sd-cat">${s.tags?.[0]||''}</span>
      </li>
    `).join('');
  }, 280);

  topInput?.addEventListener('input', e => handleTopSearch(e.target.value));
  topInput?.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      STATE.searchQuery = e.target.value;
      STATE.activeCategory = 'all';
      applyFilters();
      renderCategories();
      if (dropdown) dropdown.innerHTML = '';
    }
    if (e.key === 'Escape') { if(dropdown) dropdown.innerHTML = ''; }
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.search-wrap') && dropdown) dropdown.innerHTML = '';
  });
}

/* ═══════════════════════════════════════════════════════════════
   VIEW TOGGLE
═══════════════════════════════════════════════════════════════ */
function initViewToggle() {
  document.querySelectorAll('.vbtn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.vbtn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      STATE.view = btn.dataset.view;
      const grid = document.getElementById('servicesGrid');
      if (grid) {
        if (STATE.view === 'list') grid.classList.add('list-view');
        else grid.classList.remove('list-view');
      }
    });
  });
}

/* ═══════════════════════════════════════════════════════════════
   NOTIFICATIONS
═══════════════════════════════════════════════════════════════ */
function initNotifications() {
  const btn      = document.getElementById('notifBtn');
  const panel    = document.getElementById('notifPanel');
  const overlay  = document.getElementById('notifOverlay');
  const markAll  = document.getElementById('markAllRead');
  const badge    = document.getElementById('notifBadge');
  const empty    = document.getElementById('notifEmpty');
  const list     = document.getElementById('notifList');

  function openPanel() {
    panel?.classList.add('open');
    panel?.setAttribute('aria-hidden','false');
    overlay?.classList.remove('hidden');
  }
  function closePanel() {
    panel?.classList.remove('open');
    panel?.setAttribute('aria-hidden','true');
    overlay?.classList.add('hidden');
  }

  btn?.addEventListener('click', e => { e.stopPropagation(); panel?.classList.contains('open') ? closePanel() : openPanel(); });
  overlay?.addEventListener('click', closePanel);

  // Close individual notifications
  document.querySelectorAll('.notif-close').forEach(closeBtn => {
    closeBtn.addEventListener('click', e => {
      e.stopPropagation();
      const item = closeBtn.closest('.notif-item');
      item?.remove();
      updateNotifCount();
    });
  });

  markAll?.addEventListener('click', () => {
    document.querySelectorAll('.notif-item.unread').forEach(el => el.classList.remove('unread'));
    STATE.notifCount = 0;
    if (badge) badge.classList.add('hidden');
    showToast('تم تحديد كل الإشعارات كمقروءة ✅', 'success');
  });

  function updateNotifCount() {
    const unread = document.querySelectorAll('.notif-item.unread').length;
    const total  = document.querySelectorAll('.notif-item').length;
    STATE.notifCount = unread;
    if (badge) {
      if (unread === 0) badge.classList.add('hidden');
      else { badge.classList.remove('hidden'); badge.textContent = unread; }
    }
    if (total === 0 && empty) { empty.classList.remove('hidden'); if(list) list.classList.add('hidden'); }
  }
}

/* ═══════════════════════════════════════════════════════════════
   FAQ
═══════════════════════════════════════════════════════════════ */
function renderFAQ() {
  const container = document.getElementById('faqGrid');
  if (!container) return;
  const key = ROLE_CONFIG[STATE.role]?.dataKey || 'student';
  const items = FAQ_DATA[key] || FAQ_DATA.student;
  container.innerHTML = items.map((item, i) => `
    <div class="faq-item" data-idx="${i}">
      <div class="faq-q" onclick="toggleFAQ(${i})">
        <span class="fq-icon">${item.icon}</span>
        <span>${item.q}</span>
        <span class="fq-chevron">⌄</span>
      </div>
      <div class="faq-a">${item.a}</div>
    </div>
  `).join('');
}

function toggleFAQ(idx) {
  document.querySelectorAll('.faq-item').forEach((item, i) => {
    if (i === idx) item.classList.toggle('open');
    else item.classList.remove('open');
  });
}

/* ═══════════════════════════════════════════════════════════════
   FUTURE FEATURES
═══════════════════════════════════════════════════════════════ */
function renderFutureFeatures() {
  const container = document.getElementById('futureGrid');
  if (!container) return;
  const statusLabels = { soon:'قريباً جداً', dev:'قيد التطوير', planned:'مقترحة' };
  container.innerHTML = FUTURE_FEATURES.map(f => `
    <div class="future-card">
      <button class="fc-vote" onclick="showToast('شكراً لتصويتك! 🗳️','success')">👍 دعم الفكرة</button>
      <div class="fc-icon">${f.icon}</div>
      <div class="fc-title">${f.title}</div>
      <div class="fc-desc">${f.desc}</div>
      <span class="fc-status ${f.status}">${statusLabels[f.status]||f.status}</span>
    </div>
  `).join('');
}

/* ═══════════════════════════════════════════════════════════════
   MOBILE SIDEBAR & DRAWER
═══════════════════════════════════════════════════════════════ */
function initMobileNav() {
  const menuToggle = document.getElementById('menuToggle');
  const sidebar    = document.getElementById('mainSidebar');

  menuToggle?.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    sidebar?.classList.toggle('open');
  });

  // Mobile cat drawer
  const catBtn  = document.getElementById('catToggleMobile');
  catBtn?.addEventListener('click', () => toggleDrawer(true));

  const closeDrawer = document.getElementById('closeDrawer');
  closeDrawer?.addEventListener('click', () => toggleDrawer(false));

  const drawerOverlay = document.getElementById('drawerOverlay');
  drawerOverlay?.addEventListener('click', () => toggleDrawer(false));
}

function toggleDrawer(open) {
  const drawer  = document.getElementById('catDrawer');
  const overlay = document.getElementById('drawerOverlay');
  if (open) {
    drawer?.classList.add('open');
    drawer?.setAttribute('aria-hidden','false');
    overlay?.classList.remove('hidden');
  } else {
    drawer?.classList.remove('open');
    drawer?.setAttribute('aria-hidden','true');
    overlay?.classList.add('hidden');
  }
}

/* ═══════════════════════════════════════════════════════════════
   SKELETON → REAL
═══════════════════════════════════════════════════════════════ */
function showSkeleton() {
  const skeleton = document.getElementById('skeletonGrid');
  const grid     = document.getElementById('servicesGrid');
  if (skeleton) skeleton.classList.remove('hidden');
  if (grid)     grid.classList.add('hidden');
}

/* ═══════════════════════════════════════════════════════════════
   DOM HELPERS
═══════════════════════════════════════════════════════════════ */
function setEl(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}
function setHtml(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

/* ═══════════════════════════════════════════════════════════════
   LOGOUT
═══════════════════════════════════════════════════════════════ */
function logout() {
  if (typeof firebase !== 'undefined' && firebase.auth) {
    firebase.auth().signOut().then(() => {
      window.location.href = 'login.html';
    }).catch(() => { window.location.href = 'login.html'; });
  } else {
    window.location.href = 'login.html';
  }
}

/* ═══════════════════════════════════════════════════════════════
   RESET FILTERS
═══════════════════════════════════════════════════════════════ */
function resetFilters() {
  STATE.searchQuery = '';
  STATE.activeCategory = 'all';
  const heroInput = document.getElementById('heroSearchInput');
  const topInput  = document.getElementById('searchInput');
  if (heroInput) heroInput.value = '';
  if (topInput)  topInput.value  = '';
  applyFilters();
  renderCategories();
  setEl('activeCatName', 'جميع الخدمات');
}

/* ═══════════════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  showSkeleton();
  initFirebaseAuth();
  initSearch();
  initViewToggle();
  initNotifications();
  initMobileNav();

  // Animated progress bars on scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.mp-fill').forEach(fill => {
          const w = fill.style.getPropertyValue('--w') || fill.getAttribute('data-w');
          fill.style.width = w;
        });
      }
    });
  }, { threshold:.3 });

  const prog = document.getElementById('miniProgress');
  if (prog) observer.observe(prog);

  // Initialize internship section for graduates
  initInternshipSection();
});

/* ═══════════════════════════════════════════════════════════════
   INTERNSHIP OPPORTUNITIES (للخريجين فقط)
═══════════════════════════════════════════════════════════════ */
const INTERNSHIP_DATA = [
  {
    id: 'int-1',
    company: 'شركة مايكروسوفت مصر',
    logo: '🏢',
    title: 'مطور برمجيات - تدريب صيفي',
    location: 'القاهرة، مصر',
    type: 'hybrid',
    desc: 'فرصة تدريب مدفوعة الأجر لمدة 3 أشهر في فريق تطوير المنتجات السحابية. ستعمل على مشاريع حقيقية باستخدام Azure وC#.',
    tags: ['برمجة', 'سحابة', 'مدفوع'],
    salary: '8,000 جنيه/شهر',
    deadline: '15 يونيو 2026',
    posted: 'منذ يومين',
    applicants: 45,
    applied: false,
    url: 'https://careers.microsoft.com/egypt',
  },
  {
    id: 'int-2',
    company: 'بنك مصر',
    logo: '🏦',
    title: 'محلل بيانات - برنامج الخريجين',
    location: 'القاهرة، مصر',
    type: 'onsite',
    desc: 'برنامج تدريبي شامل لمدة 6 أشهر في قسم تحليل البيانات والذكاء الاصطناعي. يشمل تدريب على Power BI وPython وSQL.',
    tags: ['تحليل بيانات', 'AI', 'بنوك'],
    salary: '6,500 جنيه/شهر',
    deadline: '20 يونيو 2026',
    posted: 'منذ 5 أيام',
    applicants: 78,
    applied: true,
    url: 'https://www.banquemisr.com/en/careers',
  },
  {
    id: 'int-3',
    company: 'أوراسكوم للإنشاء',
    logo: '🏗️',
    title: 'مهندس مشاريع - تدريب',
    location: 'القاهرة الجديدة، مصر',
    type: 'onsite',
    desc: 'فرصة للعمل على مشاريع إنشائية ضخمة مع فريق هندسي محترف. التدريب يشمل إدارة المشاريع والإشراف الهندسي.',
    tags: ['هندسة', 'إنشاءات', 'مشاريع'],
    salary: '7,000 جنيه/شهر',
    deadline: '25 يونيو 2026',
    posted: 'منذ أسبوع',
    applicants: 32,
    applied: false,
    url: 'https://www.orascom.com/careers',
  },
  {
    id: 'int-4',
    company: 'فودافون مصر',
    logo: '📱',
    title: 'أخصائي تسويق رقمي',
    location: 'عن بُعد',
    type: 'remote',
    desc: 'تدريب في قسم التسويق الرقمي لمدة 4 أشهر. ستتعلم استراتيجيات التسويق عبر وسائل التواصل الاجتماعي وتحليل الحملات الإعلانية.',
    tags: ['تسويق', 'رقمي', 'عن بُعد'],
    salary: '5,500 جنيه/شهر',
    deadline: '30 يونيو 2026',
    posted: 'منذ 3 أيام',
    applicants: 120,
    applied: false,
    url: 'https://careers.vodafone.com.eg',
  },
  {
    id: 'int-5',
    company: 'شركة IBM مصر',
    logo: '💻',
    title: 'مطور Full Stack - برنامج الخريجين',
    location: 'القاهرة، مصر',
    type: 'hybrid',
    desc: 'برنامج تدريبي مكثف لمدة 6 أشهر يغطي تطوير الويب الكامل باستخدام React وNode.js وقواعد البيانات السحابية.',
    tags: ['Full Stack', 'React', 'Node.js'],
    salary: '9,000 جنيه/شهر',
    deadline: '10 يوليو 2026',
    posted: 'منذ يوم',
    applicants: 67,
    applied: true,
    url: 'https://www.ibm.com/eg-en/employment',
  },
  {
    id: 'int-6',
    company: 'وزارة التربية والتعليم',
    logo: '🎓',
    title: 'معلم متدرب - برنامج المعلمين الجدد',
    location: 'القاهرة، مصر',
    type: 'onsite',
    desc: 'برنامج تدريبي حكومي لمدة سنة كاملة للخريجين الجدد. يشمل تدريب تربوي وتأهيل للتعيين الدائم.',
    tags: ['تعليم', 'حكومي', 'تربوي'],
    salary: '4,500 جنيه/شهر',
    deadline: '15 يوليو 2026',
    posted: 'منذ أسبوعين',
    applicants: 250,
    applied: true,
    url: 'https://moe.gov.eg',
  },
  {
    id: 'int-7',
    company: 'أمازون ويب سيرفيسز',
    logo: '☁️',
    title: 'مهندس حلول سحابية - تدريب',
    location: 'عن بُعد',
    type: 'remote',
    desc: 'تدريب عن بُعد لمدة 3 أشهر في مجال الحوسبة السحابية. ستحصل على شهادات AWS معتمدة وخبرة عملية.',
    tags: ['AWS', 'سحابة', 'شهادات'],
    salary: '10,000 جنيه/شهر',
    deadline: '5 يوليو 2026',
    posted: 'منذ 4 أيام',
    applicants: 89,
    applied: false,
    url: 'https://aws.amazon.com/careers',
  },
  {
    id: 'int-8',
    company: 'شركة أوبر مصر',
    logo: '🚗',
    title: 'محلل عمليات - تدريب',
    location: 'القاهرة، مصر',
    type: 'hybrid',
    desc: 'فرصة للعمل في قسم العمليات وتحليل البيانات. ستتعلم كيفية تحسين الكفاءة التشغيلية باستخدام البيانات.',
    tags: ['عمليات', 'تحليل', 'تقنية'],
    salary: '7,500 جنيه/شهر',
    deadline: '18 يونيو 2026',
    posted: 'منذ 6 أيام',
    applicants: 54,
    applied: false,
    url: 'https://www.uber.com/eg/en/careers',
  },
  {
    id: 'int-9',
    company: 'المصرية للاتصالات WE',
    logo: '📡',
    title: 'مهندس شبكات - برنامج التدريب',
    location: 'القاهرة، مصر',
    type: 'onsite',
    desc: 'برنامج تدريبي متخصص في هندسة الشبكات والاتصالات لمدة 5 أشهر. يشمل شهادات Cisco المعتمدة.',
    tags: ['شبكات', 'اتصالات', 'Cisco'],
    salary: '6,000 جنيه/شهر',
    deadline: '22 يونيو 2026',
    posted: 'منذ أسبوع',
    applicants: 41,
    applied: false,
    url: 'https://te.eg/wps/portal/te/careers',
  },
  {
    id: 'int-10',
    company: 'شركة جوجل - الشرق الأوسط',
    logo: '🔍',
    title: 'مطور Android - تدريب صيفي',
    location: 'دبي، الإمارات',
    type: 'onsite',
    desc: 'تدريب صيفي مدفوع بالكامل في مكاتب جوجل بدبي. ستعمل على تطوير تطبيقات Android باستخدام Kotlin وJetpack Compose.',
    tags: ['Android', 'Kotlin', 'دولي'],
    salary: '$2,500/شهر',
    deadline: '1 يوليو 2026',
    posted: 'منذ 3 أيام',
    applicants: 156,
    applied: false,
    url: 'https://careers.google.com',
  },
  {
    id: 'int-11',
    company: 'البنك الأهلي المصري',
    logo: '🏛️',
    title: 'أخصائي خدمة عملاء - تدريب',
    location: 'القاهرة، مصر',
    type: 'onsite',
    desc: 'برنامج تدريبي في خدمة العملاء والعمليات المصرفية. فرصة للتعيين الدائم بعد انتهاء التدريب.',
    tags: ['خدمة عملاء', 'بنوك', 'تعيين'],
    salary: '5,000 جنيه/شهر',
    deadline: '28 يونيو 2026',
    posted: 'منذ 9 أيام',
    applicants: 98,
    applied: false,
    url: 'https://www.nbe.com.eg/NBE/E/Careers.aspx',
  },
  {
    id: 'int-12',
    company: 'شركة سامسونج مصر',
    logo: '📱',
    title: 'مهندس ضمان جودة - QA Engineer',
    location: 'القاهرة، مصر',
    type: 'hybrid',
    desc: 'تدريب في قسم ضمان الجودة لمدة 4 أشهر. ستتعلم اختبار البرمجيات والأتمتة باستخدام Selenium وJUnit.',
    tags: ['QA', 'اختبار', 'أتمتة'],
    salary: '7,200 جنيه/شهر',
    deadline: '12 يوليو 2026',
    posted: 'منذ يومين',
    applicants: 63,
    applied: false,
    url: 'https://www.samsung.com/eg/about-us/careers',
  },
];

let internshipState = {
  filter: 'all',
  appliedIds: new Set(['int-2', 'int-5', 'int-6']), // IDs of applied internships
  visibleCount: 6,
};

function initInternshipSection() {
  // Only show for graduates
  const section = document.getElementById('internshipSection');
  if (!section) return;
  
  if (STATE.role !== 'خريج') {
    section.style.display = 'none';
    return;
  }
  
  section.style.display = 'block';
  
  // Update stats
  updateInternshipStats();
  
  // Render internships
  renderInternships();
  
  // Setup filter buttons
  setupInternshipFilters();
  
  // Setup load more button
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  loadMoreBtn?.addEventListener('click', () => {
    internshipState.visibleCount += 6;
    renderInternships();
  });
}

function updateInternshipStats() {
  const totalEl = document.getElementById('totalOpportunities');
  const appliedEl = document.getElementById('appliedCount');
  
  if (totalEl) totalEl.textContent = INTERNSHIP_DATA.length;
  if (appliedEl) appliedEl.textContent = internshipState.appliedIds.size;
}

function setupInternshipFilters() {
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      internshipState.filter = chip.dataset.filter;
      internshipState.visibleCount = 6;
      renderInternships();
    });
  });
}

function renderInternships() {
  const grid = document.getElementById('internshipGrid');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  if (!grid) return;
  
  // Filter internships
  let filtered = [...INTERNSHIP_DATA];
  if (internshipState.filter !== 'all') {
    filtered = filtered.filter(int => int.type === internshipState.filter);
  }
  
  // Apply visible count
  const visible = filtered.slice(0, internshipState.visibleCount);
  
  // Render cards
  grid.innerHTML = visible.map(int => {
    const isApplied = internshipState.appliedIds.has(int.id);
    const typeLabels = {
      remote: 'عن بُعد',
      onsite: 'في الموقع',
      hybrid: 'هجين'
    };
    const typeIcons = {
      remote: 'fa-laptop-house',
      onsite: 'fa-building',
      hybrid: 'fa-arrows-split-up-and-left'
    };
    
    return `
      <article class="internship-card ${isApplied ? 'applied' : ''}" data-id="${int.id}">
        <div class="ic-header">
          <div class="ic-logo">${int.logo}</div>
          <div class="ic-info">
            <span class="ic-company">${int.company}</span>
            <h3 class="ic-title">${int.title}</h3>
            <div class="ic-location">
              <i class="fa-solid fa-location-dot"></i>
              <span>${int.location}</span>
            </div>
          </div>
        </div>
        
        <div class="ic-body">
          <p class="ic-desc">${int.desc}</p>
          
          <div class="ic-tags">
            <span class="ic-tag ic-tag-${int.type}">
              <i class="fa-solid ${typeIcons[int.type]}"></i>
              ${typeLabels[int.type]}
            </span>
            ${int.tags.slice(0, 3).map(tag => `<span class="ic-tag">${tag}</span>`).join('')}
          </div>
        </div>
        
        <div class="ic-footer">
          <div class="ic-meta">
            <div class="ic-meta-item">
              <i class="fa-solid fa-money-bill-wave"></i>
              <span>${int.salary}</span>
            </div>
            <div class="ic-meta-item ic-deadline">
              <i class="fa-solid fa-clock"></i>
              <span>${int.deadline}</span>
            </div>
          </div>
          <button class="ic-apply-btn" onclick="applyToInternship('${int.id}')" ${isApplied ? 'disabled' : ''}>
            ${isApplied ? '<i class="fa-solid fa-check"></i> قدمت' : '<i class="fa-solid fa-paper-plane"></i> قدم الآن'}
          </button>
        </div>
      </article>
    `;
  }).join('');
  
  // Show/hide load more button
  if (loadMoreBtn) {
    if (visible.length < filtered.length) {
      loadMoreBtn.style.display = 'inline-flex';
      loadMoreBtn.querySelector('span').textContent = `عرض المزيد (${filtered.length - visible.length} متبقية)`;
    } else {
      loadMoreBtn.style.display = 'none';
    }
  }
  
  // Animate cards
  grid.querySelectorAll('.internship-card').forEach((card, i) => {
    card.style.animationDelay = `${i * 0.05}s`;
  });
}

function applyToInternship(id) {
  const internship = INTERNSHIP_DATA.find(int => int.id === id);
  if (!internship) return;
  
  if (internshipState.appliedIds.has(id)) {
    showToast('لقد قدمت على هذه الفرصة بالفعل', 'info');
    return;
  }
  
  // Simulate application
  internshipState.appliedIds.add(id);
  updateInternshipStats();
  renderInternships();
  
  showToast(`تم التقديم على ${internship.title} بنجاح! 🎉`, 'success', 3500);
  
  // Save to localStorage
  try {
    localStorage.setItem('gc_applied_internships', JSON.stringify([...internshipState.appliedIds]));
  } catch(e) {}
}

// Load applied internships from localStorage
try {
  const saved = localStorage.getItem('gc_applied_internships');
  if (saved) {
    internshipState.appliedIds = new Set(JSON.parse(saved));
  }
} catch(e) {}

