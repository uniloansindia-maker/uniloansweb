import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import HeroSlider from './components/HeroSlider';
import FeaturesSection from './components/FeaturesSection';
import LeadForm from './components/LeadForm';
import Calculator from './components/Calculator';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FloatingWidget from './components/FloatingWidget';

export default function App() {
  return (
    <LanguageProvider>
      <div className="overflow-x-hidden">
        <Navbar />

        <HeroSlider />

        {/* Why UniLoans */}
        <FeaturesSection />

        {/* Lead Capture Form */}
        <LeadForm />

        {/* EMI & Eligibility Calculators */}
        <Calculator />

        {/* Contact Section */}
        <ContactSection />

        {/* Footer */}
        <Footer />

        {/* Floating Call / WhatsApp Widget */}
        <FloatingWidget />
      </div>
    </LanguageProvider>
  );
}
