export default function CountdownSection() {
  return (
    <section className="cs-countdown-section">
      <div className="cs-countdown-card">
        <h3 className="cs-countdown-label">LAUNCHING IN</h3>
        
        <div className="cs-countdown-grid">
          <div className="cs-cd-block">
            <div className="cs-cd-number">26</div>
            <div className="cs-cd-text">DAYS</div>
          </div>
          
          <div className="cs-cd-divider"></div>
          
          <div className="cs-cd-block">
            <div className="cs-cd-number">12</div>
            <div className="cs-cd-text">HOURS</div>
          </div>
          
          <div className="cs-cd-divider"></div>
          
          <div className="cs-cd-block">
            <div className="cs-cd-number">48</div>
            <div className="cs-cd-text">MINUTES</div>
          </div>
          
          <div className="cs-cd-divider"></div>
          
          <div className="cs-cd-block">
            <div className="cs-cd-number">35</div>
            <div className="cs-cd-text">SECONDS</div>
          </div>
        </div>
      </div>
    </section>
  );
}
