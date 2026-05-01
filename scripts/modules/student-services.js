/* ═══════════════════════════════════════════════════════════════
   SERVICES HUB — ROLE-AWARE MODULE v2
   GradConnect | كلية التربية النوعية
   Roles: طالب | خريج | دكتور
═══════════════════════════════════════════════════════════════ */
'use strict';

/* ═══════════════════════════════════════════════════════════════
   ROLE CONFIG
═══════════════════════════════════════════════════════════════ */
const ROLE_CONFIG = {
  'طالب': {
    heroTitle:  'كل ما تحتاجه <span class="ht-grad">كطالب</span>',
    heroPill:   '✨ منصة خدمات الطلاب',
    heroSub:    'خدمات أكاديمية، امتحانات، تدريب، نماذج وأكثر — مصممة لتسهيل رحلتك التعليمية في كلية التربية النوعية.',
    heroSearch: 'ابحث عن خدمة: جداول، امتحانات، نماذج…',
    stats:      [{ val:'+40', label:'خدمة متاحة' }, { val:'9', label:'تصنيف' }, { val:'24/7', label:'وصول مستمر' }],
    dataKey:    'student'
  },
  'خريج': {
    heroTitle:  'خدمات <span class="ht-grad">الخريجين</span> المتكاملة',
    heroPill:   '🎓 بوابة الخريجين',
    heroSub:    'توثيق الشهادات، شبكة التواصل، فرص العمل، الزمالات والمزيد — كل ما تحتاجه بعد التخرج في مكان واحد.',
    heroSearch: 'ابحث: توثيق شهادة، فرص عمل، زمالات…',
    stats:      [{ val:'+30', label:'خدمة للخريجين' }, { val:'7', label:'تصنيفات' }, { val:'مجاني', label:'للخريجين' }],
    dataKey:    'graduate'
  },
  'دكتور': {
    heroTitle:  'لوحة خدمات <span class="ht-grad">أعضاء هيئة التدريس</span>',
    heroPill:   '👑 بوابة أعضاء هيئة التدريس',
    heroSub:    'إدارة المقررات، نشر الأبحاث، متابعة الطلاب، جداول المحاضرات وأدوات التدريس الإلكتروني.',
    heroSearch: 'ابحث: إدارة مقرر، بحث، جدول…',
    stats:      [{ val:'+35', label:'خدمة أكاديمية' }, { val:'8', label:'أقسام' }, { val:'كلية', label:'التربية النوعية' }],
    dataKey:    'doctor'
  }
};

/* ═══════════════════════════════════════════════════════════════
   SERVICES DATA — STUDENT (طالب)
═══════════════════════════════════════════════════════════════ */
const STUDENT_CATS = [
  { id:'all',          label:'جميع الخدمات',      icon:'⊞' },
  { id:'academic',     label:'الخدمات الأكاديمية', icon:'📖' },
  { id:'exam',         label:'خدمات الامتحانات',   icon:'📋' },
  { id:'affairs',      label:'شؤون الطلاب',        icon:'👥' },
  { id:'training',     label:'التدريب والورش',      icon:'🏆' },
  { id:'elearning',    label:'التعلم الإلكتروني',  icon:'🖥️' },
  { id:'forms',        label:'النماذج والتحميلات', icon:'⬇️' },
  { id:'announcements',label:'الإعلانات',           icon:'📢' },
  { id:'links',        label:'الروابط المهمة',      icon:'🔗' },
];

const STUDENT_SERVICES = [
  // Academic
  { id:'s-ac1', cat:'academic', icon:'📖', ib:'ib-student', title:'الجدول الدراسي', desc:'اطلع على الجدول الدراسي الأسبوعي لجميع الأقسام والفرق الدراسية.', tags:['أكاديمي','جداول'], btn:'عرض الجدول' },
  { id:'s-ac2', cat:'academic', icon:'📜', ib:'ib-student', title:'شهادات القيد والدراسة', desc:'طلب شهادة قيد رسمية أو ما يفيد بالدراسة معتمدة من الكلية.', tags:['أكاديمي','وثائق'], btn:'طلب شهادة' },
  { id:'s-ac3', cat:'academic', icon:'🗂️', ib:'ib-student', title:'السجل الأكاديمي (الترانسكريبت)', desc:'استخراج نسخة رسمية من سجلك الأكاديمي بجميع درجاتك ومقرراتك.', tags:['أكاديمي','درجات'], btn:'طلب الترانسكريبت' },
  { id:'s-ac4', cat:'academic', icon:'📚', ib:'ib-student', title:'المكتبة الإلكترونية', desc:'وصول مباشر لآلاف الكتب والمجلات والمراجع العلمية الرقمية.', tags:['أكاديمي','مكتبة'], btn:'الدخول للمكتبة', outline:true },
  { id:'s-ac5', cat:'academic', icon:'🗺️', ib:'ib-student', title:'خطة الدراسة والمقررات', desc:'تصفح خطة الدراسة وتوزيع المقررات على الفصول الدراسية لكل قسم.', tags:['أكاديمي','مقررات'], btn:'استعراض الخطة', outline:true },
  { id:'s-ac6', cat:'academic', icon:'🔬', ib:'ib-student', title:'حجز المعامل والمختبرات', desc:'حجز جلسات في مختبرات الحاسب والمعامل التخصصية للكلية.', tags:['أكاديمي','حجز'], btn:'حجز موعد' },
  { id:'s-ac7', cat:'academic', icon:'📊', ib:'ib-student', title:'تقييم المقررات والأساتذة', desc:'شارك في استطلاعات تقييم جودة التدريس وتطوير العملية التعليمية.', tags:['أكاديمي','تقييم'], btn:'تقييم الآن', outline:true },
  { id:'s-ac8', cat:'academic', icon:'🎓', ib:'ib-student', title:'شروط التخرج والمتطلبات', desc:'تحقق من متطلبات التخرج والساعات المعتمدة المطلوبة لحصولك على الدرجة.', tags:['أكاديمي','تخرج'], btn:'استعراض', outline:true },
  // Exams
  { id:'s-ex1', cat:'exam', icon:'📋', ib:'ib-exam', title:'جداول الامتحانات', desc:'الاطلاع على مواعيد امتحانات نهاية الفصل الدراسي وخرائط لجان الامتحانات.', tags:['امتحانات','جداول'], btn:'عرض الجدول' },
  { id:'s-ex2', cat:'exam', icon:'📝', ib:'ib-exam', title:'تسجيل الامتحانات', desc:'سجّل في امتحانات الفصل الدراسي وتأكد من تأهلك واستيفاء متطلبات الحضور.', tags:['امتحانات','تسجيل'], btn:'تسجيل الآن' },
  { id:'s-ex3', cat:'exam', icon:'✅', ib:'ib-exam', title:'نتائج الامتحانات', desc:'استعرض نتائجك ودرجاتك بعد الإعلان الرسمي عنها من إدارة الامتحانات.', tags:['امتحانات','نتائج'], btn:'عرض النتائج' },
  { id:'s-ex4', cat:'exam', icon:'🔁', ib:'ib-exam', title:'طلب إعادة الفحص', desc:'تقدم بطلب رسمي لإعادة فحص ورقة إجابتك خلال المدة المحددة بعد الإعلان.', tags:['امتحانات','تظلمات'], btn:'تقديم طلب', outline:true },
  { id:'s-ex5', cat:'exam', icon:'🪪', ib:'ib-exam', title:'كارنيه الامتحانات', desc:'استخراج وطباعة ورقة الجلوس والكارنيه الخاص بامتحانات هذا الفصل.', tags:['امتحانات','وثائق'], btn:'طباعة الكارنيه' },
  { id:'s-ex6', cat:'exam', icon:'📅', ib:'ib-exam', title:'امتحانات التحسين', desc:'تعرف على شروط وإجراءات الالتحاق بامتحانات تحسين الدرجات للمواد السابقة.', tags:['امتحانات','تحسين'], btn:'التفاصيل', outline:true },
  // Affairs
  { id:'s-sa1', cat:'affairs', icon:'👥', ib:'ib-affairs', title:'الاتحاد الطلابي', desc:'تعرف على أعضاء الاتحاد الطلابي للكلية وأنشطته وكيفية التواصل معهم.', tags:['شؤون','اتحاد'], btn:'التواصل' },
  { id:'s-sa2', cat:'affairs', icon:'🏅', ib:'ib-affairs', title:'الأنشطة الطلابية', desc:'سجّل في الأنشطة الثقافية والاجتماعية والرياضية التي تنظمها الكلية.', tags:['شؤون','أنشطة'], btn:'استعراض' },
  { id:'s-sa3', cat:'affairs', icon:'💰', ib:'ib-affairs', title:'المنح والإعانات', desc:'تقدم للحصول على المنح الدراسية والإعانات المالية المتاحة لطلاب الكلية.', tags:['شؤون','منح'], btn:'التقديم' },
  { id:'s-sa4', cat:'affairs', icon:'🏥', ib:'ib-affairs', title:'الخدمات الصحية', desc:'تعرف على الخدمات الطبية والتأمين الصحي الطلابي المتاح للطلاب المقيدين.', tags:['شؤون','صحة'], btn:'معرفة المزيد', outline:true },
  { id:'s-sa5', cat:'affairs', icon:'📞', ib:'ib-affairs', title:'الإرشاد الأكاديمي', desc:'تواصل مع المرشد الأكاديمي لاستفساراتك الدراسية ووضع خطة مستقبلية.', tags:['شؤون','إرشاد'], btn:'حجز جلسة' },
  // Training
  { id:'s-tr1', cat:'training', icon:'🏆', ib:'ib-training', title:'التدريب الميداني', desc:'سجّل في برنامج التدريب الميداني الإلزامي وتعرف على متطلباته وشروطه.', tags:['تدريب','ميداني'], btn:'التسجيل' },
  { id:'s-tr2', cat:'training', icon:'💼', ib:'ib-training', title:'فرص التدريب الصيفي', desc:'تصفح فرص التدريب الصيفي في المؤسسات والشركات الشريكة للكلية.', tags:['تدريب','صيفي'], btn:'استعراض الفرص' },
  { id:'s-tr3', cat:'training', icon:'🎓', ib:'ib-training', title:'الدورات التدريبية', desc:'سجّل في ورش العمل والدورات التدريبية المعتمدة التي تنظمها الكلية.', tags:['تدريب','دورات'], btn:'عرض الدورات' },
  { id:'s-tr4', cat:'training', icon:'📜', ib:'ib-training', title:'شهادات ICDL', desc:'التقدم لامتحانات ICDL لاعتماد كفاءتك في مجال تكنولوجيا المعلومات.', tags:['تدريب','ICDL'], btn:'التقديم' },
  { id:'s-tr5', cat:'training', icon:'🌐', ib:'ib-training', title:'برامج التبادل الدولي', desc:'تعرف على برامج التبادل الدولي والزمالات الأكاديمية المتاحة للطلاب.', tags:['تدريب','دولي'], btn:'التفاصيل', outline:true },
  // E-Learning
  { id:'s-el1', cat:'elearning', icon:'🖥️', ib:'ib-elearn', title:'منصة Moodle', desc:'الوصول إلى محتوى المقررات والواجبات والمحاضرات المسجلة عبر المنصة التعليمية.', tags:['إلكتروني','Moodle'], btn:'الدخول للمنصة' },
  { id:'s-el2', cat:'elearning', icon:'🎥', ib:'ib-elearn', title:'المحاضرات المسجلة', desc:'مكتبة شاملة من المحاضرات والفيديوهات التعليمية لجميع المقررات.', tags:['إلكتروني','فيديو'], btn:'مشاهدة' },
  { id:'s-el3', cat:'elearning', icon:'💻', ib:'ib-elearn', title:'الاختبارات الإلكترونية', desc:'تأدية الاختبارات والكويزات الإلكترونية لمتابعة مستواك الدراسي.', tags:['إلكتروني','اختبارات'], btn:'الدخول' },
  { id:'s-el4', cat:'elearning', icon:'📱', ib:'ib-elearn', title:'تطبيق الكلية', desc:'حمّل التطبيق الرسمي للكلية للوصول الفوري للخدمات من هاتفك.', tags:['إلكتروني','تطبيق'], btn:'التحميل' },
  { id:'s-el5', cat:'elearning', icon:'🔐', ib:'ib-elearn', title:'البريد الجامعي', desc:'استخراج بيانات وتفعيل بريدك الإلكتروني الجامعي الرسمي.', tags:['إلكتروني','بريد'], btn:'تفعيل الحساب', outline:true },
  // Forms
  { id:'s-fo1', cat:'forms', icon:'📄', ib:'ib-forms', title:'استمارة التقديم', desc:'تحميل استمارة التقديم الرسمية للخدمات المختلفة من إدارة الكلية.', tags:['نماذج','تحميل'], btn:'تحميل' },
  { id:'s-fo2', cat:'forms', icon:'📋', ib:'ib-forms', title:'نموذج تغيير بيانات', desc:'طلب تعديل أو تحديث بياناتك الشخصية في سجلات الكلية الرسمية.', tags:['نماذج','تعديل'], btn:'تحميل' },
  { id:'s-fo3', cat:'forms', icon:'🔄', ib:'ib-forms', title:'نموذج التحويل بين الأقسام', desc:'استمارة طلب التحويل من قسم دراسي لآخر وفق شروط القبول المحددة.', tags:['نماذج','تحويل'], btn:'تحميل' },
  { id:'s-fo4', cat:'forms', icon:'🚫', ib:'ib-forms', title:'نموذج الانسحاب والإجازة', desc:'نموذج طلب الانسحاب المؤقت أو الإجازة الدراسية بالأسباب المقبولة.', tags:['نماذج','إجراءات'], btn:'تحميل', outline:true },
  { id:'s-fo5', cat:'forms', icon:'📥', ib:'ib-forms', title:'لوائح وقوانين الكلية', desc:'تحميل اللائحة الداخلية للكلية ونظام الساعات المعتمدة وقوانين الغياب.', tags:['نماذج','لوائح'], btn:'تحميل' },
  { id:'s-fo6', cat:'forms', icon:'📬', ib:'ib-forms', title:'نموذج تقديم شكوى', desc:'تقديم شكوى رسمية للإدارة بطريقة منظمة وضمان متابعتها حتى الحل.', tags:['نماذج','شكاوى'], btn:'تقديم', outline:true },
  { id:'s-fo7', cat:'forms', icon:'🖨️', ib:'ib-forms', title:'طباعة وثائق الكلية', desc:'طلب طباعة أي وثيقة رسمية أو ختمها بالختم الرسمي للكلية.', tags:['نماذج','طباعة'], btn:'طلب طباعة' },
  // Announcements
  { id:'s-an1', cat:'announcements', icon:'📢', ib:'ib-announce', title:'لوحة الإعلانات', desc:'جميع إعلانات وإشعارات الكلية الرسمية في مكان واحد محدّث باستمرار.', tags:['إعلانات','أخبار'], btn:'عرض الكل' },
  { id:'s-an2', cat:'announcements', icon:'📰', ib:'ib-announce', title:'النشرة الإخبارية', desc:'اشترك في النشرة الدورية لاستقبال آخر الأخبار والفعاليات والمستجدات.', tags:['إعلانات','نشرة'], btn:'اشتراك', outline:true },
  // Links
  { id:'s-li1', cat:'links', icon:'🔗', ib:'ib-links', title:'بوابة الجامعة الإلكترونية', desc:'الدخول لبوابة جامعة بنها الرسمية والوصول لجميع خدمات الجامعة المركزية.', tags:['روابط','جامعة'], btn:'الانتقال' },
  { id:'s-li2', cat:'links', icon:'🌐', ib:'ib-links', title:'الروابط الخارجية المهمة', desc:'روابط حيوية: وزارة التعليم، هيئة الاعتماد، المنح والفرص الخارجية.', tags:['روابط','خارجية'], btn:'استعراض', outline:true },
];

/* ═══════════════════════════════════════════════════════════════
   SERVICES DATA — GRADUATE (خريج)
═══════════════════════════════════════════════════════════════ */
const GRADUATE_CATS = [
  { id:'all',         label:'جميع الخدمات',        icon:'⊞' },
  { id:'docs',        label:'توثيق الشهادات',       icon:'📜' },
  { id:'jobs',        label:'فرص العمل والتوظيف',   icon:'💼' },
  { id:'network',     label:'شبكة الخريجين',        icon:'🌐' },
  { id:'research',    label:'الأبحاث والنشر',        icon:'🔬' },
  { id:'fellowship',  label:'الزمالات والمنح',       icon:'🏆' },
  { id:'support',     label:'الدعم والإرشاد',        icon:'📞' },
  { id:'links',       label:'الروابط المهمة',        icon:'🔗' },
];

const GRADUATE_SERVICES = [
  // Docs
  { id:'g-do1', cat:'docs', icon:'📜', ib:'ib-grad', title:'توثيق شهادة التخرج', desc:'استخراج وتوثيق شهادة التخرج الرسمية من الكلية ومعادلتها عند الحاجة.', tags:['توثيق','شهادة'], btn:'طلب التوثيق' },
  { id:'g-do2', cat:'docs', icon:'🗂️', ib:'ib-grad', title:'السجل الأكاديمي للخريج', desc:'استخراج نسخة رسمية من سجلك الأكاديمي الكامل بعد التخرج.', tags:['توثيق','ترانسكريبت'], btn:'طلب النسخة' },
  { id:'g-do3', cat:'docs', icon:'🪪', ib:'ib-grad', title:'بطاقة الخريج', desc:'استخراج بطاقة هوية الخريج الرسمية للاستفادة من خدمات ومزايا الخريجين.', tags:['توثيق','بطاقة'], btn:'استخراج' },
  { id:'g-do4', cat:'docs', icon:'📋', ib:'ib-grad', title:'شهادة الخبرة الأكاديمية', desc:'الحصول على شهادة تفيد بخبرتك الأكاديمية وسنوات الدراسة في الكلية.', tags:['توثيق','خبرة'], btn:'طلب الشهادة', outline:true },
  // Jobs
  { id:'g-jo1', cat:'jobs', icon:'💼', ib:'ib-grad', title:'فرص العمل الحصرية', desc:'تصفح فرص العمل المتاحة حصراً لخريجي كلية التربية النوعية من الشركات الشريكة.', tags:['توظيف','فرص'], btn:'استعراض الفرص' },
  { id:'g-jo2', cat:'jobs', icon:'📄', ib:'ib-grad', title:'إنشاء وتحديث السيرة الذاتية', desc:'أدوات ذكية لإنشاء سيرة ذاتية احترافية تناسب سوق العمل في مجالك.', tags:['توظيف','CV'], btn:'إنشاء CV' },
  { id:'g-jo3', cat:'jobs', icon:'🏢', ib:'ib-grad', title:'التواصل مع أصحاب العمل', desc:'تواصل مباشر مع المؤسسات والشركات الشريكة للكلية لعرض ملفك المهني.', tags:['توظيف','تواصل'], btn:'تواصل' },
  { id:'g-jo4', cat:'jobs', icon:'📊', ib:'ib-grad', title:'إحصائيات سوق العمل', desc:'تقارير وتحليلات لسوق العمل في مجال التربية والتعليم والتخصصات المرتبطة.', tags:['توظيف','تحليلات'], btn:'عرض التقارير', outline:true },
  // Network
  { id:'g-ne1', cat:'network', icon:'🌐', ib:'ib-grad', title:'مجتمع الخريجين Alumni', desc:'انضم لشبكة خريجي الكلية للتواصل المهني وتبادل الخبرات والفرص.', tags:['مجتمع','تواصل'], btn:'الانضمام' },
  { id:'g-ne2', cat:'network', icon:'👥', ib:'ib-grad', title:'اللقاءات السنوية للخريجين', desc:'احضر الملتقيات والفعاليات السنوية لخريجي الكلية والتواصل مع الزملاء.', tags:['مجتمع','فعاليات'], btn:'التسجيل' },
  { id:'g-ne3', cat:'network', icon:'🤝', ib:'ib-grad', title:'برنامج إرشاد الطلاب', desc:'شارك كمرشد متطوع لمساعدة الطلاب الحاليين بخبرتك المهنية.', tags:['مجتمع','إرشاد'], btn:'التطوع', outline:true },
  { id:'g-ne4', cat:'network', icon:'🎨', ib:'ib-grad', title:'معرض أعمال الخريجين', desc:'اعرض أعمالك ومشاريعك الإبداعية ضمن معرض خريجي الكلية الإلكتروني.', tags:['مجتمع','portfolio'], btn:'عرض أعمالي' },
  // Research
  { id:'g-re1', cat:'research', icon:'🔬', ib:'ib-grad', title:'نشر الأبحاث العلمية', desc:'الإرشاد حول نشر أبحاثك في المجلات العلمية المحكمة وقواعد البيانات.', tags:['بحث','نشر'], btn:'معرفة المزيد' },
  { id:'g-re2', cat:'research', icon:'📚', ib:'ib-grad', title:'الوصول للمكتبة الأكاديمية', desc:'يحتفظ الخريجون بصلاحية الوصول للمكتبة الإلكترونية والمراجع الأكاديمية.', tags:['بحث','مكتبة'], btn:'الدخول', outline:true },
  { id:'g-re3', cat:'research', icon:'🎓', ib:'ib-grad', title:'الدراسات العليا والماجستير', desc:'معلومات شاملة للتقديم لبرامج الماجستير والدكتوراه في الكلية والجامعات المرتبطة.', tags:['بحث','دراسات عليا'], btn:'استكشاف البرامج' },
  // Fellowship
  { id:'g-fe1', cat:'fellowship', icon:'🏆', ib:'ib-grad', title:'الزمالات الأكاديمية', desc:'تصفح فرص الزمالات الأكاديمية الداخلية والخارجية المتاحة لخريجي الكلية.', tags:['زمالات','فرص'], btn:'استعراض' },
  { id:'g-fe2', cat:'fellowship', icon:'💰', ib:'ib-grad', title:'المنح الدراسية للخريجين', desc:'تعرف على المنح الدراسية المتاحة لاستكمال الدراسات العليا محلياً ودولياً.', tags:['منح','دراسات'], btn:'التقديم' },
  { id:'g-fe3', cat:'fellowship', icon:'🌍', ib:'ib-grad', title:'برامج التبادل الدولي', desc:'فرص للانضمام لبرامج تبادل دولية وزيارات أكاديمية للجامعات الشريكة.', tags:['زمالات','دولي'], btn:'التفاصيل', outline:true },
  // Support
  { id:'g-su1', cat:'support', icon:'📞', ib:'ib-grad', title:'مكتب خدمات الخريجين', desc:'تواصل مباشر مع مكتب شؤون الخريجين لأي استفسار أو مساعدة تحتاجها.', tags:['دعم','تواصل'], btn:'تواصل' },
  { id:'g-su2', cat:'support', icon:'📋', ib:'ib-grad', title:'استطلاع خريجي الكلية', desc:'شارك في الاستطلاع السنوي لرصد مسارات الخريجين وتطوير البرامج الأكاديمية.', tags:['دعم','استطلاع'], btn:'المشاركة', outline:true },
  // Links
  { id:'g-li1', cat:'links', icon:'🔗', ib:'ib-links', title:'بوابة الخريجين الرسمية', desc:'الوصول لبوابة جامعة بنها الرسمية المخصصة لخريجيها وخدماتها.', tags:['روابط','جامعة'], btn:'الانتقال' },
  { id:'g-li2', cat:'links', icon:'🌐', ib:'ib-links', title:'فرص ومنظمات دولية', desc:'روابط لمنظمات دولية تقدم فرص عمل وزمالات في مجالات التربية والتعليم.', tags:['روابط','دولي'], btn:'استعراض', outline:true },
];

/* ═══════════════════════════════════════════════════════════════
   SERVICES DATA — DOCTOR (دكتور)
═══════════════════════════════════════════════════════════════ */
const DOCTOR_CATS = [
  { id:'all',        label:'جميع الخدمات',        icon:'⊞' },
  { id:'courses',    label:'إدارة المقررات',        icon:'📖' },
  { id:'research',   label:'البحث العلمي',          icon:'🔬' },
  { id:'students',   label:'متابعة الطلاب',         icon:'👥' },
  { id:'schedule',   label:'الجداول والمحاضرات',    icon:'📅' },
  { id:'etools',     label:'أدوات التدريس الإلكتروني', icon:'🖥️' },
  { id:'admin',      label:'الإدارة الأكاديمية',    icon:'📋' },
  { id:'links',      label:'الروابط المهمة',         icon:'🔗' },
];

const DOCTOR_SERVICES = [
  // Courses
  { id:'d-co1', cat:'courses', icon:'📖', ib:'ib-doctor', title:'إدارة محتوى المقررات', desc:'رفع وتنظيم محتوى المقررات الدراسية على منصة التعلم الإلكترونية للكلية.', tags:['مقررات','محتوى'], btn:'إدارة المقررات' },
  { id:'d-co2', cat:'courses', icon:'📊', ib:'ib-doctor', title:'رصد الدرجات والغيابات', desc:'تسجيل درجات الطلاب وتحديث سجلات الحضور والغياب بشكل دوري ومنظم.', tags:['مقررات','درجات'], btn:'رصد الدرجات' },
  { id:'d-co3', cat:'courses', icon:'📋', ib:'ib-doctor', title:'إعداد الاختبارات والتكليفات', desc:'إنشاء الاختبارات والواجبات وتكليفات البحث للطلاب وإدارة مواعيد تسليمها.', tags:['مقررات','اختبارات'], btn:'إنشاء اختبار' },
  { id:'d-co4', cat:'courses', icon:'📝', ib:'ib-doctor', title:'توصيف المقرر الدراسي', desc:'إعداد وتحديث توصيف المقرر الدراسي وفق المعايير الأكاديمية المعتمدة.', tags:['مقررات','توصيف'], btn:'عرض التوصيف', outline:true },
  { id:'d-co5', cat:'courses', icon:'📚', ib:'ib-doctor', title:'قائمة المراجع والكتب', desc:'تحديث وإدارة قائمة الكتب والمراجع المقررة على الطلاب في كل مقرر.', tags:['مقررات','مراجع'], btn:'تحديث القائمة', outline:true },
  // Research
  { id:'d-re1', cat:'research', icon:'🔬', ib:'ib-doctor', title:'نشر الأبحاث والدراسات', desc:'إرشادات وخطوات نشر أبحاثك في المجلات العلمية المحكمة والمؤتمرات الدولية.', tags:['بحث','نشر'], btn:'إرشادات النشر' },
  { id:'d-re2', cat:'research', icon:'💰', ib:'ib-doctor', title:'تمويل الأبحاث والمشاريع', desc:'تقديم طلبات التمويل للأبحاث العلمية من الجامعة والجهات الممولة الخارجية.', tags:['بحث','تمويل'], btn:'تقديم طلب' },
  { id:'d-re3', cat:'research', icon:'🏛️', ib:'ib-doctor', title:'المؤتمرات الأكاديمية', desc:'معلومات عن المؤتمرات العلمية المحلية والدولية في مجالات التربية والتعليم.', tags:['بحث','مؤتمرات'], btn:'استعراض', outline:true },
  { id:'d-re4', cat:'research', icon:'📰', ib:'ib-doctor', title:'المجلة العلمية للكلية', desc:'إرشادات وشروط النشر في المجلة العلمية المحكمة لكلية التربية النوعية.', tags:['بحث','مجلة'], btn:'شروط النشر', outline:true },
  // Students
  { id:'d-st1', cat:'students', icon:'👥', ib:'ib-doctor', title:'سجلات الطلاب', desc:'الاطلاع على البيانات الأكاديمية لطلاب مقرراتك ومتابعة مستوياتهم الدراسية.', tags:['طلاب','سجلات'], btn:'عرض السجلات' },
  { id:'d-st2', cat:'students', icon:'📞', ib:'ib-doctor', title:'التواصل مع الطلاب', desc:'أرسل إشعارات وتنبيهات مباشرة لطلابك عبر المنصة بشكل منظم وفعّال.', tags:['طلاب','تواصل'], btn:'إرسال رسالة' },
  { id:'d-st3', cat:'students', icon:'🎓', ib:'ib-doctor', title:'الإشراف على رسائل التخرج', desc:'إدارة ملفات الطلاب تحت إشرافك ومتابعة مراحل إعداد رسائل التخرج.', tags:['طلاب','إشراف'], btn:'عرض الملفات' },
  { id:'d-st4', cat:'students', icon:'⚠️', ib:'ib-doctor', title:'تنبيهات الطلاب في خطر', desc:'قائمة بالطلاب الذين يحتاجون إلى متابعة أكاديمية مكثفة بسبب تدني الأداء.', tags:['طلاب','متابعة'], btn:'عرض القائمة', outline:true },
  // Schedule
  { id:'d-sc1', cat:'schedule', icon:'📅', ib:'ib-doctor', title:'جدول المحاضرات', desc:'اطلع على جدولك الدراسي الأسبوعي وقاعات المحاضرات المخصصة لمقرراتك.', tags:['جدول','محاضرات'], btn:'عرض الجدول' },
  { id:'d-sc2', cat:'schedule', icon:'📝', ib:'ib-doctor', title:'جدول إشراف الامتحانات', desc:'مواعيد لجان الامتحانات التي كُلِّفت بالإشراف عليها خلال الفصل الدراسي.', tags:['جدول','امتحانات'], btn:'عرض الجدول' },
  { id:'d-sc3', cat:'schedule', icon:'🏢', ib:'ib-doctor', title:'حجز قاعات ومعامل', desc:'حجز القاعات الدراسية والمعامل التخصصية لمحاضراتك وأنشطتك الأكاديمية.', tags:['جدول','حجز'], btn:'حجز قاعة', outline:true },
  // E-Tools
  { id:'d-et1', cat:'etools', icon:'🖥️', ib:'ib-doctor', title:'منصة Moodle للمدرسين', desc:'إدارة المقررات الإلكترونية ورفع المواد ومتابعة نشاط الطلاب على المنصة.', tags:['إلكتروني','Moodle'], btn:'الدخول للمنصة' },
  { id:'d-et2', cat:'etools', icon:'🎥', ib:'ib-doctor', title:'تسجيل المحاضرات المرئية', desc:'إرشادات تقنية لتسجيل المحاضرات ورفعها على منصة التعلم الإلكتروني للكلية.', tags:['إلكتروني','تسجيل'], btn:'إرشادات', outline:true },
  { id:'d-et3', cat:'etools', icon:'📊', ib:'ib-doctor', title:'تحليلات أداء الطلاب', desc:'تقارير ورسوم بيانية تفصيلية لأداء الطلاب ومعدلات النجاح في مقرراتك.', tags:['إلكتروني','تحليلات'], btn:'عرض التقارير' },
  // Admin
  { id:'d-ad1', cat:'admin', icon:'📋', ib:'ib-doctor', title:'طلبات الإجازات والأذونات', desc:'تقديم طلبات الإجازة الرسمية ومتابعة حالة الطلبات المقدمة لإدارة الكلية.', tags:['إدارة','إجازات'], btn:'تقديم طلب' },
  { id:'d-ad2', cat:'admin', icon:'🏛️', ib:'ib-doctor', title:'اجتماعات مجلس الكلية', desc:'مواعيد واجندات اجتماعات مجلس الكلية والأقسام والمحاضر الرسمية.', tags:['إدارة','اجتماعات'], btn:'الاطلاع', outline:true },
  { id:'d-ad3', cat:'admin', icon:'📜', ib:'ib-doctor', title:'اللوائح والتعليمات الأكاديمية', desc:'نسخ محدّثة من اللوائح الأكاديمية وتعليمات الاعتماد المؤسسي للكلية.', tags:['إدارة','لوائح'], btn:'تحميل', outline:true },
  // Links
  { id:'d-li1', cat:'links', icon:'🔗', ib:'ib-links', title:'البوابة الأكاديمية للجامعة', desc:'الوصول لبوابة جامعة بنها الإلكترونية وخدماتها لأعضاء هيئة التدريس.', tags:['روابط','جامعة'], btn:'الانتقال' },
  { id:'d-li2', cat:'links', icon:'🌐', ib:'ib-links', title:'قواعد البيانات الأكاديمية', desc:'روابط لقواعد البيانات والمجلات العلمية العالمية المتاحة عبر الجامعة.', tags:['روابط','أبحاث'], btn:'استعراض', outline:true },
];

/* ═══════════════════════════════════════════════════════════════
   FAQ — PER ROLE
═══════════════════════════════════════════════════════════════ */
const FAQS = {
  'طالب': [
    { q:'كيف أحصل على شهادة قيد رسمية؟', a:'تقدم بطلب عبر قسم شؤون الطلاب أو من خلال الخدمات الأكاديمية في المنصة. تستغرق العملية عادةً 3-5 أيام عمل.' },
    { q:'متى يفتح باب تسجيل الامتحانات؟', a:'يفتح قبل أسبوعين من الامتحانات. ستصلك إشعارات تلقائية على المنصة عند فتح التسجيل.' },
    { q:'كيف أتقدم للمنحة الدراسية؟', a:'استوفِ النماذج المطلوبة في قسم شؤون الطلاب مع المستندات المطلوبة. الموعد النهائي عادةً أول أسبوعين من الفصل.' },
    { q:'هل يمكنني تغيير قسمي الدراسي؟', a:'نعم، بشروط: اجتياز سنة كاملة، الحصول على الحد الأدنى للمجموع، وتوافر أماكن في القسم الجديد.' },
    { q:'كيف أحصل على بريدي الجامعي؟', a:'توجه لمعمل الحاسب بصورة بطاقتك وكارنيه الكلية. يتم التفعيل فوراً.' },
    { q:'ما ساعات الإرشاد الأكاديمي؟', a:'الأحد والثلاثاء والخميس من 10 ص حتى 2 ظهراً. يمكنك حجز موعد إلكتروني عبر المنصة.' },
  ],
  'خريج': [
    { q:'كيف أوثق شهادتي بعد التخرج؟', a:'تقدم بطلب عبر مكتب شؤون الخريجين بصورة من الشهادة وبطاقة الهوية، وسيتم التوثيق خلال أسبوع عمل.' },
    { q:'هل يمكنني الوصول للمكتبة الإلكترونية بعد التخرج؟', a:'نعم، يحتفظ الخريجون بصلاحية الوصول للمكتبة الإلكترونية لمدة سنة بعد التخرج، وقابلة للتجديد.' },
    { q:'كيف أنضم لشبكة خريجي الكلية؟', a:'سجّل بياناتك عبر بوابة الخريجين أو تواصل مع مكتب الخريجين مباشرة للحصول على بيانات الوصول.' },
    { q:'هل توجد فرص وظيفية حصرية للخريجين؟', a:'نعم، تتعاون الكلية مع شركات ومؤسسات شريكة لتوفير فرص حصرية لخريجيها. تصفح قسم فرص العمل للتفاصيل.' },
    { q:'كيف أتقدم لبرامج الدراسات العليا؟', a:'يمكنك التقديم للماجستير بعد التخرج مباشرة. تواصل مع قسم الدراسات العليا بالكلية للحصول على شروط القبول.' },
  ],
  'دكتور': [
    { q:'كيف أضيف محتوى لمقرري على Moodle؟', a:'ادخل لمنصة Moodle بحسابك الأكاديمي، اختر المقرر ثم "إضافة نشاط أو مورد". فريق الدعم التقني متاح للمساعدة.' },
    { q:'كيف أقدم بحثي للنشر في المجلة العلمية للكلية؟', a:'أرسل بحثك وفق شروط النشر المتاحة في قسم المجلة العلمية. يتم المراجعة خلال 4-6 أسابيع.' },
    { q:'ما إجراءات طلب الإجازة الرسمية؟', a:'قدّم طلبك إلكترونياً عبر قسم الإدارة الأكاديمية قبل 30 يوماً من الإجازة مع المستندات المطلوبة.' },
    { q:'كيف أحجز قاعة لمحاضرة إضافية؟', a:'استخدم نظام حجز القاعات المتاح في قسم الجداول والمحاضرات وحدد الموعد والمتطلبات التقنية.' },
    { q:'هل يمكنني الاطلاع على سجلات جميع طلابي؟', a:'نعم، يمكنك الاطلاع على السجلات الأكاديمية لطلاب مقرراتك فقط عبر قسم متابعة الطلاب.' },
  ],
};

/* ═══════════════════════════════════════════════════════════════
   STATE
═══════════════════════════════════════════════════════════════ */
const state = {
  role: 'طالب',
  activeCat: 'all',
  query: '',
  view: 'grid',
  notifOpen: false,
};

/* helpers */
const $ = id => document.getElementById(id);
function esc(str) { const d = document.createElement('div'); d.textContent = str; return d.innerHTML; }

/* ── ROLE DATA ACCESSORS ─────────────────────────────────────── */
function getCats()     { return state.role === 'خريج' ? GRADUATE_CATS  : state.role === 'دكتور' ? DOCTOR_CATS  : STUDENT_CATS;  }
function getServices() { return state.role === 'خريج' ? GRADUATE_SERVICES : state.role === 'دكتور' ? DOCTOR_SERVICES : STUDENT_SERVICES; }
function getFaqs()     { return FAQS[state.role] || FAQS['طالب']; }

/* ═══════════════════════════════════════════════════════════════
   APPLY ROLE THEME
═══════════════════════════════════════════════════════════════ */
function applyRole(role) {
  state.role = role;
  document.documentElement.setAttribute('data-role', role);

  /* Role badge */
  const badge = $('roleBadge');
  if (badge) {
    const labels = { 'طالب':'طالب', 'خريج':'خريج', 'دكتور':'دكتور / أستاذ' };
    badge.innerHTML = `<span class="rb-dot"></span>${esc(labels[role] || role)}`;
  }

  /* Page title */
  const t = $('topbarTitle');
  if (t) t.textContent = role === 'دكتور' ? 'لوحة أعضاء هيئة التدريس' : role === 'خريج' ? 'بوابة الخريجين' : 'خدمات الطلاب';

  /* Hero */
  const cfg = ROLE_CONFIG[role] || ROLE_CONFIG['طالب'];
  const ht = $('heroTitle');
  if (ht) ht.innerHTML = cfg.heroTitle;
  const hp = $('heroPill');
  if (hp) hp.textContent = cfg.heroPill;
  const hs = $('heroSub');
  if (hs) hs.textContent = cfg.heroSub;
  const hsi = $('heroSearchInput');
  if (hsi) hsi.placeholder = cfg.heroSearch;

  /* Stats */
  const statsEl = $('heroStats');
  if (statsEl) {
    statsEl.innerHTML = cfg.stats.map((s, i) => `
      ${i > 0 ? '<div class="hero-stat-div"></div>' : ''}
      <div class="hero-stat"><strong>${esc(s.val)}</strong><span>${esc(s.label)}</span></div>
    `).join('');
  }

  /* Mini progress — role-specific labels */
  renderMiniProgress(role);

  /* Re-render everything */
  state.activeCat = 'all';
  state.query = '';
  const si = $('searchInput');
  if (si) si.value = '';
  const hi = $('heroSearchInput');
  if (hi) hi.value = '';

  renderCats();
  renderServices();
  renderFAQ();
}

/* ═══════════════════════════════════════════════════════════════
   MINI PROGRESS
═══════════════════════════════════════════════════════════════ */
function renderMiniProgress(role) {
  const el = $('miniProgress');
  if (!el) return;

  const data = {
    'طالب': [
      { label:'إنجاز المقررات', val:'72%' },
      { label:'ساعات التدريب',  val:'45%' },
      { label:'نسبة الحضور',    val:'88%' },
    ],
    'خريج': [
      { label:'اكتمال الملف المهني', val:'60%' },
      { label:'التواصل الشبكي',      val:'40%' },
      { label:'طلبات التوظيف',       val:'25%' },
    ],
    'دكتور': [
      { label:'نشر الأبحاث',      val:'55%' },
      { label:'رصد الدرجات',      val:'80%' },
      { label:'تقييم الطلاب',     val:'90%' },
    ],
  };

  const rows = data[role] || data['طالب'];
  el.innerHTML = `<h4>نظرة سريعة</h4>` + rows.map(r => `
    <div class="mp-row">
      <div class="mp-top"><span>${esc(r.label)}</span><span>${esc(r.val)}</span></div>
      <div class="mp-bar"><div class="mp-fill" style="--w:${r.val}"></div></div>
    </div>
  `).join('');
}

/* ═══════════════════════════════════════════════════════════════
   RENDER CATEGORIES
═══════════════════════════════════════════════════════════════ */
function renderCats() {
  const cats = getCats();
  const svcs = getServices();
  const countMap = {};
  svcs.forEach(s => { countMap[s.cat] = (countMap[s.cat] || 0) + 1; });

  function buildItems(listEl) {
    if (!listEl) return;
    listEl.innerHTML = cats.map(c => {
      const count = c.id === 'all' ? svcs.length : (countMap[c.id] || 0);
      return `
        <li class="cat-item${c.id === state.activeCat ? ' active' : ''}"
            data-cat="${esc(c.id)}" role="tab"
            aria-selected="${c.id === state.activeCat}"
            tabindex="0">
          <span class="ci-icon">${c.icon}</span>
          <span class="ci-label">${esc(c.label)}</span>
          <span class="ci-count">${count}</span>
        </li>`;
    }).join('');

    listEl.querySelectorAll('.cat-item').forEach(item => {
      item.addEventListener('click', () => selectCat(item.dataset.cat));
      item.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectCat(item.dataset.cat); }
      });
    });
  }

  buildItems($('catList'));
  buildItems($('catListMobile'));

  /* Update result count label & active cat name */
  updateFilterBar();
}

function selectCat(cat) {
  state.activeCat = cat;
  const cats = getCats();
  const found = cats.find(c => c.id === cat);

  /* Sync active state */
  ['catList', 'catListMobile'].forEach(id => {
    const list = $(id);
    if (!list) return;
    list.querySelectorAll('.cat-item').forEach(i => {
      const isActive = i.dataset.cat === cat;
      i.classList.toggle('active', isActive);
      i.setAttribute('aria-selected', String(isActive));
    });
  });

  updateFilterBar();
  renderServices();

  if (window.innerWidth < 1100) {
    const layout = $('servicesLayout');
    if (layout) layout.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function updateFilterBar() {
  const cats   = getCats();
  const svcs   = getFilteredServices();
  const found  = cats.find(c => c.id === state.activeCat);
  const nameEl = $('activeCatName');
  const countEl= $('resultCount');
  if (nameEl)  nameEl.textContent = found ? found.label : 'جميع الخدمات';
  if (countEl) countEl.textContent = `${svcs.length} خدمة`;
}

/* ═══════════════════════════════════════════════════════════════
   RENDER SERVICES
═══════════════════════════════════════════════════════════════ */
function getFilteredServices() {
  const q = state.query.trim().toLowerCase();
  return getServices().filter(s => {
    const catOk = state.activeCat === 'all' || s.cat === state.activeCat;
    const qOk   = !q || s.title.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q) || s.tags.some(t => t.toLowerCase().includes(q));
    return catOk && qOk;
  });
}

function renderServices() {
  const grid  = $('servicesGrid');
  const skel  = $('skeletonGrid');
  const empty = $('emptyState');
  if (!grid) return;

  const list = getFilteredServices();
  updateFilterBar();

  if (list.length === 0) {
    grid.classList.add('hidden');
    if (empty) empty.classList.remove('hidden');
    return;
  }

  if (empty) empty.classList.add('hidden');
  grid.classList.remove('hidden');
  grid.className = `services-grid${state.view === 'list' ? ' list-view' : ''}`;

  grid.innerHTML = list.map((s, i) => `
    <article class="svc-card" role="listitem"
             style="--delay:${Math.min(i * 35, 380)}ms"
             data-id="${esc(s.id)}">
      <div class="card-icon ${esc(s.ib)}">${s.icon}</div>
      <div class="card-body">
        <h3 class="card-title">${esc(s.title)}</h3>
        <p class="card-desc">${esc(s.desc)}</p>
        <div class="card-tags">${s.tags.map(t => `<span class="card-tag">${esc(t)}</span>`).join('')}</div>
      </div>
      <div class="card-action">
        <button class="btn-card${s.outline ? ' outline' : ''}"
                onclick="handleCardAction('${esc(s.id)}')">
          ${esc(s.btn)}
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
  const faqs = getFaqs();
  grid.innerHTML = faqs.map((f, i) => `
    <div class="faq-item" data-faq="${i}">
      <button class="faq-q" onclick="toggleFAQ(${i})" aria-expanded="false">
        <span>${esc(f.q)}</span>
        <span class="faq-chevron">▼</span>
      </button>
      <div class="faq-ans" id="faq-ans-${i}">
        <p>${esc(f.a)}</p>
      </div>
    </div>
  `).join('');
}

window.toggleFAQ = function(i) {
  const item   = document.querySelector(`.faq-item[data-faq="${i}"]`);
  const wasOpen = item && item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(el => {
    el.classList.remove('open');
    el.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
  });
  if (!wasOpen && item) {
    item.classList.add('open');
    item.querySelector('.faq-q').setAttribute('aria-expanded', 'true');
  }
};

/* ═══════════════════════════════════════════════════════════════
   RENDER FUTURE FEATURES
═══════════════════════════════════════════════════════════════ */
const FUTURE = [
  { icon:'🌐', bg:'ib-grad',    badge:'قريباً',          title:'مجتمع الخريجين Alumni',           desc:'منصة تواصل اجتماعي لخريجي الكلية للتشبيك المهني وتبادل الخبرات والفرص.', tags:['مجتمع','تواصل','خريجون'] },
  { icon:'💼', bg:'ib-training', badge:'تحت التطوير',     title:'نظام التدريب والتوظيف',           desc:'منصة ربط الطلاب بفرص التدريب والوظائف الحصرية مع الشركات الشريكة.', tags:['توظيف','تدريب','شركات'] },
  { icon:'🤝', bg:'ib-affairs',  badge:'مقترح',           title:'منصة الإرشاد والمنتورينج',        desc:'ربط الطلاب الجدد بالخريجين الناجحين لتبادل الخبرات والتوجيه المهني.', tags:['إرشاد','منتور','مجتمع'] },
  { icon:'🎨', bg:'ib-forms',    badge:'مقترح',           title:'معرض الأعمال Portfolio',          desc:'منصة لعرض أعمال الطلاب والخريجين في مجالات التصميم والإعلام والتربية الفنية.', tags:['portfolio','إبداع','أعمال'] },
  { icon:'📊', bg:'ib-doctor',   badge:'مقترح',           title:'لوحة التحليلات الأكاديمية',       desc:'تحليلات ذكية للأداء الأكاديمي مع توقعات ونصائح مخصصة لتحسين مستواك.', tags:['AI','تحليلات','أكاديمي'] },
  { icon:'🏛️', bg:'ib-elearn',   badge:'قريباً',          title:'مركز التعلم مدى الحياة',          desc:'برامج ودورات تعليمية متخصصة للطلاب والخريجين وأعضاء هيئة التدريس.', tags:['تعلم','تطوير','مستمر'] },
];

function renderFuture() {
  const grid = $('futureGrid');
  if (!grid) return;
  grid.innerHTML = FUTURE.map(f => `
    <div class="future-card">
      <span class="future-badge">${esc(f.badge)}</span>
      <div class="future-icon ${esc(f.bg)}">${f.icon}</div>
      <h3>${esc(f.title)}</h3>
      <p>${esc(f.desc)}</p>
      <div class="future-tags">${f.tags.map(t => `<span class="future-tag">${esc(t)}</span>`).join('')}</div>
    </div>
  `).join('');
}

/* ═══════════════════════════════════════════════════════════════
   QUICK WIDGETS
═══════════════════════════════════════════════════════════════ */
function renderWidgets() {
  const container = $('quickWidgets');
  if (!container) return;

  const byRole = {
    'طالب': [
      { cat:'academic', icon:'📖', label:'الخدمات الأكاديمية' },
      { cat:'exam',     icon:'📋', label:'خدمات الامتحانات' },
      { cat:'training', icon:'🏆', label:'التدريب والورش' },
      { cat:'forms',    icon:'⬇️', label:'النماذج والتحميلات' },
    ],
    'خريج': [
      { cat:'docs',     icon:'📜', label:'توثيق الشهادات' },
      { cat:'jobs',     icon:'💼', label:'فرص العمل' },
      { cat:'network',  icon:'🌐', label:'شبكة الخريجين' },
      { cat:'fellowship', icon:'🏆', label:'الزمالات والمنح' },
    ],
    'دكتور': [
      { cat:'courses',  icon:'📖', label:'إدارة المقررات' },
      { cat:'research', icon:'🔬', label:'البحث العلمي' },
      { cat:'students', icon:'👥', label:'متابعة الطلاب' },
      { cat:'schedule', icon:'📅', label:'الجداول' },
    ],
  };

  const svcs = getServices();
  const countMap = {};
  svcs.forEach(s => { countMap[s.cat] = (countMap[s.cat] || 0) + 1; });

  const items = byRole[state.role] || byRole['طالب'];
  container.innerHTML = items.map(w => `
    <div class="widget-card" role="button" tabindex="0" data-cat="${esc(w.cat)}">
      <div class="widget-icon">${w.icon}</div>
      <div class="widget-info">
        <span class="widget-label">${esc(w.label)}</span>
        <span class="widget-count">${countMap[w.cat] || 0} خدمة</span>
      </div>
      <span class="widget-arrow"><i class="ni ni-chevron-left"></i></span>
    </div>
  `).join('');

  container.querySelectorAll('.widget-card').forEach(card => {
    card.addEventListener('click', () => selectCat(card.dataset.cat));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectCat(card.dataset.cat); }
    });
  });
}

/* ═══════════════════════════════════════════════════════════════
   SEARCH
═══════════════════════════════════════════════════════════════ */
function setupSearch() {
  const topInput  = $('searchInput');
  const heroInput = $('heroSearchInput');
  const heroBtn   = $('heroSearchBtn');
  const dropdown  = $('searchDropdown');

  function doSearch(val) {
    state.query = val.trim();
    state.activeCat = 'all';
    renderCats();
    renderServices();
    const layout = $('servicesLayout');
    if (layout) layout.scrollIntoView({ behavior:'smooth', block:'start' });
  }

  function buildDropdown(val) {
    if (!dropdown) return;
    if (!val.trim()) { dropdown.innerHTML = ''; return; }
    const hits = getServices()
      .filter(s => s.title.toLowerCase().includes(val.toLowerCase()) || s.tags.some(t => t.toLowerCase().includes(val.toLowerCase())))
      .slice(0, 6);
    dropdown.innerHTML = hits.length
      ? hits.map(s => `<li data-title="${esc(s.title)}"><span>${s.icon}</span><span>${esc(s.title)}</span><span class="sd-cat">${esc(s.tags[0]||'')}</span></li>`).join('')
      : `<li style="pointer-events:none;color:var(--text-muted)">لا توجد نتائج</li>`;
    dropdown.querySelectorAll('li[data-title]').forEach(li => {
      li.addEventListener('click', () => {
        const v = li.dataset.title;
        if (topInput) topInput.value = v;
        if (heroInput) heroInput.value = v;
        dropdown.innerHTML = '';
        doSearch(v);
      });
    });
  }

  if (topInput) {
    topInput.addEventListener('input', e => { buildDropdown(e.target.value); if (!e.target.value) { state.query = ''; renderServices(); } });
    topInput.addEventListener('keydown', e => { if (e.key === 'Enter') { doSearch(e.target.value); dropdown.innerHTML = ''; } if (e.key === 'Escape') dropdown.innerHTML = ''; });
  }
  if (heroInput) {
    heroInput.addEventListener('keydown', e => { if (e.key === 'Enter') { if (topInput) topInput.value = heroInput.value; doSearch(heroInput.value); } });
  }
  if (heroBtn) {
    heroBtn.addEventListener('click', () => { if (heroInput) { if (topInput) topInput.value = heroInput.value; doSearch(heroInput.value); } });
  }
  document.addEventListener('click', e => { if (dropdown && !e.target.closest('.search-wrap')) dropdown.innerHTML = ''; });
}

/* ═══════════════════════════════════════════════════════════════
   NOTIFICATIONS
═══════════════════════════════════════════════════════════════ */
function setupNotifications() {
  const btn     = $('notifBtn');
  const panel   = $('notifPanel');
  const overlay = $('notifOverlay');
  const badge   = $('notifBadge');
  const markAll = $('markAllRead');
  const empty   = $('notifEmpty');

  const open  = () => { state.notifOpen = true;  panel.classList.add('open'); panel.setAttribute('aria-hidden','false'); overlay.classList.remove('hidden'); };
  const close = () => { state.notifOpen = false; panel.classList.remove('open'); panel.setAttribute('aria-hidden','true'); overlay.classList.add('hidden'); };

  if (btn) btn.addEventListener('click', e => { e.stopPropagation(); state.notifOpen ? close() : open(); });
  if (overlay) overlay.addEventListener('click', close);

  if (panel) {
    panel.addEventListener('click', e => {
      const cb = e.target.closest('.notif-close');
      if (!cb) return;
      e.stopPropagation();
      const item = panel.querySelector(`.notif-item[data-id="${cb.dataset.id}"]`);
      if (item) { item.style.cssText = 'opacity:0;transform:translateX(-16px);transition:all .22s ease'; setTimeout(() => { item.remove(); updateBadge(); checkEmpty(); }, 220); }
    });
  }

  if (markAll) {
    markAll.addEventListener('click', () => {
      panel.querySelectorAll('.notif-item.unread').forEach(i => i.classList.remove('unread'));
      if (badge) { badge.textContent = '0'; badge.style.display = 'none'; }
    });
  }

  function updateBadge() {
    const c = panel ? panel.querySelectorAll('.notif-item').length : 0;
    if (badge) { badge.textContent = c; badge.style.display = c > 0 ? 'flex' : 'none'; }
  }
  function checkEmpty() {
    const list = $('notifList');
    if (!list || !empty) return;
    if (!list.querySelector('.notif-item')) { list.classList.add('hidden'); empty.classList.remove('hidden'); }
  }
}

/* ═══════════════════════════════════════════════════════════════
   VIEW TOGGLE
═══════════════════════════════════════════════════════════════ */
function setupViewToggle() {
  document.querySelectorAll('.vbtn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.vbtn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.view = btn.dataset.view;
      renderServices();
    });
  });
}

/* ═══════════════════════════════════════════════════════════════
   MOBILE NAV
═══════════════════════════════════════════════════════════════ */
function setupMobileNav() {
  const toggle  = $('menuToggle');
  const sidebar = document.querySelector('.main-sidebar');
  if (toggle && sidebar) {
    toggle.addEventListener('click', () => sidebar.classList.toggle('open'));
    document.addEventListener('click', e => {
      if (sidebar.classList.contains('open') && !e.target.closest('.main-sidebar') && !e.target.closest('#menuToggle'))
        sidebar.classList.remove('open');
    });
  }
}

window.closeDrawer = function() {
  const d = $('catDrawer'), o = $('drawerOverlay');
  if (d) { d.classList.remove('open'); d.setAttribute('aria-hidden','true'); }
  if (o) o.classList.add('hidden');
};

function setupCatDrawer() {
  const btn     = $('catToggleMobile');
  const drawer  = $('catDrawer');
  const overlay = $('drawerOverlay');
  const closeBtn= $('closeDrawer');
  if (btn && drawer) btn.addEventListener('click', () => { drawer.classList.add('open'); drawer.setAttribute('aria-hidden','false'); if (overlay) overlay.classList.remove('hidden'); });
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay)  overlay.addEventListener('click', closeDrawer);
}

/* ═══════════════════════════════════════════════════════════════
   CARD ACTION / RESET
═══════════════════════════════════════════════════════════════ */
window.handleCardAction = function(id) {
  const s = getServices().find(x => x.id === id);
  if (!s) return;
  showToast(`تم الانتقال إلى: ${s.title}`, 'info');
};

window.resetFilters = function() {
  state.query = '';
  const si = $('searchInput'); if (si) si.value = '';
  const hi = $('heroSearchInput'); if (hi) hi.value = '';
  selectCat('all');
};

function showToast(msg, type) {
  if (typeof showMessage === 'function') { showMessage(msg, type); return; }
  const el = document.createElement('div');
  const colors = { info:'#667eea', success:'#10b981', error:'#ef4444' };
  el.textContent = msg;
  el.style.cssText = `position:fixed;top:72px;left:50%;transform:translateX(-50%);background:${colors[type]||colors.info};color:#fff;padding:9px 20px;border-radius:999px;font-size:.82rem;font-weight:700;z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,.3);font-family:inherit`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

/* ═══════════════════════════════════════════════════════════════
   AUTH + ROLE DETECTION
═══════════════════════════════════════════════════════════════ */
function initAuth() {
  if (typeof waitForFirebase !== 'function') return;

  waitForFirebase(() => {
    const unsub = auth.onAuthStateChanged(async user => {
      unsub();
      if (!user) { window.location.href = 'index.html'; return; }

      const data = await getCurrentUserData(user.uid);
      if (!data) return;

      /* Sidebar user info */
      const nameEl = $('sidebarName'), roleEl = $('sidebarRole');
      const avatarEl = $('sidebarAvatar'), chipEl = $('chipAvatar');
      if (nameEl) nameEl.textContent = data.name || user.email;
      if (roleEl) roleEl.textContent = data.role || 'طالب';
      if (data.imageUrl) { if (avatarEl) avatarEl.src = data.imageUrl; if (chipEl) chipEl.src = data.imageUrl; }

      /* Apply role-based theme and content */
      const role = data.role && ROLE_CONFIG[data.role] ? data.role : 'طالب';
      applyRole(role);

      /* Online status */
      if (typeof db !== 'undefined') {
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

window.logout = async function() {
  if (!confirm('هل تريد تسجيل الخروج؟')) return;
  if (typeof logoutUser === 'function') {
    const r = await logoutUser();
    if (r.success) window.location.href = 'index.html';
  }
};

/* ═══════════════════════════════════════════════════════════════
   SKELETON → REAL
═══════════════════════════════════════════════════════════════ */
function simulateLoading() {
  setTimeout(() => {
    const sk = $('skeletonGrid'), gr = $('servicesGrid');
    if (sk) sk.classList.add('hidden');
    if (gr) gr.classList.remove('hidden');
  }, 800);
}

/* ═══════════════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  /* Initial render with default role (طالب) — replaced after auth */
  applyRole('طالب');
  renderWidgets();
  renderFuture();
  setupSearch();
  setupViewToggle();
  setupNotifications();
  setupMobileNav();
  setupCatDrawer();

  /* Auth (will call applyRole again with real role) */
  initAuth();
  simulateLoading();
});
