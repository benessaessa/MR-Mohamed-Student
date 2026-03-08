import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Profile = () => {
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
              <Link to="/profile" title="الملف الشخصي" className="nav-link text-dark active">
                <i className="fas fa-user me-2"></i>
                <span>الملف الشخصي</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="container-fluid pt-5 mt-4">
          <div className="row">
            <div className="col-lg-4">
              <div className="card card-profile mb-4">
                <div className="card-body text-center">
                  <p className="text-center">
                    <i className="fa fa-user-circle fa-4x text-primary"></i>
                  </p>
                  <h6 className="card-title fw-bold"> محمد عيسي</h6>
                  <p className="card-text fs-12 text-secondary">عضو منذ 12 يوم</p>
                  <p className="card-text fs-12 mb-2">
                    <span className="text-secondary">رقم الهاتف:</span>
                    <span className="fw-bold">0123456789</span>
                  </p>
                  <p className="card-text fs-12 border-bottom pb-3 mb-2">
                    <span className="text-secondary">رقم هاتف ولي الأمر:</span>
                    <span className="fw-bold">0123456789</span>
                  </p>
                  <ul className="nav nav-tabs flex-column gap-2 border-0" id="profileTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button className={`nav-link w-100 text-start align-items-center d-flex ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => handleTabChange('overview')}
                        type="button"
                        role="tab">
                        <i className="fas fa-chart-bar me-2"></i>
                        <span className="fs-14">الملف الشخصي</span>
                        <i className="fas fa-chevron-left ms-auto"></i>
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className={`nav-link w-100 text-start align-items-center d-flex ${activeTab === 'settings' ? 'active' : ''}`}
                        onClick={() => handleTabChange('settings')}
                        type="button"
                        role="tab">
                        <i className="fas fa-user-shield me-2"></i>
                        <span className="fs-14"> الأمان وتسجيل الدخول</span>
                        <i className="fas fa-chevron-left ms-auto"></i>
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className={`nav-link w-100 text-start align-items-center d-flex ${activeTab === 'activity' ? 'active' : ''}`}
                        onClick={() => handleTabChange('activity')}
                        type="button"
                        role="tab">
                        <i className="fas fa-newspaper me-2"></i>
                        <span className="fs-14"> نتائج الإمتحانات</span>
                        <i className="fas fa-chevron-left ms-auto"></i>
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className={`nav-link w-100 text-start align-items-center d-flex ${activeTab === 'homework' ? 'active' : ''}`}
                        onClick={() => handleTabChange('homework')}
                        type="button"
                        role="tab">
                        <i className="fas fa-newspaper me-2"></i>
                        <span className="fs-14"> نتائج الواجب</span>
                        <i className="fas fa-chevron-left ms-auto"></i>
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className={`nav-link w-100 text-start align-items-center d-flex ${activeTab === 'video-watch' ? 'active' : ''}`}
                        onClick={() => handleTabChange('video-watch')}
                        type="button"
                        role="tab">
                        <i className="fas fa-play-circle me-2"></i>
                        <span className="fs-14"> مشاهدات الفيديو </span>
                        <i className="fas fa-chevron-left ms-auto"></i>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="tab-content tabs-profile" id="profileTabContent">
                {activeTab === 'overview' && (
                  <div className="tab-pane fade show active" id="overview" role="tabpanel">
                    <div className="card mb-4">
                      <div className="card-body">
                        <div className="card">
                          <div className="card-body px-0">
                            <div className="card d-flex flex-column justify-content-center">
                              <div className="card-body p-0">
                                <div className="col-12 col-md-6">
                                  <div className="card d-flex bg-primary flex-column justify-content-center">
                                    <div className="card-body py-2 d-flex gap-3 align-items-center">
                                      <div>
                                        <span className="bg-badge">
                                          <i className="fas fa-wallet fa-3x text-white icon"></i>
                                        </span>
                                      </div>
                                      <div>
                                        <div className="title">الرصيد الحالي في حسابك</div>
                                        <h4 className="mb-0 pb-0 fw-bolder"> 0 جنية</h4>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <h6 className="pt-4 fw-bold card-text">اشحن رصيد بأكثر من طريقة</h6>
                                <p>اكتب الكود على كارت السنتر بتاعك عشان تشحنه على الأكوانت بتاعك أو اشحن عن طريق خدمة فوري.</p>
                                <div className="d-flex gap-2 flex-column flex-md-row">
                                  <div>
                                    <Link to="/fawry" className="btn btn-primary w-100 px-4 py-2">
                                      اشحن الرصيد من فوري
                                      <img src="/images/fawry.png" alt="" />
                                    </Link>
                                  </div>
                                  <div>
                                    <button className="btn btn-outline-primary w-100 px-4 py-2">
                                      اشحن الرصيد من كود السنتر
                                      <i className="fas fa-barcode"></i>
                                    </button>
                                  </div>
                                </div>
                                <ul className="nav nav-tabs pt-3 nav-fatora" id="myTab" role="tablist">
                                  <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">الفواتير</button>
                                  </li>
                                  <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">الإشتراكات</button>
                                  </li>
                                  <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">كورساتي</button>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-body">
                        <div className="tab-content" id="myTabContent">
                          <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div className="table-responsive pb-2 pt-3">
                              <table className="table table-borderless">
                                <thead className="border-bottom">
                                  <tr>
                                    <th scope="row"> التسلسل </th>
                                    <th>اجمالي سعر الفاتورة	</th>
                                    <th>التخفيض</th>
                                    <th>الكوبون</th>
                                    <th>عدد المشتريات	</th>
                                    <th>المشتريات</th>
                                    <th>حالة الدفع	</th>
                                    <th>وقت الدفع	</th>
                                    <th>طريقة الدفع	</th>
                                    <th>رقم الفاتورة	</th>
                                    <th>وقت انشاء الفاتورة</th>
                                  </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                  <tr>
                                    <td scope="row">Desktop</td>
                                    <td>2323</td>
                                    <td>6868</td>
                                    <td>43378</td>
                                    <td> 10	</td>
                                    <td>Chrome 142	</td>
                                    <td>تم الدفع</td>
                                    <td>02:00 الخميس، ١ يناير ١٩٧٠</td>
                                    <td>تم الدفع</td>
                                    <td>123</td>
                                    <td>22:10 السبت، ١٥ نوفمبر ٢٠٢٥</td>
                                  </tr>
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
                                <span className="fs-12"> 1 - 1 من 1 </span>
                              </div>
                            </div>
                          </div>
                          <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            <div className="table-responsive pb-2 pt-3">
                              <table className="table table-borderless">
                                <thead className="border-bottom">
                                  <tr>
                                    <th scope="row"> التسلسل </th>
                                    <th>  اسم الطالب	</th>
                                    <th>اسم الكورس	</th>
                                    <th>طريقة الاشتراك	</th>
                                    <th> السعر	</th>
                                    <th>رقم الفاتورة	</th>
                                    <th> تاريخ الاشتراك	</th>
                                  </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                  <tr>
                                    <td scope="row">Desktop</td>
                                    <td>2323</td>
                                    <td>6868</td>
                                    <td>43378</td>
                                    <td> 10	</td>
                                    <td>Chrome 142	</td>
                                    <td> 10/10/2025 </td>
                                  </tr>
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
                                <span className="fs-12"> 1 - 1 من 1 </span>
                              </div>
                            </div>
                          </div>
                          <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                            <div className="text-center py-4">
                              <h6 className="pb-2">تقدر تشوف الكورسات اللي انت مشترك فيها من خلال</h6>
                              <Link to="/my-courses" className="btn btn-outline-primary px-5">الذهاب لكورساتك</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'settings' && (
                  <div className="tab-pane fade show active" id="settings" role="tabpanel">
                    <div className="card mb-4">
                      <div className="card-body">
                        <h5 className="card-title mb-4">الأمان وتسجيل الدخول</h5>
                        <div className="text-center">
                          <h6>عدد مرات تسجيل الخروج خلال اليوم</h6>
                          <h6 className="fw-bold bg-danger rounded-pill text-center p-2">لم يتم تسجيل الخروج بواسطة المستخدم اليوم</h6>
                          <h6>عدد مرات تسجيل الخروج خلال الأسبوع</h6>
                          <h6 className="fw-bold bg-danger rounded-pill text-center p-2">لم يتم تسجيل الخروج بواسطة المستخدم هذا الأسبوع</h6>
                          <h6 className="fw-bold bg-warning rounded-pill text-center p-2"> تلقائي من خلال التسجيل في جهاز آخر <span className="bg-white text-black rounded-circle px-2">1</span>   مرة واحدة </h6>
                        </div>
                        <div className="table-responsive pb-2 pt-3">
                          <table className="table table-borderless">
                            <thead className="border-bottom">
                              <tr>
                                <th scope="row">نوع الجهاز	</th>
                                <th> اسم الجهاز		</th>
                                <th> نظام التشغيل		</th>
                                <th> المتصفح	</th>
                                <th> اخر نشاط		</th>
                                <th> تاريخ تسجيل الدخول	</th>
                              </tr>
                            </thead>
                            <tbody className="table-group-divider">
                              <tr>
                                <td scope="row">Desktop</td>
                                <td>Unknown</td>
                                <td>Windows 10	</td>
                                <td>Chrome 142	</td>
                                <td>02:00 الخميس، ١ يناير ١٩٧٠</td>
                                <td>22:10 السبت، ١٥ نوفمبر ٢٠٢٥</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'activity' && (
                  <div className="tab-pane fade show active" id="activity" role="tabpanel">
                    <div className="card mb-4">
                      <div className="card-body">
                        <h5 className="card-title mb-4">نتائج الإمتحانات</h5>
                        <div className="table-responsive pb-2">
                          <table className="table table-borderless">
                            <thead className="border-bottom">
                              <tr>
                                <th scope="row">التسلسل</th>
                                <th> اسم الامتحان	</th>
                                <th> عدد الاسئلة	</th>
                                <th> النتيجة	</th>
                                <th> الدرجة	</th>
                                <th> عدد الاسئلة المحلولة	</th>
                                <th> عدد الاسئلة الصحيحة	</th>
                                <th> الاجابات	</th>
                                <th> وقت انهاء الامتحان	</th>
                                <th> وقت بدأ الامتحان	</th>
                              </tr>
                            </thead>
                            <tbody className="table-group-divider">
                              <tr>
                                <td scope="row">800353	</td>
                                <td className="min-vw-20">مراجعة الفصل الاول كامل - شرح	</td>
                                <td>100</td>
                                <td>120</td>
                                <td>12</td>
                                <td>10</td>
                                <td>3</td>
                                <td>34</td>
                                <td>10:20</td>
                                <td>9:20</td>
                              </tr>
                              <tr>
                                <td scope="row">800353	</td>
                                <td className="min-vw-20">مراجعة الفصل الاول كامل - شرح	</td>
                                <td>100</td>
                                <td>120</td>
                                <td>12</td>
                                <td>10</td>
                                <td>3</td>
                                <td>34</td>
                                <td>10:20</td>
                                <td>9:20</td>
                              </tr>
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
                            <span className="fs-12"> 1 - 1 من 1 </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'homework' && (
                  <div className="tab-pane fade show active" id="homework" role="tabpanel">
                    <div className="card mb-4">
                      <div className="card-body">
                        <h5 className="card-title mb-4">نتائج الواجب</h5>
                        <div className="table-responsive pb-2">
                          <table className="table table-borderless">
                            <thead className="border-bottom">
                              <tr>
                                <th scope="row">التسلسل</th>
                                <th> اسم الواجب	</th>
                                <th> عدد الاسئلة	</th>
                                <th> النتيجة	</th>
                                <th> الدرجة	</th>
                                <th> عدد الاسئلة المحلولة	</th>
                                <th> عدد الاسئلة الصحيحة	</th>
                                <th> الاجابات	</th>
                                <th> وقت انهاء الواجب	</th>
                                <th> وقت بدأ الواجب	</th>
                              </tr>
                            </thead>
                            <tbody className="table-group-divider">
                              <tr>
                                <td scope="row">800353	</td>
                                <td className="min-vw-20">مراجعة الفصل الاول كامل - شرح	</td>
                                <td>100</td>
                                <td>120</td>
                                <td>12</td>
                                <td>10</td>
                                <td>3</td>
                                <td>34</td>
                                <td>10:20</td>
                                <td>9:20</td>
                              </tr>
                              <tr>
                                <td scope="row">800353	</td>
                                <td className="min-vw-20">مراجعة الفصل الاول كامل - شرح	</td>
                                <td>100</td>
                                <td>120</td>
                                <td>12</td>
                                <td>10</td>
                                <td>3</td>
                                <td>34</td>
                                <td>10:20</td>
                                <td>9:20</td>
                              </tr>
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
                            <span className="fs-12"> 1 - 1 من 1 </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'video-watch' && (
                  <div className="tab-pane fade show active" id="video-watch" role="tabpanel">
                    <div className="card mb-4">
                      <div className="card-body">
                        <h5 className="card-title mb-4"> مشاهدات الفيديو</h5>
                        <div className="table-responsive pb-2">
                          <table className="table table-borderless">
                            <thead className="border-bottom">
                              <tr>
                                <th scope="row">التسلسل</th>
                                <th>اسم الفيديو	</th>
                                <th>اسم الكورس	</th>
                                <th>مدة المشاهدة</th>
                                <th>وقت المشاهدة</th>
                              </tr>
                            </thead>
                            <tbody className="table-group-divider">
                              <tr>
                                <td scope="row">800353	</td>
                                <td className="min-vw-20">مراجعة الفصل الاول كامل - شرح	</td>
                                <td className="min-vw-30">باقة الـ 4 شهور - بداية من الفصل التانى	</td>
                                <td className="min-vw-20">	-- لم يتم تشغيل الفيديو --</td>
                                <td className="min-vw-20">السبت، ١ نوفمبر ٢٠٢٥</td>
                              </tr>
                              <tr>
                                <td scope="row">800353	</td>
                                <td className="min-vw-20">مراجعة الفصل الاول كامل - شرح	</td>
                                <td className="min-vw-30">باقة الـ 4 شهور - بداية من الفصل التانى	</td>
                                <td className="min-vw-20">	-- لم يتم تشغيل الفيديو --</td>
                                <td className="min-vw-20">السبت، ١ نوفمبر ٢٠٢٥</td>
                              </tr>
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
                            <span className="fs-12"> 1 - 1 من 1 </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
