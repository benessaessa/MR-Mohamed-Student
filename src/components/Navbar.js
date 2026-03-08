import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  
  // Check if user is logged in based on current page
  // Show logged-in UI on all pages except login, register, and home
  const isLoggedIn = !['/', '/login', '/register'].includes(location.pathname);
  
  // Placeholder wallet value - replace with actual auth context in production
  const wallet = 0;

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    if (newDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex" to="/">
          <img src="/images/logo.png" className="navbar-img" alt="" />
        </Link>
        
        {/* Mobile dark mode toggle - moved outside the brand link */}
        <div className="d-lg-none d-flex align-items-center me-auto">
          <div className="theme-switch">
            <input type="checkbox" id="darkModeToggle" checked={darkMode} onChange={toggleDarkMode} />
            <label htmlFor="darkModeToggle" className="switch-label">
              <span className="icon sun"><i className="fas fa-sun"></i></span>
              <span className="icon moon"><i className="fas fa-moon"></i></span>
            </label>
          </div>
        </div>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Desktop dark mode toggle */}
          <div className="d-lg-flex d-none align-items-center ms-3">
            <div className="theme-switch">
              <input type="checkbox" id="darkModeToggleDesktop" checked={darkMode} onChange={toggleDarkMode} />
              <label htmlFor="darkModeToggleDesktop" className="switch-label">
                <span className="icon sun"><i className="fas fa-sun"></i></span>
                <span className="icon moon"><i className="fas fa-moon"></i></span>
              </label>
            </div>
          </div>
          
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-2 align-items-lg-center align-items-start pt-3 pt-lg-0">
            {/* Show when logged in: Profile, Notifications, Wallet */}
            {isLoggedIn ? (
              <>
                {/* Mobile menu items */}
                <div className="d-lg-none d-block">
                  <li className="nav-item mb-3">
                    <Link to="/dashboard" className="nav-link">
                      <i className="fas fa-home me-2"></i>
                      <span> الرئيسية</span>
                    </Link>
                  </li>
                  <li className="nav-item mb-3">
                    <Link to="/my-courses" className="nav-link">
                      <i className="fas fa-graduation-cap me-2"></i>
                      <span>كورساتي</span>
                    </Link>
                  </li>
                  <li className="nav-item mb-3">
                    <Link to="/courses" className="nav-link">
                      <i className="fas fa-book me-2"></i>
                      <span>جميع الكورسات</span>
                    </Link>
                  </li>
                  <li className="nav-item mb-3">
                    <Link to="/requests-courses" className="nav-link">
                      <i className="fas fa-edit me-2"></i>
                      <span>كورساتنا المقترحة</span>
                    </Link>
                  </li>
                </div>
                
                {/* Wallet */}
                <Link to="/profile" className="text-decoration-none">
                  <li className="custom-badge d-flex align-items-center">
                    <span className="ms-2">{wallet} جنيه</span>
                    <div className="icon-circle">
                      <i className="fas fa-wallet"></i>
                    </div>
                  </li>
                </Link>
                
                {/* Notifications dropdown */}
                <li className="nav-item dropdown">
                  <a className="nav-link position-relative" href="#" id="notificationsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" aria-label="الإشعارات">
                    <i className="fas fa-bell fs-3"></i>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="notificationsDropdown">
                    <li><h6 className="dropdown-header">الإشعارات</h6></li>
                    <li><Link className="dropdown-item" to="/notifications">رسالة جديدة من المعلم</Link></li>
                    <li><Link className="dropdown-item" to="/notifications">تم إضافة درس جديد</Link></li>
                    <li><Link className="dropdown-item" to="/notifications">تذكير بدفع المحفظة</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className="dropdown-item text-center" to="/notifications">عرض كل الإشعارات</Link></li>
                  </ul>
                </li>

                {/* Profile dropdown */}
                <li className="nav-item dropdown">
                  <a className="nav-link d-flex align-items-center" href="#" id="profileDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" aria-label="الملف الشخصي">
                    <i className="fa fa-user-circle fs-3"></i>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                    <li><Link className="dropdown-item" to="/profile"><i className="fas fa-user me-2"></i>الملف الشخصي</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className="dropdown-item text-danger" to="/login"><i className="fas fa-sign-out-alt me-2"></i>تسجيل الخروج</Link></li>
                  </ul>
                </li>
              </>
            ) : (
              /* Show when not logged in: Login and Register buttons */
              <>
                <li className="nav-item">
                  <Link className="btn btn-primary" to="/login">تسجيل الدخول</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-secondary" to="/register">إنشاء حساب</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
