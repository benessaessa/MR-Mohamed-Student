import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { HOME_IMAGE } from '../assets/images';

const Subscribe = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    // Initialize AOS if needed
    if (window.AOS) {
      window.AOS.init();
    }

    // Sticky sidebar adjustment near footer
    const sidebar = document.getElementById('sidebar');
    const footer = document.querySelector('.footer');
    const adjustSidebarSticky = () => {
      if (sidebar && footer) {
        const footerRect = footer.getBoundingClientRect();
        if (footerRect.top < window.innerHeight) {
          sidebar.style.position = 'absolute';
          sidebar.style.top = `${window.scrollY + footerRect.top - sidebar.offsetHeight}px`;
        } else {
          sidebar.style.position = 'fixed';
          sidebar.style.top = '0';
        }
      }
    };

    window.addEventListener('scroll', adjustSidebarSticky);
    window.addEventListener('resize', adjustSidebarSticky);

    // Cleanup event listeners
    return () => {
      window.removeEventListener('scroll', adjustSidebarSticky);
      window.removeEventListener('resize', adjustSidebarSticky);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const selectPayment = (method) => {
    // Close the modal
    const modal = document.getElementById('paymentModal');
    const bsModal = window.bootstrap?.Modal?.getInstance(modal);
    if (bsModal) {
      bsModal.hide();
    }

    // Redirect based on payment method
    if (method === 'fawry') {
      window.location.href = '/fawry';
    } else {
      window.location.href = `/integration?payment=${method}`;
    }
  };

  const courseData = {
    title: 'مراجعة شهر نوفمبر اولي ثانوي',
    description: 'دورة شاملة تغطي أهم الموضوعات مع شروحات مبسطة وتمارين تطبيقية ومراجعات سريعة لتثبيت المعلومات.',
    teacher: 'أحمد محمد',
    duration: '4 أسابيع',
    startDate: '10 مارس 2025',
    students: 150,
    price: 100,
    image: HOME_IMAGE
  };

  const invoices = [
    {
      serial: 'Desktop',
      invoiceDate: '10/10/2025',
      paymentTime: '10/10/2025',
      invoicePrice: 2323,
      coursePrice: 6868
    }
  ];

  return (
    <div>
      <Navbar />
      {/* Sidebar */}
      <nav className={`sidebar shadow-sm fixed-top pt-5 ${sidebarCollapsed ? 'collapsed' : ''}`} id="sidebar">
        <div className="pt-4">
          <button id="toggleSidebar" className="btn ms-3 me-3 mb-3 mt-3 z-3 p-2 d-flex align-items-center" onClick={toggleSidebar} aria-label="Toggle sidebar">
            <i className={`d-none ${sidebarCollapsed ? '' : 'd-none'}`} id="toggleIconLeft"></i>
            <span className="sidebar-text">{sidebarCollapsed ? '' : 'تصغير القائمة'}</span>
            <i className={`fas fa-angle-double-${sidebarCollapsed ? 'left' : 'right'} ms-2`} id="toggleIconRight"></i>
            <i className={`fas fa-angle-double-left ms-2 d-none ${sidebarCollapsed ? 'd-block' : ''}`} id="toggleIconBothLeft"></i>
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
          <div className="row">
            {/* Course Image and Basic Info */}
            <div className="col-lg-8">
              <div className="card mb-4">
                <img src={courseData.image} className="card-img-top" alt="Course" />
                <div className="card-body">
                  <h1 className="card-title fw-bold mb-3">{courseData.title}</h1>
                  <p className="card-text lead">{courseData.description}</p>
                  <div className="row mb-1 pt-2">
                    <div className="col-md-6">
                      <p><i className="fas fa-user me-2"></i><strong>المعلم:</strong> {courseData.teacher}</p>
                    </div>
                    <div className="col-md-6">
                      <p><i className="fas fa-clock me-2"></i><strong>المدة:</strong> {courseData.duration}</p>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <p><i className="fas fa-calendar-alt me-2"></i><strong>تاريخ البدء:</strong> {courseData.startDate}</p>
                    </div>
                    <div className="col-md-6">
                      <p><i className="fas fa-users me-2"></i><strong>عدد الطلاب:</strong> {courseData.students} طالب</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Content Tabs */}
              <div className="card">
                <div className="card-body">
                  <h5 className="fw-bold">الفواتير السابقة</h5>
                  <div className="table-responsive pb-2 pt-3">
                    <table className="table table-borderless">
                      <thead className="border-bottom">
                        <tr>
                          <th className="p-3" scope="col">السريال</th>
                          <th className="p-3" scope="col">تاريخ الفاتورة</th>
                          <th className="p-3" scope="col">وقت دفع الفاتورة</th>
                          <th className="p-3" scope="col">سعر الفاتورة</th>
                          <th className="p-3" scope="col">سعر الكورس</th>
                          <th className="p-3" scope="col">الدفع</th>
                        </tr>
                      </thead>
                      <tbody className="table-group-divider">
                        {invoices.map((invoice, index) => (
                          <tr key={index}>
                            <td className="p-3" scope="row">{invoice.serial}</td>
                            <td className="p-3">{invoice.invoiceDate}</td>
                            <td className="p-3">{invoice.paymentTime}</td>
                            <td className="p-3">{invoice.invoicePrice}</td>
                            <td className="p-3">{invoice.coursePrice}</td>
                            <td className="p-3">
                              <button className="btn btn-primary px-4" data-bs-toggle="modal" data-bs-target="#paymentModal">
                                دفع الفاتورة
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="d-flex justify-content-between mt-4">
                    <nav aria-label="Page navigation">
                      <ul className="pagination">
                        <li className="page-item disabled">
                          <a className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                          </a>
                        </li>
                        <li className="page-item active"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item">
                          <a className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                    <div className="align-items-center d-none d-md-flex">
                      <span className="fs-12">1 - 1 من 1</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar with Enrollment Info */}
            <div className="col-lg-4">
              <div className="card sticky-top" style={{ top: '20px' }}>
                <div className="card-body">
                  <div className="text-center mb-3">
                    <span className="badge bg-success fs-5 p-2">{courseData.price} جنية</span>
                  </div>
                  <hr />
                  <h6>تفاصيل الكورس</h6>
                  <ul className="list-unstyled">
                    <li><i className="fas fa-play-circle me-2"></i>12 درس</li>
                    <li><i className="fas fa-clock me-2"></i>{courseData.duration}</li>
                    <li><i className="fas fa-language me-2"></i>العربية</li>
                    <li><i className="fas fa-certificate me-2"></i>شهادة إتمام</li>
                    <li><i className="fas fa-mobile-alt me-2"></i>متوافق مع الهواتف</li>
                  </ul>
                  <hr />
                  <p>
                    <button className="btn btn-primary px-4 w-100" data-bs-toggle="modal" data-bs-target="#paymentModal">
                      إدفع الفاتورة
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* Payment Modal */}
      <div className="modal fade" id="paymentModal" tabIndex="-1" aria-labelledby="paymentModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="paymentModalLabel">اختر طريقة الدفع</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <div className="d-grid gap-3">
                <button className="btn btn-outline-primary" onClick={() => selectPayment('visa')}>
                  <i className="fab fa-cc-visa me-2"></i>Visa
                </button>
                <button className="btn btn-outline-success" data-bs-toggle="collapse" data-bs-target="#paymobOptions" aria-expanded="false" aria-controls="paymobOptions">
                  <i className="fas fa-mobile-alt me-2"></i>Paymob
                </button>
                <div className="collapse" id="paymobOptions">
                  <div className="row g-3 mt-2">
                    <div className="col-6">
                      <div className="card shadow-sm text-center border-0 bg-light" onClick={() => selectPayment('paymob-vodafone')} style={{ cursor: 'pointer', transition: 'all 0.3s ease', borderRadius: '15px' }}>
                        <div className="card-body py-4">
                          <i className="fas fa-mobile fa-3x text-danger mb-3"></i>
                          <p className="mb-0 fw-bold text-dark">Vodafone Cash</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="card shadow-sm text-center border-0 bg-light" onClick={() => selectPayment('paymob-etisalat')} style={{ cursor: 'pointer', transition: 'all 0.3s ease', borderRadius: '15px' }}>
                        <div className="card-body py-4">
                          <i className="fas fa-mobile fa-3x text-primary mb-3"></i>
                          <p className="mb-0 fw-bold text-dark">Etisalat</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="card shadow-sm text-center border-0 bg-light" onClick={() => selectPayment('paymob-orange')} style={{ cursor: 'pointer', transition: 'all 0.3s ease', borderRadius: '15px' }}>
                        <div className="card-body py-4">
                          <i className="fas fa-mobile fa-3x text-warning mb-3"></i>
                          <p className="mb-0 fw-bold text-dark">Orange</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="card shadow-sm text-center border-0 bg-light" onClick={() => selectPayment('paymob-we')} style={{ cursor: 'pointer', transition: 'all 0.3s ease', borderRadius: '15px' }}>
                        <div className="card-body py-4">
                          <i className="fas fa-wallet fa-3x text-info mb-3"></i>
                          <p className="mb-0 fw-bold text-dark">We Wallet</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="btn btn-outline-warning" onClick={() => selectPayment('fawry')}>
                  <img src="/images/fawry.png" alt="Fawry" style={{ width: '20px', height: '20px', marginLeft: '8px' }} /> Fawry
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
