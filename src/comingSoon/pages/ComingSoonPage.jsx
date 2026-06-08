import "../css/ComingSoonPage.css";
import ComingSoonNavbar from "../components/ComingSoonNavbar";
import HeroSection from "../components/HeroSection";
import WhyEarlyAccess from "../components/WhyEarlyAccess";
import CountdownSection from "../components/CountdownSection";

export default function ComingSoonPage() {
  return (
    <div className="coming-soon-page">
      <div className="hero-section">
        <div className="hero-bg">
          <div className="hero-bg-blend"></div>
          <div className="hero-bg-glow"></div>
        </div>
        <ComingSoonNavbar />
        <HeroSection />
      </div>

      <div className="features-section">
        <WhyEarlyAccess />
        <CountdownSection />
      </div>
    </div>
  );
}
