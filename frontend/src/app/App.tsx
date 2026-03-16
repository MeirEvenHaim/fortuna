import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LevElLev } from './pages/LevElLev';
import { FeedbackPage } from './pages/FeedbackPage';
import { OrderPage } from './pages/OrderPage';
import { AboutPage } from './pages/AboutPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { JourneyPage } from './pages/JourneyPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { VideoCoursesPage } from './pages/VideoCoursesPage';
import { CommunityPage } from './pages/CommunityPage';
import { Navigation } from './components/Navigation';
// import { WhatsAppButton } from './components/WhatsAppButton';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen" dir="rtl">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lev-el-lev" element={<LevElLev />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/journey" element={<JourneyPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/courses" element={<VideoCoursesPage />} />
          <Route path="/community" element={<CommunityPage />} />
        </Routes>
        {/* <WhatsAppButton /> */}
      </div>
    </Router>
  );
}