import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Fawry = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [paymentData, setPaymentData] = useState({
    referenceNumber: '',
    amount: 250,
    customerName: '',
    customerEmail: '',
    customerMobile: ''
  });

  useEffect(() => {
    // Initialize AOS if needed
    if (window.AOS) {
      window.AOS.init();
    }
  }, []);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle Fawry payment submission
    console.log('Processing Fawry payment:', paymentData);
    // In real implementation, this would integrate with Fawry API
  };

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
                <div className="card-header text-center">
                  <img src="/images/fawry.png" alt="Fawry" className="mb-3" style={{ height: '50px' }} />
                  <h4>الدفع عبر فوري</h4>
                </div>
                <div className="card-body">
                  <div className="alert alert-info">
                    <i className="fas fa-info-circle me-2"></i>
                    يرجى إدخال البيانات المطلوبة لإتمام عملية الدفع عبر فوري
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="referenceNumber" className="form-label">رقم المرجع</label>
                        <input
                          type="text"
                          className="form-control"
                          id="referenceNumber"
                          name="referenceNumber"
                          value={paymentData.referenceNumber}
                          onChange={handleInputChange}
                          placeholder="أدخل رقم المرجع"
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="amount" className="form-label">المبلغ (جنية)</label>
                        <input
                          type="number"
                          className="form-control"
                          id="amount"
                          name="amount"
                          value={paymentData.amount}
                          onChange={handleInputChange}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="customerName" className="form-label">الاسم الكامل</label>
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

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="customerEmail" className="form-label">البريد الإلكتروني</label>
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
                      <div className="col-md-6 mb-3">
                        <label htmlFor="customerMobile" className="form-label">رقم الهاتف</label>
                        <input
                          type="tel"
                          className="form-control"
                          id="customerMobile"
                          name="customerMobile"
                          value={paymentData.customerMobile}
                          onChange={handleInputChange}
                          placeholder="01xxxxxxxxx"
                          required
                        />
                      </div>
                    </div>

                    <div className="text-center">
                      <button type="submit" className="btn btn-success btn-lg px-5">
                        <i className="fas fa-credit-card me-2"></i>
                        تأكيد الدفع
                      </button>
                    </div>
                  </form>

                  <hr className="my-4" />

                  <div className="payment-instructions">
                    <h6>خطوات الدفع:</h6>
                    <ol className="text-muted">
                      <li>احصل على رقم المرجع من خلال الضغط على زر "تأكيد الدفع"</li>
                      <li>اذهب إلى أقرب نقطة فوري أو استخدم تطبيق فوري</li>
                      <li>أدخل رقم المرجع والمبلغ المطلوب</li>
                      <li>أكمل عملية الدفع وستحصل على إيصال</li>
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

export default Fawry;
