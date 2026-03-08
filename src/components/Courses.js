import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { HOME_IMAGE, REGISTER_IMAGE } from '../assets/images';

const Courses = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('offers-courses');

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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
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
              <Link to="/courses" title="جميع الكورسات" className="nav-link text-dark active">
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
          <h2 className="mb-4 text-center pt-2">الكورسات المتاحة</h2>
          {/* Tabs */}
          <ul className="nav courses-tabs nav-tabs justify-content-center gap-2 pb-3" id="courseTabs" role="tablist">
            <li className="nav-item" role="presentation">
              <button className={`nav-link ${activeTab === 'offers-courses' ? 'active' : ''}`} onClick={() => handleTabChange('offers-courses')} type="button" role="tab">العروض والباقات</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className={`nav-link ${activeTab === 'primary-courses' ? 'active' : ''}`} onClick={() => handleTabChange('primary-courses')} type="button" role="tab">الإشتراكات الشهرية</button>
            </li>
          </ul>

          <div className="tab-content courses pt-4" id="courseTabsContent">
            {activeTab === 'offers-courses' && (
              <div className="tab-pane fade show active" id="offers-courses" role="tabpanel">
                <div className="row text-start">
                  {/* All Courses Content */}
                  <div className="col-lg-4 col-md-6 mb-4">
                    <div className="card h-100 w-100 card-course">
                      <Link to="/course-details">
                        <img src={HOME_IMAGE} className="card-img-top" alt="Course 1" />
                      </Link>
                      <div className="card-body">
                        <h5 className="card-title-course fw-bold">مراجعة شهر نوفمبر اولي ثانوي</h5>
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <small className="text-muted">
                            <i className="far fa-calendar-alt pe-2" aria-hidden="true"></i>
                            10 مارس 2025
                          </small>
                          <span className="badge bg-success">100 جنية</span>
                        </div>
                        <p className="card-text card-description">دورة شاملة تغطي أهم الموضوعات مع شروحات مبسطة وتمارين تطبيقية ومراجعات سريعة لتثبيت المعلومات.</p>
                        <Link to="/course-details" className="btn btn-primary w-100 mb-3">الدخول للكورس <i className="fas fa-video"></i></Link>
                        <Link to="/subscribe" className="btn btn-outline-primary w-100">الإشتراك في الكورس <i className="fas fa-credit-card"></i></Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-4">
                    <div className="card h-100 w-100 card-course">
                      <Link to="/course-details">
                        <img src={HOME_IMAGE} className="card-img-top" alt="Course 2" />
                      </Link>
                      <div className="card-body">
                        <h5 className="card-title-course fw-bold">مراجعة شهر نوفمبر اولي ثانوي</h5>
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <small className="text-muted">
                            <i className="far fa-calendar-alt pe-2" aria-hidden="true"></i>
                            10 مارس 2025
                          </small>
                          <span className="badge bg-success">100 جنية</span>
                        </div>
                        <p className="card-text card-description">دورة شاملة تغطي أهم الموضوعات مع شروحات مبسطة وتمارين تطبيقية ومراجعات سريعة لتثبيت المعلومات.</p>
                        <Link to="/course-details" className="btn btn-primary w-100 mb-3">الدخول للكورس <i className="fas fa-video"></i></Link>
                        <Link to="/subscribe" className="btn btn-outline-primary w-100">الإشتراك في الكورس <i className="fas fa-credit-card"></i></Link>
                      </div>
                    </div>
                  </div>
                  {/* Add more courses here */}
                </div>
              </div>
            )}
            {activeTab === 'primary-courses' && (
              <div className="tab-pane fade show active" id="primary-courses" role="tabpanel">
                <div className="row text-start">
                  {/* Primary Courses Content */}
                  <div className="col-lg-4 col-md-6 mb-4">
                    <div className="card h-100 w-100 card-course">
                      <Link to="/course-details">
                        <img src={REGISTER_IMAGE} className="card-img-top" alt="Course 1" />
                      </Link>
                      <div className="card-body">
                        <h5 className="card-title-course fw-bold">مراجعة شهر نوفمبر اولي ثانوي</h5>
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <small className="text-muted">
                            <i className="far fa-calendar-alt pe-2" aria-hidden="true"></i>
                            10 مارس 2025
                          </small>
                          <span className="badge bg-success">مجاني</span>
                        </div>
                        <p className="card-text card-description">دورة شاملة تغطي أهم الموضوعات مع شروحات مبسطة وتمارين تطبيقية ومراجعات سريعة لتثبيت المعلومات.</p>
                        <Link to="/course-details" className="btn btn-primary w-100 mb-3">الدخول للكورس <i className="fas fa-video"></i></Link>
                        <Link to="/subscribe" className="btn btn-outline-primary w-100">الإشتراك في الكورس <i className="fas fa-credit-card"></i></Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-4">
                    <div className="card h-100 w-100 card-course">
                      <Link to="/course-details">
                        <img src={REGISTER_IMAGE} className="card-img-top" alt="Course 2" />
                      </Link>
                      <div className="card-body">
                        <h5 className="card-title-course fw-bold">مراجعة شهر نوفمبر اولي ثانوي</h5>
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <small className="text-muted">
                            <i className="far fa-calendar-alt pe-2" aria-hidden="true"></i>
                            10 مارس 2025
                          </small>
                          <span className="badge bg-success">مجاني</span>
                        </div>
                        <p className="card-text card-description">دورة شاملة تغطي أهم الموضوعات مع شروحات مبسطة وتمارين تطبيقية ومراجعات سريعة لتثبيت المعلومات.</p>
                        <Link to="/course-details" className="btn btn-primary w-100 mb-3">الدخول للكورس <i className="fas fa-video"></i></Link>
                        <Link to="/subscribe" className="btn btn-outline-primary w-100">الإشتراك في الكورس <i className="fas fa-credit-card"></i></Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-4">
                    <div className="card h-100 w-100 card-course">
                      <Link to="/course-details">
                        <img src={REGISTER_IMAGE} className="card-img-top" alt="Course 3" />
                      </Link>
                      <div className="card-body">
                        <h5 className="card-title-course fw-bold">مراجعة شهر نوفمبر اولي ثانوي</h5>
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <small className="text-muted">
                            <i className="far fa-calendar-alt pe-2" aria-hidden="true"></i>
                            10 مارس 2025
                          </small>
                          <span className="badge bg-success">مجاني</span>
                        </div>
                        <p className="card-text card-description">دورة شاملة تغطي أهم الموضوعات مع شروحات مبسطة وتمارين تطبيقية ومراجعات سريعة لتثبيت المعلومات.</p>
                        <Link to="/course-details" className="btn btn-primary w-100 mb-3">الدخول للكورس <i className="fas fa-video"></i></Link>
                        <Link to="/subscribe" className="btn btn-outline-primary w-100">الإشتراك في الكورس <i className="fas fa-credit-card"></i></Link>
                      </div>
                    </div>
                  </div>
                  {/* Add more primary courses here */}
                </div>
              </div>
            )}
          </div>

          {/* Pagination */}
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center mt-4 mb-5">
              <li className="page-item">
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Courses;
