export default function HeroSection() {
  return (
    <section className="cs-hero-container">
      <div className="cs-hero-label">COMING SOON</div>
      <h1 className="cs-hero-title">
        The Next Generation<br />of <span className="cs-red-text">Document Signature</span>
      </h1>
      <p className="cs-hero-desc">
        Nexgn is building the intelligent backbone<br />for a faster, smarter and more connected future
      </p>

      <div className="cs-early-access-block">
        <div className="cs-ea-label">EARLY ACCESS</div>
        <p className="cs-ea-desc">
          Get early access and be the first to experience<br />what's next.
        </p>
        
        <form className="cs-ea-form" onSubmit={(e) => e.preventDefault()}>
          <div className="cs-input-group">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <input type="email" placeholder="Enter your email address" />
          </div>
          <button type="submit" className="cs-ea-submit">
            Join Early Access
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </form>
        
        <div className="cs-privacy">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="1.5">
             <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
             <path d="M9 12l2 2 4-4" />
          </svg>
          <span>We respect your privacy. No spam, ever.</span>
        </div>
      </div>
    </section>
  );
}
