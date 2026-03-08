import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import '../css/general.css';
import '../css/style.css';

const Home = () => {
  useEffect(() => {
    // Initialize AOS
    if (window.AOS) {
      window.AOS.init();
    }
    // Initialize Swiper if available
    if (window.Swiper) {
      new window.Swiper('.swiper-course', {
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        },
      });
    }
  }, []);

  return (
    <div>
      <Navbar />

      <main className="mt-5">
        {/* Home Section */}
        <section className="home-section d-flex align-items-center">
          <div className="overlay">
            <div className="container text-center">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <h1 className="mb-4 fw-bold">مرحبًا بك في منصتنا التعليمية مستر محمد غانم لتعلم التاريخ</h1>
                  <p className="mb-4">منصة تعليمية تهدف الي تعليم الطلاب بأحدث الطرق الحديثة وابسطها</p>
                  <Link to="/register" className="btn btn-primary btn-lg px-5"> إنضم الآن</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <section className="why-choose-section py-5">
        <div className="container">
          <h2 className="mb-5 text-center fw-bold">لماذا تختار مستر محمد؟</h2>
          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <div className="card h-100 card-course text-center border-0" data-aos="flip-left">
                <div className="card-body">
                  <div className="mb-3 display-6 text-primary"><i className="fas fa-chalkboard-teacher"></i></div>
                  <h5 className="fw-bold">شرح مبسط وواضح</h5>
                  <p className="small text-muted">دروس مُرتبة وبشرح مبسّط يسهل فهم المفاهيم بسرعة وبثقة.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="card h-100 card-course text-center border-0" data-aos="flip-left" data-aos-delay="100">
                <div className="card-body">
                  <div className="mb-3 display-6 text-primary"><i className="fas fa-book-open"></i></div>
                  <h5 className="fw-bold">محتوى منظم وحديث</h5>
                  <p className="small text-muted">مناهج ودورات محدثة تغطي أهم النقاط والمراجعات المطلوبة للامتحان.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="card h-100 card-course text-center border-0" data-aos="flip-left" data-aos-delay="200">
                <div className="card-body">
                  <div className="mb-3 display-6 text-primary"><i className="fas fa-clock"></i></div>
                  <h5 className="fw-bold">مرونة في التعلم</h5>
                  <p className="small text-muted">شاهد المحاضرات في أي وقت وبالسرعة التي تناسبك، مع تمارين واختبارات ذاتية.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="card h-100 card-course text-center border-0" data-aos="flip-left" data-aos-delay="300">
                <div className="card-body">
                  <div className="mb-3 display-6 text-primary"><i className="fas fa-award"></i></div>
                  <h5 className="fw-bold">دعم ومتابعة وشهادات</h5>
                  <p className="small text-muted">متابعة مستمرة، تقييمات دورية، وشهادات عند إتمام الدورات لتعزيز السيرة الذاتية.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="courses bg-secondary pb-3 pt-3">
        <div className="container">
          <div className="row text-start">
            <h2 className="mb-5 text-center fw-bold"> الصفوف الدراسية </h2>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100 card-course" data-aos="fade-up">
                <a href="">
                  <img src="/images/register.png" className="card-img-top" alt="Course 1" />
                </a>
                <div className="card-body">
                  <h5 className="card-title-course fw-bold"> الصف الأول الثانوي</h5>
                  <p className="card-text small text-muted">تعلم أساسيات المواد الدراسية للصف الأول الثانوي بطريقة
                    ممتعة وتفاعلية.</p>
                  <a href="#" className="btn btn-primary w-100"> عرض الكورسات <i className="fas fa-desktop"></i></a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100 card-course" data-aos="fade-up" data-aos-delay="100">
                <a href="">
                  <img src="/images/register.png" className="card-img-top" alt="Course 1" />
                </a>
                <div className="card-body">
                  <h5 className="card-title-course fw-bold"> الصف الثاني الثانوي</h5>
                  <p className="card-text small text-muted">تعلم أساسيات المواد الدراسية للصف الثاني الثانوي
                    بطريقة ممتعة وتفاعلية.</p>
                  <a href="#" className="btn btn-primary w-100"> عرض الكورسات <i className="fas fa-desktop"></i></a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100 card-course" data-aos="fade-up" data-aos-delay="200">
                <a href="">
                  <img src="/images/register.png" className="card-img-top" alt="Course 1" />
                </a>
                <div className="card-body">
                  <h5 className="card-title-course fw-bold"> الصف الثالث الثانوي</h5>
                  <p className="card-text small text-muted">تعلم أساسيات المواد الدراسية للصف الثالث الثانوي
                    بطريقة ممتعة وتفاعلية.</p>
                  <a href="#" className="btn btn-primary w-100"> عرض الكورسات <i className="fas fa-desktop"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="courses pt-3 pb-5">
        <div className="container">
          <h2 className="mb-5 fw-bold text-center"> الكورسات المتاحة </h2>
          <div className="swiper swiper-course">
            <div className="swiper-wrapper pt-5">
              <div className="swiper-slide d-flex align-items-stretch">
                <div className="card h-100 w-100 card-course">
                  <a href="">
                    <img src="/images/Login.gif" className="card-img-top" alt="Course 1" />
                  </a>
                  <div className="card-body">
                    <h5 className="card-title-course fw-bold"> مراجعة شهر نوفمبر اولي ثانوي </h5>

                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <small className="text-muted">
                        <i className="far fa-calendar-alt pe-2" aria-hidden="true"></i>
                        10 مارس 2025
                      </small>
                      <span className="badge bg-success">مجاني</span>
                    </div>

                    <p className="card-text card-description">دورة شاملة تغطي أهم الموضوعات مع شروحات مبسطة وتمارين تطبيقية ومراجعات سريعة لتثبيت المعلومات.</p>
                    <Link to="/course-details" className="btn btn-primary w-100">ابدأ الدورة <i className="fas fa-play"></i></Link>
                  </div>
                </div>
              </div>

              <div className="swiper-slide">
                <div className="card h-100 card-course">
                  <a href="">
                    <img src="/images/register.png" className="card-img-top" alt="Course 2" />
                  </a>
                  <div className="card-body">
                    <h5 className="card-title-course fw-bold"> مراجعة شهر نوفمبر ثانية ثانوي </h5>

                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <small className="text-muted">
                        <i className="far fa-calendar-alt pe-2" aria-hidden="true"></i>
                        22 أبريل 2025
                      </small>
                      <span className="badge bg-success">مجاني</span>
                    </div>

                    <p className="card-text card-description">تتضمن الدورة فيديوهات قصيرة، أوراق عمل قابلة للطباعة، واختبارات تقييم ذاتي لقياس التقدم.</p>
                    <Link to="/course-details" className="btn btn-primary w-100">ابدأ الدورة <i className="fas fa-play"></i></Link>
                  </div>
                </div>
              </div>

              <div className="swiper-slide">
                <div className="card h-100 card-course">
                  <a href="">
                    <img src="/images/register.png" className="card-img-top" alt="Course 3" />
                  </a>
                  <div className="card-body">
                    <h5 className="card-title-course fw-bold"> مراجعة شهر نوفمبر ثالثة ثانوي </h5>

                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <small className="text-muted">
                        <i className="far fa-calendar-alt pe-2" aria-hidden="true"></i>
                        05 مايو 2025
                      </small>
                      <span className="badge bg-success">مجاني</span>
                    </div>

                    <p className="card-text card-description">محتوى متدرج يتضمن شروحات نظرية وأمثلة محلولة وتمارين إضافية لدعم الفهم العميق.</p>
                    <Link to="/course-details" className="btn btn-primary w-100">ابدأ الدورة <i className="fas fa-play"></i></Link>
                  </div>
                </div>
              </div>

              <div className="swiper-slide">
                <div className="card h-100 card-course">
                  <a href="">
                    <img src="/images/register.png" className="card-img-top" alt="Course 4" />
                  </a>
                  <div className="card-body">
                    <h5 className="card-title-course fw-bold"> مراجعة شهر نوفمبر ثالثة ثانوي </h5>

                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <small className="text-muted">
                        <i className="far fa-calendar-alt pe-2" aria-hidden="true"></i>
                        15 يونيو 2025
                      </small>
                      <span className="badge bg-success">مجاني</span>
                    </div>

                    <p className="card-text card-description">دورة مركزة للطلاب المستعدين للامتحانات النهائية مع ملخصات ونماذج امتحان مشابهة للأصلية.</p>
                    <Link to="/course-details" className="btn btn-primary w-100">ابدأ الدورة <i className="fas fa-play"></i></Link>
                  </div>
                </div>
              </div>
            </div>
            {/* Add Navigation */}
            <div className="swiper-button-next"><i className="fas fa-chevron-left"></i></div>
            <div className="swiper-button-prev"><i className="fas fa-chevron-right"></i></div>
          </div>
          <div className="d-flex justify-content-center mt-5">
            <Link to="/courses" className="btn btn-secondary btn-lg px-5">عرض المزيد</Link>
          </div>
        </div>
      </div>
      {/* Subscribe Section */}
      <section className="subscribe-section bg-secondary py-5">
        <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-lg-8">
          <h2 className="fw-bold mb-4">اشترك في نشرتنا البريدية</h2>
          <p className="mb-4">احصل على آخر الأخبار والتحديثات عن الدورات الجديدة والعروض الحصرية</p>
          <form className="d-flex gap-2 justify-content-center">
            <input type="email" className="form-control w-50" placeholder="ادخل بريدك الإلكتروني" />
            <button type="submit" className="btn btn-primary">اشتراك</button>
          </form>
          </div>
        </div>
        </div>
      </section>
      {/* Footer */}
      <div className="footer p-4">
        <div className="container-fluid pt-4">
          <div className="row justify-content-between">
            <div className="col-lg-6 col-md-6"><img src="/images/logo.png" alt="img" height="65px" />
              <p className="pt-4 smallText">
                منصة تعليمية تهدف الي تعليم الطلاب بأحدث الطرق الحديثة وابسطها
              </p>
            </div>
            <div className="col-lg-2 col-md-5">
              <p className="smallText mb-2">تواصل معنا من خلال</p>
              <p className="socials">
                <a className="text-decoration-none px-1" href="" target="_blank" rel="noreferrer">
                  <i className="fab fs-4 fa-facebook-square"></i>
                </a>
                <a className="text-decoration-none px-1" href="" target="_blank" rel="noreferrer">
                  <i className="fab fs-4 fa-whatsapp"></i>
                </a>
                <a className="text-decoration-none px-1" href="" target="_blank" rel="noreferrer">
                  <i className="fab fs-4 fa-youtube-square"></i>
                </a>
                <a className="text-decoration-none px-1" href="" target="_blank" rel="noreferrer">
                  <i className="fab fs-4 fa-instagram"></i>
                </a>
              </p>
            </div>
          </div>
          <div className="row border-top mt-4 linkFooter border-secondary justify-content-between text-start">
            <div className="col-lg-6 col-md-5">
              <p className="pt-3 d-none d-md-block">جميع الحقوق محفوظة &copy;
                <a href="https://www.facebook.com/mohamed.essa.abdelhamead/">Mohamed Essa</a>
              </p>
            </div>
            <div className="col-lg-5 col-md-6 pt-3">
              <div className="d-flex justify-content-end">
                <div>
                  <a className="text-decoration-none px-2" href="/privacy-policy">الخصوصية</a>
                  <a className="text-decoration-none px-2" href="/terms">الشروط والأحكام</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
