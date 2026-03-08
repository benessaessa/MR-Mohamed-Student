import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import Navbar from './Navbar';
import Footer from './Footer';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [forgotPhone, setForgotPhone] = useState('');
  const [code, setCode] = useState('');
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const redirectToDashboard = () => {
    window.location.href = '/dashboard';
  }
  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login:', { phone, password, rememberMe });
    redirectToDashboard();
  };
  
  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Handle forgot password logic here
    console.log('Forgot password for:', forgotPhone);
    setIsForgotModalOpen(false);
    setIsCodeModalOpen(true);
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    // Handle code submission logic here
    console.log('Code submitted:', code);
    setIsCodeModalOpen(false);
  };

  return (
    <div>
      <Navbar />
      <div className="login-section d-lg-flex">
        <div className="login-form w-100">
          <h4 className="card-title pt-4 pb-4">مرحبا بك في منصة الأستاذ محمد</h4>
          <div className="card text-start mb-4">
            <div className="card-body">
              <h5 className="text-center py-2 mb-2">تسجيل الدخول</h5>
              <form onSubmit={handleLogin}>
                <div className="form-group pt-3">
                  <label htmlFor="emailLogin">رقم التليفون</label>
                  <input
                    type="tel"
                    id="emailLogin"
                    placeholder="رقم التليفون"
                    required
                    className="form-control py-2 text-start"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="form-group mt-3 pb-4">
                  <label htmlFor="passLogin">كلمة المرور</label>
                  <input
                    type="password"
                    id="passLogin"
                    placeholder="كلمة المرور"
                    required
                    className="form-control py-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <div className="custom-control custom-checkbox text-left d-inline float-left">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label className="custom-control-label ps-2" htmlFor="customCheck">تذكرني</label>
                  </div>
                  <span>
                    <button type="button" className="bg-unset border-0 color-dark-mode" onClick={() => setIsForgotModalOpen(true)}>
                      نسيت كلمة المرور
                    </button>
                  </span>
                </div>
                <button type="submit" className="btn btn-primary w-100 py-2 font-weight-bold btn-block mt-3">
                  دخول
                </button>
                <p className="text-center pt-3">
                  <span> ليس لديك حساب؟ </span>
                 <Link to="/register" className="linkColor color-dark-mode fw-bold">سجل الان</Link>
                </p>
              </form>

              {/* Forgot Password Modal */}
              <Modal isOpen={isForgotModalOpen} toggle={() => setIsForgotModalOpen(!isForgotModalOpen)}>
                <ModalHeader toggle={() => setIsForgotModalOpen(!isForgotModalOpen)} className="border-bottom-0">
                  <button type="button" className="btn fs-3 p-0" onClick={() => setIsForgotModalOpen(false)} aria-label="Close">
                    <span aria-hidden="true">
                      <i className="fa fa-times-circle"></i>
                    </span>
                  </button>
                </ModalHeader>
                <ModalBody className="text-center">
                  <h4 className="linkColor font-weight-bold">هل نسيت كلمة المرور</h4>
                  <p className="text-muted">فضلا قم بادخال رقم الهاتف الخاص بحسابك</p>
                  <form onSubmit={handleForgotPassword} className="pt-3">
                    <input
                      type="tel"
                      id="phoneInput"
                      required
                      className="form-control text-start"
                      placeholder="رقم الهاتف"
                      value={forgotPhone}
                      onChange={(e) => setForgotPhone(e.target.value)}
                    />
                    <div id="phoneError" className="text-danger mt-2 text-start" style={{ display: 'none' }}>
                      من فضلك قم بإدخال رقم الهاتف المسجل علي المنصة
                    </div>
                    <button type="submit" className="btn btn-primary font-weight-bold w-100 mt-4" id="submitPhone">
                      ارسال
                    </button>
                  </form>
                </ModalBody>
              </Modal>

              {/* Code Modal */}
              <Modal isOpen={isCodeModalOpen} toggle={() => setIsCodeModalOpen(!isCodeModalOpen)}>
                <ModalHeader toggle={() => setIsCodeModalOpen(!isCodeModalOpen)} className="border-bottom-0">
                  <button type="button" className="btn fs-3 p-0" onClick={() => setIsCodeModalOpen(false)} aria-label="Close">
                    <span aria-hidden="true">
                      <i className="fa fa-times-circle"></i>
                    </span>
                  </button>
                </ModalHeader>
                <ModalBody className="text-center">
                  <h4 className="linkColor font-weight-bold">تم ارسال الكود</h4>
                  <p className="text-muted px-4">فضلا قم بادخال رقم الكود الذي تم ارساله الي رقم التليفون الخاص بكم</p>
                  <div className="pt-3">
                    <input
                      type="text"
                      required
                      className="form-control text-start"
                      placeholder="الكود"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                    <button type="button" onClick={handleCodeSubmit} className="btn btn-primary font-weight-bold w-100 mt-4">
                      ارسال
                    </button>
                  </div>
                </ModalBody>
              </Modal>
            </div>
          </div>
        </div>
        <div className="card-login text-center w-100 d-none d-lg-block">
          <img src="/images/Login.gif" className="img-fluid" alt="" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
