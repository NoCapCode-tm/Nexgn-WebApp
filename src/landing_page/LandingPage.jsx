import React from 'react';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <div className="landing-layout">
      {/* Background Graphic */}
      <img src="/image 46.png" alt="" className="landing-background-left" />

      {/* Navigation */}
      <nav className="landing-nav">
        <div className="landing-nav__left">
          {/* Using a placeholder for the logo, assuming it exists in public folder */}
          <img src="/nexgn-logo.png" alt="Nexgn" className="landing-nav__logo" />
        </div>
        <div className="landing-nav__center">
          <a href="#home" className="landing-nav__link">Home</a>
          <a href="#product" className="landing-nav__link">Product</a>
          <a href="#pricing" className="landing-nav__link">Pricing</a>
        </div>
        <div className="landing-nav__right">
          <a href="#login" className="landing-nav__login">Log in</a>
          <button className="btn-primary">Get Started</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-content__title">
            Fast & Secure<br />
            Digital Document<br />
            Signing
          </h1>
          <p className="hero-content__description">
            Nexgn makes it effortless to send, sign and manage<br />
            documents - all in one secure platform. No printing, no<br />
            scanning, no delays.
          </p>
          <div className="hero-content__actions">
            <button className="btn-primary">Get Started</button>
            <button className="btn-secondary">See how it works</button>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="hero-preview">
          {/* Based on feedback, the static HTML construction is omitted. Using a placeholder image wrapper. */}
          <img src="/image 53.png" alt="Dashboard Preview" className="hero-preview__image" />
        </div>
      </section>
      {/* Features Section */}
      <section className="features-section" id="product">
        <img src="/Gemini_Generated_Image_m9pyvam9pyvam9py 3.png" alt="Network Background" className="features-background" />
        
        <div className="features-container">
          {/* Intro */}
          <div className="features-intro">
            <h3 className="features-subtitle">WHAT IS NEXGN</h3>
            <p className="features-description">
              Nexgn is a digital signature platform built to simplify document signing while maintaining security, trust,<br />
              and compliance. It is designed for modern, India-first digital workflows and built to scale for growing<br />
              teams and businesses.
            </p>
          </div>

          {/* Grid */}
          <div className="features-grid">
            {/* How it works */}
            <div className="how-it-works">
              <h3 className="features-column-title">HOW IT WORKS</h3>
              <div className="timeline">
                <div className="timeline-step">
                  <span className="timeline-number">01</span>
                  <div className="timeline-content">
                    <h4>Upload document</h4>
                    <p>Drag and drop your PDF or document into Nexgn- ready in<br />seconds</p>
                  </div>
                </div>
                <div className="timeline-step">
                  <span className="timeline-number">02</span>
                  <div className="timeline-content">
                    <h4>Add signers</h4>
                    <p>Invite one or multiple signers by email with custom signing<br />order</p>
                  </div>
                </div>
                <div className="timeline-step">
                  <span className="timeline-number">03</span>
                  <div className="timeline-content">
                    <h4>Sign & Complete</h4>
                    <p>Signers receive a link, sign digitally and the sealed document<br />is delivered instantly</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Benefits */}
            <div className="key-benefits">
              <h3 className="features-column-title">KEY BENEFITS</h3>
              <div className="benefits-grid">
                <div className="benefit-card">
                  <span className="benefit-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>
                  </span>
                  <h4>Paperless Workflow</h4>
                </div>
                <div className="benefit-card">
                  <span className="benefit-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                  </span>
                  <h4>Secured & Trusted</h4>
                </div>
                <div className="benefit-card">
                  <span className="benefit-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                  </span>
                  <h4>Simple and Fast</h4>
                </div>
                <div className="benefit-card">
                  <span className="benefit-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 21V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v16" />
                      <path d="M4 21v-8a2 2 0 0 1 2-2h2" />
                      <path d="M20 21v-8a2 2 0 0 0-2-2h-2" />
                      <path d="M4 21h6v-3a2 2 0 0 1 4 0v3h6" />
                      <path d="M10 8h4" />
                      <path d="M10 13h4" />
                    </svg>
                  </span>
                  <h4>Built for Teams</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Extended Features Section */}
      <section className="extended-section">
        <div className="extended-bg-group">
          <div className="extended-background"></div>
          <div className="extended-fade-top"></div>
          <div className="extended-fade-bottom"></div>
        </div>

        {/* Lock Graphic - behind all content */}
        <div className="lock-graphic-container">
          <img src="/Gemini.png" alt="" className="lock-graphic-img" />
          <div className="lock-fade-bottom"></div>
          <div className="lock-fade-right"></div>
        </div>

        <div className="extended-container">
          
          <div className="paperless-block">
            <h3 className="extended-subtitle">FEATURES</h3>
            <h2 className="extended-title">Everything you need to go paperless</h2>
            
            <div className="paperless-grid">
              <div className="paperless-item">
                <div className="paperless-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                </div>
                <p>Document Upload &<br/>Management</p>
              </div>
              <div className="paperless-item">
                <div className="paperless-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <line x1="20" y1="8" x2="20" y2="14"></line>
                    <line x1="23" y1="11" x2="17" y2="11"></line>
                  </svg>
                </div>
                <p>Multi-Signer<br/>Workflows</p>
              </div>
              <div className="paperless-item">
                <div className="paperless-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                    <line x1="12" y1="19" x2="20" y2="19"></line>
                  </svg>
                </div>
                <p>Digital Signatures</p>
              </div>
              <div className="paperless-item">
                <div className="paperless-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                    <line x1="12" y1="11" x2="16" y2="11"></line>
                    <line x1="12" y1="15" x2="16" y2="15"></line>
                    <line x1="8" y1="11" x2="8.01" y2="11"></line>
                    <line x1="8" y1="15" x2="8.01" y2="15"></line>
                  </svg>
                </div>
                <p>Audit Trail & PDF<br/>Download</p>
              </div>

            
            <div className="paperless-line-1"></div>
            <div className="paperless-line-2"></div>
            <div className="paperless-line-3"></div>
          </div>
          </div>

          <div className="security-block">
            <h3 className="extended-subtitle">TRUST & SECURITY</h3>
            <h2 className="extended-title">Your documents are in safe hands</h2>
            
            <div className="security-grid">
              <div className="security-card">
                <div className="security-icon">
                  <svg width="29" height="29" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <h4>Secure Signing</h4>
                <p>End-to-end encryption for<br/>documents and signature exchanges.</p>
              </div>
              <div className="security-card">
                <div className="security-icon">
                  <svg width="29" height="29" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M 17 5 H 5 a 2 2 0 0 0 -2 2 a 2 2 0 0 0 2 2 H 7 V 19 H 19 a 2 2 0 0 0 2 -2 a 2 2 0 0 0 -2 -2 H 17 V 5 z" />
                    <line x1="9" y1="10" x2="15" y2="10" />
                    <line x1="9" y1="14" x2="15" y2="14" />
                  </svg>
                </div>
                <h4>Audit Logs</h4>
                <p>Timestamped activity logs for every<br/>document and user action.</p>
              </div>
              <div className="security-card">
                <div className="security-icon">
                  <svg width="29" height="29" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="6" rx="2" ry="2" />
                    <rect x="2" y="14" width="20" height="6" rx="2" ry="2" />
                    <circle cx="6" cy="7" r="1" fill="white" stroke="none" />
                    <circle cx="6" cy="17" r="1" fill="white" stroke="none" />
                  </svg>
                </div>
                <h4>Reliable Infrastructure</h4>
                <p>High uptime with secure cloud<br/>backups.</p>
              </div>
            </div>
          </div>
          
        </div>
      </section>
    </div>
  );
}
