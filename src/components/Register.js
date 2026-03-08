import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Navbar from './Navbar';
import Footer from './Footer';

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    studentPhone: '',
    fatherPhone: '',
    class: '',
    region: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isInstructionsModalOpen, setIsInstructionsModalOpen] = useState(true);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'الإسم الأول مطلوب';
    if (!formData.lastName.trim()) newErrors.lastName = 'الإسم الأخير مطلوب';
    if (!formData.studentPhone.trim()) {
      newErrors.studentPhone = 'رقم الهاتف مطلوب';
    } else if (!/^01[0-9]{9}$/.test(formData.studentPhone)) {
      newErrors.studentPhone = 'رقم الهاتف يجب أن يبدأ بـ 01 وأن يكون 11 رقمًا';
    }
    if (!formData.fatherPhone.trim()) {
      newErrors.fatherPhone = 'رقم هاتف الأب مطلوب';
    } else if (!/^01[0-9]{9}$/.test(formData.fatherPhone)) {
      newErrors.fatherPhone = 'رقم هاتف الأب يجب أن يبدأ بـ 01 وأن يكون 11 رقمًا';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setStep(2);
    }
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.class) newErrors.class = 'الصف مطلوب';
    if (!formData.region) newErrors.region = 'المحافظة مطلوبة';
    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    }
    if (!formData.password) {
      newErrors.password = 'كلمة المرور مطلوبة';
    } else if (formData.password.length < 6) {
      newErrors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'تأكيد كلمة المرور مطلوب';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'كلمة المرور غير متطابقة';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // Handle form submission
      console.log('Form submitted:', formData);
      alert('تم التسجيل بنجاح!');
    }
  };

  const showStep = (stepNumber) => {
    setStep(stepNumber);
  };

  return (
    <div>
      <Navbar />
      <div className="login-section d-lg-flex">
        <div className="login-form w-100">
          <h4 className="card-title pt-4 pb-4">مرحبا بك في منصة الأستاذ محمد</h4>
          <p>ادخل بياناتك بشكل صحيح للحصول علي افضل تجربة داخل الموقع</p>
          <div className="card text-start mb-4">
            <div className="card-body">
              <h5 className="text-center py-2 mb-2"> انشئ حسابك الآن : </h5>
              <form>
                {step === 1 && (
                  <div id="firstStep">
                    <div className="d-md-flex gap-2">
                      <div className="form-group pt-3 w-100">
                        <label htmlFor="firstName">الإسم الأول*</label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          required
                          className="form-control py-2 text-start"
                          placeholder="الإسم الأول"
                          value={formData.firstName}
                          onChange={handleInputChange}
                        />
                        {errors.firstName && <span className="text-danger">{errors.firstName}</span>}
                      </div>
                      <div className="form-group pt-3 w-100">
                        <label htmlFor="lastName">الإسم الأخير*</label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          required
                          className="form-control py-2 text-start"
                          placeholder="الإسم الأخير"
                          value={formData.lastName}
                          onChange={handleInputChange}
                        />
                        {errors.lastName && <span className="text-danger">{errors.lastName}</span>}
                      </div>
                    </div>
                    <div className="form-group mt-3">
                      <label htmlFor="studentPhone">رقم الهاتف (الطالب)*</label>
                      <input
                        type="tel"
                        id="studentPhone"
                        name="studentPhone"
                        required
                        className="form-control text-start py-2"
                        placeholder="رقم الهاتف (الطالب)"
                        pattern="^01[0-9]{9}$"
                        title="رقم الهاتف يجب أن يبدأ بـ 01 وأن يكون 11 رقمًا"
                        value={formData.studentPhone}
                        onChange={handleInputChange}
                      />
                      {errors.studentPhone && <span className="text-danger">{errors.studentPhone}</span>}
                    </div>
                    <div className="form-group mt-3 pb-4">
                      <label htmlFor="fatherPhone">رقم هاتف الأب*</label>
                      <input
                        type="tel"
                        id="fatherPhone"
                        name="fatherPhone"
                        required
                        className="form-control text-start py-2"
                        placeholder="رقم هاتف الأب"
                        pattern="^01[0-9]{9}$"
                        title="رقم الهاتف يجب أن يبدأ بـ 01 وأن يكون 11 رقمًا"
                        value={formData.fatherPhone}
                        onChange={handleInputChange}
                      />
                      {errors.fatherPhone && <span className="text-danger">{errors.fatherPhone}</span>}
                    </div>
                    <button type="button" onClick={validateStep1} className="btn btn-primary w-100 py-2 font-weight-bold btn-block mt-3">
                      التالي
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div id="secondStep" className="pt-3">
                    <label htmlFor="class">الصف</label>
                    <select
                      className="form-select"
                      name="class"
                      value={formData.class}
                      onChange={handleInputChange}
                    >
                      <option value="">اختر الصف</option>
                      <option value="1">الأول الثانوي</option>
                      <option value="2">الثاني الثانوي</option>
                      <option value="3">الثالث الثانوي</option>
                    </select>
                    {errors.class && <span className="text-danger">{errors.class}</span>}
                    <div className="pt-3">
                      <label htmlFor="region">المحافظة</label>
                      <select
                        className="form-select"
                        name="region"
                        value={formData.region}
                        onChange={handleInputChange}
                      >
                        <option value="">اختر المحافظة</option>
                        <option value="1"> المنيا </option>
                        <option value="2">القاهرة </option>
                        <option value="3"> الجيزة</option>
                      </select>
                      {errors.region && <span className="text-danger">{errors.region}</span>}
                    </div>
                    <div className="form-group mt-3">
                      <label htmlFor="email">البريد الإلكتروني</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="form-control text-start py-2"
                        placeholder="البريد الإلكتروني"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                      {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>
                    <div className="d-md-flex gap-2">
                      <div className="form-group pt-3 w-100">
                        <label htmlFor="password">كلمة المرور</label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          required
                          className="form-control py-2 text-start"
                          placeholder="كلمة المرور"
                          value={formData.password}
                          onChange={handleInputChange}
                        />
                        {errors.password && <span className="text-danger">{errors.password}</span>}
                      </div>
                      <div className="form-group pt-3 w-100">
                        <label htmlFor="confirmPassword">تأكيد كلمة المرور</label>
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          required
                          className="form-control py-2 text-start"
                          placeholder="تأكيد كلمة المرور"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                        />
                        {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword}</span>}
                      </div>
                    </div>
                    <div className="d-flex gap-2">
                      <button type="button" onClick={() => showStep(1)} className="btn btn-secondary w-100 py-2 font-weight-bold btn-block mt-3">
                        السابق
                      </button>
                      <button type="button" onClick={validateStep2} className="btn btn-primary w-100 py-2 font-weight-bold btn-block mt-3">
                        التالي
                      </button>
                    </div>
                  </div>
                )}
                <p className="text-center pt-3">
                  لديك حساب بالفعل ؟ <Link to="/login" className="linkColor color-dark-mode fw-bold">سجل الدخول</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
        <div className="card-login text-center w-100 d-none d-lg-block">
          <img src="/images/register.png" className="img-fluid" alt="" />
        </div>
      </div>

      {/* Instructions Modal */}
      <Modal isOpen={isInstructionsModalOpen} size="xl" scrollable backdrop="static" keyboard={false}>
        <ModalHeader toggle={() => setIsInstructionsModalOpen(false)}>
          <i className="fa fa-book text-primary"></i> تعليمات منصة مستر محمد غانم 2025
        </ModalHeader>
        <ModalBody>
          <div className="container py-3">
            <div className="row d-lg-flex">
              <div className="col-lg-4 col-md-12 pb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h6 className="card-title fw-bold pb-2">
                      <i className="fas pe-1 fa-desktop text-primary"></i>المنصة موقع ويب مش تطبيق
                    </h6>
                    <p className="card-text small">
                      <i className="fa fa-check text-success"></i> المنصة هي موقع ويب، مش أبلكيشن، ومش محتاجة تحميل.
                    </p>
                    <p className="card-text small">
                      <i className="fa fa-check text-success"></i> تعمل على Google Chrome, Mozilla Firefox, Opera (آخر إصدار).
                    </p>
                    <p className="card-text small">
                      <i className="fa fa-times text-danger"></i> المتصفحات القديمة قد تسبب مشاكل في التشغيل
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-12 pb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h6 className="card-title fw-bold pb-2">
                      <i className="fas pe-1 fa-tablet text-primary"></i> الأجهزة المتوافقة
                    </h6>
                    <p className="card-text small">
                      <i className="fa fa-check text-success"></i> تعمل على الموبايل، اللاب توب، الكمبيوتر العادي.
                    </p>
                    <p className="card-text small">
                      <i className="fa fa-times text-danger"></i> التابلت المدرسي غير مدعوم، حتى لو متهكر
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-12 pb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h6 className="card-title fw-bold pb-2">
                      <i className="fas fa-graduation-cap text-primary"></i> تأكد من الكورس قبل الاشتراك
                    </h6>
                    <p className="card-text small">
                      <i className="fa fa-exclamation-triangle text-success"></i> بعد الاشتراك لا يمكن استرجاع أو تبديل الكورس.
                    </p>
                    <p className="card-text small">
                      <i className="fa fa-check text-success"></i> اقرأ تفاصيل الكورس (المحتوى، عدد الفيديوهات، مدة الاشتراك).
                    </p>
                    <p className="card-text small">
                      <i className="fa fa-check text-success"></i> لو مش متأكد، اسأل قبل الاشتراك.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row d-lg-flex">
              <div className="col-lg-4 col-md-12 pb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h6 className="card-title fw-bold pb-2">
                      <i className="fas fa-wifi text-warning"></i> سرعة الإنترنت
                    </h6>
                    <p className="card-text small">
                      <i className="fa fa-check text-success"></i> استخدم Wi-Fi قوي أو 4G مستقرة.
                    </p>
                    <p className="card-text small">
                      <i className="fa fa-times text-danger"></i> الإنترنت الضعيف قد يسبب مشاكل في تشغيل الفيديوهات.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-12 pb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h6 className="card-title fw-bold pb-2">
                      <i className="fas fa-user text-secondary"></i> الحساب شخصي فقط
                    </h6>
                    <p className="card-text small">
                      <i className="fa fa-ban text-danger"></i> الحساب مخصص لاستخدامك الشخصي فقط.
                    </p>
                    <p className="card-text small">
                      <i className="fa fa-times text-danger"></i> مشاركة الحساب يؤدي إلى إغلاقه نهائيًا.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <h5 className="text-center m-auto fw-bold fs-6">
            <i className="fa fa-check-circle text-success"></i> الرجاء الالتزام بهذه التعليمات لضمان أفضل تجربة تعليمية! <i className="fa fa-rocket text-primary"></i>
          </h5>
          <button type="button" className="btn btn-primary" onClick={() => setIsInstructionsModalOpen(false)}>حسنا</button>
        </ModalFooter>
      </Modal>

      <Footer />
    </div>
  );
};

export default Register;
