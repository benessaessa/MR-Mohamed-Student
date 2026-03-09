import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Paymob = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchParams] = useSearchParams();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [paymentData, setPaymentData] = useState({
    amount: searchParams.get('amount') || '100',
    customerName: '',
    customerEmail: '',
    customerMobile: ''
  });

  useEffect(() => {
    // Initialize AOS if needed
    if (window.AOS) {
      window.AOS.init();
    }

    // Check if payment method is specified in URL
    const paymentParam = searchParams.get('payment');
    if (paymentParam && paymentParam.startsWith('paymob-')) {
      const methodMap = {
        'paymob-vodafone': 'Vodafone Cash',
        'paymob-etisalat': 'Etisalat Cash',
        'paymob-orange': 'Orange Money',
        'paymob-we': 'We Wallet'
      };
      if (methodMap[paymentParam]) {
        setSelectedMethod(methodMap[paymentParam]);
      }
    }
  }, [searchParams]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({
      ...paymentData,
      [name]: value
    });
  };

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle Paymob payment submission
    console.log('Processing Paymob payment:', { ...paymentData, method: selectedMethod });
    // In real implementation, this would integrate with Paymob API
    alert(`جاري معالجة الدفع عبر ${selectedMethod}...`);
  };

  const paymentMethods = [
    {
      id: 'vodafone',
      name: 'Vodafone Cash',
      icon: 'fas fa-mobile',
      color: 'text-danger',
      description: 'ادفع من خلال محفظة فودافون كاش'
    },
    {
      id: 'etisalat',
      name: 'Etisalat Cash',
      icon: 'fas fa-mobile',
      color: 'text-primary',
      description: 'ادفع من خلال محفظة اتصالات كاش'
    },
    {
      id: 'orange',
      name: 'Orange Money',
      icon: 'fas fa-mobile',
      color: 'text-warning',
      description: 'ادفع من خلال محفظة اورانج موناي'
    },
    {
      id: 'we',
      name: 'We Wallet',
      icon: 'fas fa-wallet',
      color: 'text-info',
      description: 'ادفع من خلال محفظة وي'
    }
  ];

  return (
    <div>
      <Navbar />
      {/* Sidebar */}
      <nav className={`sidebar shadow-sm pt-5 ${sidebarCollapsed ? 'collapsed' : ''}`} id="sidebar">
        <div className="pt-4">
          <button id="toggleSidebar" className="btn ms-3 me-3 mb-3 mt-3 z-3 p-2 d-flex align-items-center" onClick={toggleSidebar} aria-label="Toggle sidebar">
            <span className="sidebar-text">{sidebarCollapsed ? '' : 'تصغير القائمة'}</span>
            <i className={`fas fa-angle-double-${sidebarCollapsed ? 'left' : 'right'} ms-2`} id="toggleIconRight"></i>
          </button>
          <ul className="nav flex-column">
            <li className="nav-item mb-3">
              <Link to="/dashboard" title="الرئيسية" className="nav-link text-dark">
                <i className="fas fa-home me-2"></i>
                <span> الرئيسية</span>
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link to="/my-courses" title="كورساتي" className="nav-link text-dark">
                <i className="fas fa-graduation-cap me-2"></i>
                <span>كورساتي</span>
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link to="/courses" title="جميع الكورسات" className="nav-link text-dark">
                <i className="fas fa-book me-2"></i>
                <span>جميع الكورسات</span>
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link to="/requests-courses" title="كورساتنا المقترحة" className="nav-link text-dark">
                <i className="fas fa-edit me-2"></i>
                <span>كورساتنا المقترحة</span>
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link to="/profile" title="الملف الشخصي" className="nav-link text-dark">
                <i className="fas fa-user me-2"></i>
                <span>الملف الشخصي</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="container mt-5 pt-4">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card">
                <div className="card-header text-center bg-success text-white">
                  <h4><i className="fas fa-mobile-alt me-2"></i>الدفع عبر Paymob</h4>
                  <p className="mb-0">اختر طريقة الدفع المناسبة لك</p>
                </div>
                <div className="card-body">
                  <div className="alert alert-info">
                    <i className="fas fa-info-circle me-2"></i>
                    يمكنك الدفع من خلال أي من المحافظ الإلكترونية التالية
                  </div>

                  {!selectedMethod ? (
                    <>
                      <h5 className="mb-3">اختر طريقة الدفع:</h5>
                      <div className="row g-3">
                        {paymentMethods.map((method) => (
                          <div className="col-md-6" key={method.id}>
                            <div 
                              className="card h-100 shadow-sm payment-method-card"
                              style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                              onClick={() => handleMethodSelect(method.name)}
                            >
                              <div className="card-body text-center py-4">
                                <i className={`${method.icon} fa-3x ${method.color} mb-3`}></i>
                                <h5 className="card-title fw-bold">{method.name}</h5>
                                <p className="card-text text-muted small">{method.description}</p>
                                <button className="btn btn-outline-primary mt-2">
                                  اختر هذه الطريقة
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <button 
                          className="btn btn-link text-decoration-none"
                          onClick={() => setSelectedMethod(null)}
                        >
                          <i className="fas fa-arrow-right me-1"></i>Back
                        </button>
                        <h5 className="mb-0">
                          <i className="fas fa-check-circle text-success me-2"></i>
                          {selectedMethod}
                        </h5>
                      </div>

                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label htmlFor="amount" className="form-label">المبلغ المطلوب دفعه (جنية)</label>
                          <div className="input-group">
                            <span className="input-group-text">
                              <i className="fas fa-money-bill-wave"></i>
                            </span>
                            <input
                              type="number"
                              className="form-control form-control-lg"
                              id="amount"
                              name="amount"
                              value={paymentData.amount}
                              onChange={handleInputChange}
                              readOnly
                            />
                          </div>
                        </div>

                        <div className="mb-3">
                          <label htmlFor="customerMobile" className="form-label">
                            رقم الهاتف ({selectedMethod})
                          </label>
                          <div className="input-group">
                            <span className="input-group-text">
                              <i className="fas fa-phone"></i>
                            </span>
                            <input
                              type="tel"
                              className="form-control"
                              id="customerMobile"
                              name="customerMobile"
                              value={paymentData.customerMobile}
                              onChange={handleInputChange}
                              placeholder="أدخل رقم الهاتف المسجل في المحفظة"
                              required
                              pattern="^01[0-9]{9}$"
                              title="يرجى إدخال رقم هاتف صحيح (11 رقم)"
                            />
                          </div>
                          <div className="form-text">
                            يجب أن يكون الرقم مسجلاً في خدمة {selectedMethod}
                          </div>
                        </div>

                        <div className="mb-3">
                          <label htmlFor="customerName" className="form-label">الاسم الكامل</label>
                          <div className="input-group">
                            <span className="input-group-text">
                              <i className="fas fa-user"></i>
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              id="customerName"
                              name="customerName"
                              value={paymentData.customerName}
                              onChange={handleInputChange}
                              placeholder="أدخل اسمك الكامل"
                              required
                            />
                          </div>
                        </div>

                        <div className="mb-3">
                          <label htmlFor="customerEmail" className="form-label">البريد الإلكتروني</label>
                          <div className="input-group">
                            <span className="input-group-text">
                              <i className="fas fa-envelope"></i>
                            </span>
                            <input
                              type="email"
                              className="form-control"
                              id="customerEmail"
                              name="customerEmail"
                              value={paymentData.customerEmail}
                              onChange={handleInputChange}
                              placeholder="example@email.com"
                              required
                            />
                          </div>
                        </div>

                        <div className="alert alert-warning mt-4">
                          <i className="fas fa-exclamation-triangle me-2"></i>
                          <strong>ملاحظة:</strong> بعد الضغط على "إتمام الدفع"، ستreceive رسالة على هاتفك لتأكيد العملية. يرجى متابعة الخطوات في رسالة التأكيد.
                        </div>

                        <div className="text-center mt-4">
                          <button type="submit" className="btn btn-success btn-lg px-5">
                            <i className="fas fa-credit-card me-2"></i>
                            إتمام الدفع
                          </button>
                        </div>
                      </form>
                    </>
                  )}

                  <hr className="my-4" />

                  <div className="payment-instructions">
                    <h6>خطوات الدفع:</h6>
                    <ol className="text-muted">
                      <li>اختر طريقة الدفع المناسبة لك من الخيارات أعلاه</li>
                      <li>أدخل رقم الهاتف المسجل في المحفظة الإلكترونية</li>
                      <li>أدخل بياناتك الشخصية</li>
                      <li>اضغط على "إتمام الدفع"</li>
                      <li>ستreceive رسالة على هاتفك للتحقق من العملية</li>
                      <li>Confirm the payment from your phone</li>
                      <li>سيتم تفعيل اشتراكك فوراً بعد تأكيد الدفع</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Paymob;

