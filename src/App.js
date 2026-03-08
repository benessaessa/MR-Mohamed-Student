import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Courses from './components/Courses';
import CourseDetails from './components/CourseDetails';
import MyCourses from './components/MyCourses';
import Exam from './components/Exam';
import Subscribe from './components/Subscribe';
import Fawry from './components/Fawry';
import RequestsCourses from './components/RequestsCourses';
import Notifications from './components/Notifications';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course-details" element={<CourseDetails />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/fawry" element={<Fawry />} />
          <Route path="/requests-courses" element={<RequestsCourses />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
