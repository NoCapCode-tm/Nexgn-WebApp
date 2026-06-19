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
            <button className="btn-primary btn-primary--hero">Get Started</button>
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
    </div>
  );
}
