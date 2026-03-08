import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import '../css/exam-enhanced.css';

// Exam data from js/exam-new.js
const exams = {
  "lesson1": [
    {
      "question": "ما المقصود بعلم التاريخ؟",
      "answers": ["دراسة الماضي البعيد فقط", "دراسة الأحداث التي وقعت في الماضي", "دراسة الجغرافيا القديمة"],
      "correct": 1
    },
    {
      "question": "ما مصدر معرفتنا بحياة المصريين القدماء؟",
      "answers": ["الحفريات فقط", "النقوش والبرديات والآثار", "الروايات الشفهية"],
      "correct": 1
    },
    {
      "question": "من هو مؤسس أول أسرة حاكمة في مصر القديمة؟",
      "answers": ["نارمر (مينا)", "أحمس", "خوفو"],
      "correct": 0
    },
    {
      "question": "ما العاصمة التي اتخذها الملك مينا بعد توحيد البلاد؟",
      "answers": ["طيبة", "منف", "الإسكندرية"],
      "correct": 1
    },
    {
      "question": "ما أهم إنجازات عصر الدولة القديمة؟",
      "answers": ["بناء الأهرامات", "طرد الهكسوس", "تأسيس الإمبراطورية المصرية"],
      "correct": 0
    },
    {
      "question": "إلى أي عصر ينتمي الملك خوفو؟",
      "answers": ["الدولة القديمة", "الدولة الوسطى", "الدولة الحديثة"],
      "correct": 0
    },
    {
      "question": "بماذا تميزت الدولة الوسطى في مصر القديمة؟",
      "answers": ["بناء الأهرامات", "الاستقرار والنهضة الاقتصادية", "طرد الهكسوس"],
      "correct": 1
    },
    {
      "question": "من القائد الذي طرد الهكسوس من مصر؟",
      "answers": ["أحمس", "تحتمس الثالث", "رمسيس الثاني"],
      "correct": 0
    },
    {
      "question": "ما أشهر إنجازات الملك تحتمس الثالث؟",
      "answers": ["بناء السدود", "إنشاء إمبراطورية مصرية قوية", "بناء الهرم الأكبر"],
      "correct": 1
    },
    {
      "question": "ما النظام الذي كان يحكم مصر القديمة؟",
      "answers": ["جمهوري", "ملكي وراثي", "ديمقراطي"],
      "correct": 1
    }
  ],
  "lesson2": [
    {
      question: "ماذا تعني HTML ؟",
      answers: ["HyperText Markup Language", "How To Make Lasagna"],
      correct: 0
    }
  ],
  "lesson3": [
    {
      question: "أطول نهر في العالم هو:",
      answers: ["الأمازون", "النيل", "الكونغو"],
      correct: 1
    }
  ]
};

const Exam = () => {
  const [searchParams] = useSearchParams();
  const lessonName = searchParams.get('lesson') || 'lesson1';
  const examData = exams[lessonName];

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [examStarted, setExamStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  const [hasSavedState, setHasSavedState] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    // Initialize AOS if needed
    if (window.AOS) {
      window.AOS.init();
    }

    // Load saved exam state
    const hasState = loadExamState();
    setHasSavedState(hasState);

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

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      window.removeEventListener('scroll', adjustSidebarSticky);
      window.removeEventListener('resize', adjustSidebarSticky);
    };
  }, []);

  // Save and load exam state functions
  const saveExamState = () => {
    const examState = {
      currentQuestionIndex,
      userAnswers,
      timeLeft,
      examStarted
    };
    localStorage.setItem('examState_' + lessonName, JSON.stringify(examState));
  };

  const loadExamState = () => {
    const savedState = localStorage.getItem('examState_' + lessonName);
    if (savedState) {
      const state = JSON.parse(savedState);
      setCurrentQuestionIndex(state.currentQuestionIndex);
      setUserAnswers(state.userAnswers);
      setTimeLeft(state.timeLeft);
      // Do not set examStarted here to hide questions until continue is clicked
      return true;
    }
    return false;
  };

  const clearExamState = () => {
    localStorage.removeItem('examState_' + lessonName);
  };

  const startTimer = () => {
    const newTimer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(newTimer);
          submitExam();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    timerRef.current = newTimer;
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const startExam = () => {
    clearExamState();
    setExamStarted(true);
    setUserAnswers(new Array(examData.length).fill(null));
    setTimeLeft(30 * 60);
    setCurrentQuestionIndex(0);
    setShowInstructions(false);
    startTimer();
  };

  const resumeExam = () => {
    if (loadExamState()) {
      setExamStarted(true);
      startTimer();
      setShowInstructions(false);
    }
  };

  const submitExam = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setExamStarted(false);

    // Calculate results
    let correctAnswers = 0;
    let wrongAnswers = 0;

    examData.forEach((question, index) => {
      if (userAnswers[index] === question.correct) {
        correctAnswers++;
      } else {
        wrongAnswers++;
      }
    });

    const totalQuestions = examData.length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    let grade = '';

    if (percentage >= 90) grade = 'ممتاز';
    else if (percentage >= 80) grade = 'جيد جداً';
    else if (percentage >= 70) grade = 'جيد';
    else if (percentage >= 60) grade = 'مقبول';
    else grade = 'راسب';

    const resultsData = {
      correct: correctAnswers,
      wrong: wrongAnswers,
      grade,
      percentage,
      totalQuestions
    };

    setResults(resultsData);
    setShowResults(true);
    clearExamState();
  };

  const jumpToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  const selectOption = (optionIndex) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setUserAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < examData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      submitExam();
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const endExam = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    saveExamState();
    window.location.href = '/my-courses';
  };

  const retakeExam = () => {
    setTimeLeft(30 * 60);
    startExam();
  };

  const goToCourses = () => {
    window.location.href = '/my-courses';
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Sample questions - in real app, this would come from props or API
  const questions = [
    {
      id: 1,
      question: 'ما هو الإجابة الصحيحة للسؤال الأول؟',
      options: ['الإجابة أ', 'الإجابة ب', 'الإجابة ج', 'الإجابة د'],
      correctAnswer: 'أ'
    },
    {
      id: 2,
      question: 'ما هو الإجابة الصحيحة للسؤال الثاني؟',
      options: ['الإجابة أ', 'الإجابة ب', 'الإجابة ج', 'الإجابة د'],
      correctAnswer: 'ب'
    }
  ];

  // If lesson not found
  if (!examData) {
    return (
      <div>
        <Navbar />
        <div className="container mt-5 pt-4">
          <div className="alert alert-danger text-center">
            هذا الامتحان غير موجود!
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
            <div className="col-lg-12">
              <div className="card mb-4">
                <div className="card-body">
                  {showInstructions && (
                    <div className="exam-instructions-card">
                      <div className="instructions-header">
                        <h3>امتحان الدرس</h3>
                        <i className="fas fa-graduation-cap"></i>
                      </div>
                      <div className="instructions-body">
                        <div className="exam-info-grid">
                          <div className="info-item">
                            <i className="fas fa-clock"></i>
                            <div className="info-content">
                              <span className="info-label">الوقت</span>
                              <span className="info-value">30 دقيقة</span>
                            </div>
                          </div>
                          <div className="info-item">
                            <i className="fas fa-question-circle"></i>
                            <div className="info-content">
                              <span className="info-label">عدد الأسئلة</span>
                              <span className="info-value">{examData.length}</span>
                            </div>
                          </div>
                          <div className="info-item">
                            <i className="fas fa-list"></i>
                            <div className="info-content">
                              <span className="info-label">نوع الأسئلة</span>
                              <span className="info-value">متعدد الخيارات</span>
                            </div>
                          </div>
                        </div>
                        <div className="exam-description">
                          <p>هذا الامتحان يتكون من {examData.length} أسئلة متعددة الخيارات. الوقت المحدد هو 30 دقيقة.</p>
                        </div>
                        <div className="exam-rules">
                          <h5><i className="fas fa-exclamation-triangle"></i> قواعد الامتحان:</h5>
                          <ul>
                            <li><i className="fas fa-arrow-left"></i> يمكن العودة للأسئلة السابقة</li>
                            <li><i className="fas fa-tasks"></i> يجب الإجابة على جميع الأسئلة</li>
                            <li><i className="fas fa-check-circle"></i> سيتم تصحيح الإجابات تلقائياً</li>
                            <li><i className="fas fa-chart-bar"></i> النتيجة ستظهر فوراً بعد الانتهاء</li>
                          </ul>
                        </div>
                        {hasSavedState && (
                          <div className="saved-exam-notice">
                            <div className="alert alert-info">
                              <i className="fas fa-info-circle"></i> لديك امتحان محفوظ سابقاً. يمكنك الاستمرار من حيث توقفت أو البدء من جديد.
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="instructions-footer">
                        {hasSavedState ? (
                          <>
                            <button className="btn btn-success btn-lg me-2" onClick={resumeExam}>
                              <i className="fas fa-play"></i> استمر في الامتحان
                            </button>
                            <button className="btn btn-primary btn-lg" onClick={startExam}>
                              <i className="fas fa-redo"></i> ابدأ من جديد
                            </button>
                          </>
                        ) : (
                          <button className="btn btn-primary btn-lg" onClick={startExam}>
                            <i className="fas fa-play"></i> ابدأ الامتحان
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {examStarted && !showResults && (
                    <div className="exam-layout">
                      <div className="question-main">
                        <div className="exam-timer-display">
                          <div className="timer-icon">
                            <i className="fas fa-clock"></i>
                          </div>
                          <div className="timer-content">
                            <span className="timer-label">الوقت المتبقي</span>
                            <span className={`timer-value ${timeLeft <= 300 ? 'warning' : ''}`}>
                              {formatTime(timeLeft)}
                            </span>
                          </div>
                        </div>
                        <div className="question-card">
                          <div className="question-header">
                            <div className="question-title-row">
                              <span className="question-number">الأسئلة</span>
                            </div>
                            <div className="question-progress-row">
                              <div className="progress-bar">
                                <div className="progress-fill" style={{ width: `${(currentQuestionIndex + 1) / examData.length * 100}%` }}></div>
                              </div>
                            </div>
                            <div className="question-navigation-row">
                              <div className="question-list">
                                {examData.map((_, i) => (
                                  <button
                                    key={i}
                                    className={`question-nav-btn ${i === currentQuestionIndex ? 'active' : ''} ${userAnswers[i] !== null ? 'answered' : ''}`}
                                    onClick={() => jumpToQuestion(i)}
                                  >
                                    {i + 1}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="question-actions mb-3">
                            <button className="btn btn-warning" onClick={endExam}>
                              <i className="fas fa-pause"></i> إنهاء الامتحان واستمرار لاحقاً
                            </button>
                          </div>
                          <div className="question-content">
                            <h5 className="question-text">{examData[currentQuestionIndex]?.question}</h5>
                            <div className="options">
                              {examData[currentQuestionIndex]?.answers.map((option, optionIndex) => (
                                <div
                                  key={optionIndex}
                                  className={`option ${userAnswers[currentQuestionIndex] === optionIndex ? 'selected' : ''}`}
                                  onClick={() => selectOption(optionIndex)}
                                >
                                  <input
                                    type="radio"
                                    name={`question-${currentQuestionIndex}`}
                                    value={optionIndex}
                                    id={`option-${currentQuestionIndex}-${optionIndex}`}
                                    checked={userAnswers[currentQuestionIndex] === optionIndex}
                                    onChange={() => selectOption(optionIndex)}
                                  />
                                  <label htmlFor={`option-${currentQuestionIndex}-${optionIndex}`}>{option}</label>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="question-footer">
                            <button
                              className="btn btn-secondary"
                              onClick={previousQuestion}
                              disabled={currentQuestionIndex === 0}
                            >
                              <i className="fas fa-arrow-right"></i> السابق
                            </button>
                            <button className="btn btn-primary" onClick={nextQuestion}>
                              {currentQuestionIndex === examData.length - 1 ? 'تسليم الامتحان' : 'التالي'} <i className="fas fa-arrow-left"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {showResults && results && (
                    <div className="results-container">
                      <h3 className="text-center mb-4">نتائج الامتحان</h3>
                      <div className="results-cards">
                        <div className="result-card correct-card">
                          <div className="card-icon">
                            <i className="fas fa-check-circle"></i>
                          </div>
                          <div className="card-content">
                            <h4>{results.correct}</h4>
                            <p>إجابات صحيحة</p>
                          </div>
                        </div>
                        <div className="result-card wrong-card">
                          <div className="card-icon">
                            <i className="fas fa-times-circle"></i>
                          </div>
                          <div className="card-content">
                            <h4>{results.wrong}</h4>
                            <p>إجابات خاطئة</p>
                          </div>
                        </div>
                        <div className="result-card grade-card">
                          <div className="card-icon">
                            <i className="fas fa-graduation-cap"></i>
                          </div>
                          <div className="card-content">
                            <h4>{results.grade}</h4>
                            <p>{results.percentage}%</p>
                          </div>
                        </div>
                      </div>
                      <div className="result-message text-center mt-4">
                        {results.percentage >= 60 ? (
                          <div className="success-message py-4">
                            <i className="fas fa-trophy"></i>
                            <h5>مبروك! لقد نجحت في الامتحان</h5>
                          </div>
                        ) : (
                          <div className="fail-message py-4">
                            <i className="fas fa-exclamation-triangle"></i>
                            <h5>تحتاج إلى المراجعة والمحاولة مرة أخرى</h5>
                          </div>
                        )}
                      </div>
                      <div className="correct-answers-section mt-5">
                        <h4 className="text-center mb-4">الإجابات الصحيحة</h4>
                        <div className="answers-grid">
                          {examData.map((question, index) => {
                            const userAnswer = userAnswers[index];
                            const correctAnswer = question.correct;
                            const isCorrect = userAnswer === correctAnswer;
                            return (
                              <div key={index} className={`answer-card ${isCorrect ? 'correct-answer' : 'wrong-answer'}`}>
                                <div className="answer-header">
                                  <span className="answer-number">السؤال {index + 1}</span>
                                  <span className="answer-status">
                                    {isCorrect ? (
                                      <>
                                        <i className="fas fa-check"></i> صحيح
                                      </>
                                    ) : (
                                      <>
                                        <i className="fas fa-times"></i> خطأ
                                      </>
                                    )}
                                  </span>
                                </div>
                                <div className="answer-content">
                                  <h6 className="answer-question">{question.question}</h6>
                                  <div className="answer-options">
                                    {question.answers.map((option, optionIndex) => (
                                      <div
                                        key={optionIndex}
                                        className={`answer-option ${
                                          optionIndex === correctAnswer ? 'correct' : ''
                                        } ${
                                          optionIndex === userAnswer && !isCorrect ? 'user-wrong' : ''
                                        }`}
                                      >
                                        {option}
                                        {optionIndex === correctAnswer && <i className="fas fa-check-circle"></i>}
                                        {optionIndex === userAnswer && !isCorrect && <i className="fas fa-times-circle"></i>}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="text-center pt-5 pb-4">
                        <button className="btn btn-primary" onClick={retakeExam}>
                          إعادة الامتحان
                        </button>
                        <button className="btn btn-secondary" onClick={goToCourses}>
                          العودة للكورسات
                        </button>
                      </div>
                    </div>
                  )}
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

export default Exam;
