import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import AnalyzerPage from './Pages/AnalyzerPage';
import HowItWorksPage from './Pages/HowItWorksPage';
import MediscanDashboardPage from './Pages/DashboardPage';
import BookDemoPage from './Pages/BookDemoPage';
import SignupPage from './Pages/SignupPage';
import PricingPage from './Pages/PricingPage';
import SupportPage from './Pages/SupportPage';
import './style.css';
import ContactPage from './Pages/ContactPage';
import PrivacyPage from './Pages/PrivacyPage';
import FAQPage from './Pages/FAQPage';
import AcceptableUsePage from './Pages/AcceptableUsePage';
import DataSecurityPage from './Pages/DataSecurityPage';
import TermsPage from './Pages/TermsPage';
import SigninPage from './Pages/SigninPage';
import ForgotPasswordPage from './Pages/ForgotPasswordPage';
import UserGuidesPage from './Pages/UserGuidesPage';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="page-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/analyze" element={<AnalyzerPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/dashboard" element={<MediscanDashboardPage />} />
          <Route path="/book-demo" element={<BookDemoPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/guides" element={<UserGuidesPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/acceptable-use" element={<AcceptableUsePage />} />
          <Route path="/data-security" element={<DataSecurityPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
