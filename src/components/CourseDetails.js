import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const CourseDetails = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

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
                <img id="courseVideo" className="card-img-top" src="/images/home.webp" alt="Course Image" />
                <div className="card-body">
                  <h1 className="card-title fw-bold mb-3">مراجعة شهر نوفمبر اولي ثانوي</h1>
                  <p className="card-text lead">دورة شاملة تغطي أهم الموضوعات مع شروحات مبسطة وتمارين تطبيقية ومراجعات سريعة لتثبيت المعلومات.</p>
                  <div className="row mb-1 pt-2">
                    <div className="col-md-6">
                      <p><i className="fas fa-user me-2"></i><strong>المعلم:</strong> أحمد محمد</p>
                    </div>
                    <div className="col-md-6">
                      <p><i className="fas fa-clock me-2"></i><strong>المدة:</strong> 4 أسابيع</p>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <p><i className="fas fa-calendar-alt me-2"></i><strong>تاريخ البدء:</strong> 10 مارس 2025</p>
                    </div>
                    <div className="col-md-6">
                      <p><i className="fas fa-users me-2"></i><strong>عدد الطلاب:</strong> 150 طالب</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Content Tabs */}
              <div className="card">
                <div className="card-header">
                  <ul className="nav nav-tabs nav-fatora" id="courseDetailsTabs" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => handleTabChange('overview')} type="button" role="tab">الدروس</button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className={`nav-link ${activeTab === 'curriculum' ? 'active' : ''}`} onClick={() => handleTabChange('curriculum')} type="button" role="tab">ما ستتعلمه</button>
                    </li>
                  </ul>
                </div>

                <div className="card-body">
                  <div className="tab-content" id="courseDetailsTabsContent">
                    {activeTab === 'overview' && (
                      <div className="tab-pane fade show active" id="overview" role="tabpanel">
                        <h5>محتوى الكورس</h5>
                        <div className="accordion" id="mainAccordion">
                          {/* Week 1 */}
                          <div className="accordion-item">
                            <h2 className="accordion-header" id="mainLesson">
                              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#mainCollapse">
                                <i className="fa fa-book-open me-2"></i>
                                الأسبوع الأول - المحاضرة الأولي
                              </button>
                            </h2>
                            <div id="mainCollapse" className="accordion-collapse collapse" data-bs-parent="#mainAccordion">
                              <div className="accordion-body">
                                <div className="accordion" id="subAccordion">
                                  {/* Sub 1 */}
                                  <div className="accordion-item">
                                    <h2 className="accordion-header position-relative" id="sub1">
                                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#subCollapse1">
                                        <div className="d-flex align-items-center w-100 me-3">
                                          <div className="sub-icon"><i className="me-2 fa fa-play-circle"></i></div>
                                          <span>المحاضرة الأولي - شرح</span>
                                        </div>
                                      </button>
                                    </h2>
                                    <div id="subCollapse1" className="accordion-collapse collapse" data-bs-parent="#subAccordion">
                                      <div className="accordion-body">
                                        <p><span className="fw-bold">الوصف:</span> <span>مراجعة الفصل الاول كامل - شرح</span></p>
                                        <p><span className="fw-bold">المدة:</span> <span>45 دقيقة</span></p>
                                        <p><span className="fw-bold">الفيديو:</span></p>
                                        <p className="d-flex gap-2">
                                          <button onClick={() => window.playVideo()} className="btn btn-primary btn-sm">مشاهدة الفيديو</button>
                                          <button onClick={() => window.playVideo()} className="btn btn-primary btn-sm">فيديو آخر</button>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  {/* Sub 2 - ملزمة الدرس الأول */}
                                  <div className="accordion-item">
                                    <h2 className="accordion-header position-relative" id="sublesson">
                                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#subCollapseLesson3">
                                        <div className="sub-icon"><i className="me-2 fa fa-book-open"></i></div>
                                        ملزمة الدرس الأول
                                      </button>
                                    </h2>
                                    <div id="subCollapseLesson3" className="accordion-collapse collapse" data-bs-parent="#subAccordion">
                                      <div className="accordion-body">
                                        ملف Pdf يحتوي مراجعة شاملة + مختصر الدرس.
                                        <a href="#" target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">فتح الملف</a>
                                      </div>
                                    </div>
                                  </div>
                                  {/* Sub 3 - ملزمة واجب الدرس الأول */}
                                  <div className="accordion-item">
                                    <h2 className="accordion-header position-relative" id="subHomeworkLesson">
                                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#subCollapseHomeworkLesson">
                                        <div className="sub-icon"><i className="me-2 fa fa-book-open"></i></div>
                                        ملزمة واجب الدرس الأول
                                      </button>
                                    </h2>
                                    <div id="subCollapseHomeworkLesson" className="accordion-collapse collapse" data-bs-parent="#subAccordion">
                                      <div className="accordion-body">
                                        ملف Pdf يحتوي مراجعة شاملة + مختصر الدرس.
                                        <a href="#" target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">فتح الملف</a>
                                      </div>
                                    </div>
                                  </div>
                                  {/* Sub 4 - فيديو واجب الدرس الأول */}
                                  <div className="accordion-item">
                                    <h2 className="accordion-header position-relative" id="sub2">
                                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#subCollapse2">
                                        <div className="sub-icon"><i className="me-2 fa fa-chalkboard-teacher"></i></div>
                                        فيديو واجب الدرس الأول - شرح
                                      </button>
                                    </h2>
                                    <div id="subCollapse2" className="accordion-collapse collapse" data-bs-parent="#subAccordion">
                                      <div className="accordion-body">
                                        <p><span className="fw-bold">الوصف:</span> <span>مراجعة الفصل الاول كامل - شرح</span></p>
                                        <p><span className="fw-bold">المدة:</span> <span>45 دقيقة</span></p>
                                        <p><span className="fw-bold">عدد المشاهدات المتبقية لك:</span> <span>4</span></p>
                                        <p><span className="fw-bold">إجمالي وقت مشاهداتك:</span> <span>0 : دقيقة</span></p>
                                        <p><span className="fw-bold">الفيديو:</span> <span><button onClick={() => window.playVideo()} className="btn btn-primary btn-sm">مشاهدة الفيديو</button></span></p>
                                      </div>
                                    </div>
                                  </div>
                                  {/* Sub 5 - تسليم واجب الدرس الأول */}
                                  <div className="accordion-item">
                                    <h2 className="accordion-header position-relative" id="sub3">
                                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#subCollapse3">
                                        <div className="sub-icon"><i className="me-2 fa fa-book-open"></i></div>
                                        تسليم واجب الدرس الأول
                                      </button>
                                    </h2>
                                    <div id="subCollapse3" className="accordion-collapse collapse" data-bs-parent="#subAccordion">
                                      <div className="accordion-body">
                                        ملف Pdf يحتوي مراجعة شاملة + مختصر الدرس.
                                        <Link to="/exam" className="btn btn-primary btn-sm">فتح الواجب</Link>
                                      </div>
                                    </div>
                                  </div>
                                  {/* Sub 6 - إجابات كتاب الفصل الأول */}
                                  <div className="accordion-item">
                                    <h2 className="accordion-header position-relative" id="sub4">
                                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#subCollapse4">
                                        <div className="sub-icon"><i className="me-2 fa fa-book-open"></i></div>
                                        إجابات كتاب الفصل الأول
                                      </button>
                                    </h2>
                                    <div id="subCollapse4" className="accordion-collapse collapse" data-bs-parent="#subAccordion">
                                      <div className="accordion-body">
                                        جميع إجابات كتاب الوزارة كاملة.
                                        <a href="#" target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">فتح الملف</a>
                                      </div>
                                    </div>
                                  </div>
                                  {/* Sub 7 - امتحان المحاضرة الأولي */}
                                  <div className="accordion-item">
                                    <h2 className="accordion-header position-relative" id="sub5">
                                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#subCollapse5">
                                        <div className="sub-icon"><i className="me-2 fa fa-book-open"></i></div>
                                        إمتحان المحاضرة الأولي
                                      </button>
                                    </h2>
                                    <div id="subCollapse5" className="accordion-collapse collapse" data-bs-parent="#subAccordion">
                                      <div className="accordion-body">
                                        امتحان شامل + نموذج إجابة مفصل.
                                        <Link to="/exam" className="btn btn-primary btn-sm">إمتحن</Link>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Week 2 */}
                          <div className="accordion-item">
                            <h2 className="accordion-header" id="mainLesson2">
                              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#mainCollapse2">
                                <i className="fa fa-book-open me-2"></i>
                                الأسبوع الثاني - المحاضرة الثانية
                              </button>
                            </h2>
                            <div id="mainCollapse2" className="accordion-collapse collapse" data-bs-parent="#mainAccordion">
                              <div className="accordion-body">
                                <div className="accordion" id="subAccordion2">
                                  {/* Sub 1 */}
                                  <div className="accordion-item">
                                    <h2 className="accordion-header position-relative" id="sub1">
                                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#subCollapse1">
                                        <div className="d-flex align-items-center w-100 me-3">
                                          <div className="sub-icon"><i className="me-2 fa fa-play-circle"></i></div>
                                          <span>المحاضرة الثانية - شرح</span>
                                        </div>
                                      </button>
                                    </h2>
                                    <div id="subCollapse1" className="accordion-collapse collapse" data-bs-parent="#subAccordion2">
                                      <div className="accordion-body">
                                        <p><span className="fw-bold">الوصف:</span> <span>مراجعة الفصل الثاني كامل - شرح</span></p>
                                        <p><span className="fw-bold">المدة:</span> <span>45 دقيقة</span></p>
                                        <p><span className="fw-bold">الفيديو:</span> <span><button onClick={() => window.playVideo()} className="btn btn-primary btn-sm">مشاهدة الفيديو</button></span></p>
                                      </div>
                                    </div>
                                  </div>
                                  {/* Sub 2 - ملزمة الدرس الأول */}
                                  <div className="accordion-item">
                                    <h2 className="accordion-header position-relative" id="sublesson">
                                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#subCollapseLesson3">
                                        <div className="sub-icon"><i className="me-2 fa fa-book-open"></i></div>
                                        ملزمة الدرس الأول
                                      </button>
                                    </h2>
                                    <div id="subCollapseLesson3" className="accordion-collapse collapse" data-bs-parent="#subAccordion2">
                                      <div className="accordion-body">
                                        ملف Pdf يحتوي مراجعة شاملة + مختصر الدرس.
                                        <a href="#" target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">فتح الملف</a>
                                      </div>
                                    </div>
                                  </div>
                                  {/* Sub 3 - ملزمة واجب الدرس الأول */}
                                  <div className="accordion-item">
                                    <h2 className="accordion-header position-relative" id="subHomeworkLesson">
                                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#subCollapseHomeworkLesson">
                                        <div className="sub-icon"><i className="me-2 fa fa-book-open"></i></div>
                                        ملزمة واجب الدرس الأول
                                      </button>
                                    </h2>
                                    <div id="subCollapseHomeworkLesson" className="accordion-collapse collapse" data-bs-parent="#subAccordion2">
                                      <div className="accordion-body">
                                        ملف Pdf يحتوي مراجعة شاملة + مختصر الدرس.
                                        <a href="#" target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">فتح الملف</a>
                                      </div>
                                    </div>
                                  </div>
                                  {/* Sub 4 - فيديو واجب الدرس الأول */}
                                  <div className="accordion-item">
                                    <h2 className="accordion-header position-relative" id="sub2">
                                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#subCollapse2">
                                        <div className="sub-icon"><i className="me-2 fa fa-chalkboard-teacher"></i></div>
                                        فيديو واجب الدرس الأول - شرح
                                      </button>
                                    </h2>
                                    <div id="subCollapse2" className="accordion-collapse collapse" data-bs-parent="#subAccordion2">
                                      <div className="accordion-body">
                                        <p><span className="fw-bold">الوصف:</span> <span>مراجعة الفصل الثاني كامل - شرح</span></p>
                                        <p><span className="fw-bold">المدة:</span> <span>45 دقيقة</span></p>
                                        <p><span className="fw-bold">عدد المشاهدات المتبقية لك:</span> <span>4</span></p>
                                        <p><span className="fw-bold">إجمالي وقت مشاهداتك:</span> <span>0 : دقيقة</span></p>
                                        <p><span className="fw-bold">الفيديو:</span> <span><button onClick={() => window.playVideo()} className="btn btn-primary btn-sm">مشاهدة الفيديو</button></span></p>
                                      </div>
                                    </div>
                                  </div>
                                  {/* Sub 5 - تسليم واجب الدرس الأول */}
                                  <div className="accordion-item">
                                    <h2 className="accordion-header position-relative" id="sub3">
                                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#subCollapse3">
                                        <div className="sub-icon"><i className="me-2 fa fa-book-open"></i></div>
                                        تسليم واجب الدرس الأول
                                      </button>
                                    </h2>
                                    <div id="subCollapse3" className="accordion-collapse collapse" data-bs-parent="#subAccordion2">
                                      <div className="accordion-body">
                                        ملف Pdf يحتوي مراجعة شاملة + مختصر الدرس.
                                        <Link to="/exam" className="btn btn-primary btn-sm">فتح الواجب</Link>
                                      </div>
                                    </div>
                                  </div>
                                  {/* Sub 6 - إجابات كتاب الفصل الأول */}
                                  <div className="accordion-item">
                                    <h2 className="accordion-header position-relative" id="sub4">
                                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#subCollapse4">
                                        <div className="sub-icon"><i className="me-2 fa fa-book-open"></i></div>
                                        إجابات كتاب الفصل الأول
                                      </button>
                                    </h2>
                                    <div id="subCollapse4" className="accordion-collapse collapse" data-bs-parent="#subAccordion2">
                                      <div className="accordion-body">
                                        جميع إجابات كتاب الوزارة كاملة.
                                        <a href="#" target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">فتح الملف</a>
                                      </div>
                                    </div>
                                  </div>
                                  {/* Sub 7 - امتحان المحاضرة الأولي */}
                                  <div className="accordion-item">
                                    <h2 className="accordion-header position-relative" id="sub5">
                                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#subCollapse5">
                                        <div className="sub-icon"><i className="me-2 fa fa-book-open"></i></div>
                                        إمتحان المحاضرة الثانية
                                      </button>
                                    </h2>
                                    <div id="subCollapse5" className="accordion-collapse collapse" data-bs-parent="#subAccordion2">
                                      <div className="accordion-body">
                                        امتحان شامل + نموذج إجابة مفصل.
                                        <Link to="/exam" className="btn btn-primary btn-sm">إمتحن</Link>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Week 3 - Locked */}
                          <div className="accordion-item">
                            <h2 className="accordion-header" id="mainLesson3">
                              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#mainCollapse3">
                                <i className="fa fa-book-open me-2"></i>
                                الأسبوع الثالث - المحاضرة الثالثة
                              </button>
                            </h2>
                            <div id="mainCollapse3" className="accordion-collapse collapse" data-bs-parent="#mainAccordion">
                              <div className="accordion-body">
                                <div className="accordion-item locked-item">
                                  <div className="d-flex align-items-center p-2 rounded-3">
                                    <div className="sub-icon me-2">
                                      <i className="fa fa-lock text-danger"></i>
                                    </div>
                                    <div className="flex-grow-1 fw-bold">المحاضرة الثالثة - شرح</div>
                                    <span className="badge bg-danger px-3 py-2">هذا المحتوى مغلق حتى النجاح في الاختبار السابق!</span>
                                    <button className="btn btn-light ms-3" disabled>
                                      <i className="fa fa-circle-question"></i>
                                    </button>
                                  </div>
                                </div>
                                <div className="accordion-item locked-item">
                                  <div className="d-flex align-items-center p-2 rounded-3">
                                    <div className="sub-icon me-2">
                                      <i className="fa fa-lock text-danger"></i>
                                    </div>
                                    <div className="flex-grow-1 fw-bold">واجب الدرس الأول - شرح</div>
                                    <span className="badge bg-danger px-3 py-2">هذا المحتوى مغلق حتى النجاح في الاختبار السابق!</span>
                                    <button className="btn btn-light ms-3" disabled>
                                      <i className="fa fa-circle-question"></i>
                                    </button>
                                  </div>
                                </div>
                                <div className="accordion-item locked-item">
                                  <div className="d-flex align-items-center p-2 rounded-3">
                                    <div className="sub-icon me-2">
                                      <i className="fa fa-lock text-danger"></i>
                                    </div>
                                    <div className="flex-grow-1 fw-bold">ملزمة الدرس الأول</div>
                                    <span className="badge bg-danger px-3 py-2">هذا المحتوى مغلق حتى النجاح في الاختبار السابق!</span>
                                    <button className="btn btn-light ms-3" disabled>
                                      <i className="fa fa-circle-question"></i>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {activeTab === 'curriculum' && (
                      <div className="tab-pane fade show active" id="curriculum" role="tabpanel">
                        <h5>وصف الكورس</h5>
                        <p>هذا الكورس مصمم خصيصاً لطلاب الصف الأول الثانوي لمراجعة شهر نوفمبر. يغطي الكورس جميع المواد الأساسية مع التركيز على النقاط المهمة والأسئلة المتوقعة في الامتحانات.</p>
                        <h6>ما ستتعلمه:</h6>
                        <ul>
                          <li>فهم عميق للمواد الأساسية</li>
                          <li>حل المسائل المعقدة بطريقة مبسطة</li>
                          <li>تقنيات المراجعة الفعالة</li>
                          <li>إدارة الوقت في الامتحانات</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar with Enrollment Info */}
            <div className="col-lg-4">
              <div className="card sticky-top" style={{ top: '20px' }}>
                <div className="card-body">
                  <div className="text-center mb-3">
                    <span className="badge bg-success fs-5 p-2">انت مشترك في هذا الكورس!</span>
                  </div>
                  <hr />
                  <h6>تفاصيل الكورس</h6>
                  <ul className="list-unstyled">
                    <li><i className="fas fa-play-circle me-2"></i>12 درس</li>
                    <li><i className="fas fa-clock me-2"></i>4 أسابيع</li>
                    <li><i className="fas fa-language me-2"></i>العربية</li>
                    <li><i className="fas fa-certificate me-2"></i>شهادة إتمام</li>
                    <li><i className="fas fa-mobile-alt me-2"></i>متوافق مع الهواتف</li>
                  </ul>
                  <hr />
                  <h6>الدروس</h6>
                  <ul className="list-group list-group-numbered bg-unset border-0 p-0">
                    <li className="list-group-item bg-unset d-flex border-0 px-0 align-items-center">الأسبوع 1</li>
                    <li className="list-group-item bg-unset d-flex border-0 px-0 align-items-center">الأسبوع 2</li>
                    <li className="list-group-item bg-unset d-flex border-0 px-0 align-items-center">الأسبوع 3</li>
                    <li className="list-group-item bg-unset d-flex border-0 px-0 align-items-center">الأسبوع 4</li>
                    <li className="list-group-item bg-unset d-flex border-0 px-0 align-items-center">الأسبوع 5</li>
                  </ul>
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

export default CourseDetails;
