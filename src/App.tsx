import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/Home";
import SecurityPage from "./pages/Security";
import AboutPage from "./pages/About";
import CareersPage from "./pages/Careers";
import ContactPage from "./pages/Contact";
import PrivacyPage from "./pages/Privacy";

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Routes>
      <Footer />
    </div>
  );
}
