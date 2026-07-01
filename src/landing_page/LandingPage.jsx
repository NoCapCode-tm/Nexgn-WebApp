import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import './LandingPage.css';

import bgLeftDark from '../assets/bg-left-dark.png';
import bgLeftLight from '../assets/bg-left-light.png';
import logoDark from '../assets/logo-dark.png';
import logoLight from '../assets/logo-light.png';
import heroPreviewDark from '../assets/hero-preview-dark.png';
import heroPreviewLight from '../assets/hero-preview-light.png';
import featuresBgDark from '../assets/features-bg-dark.png';
import featuresBgLight from '../assets/features-bg-light.png';
import lockGraphicDark from '../assets/lock-graphic-dark.png';
import lockGraphicLight from '../assets/lock-graphic-light.png';

export default function LandingPage() {
  const [isSystemDark, setIsSystemDark] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [manualTheme, setManualTheme] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = (e) => {
        setIsSystemDark(e.matches);
      };
      
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
      } else {
        mediaQuery.addListener(handleChange);
      }
      
      return () => {
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener('change', handleChange);
        } else {
          mediaQuery.removeListener(handleChange);
        }
      };
    }
  }, []);

  const isDarkMode = manualTheme !== null ? manualTheme === 'dark' : isSystemDark;

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setManualTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <div className="landing-layout">

      {/* Background Decoration */}
      <img src={isDarkMode ? bgLeftDark : bgLeftLight} alt="" className="landing-background-left" />

      {/* ── Navigation ────────────────────────────────────────────── */}
      <nav className="landing-nav">
        <div className="landing-nav__left">
          <img src={isDarkMode ? logoDark : logoLight} alt="Nexgn" className="landing-nav__logo" />
        </div>
        <div className="landing-nav__center">
          <a href="#home"    className="landing-nav__link">Home</a>
          <a href="#product" className="landing-nav__link">Product</a>
          <a href="#pricing" className="landing-nav__link">Pricing</a>
        </div>
        <div className="landing-nav__right">
          <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle theme">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <a href="#login" className="landing-nav__login">Log in</a>
          <button className="btn-primary">Get Started</button>
        </div>
      </nav>

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-content__title">
            Fast &amp; Secure<br />
            Digital Document<br />
            Signing
          </h1>
          <p className="hero-content__description">
            <span className="mobile-line">Nexgn makes it effortless to send, sign and manage</span>{' '}
            <span className="mobile-line">documents _ all in one secure platform. No printing, no</span>{' '}
            <span className="mobile-line">scanning, no delays.</span>
          </p>
          <div className="hero-content__actions">
            <button className="btn-primary">Get Started</button>
            <button className="btn-secondary">See how it works</button>
          </div>
        </div>

        {/* Dashboard Preview Image */}
        <div className="hero-preview">
          <img src={isDarkMode ? heroPreviewDark : heroPreviewLight} alt="Dashboard Preview" className="hero-preview__image" />
        </div>
      </section>

      {/* ── Features Section ──────────────────────────────────────── */}
      <section className="features-section" id="product">
        <img
          src={isDarkMode ? featuresBgDark : featuresBgLight}
          alt="Network Background"
          className="features-background"
        />

        <div className="features-container">
          {/* Intro */}
          <div className="features-intro">
            <h3 className="features-subtitle">WHAT IS NEXGN</h3>
            <p className="features-description">
              <span className="mobile-line">Nexgn is a digital signature platform built to simplify document</span>{' '}
              <span className="mobile-line">signing while maintaining security, trust, and compliance. It is</span>{' '}
              <span className="mobile-line">designed for modern, India-first digital workflows and built to</span>{' '}
              <span className="mobile-line">scale for growing teams and businesses.</span>
            </p>
          </div>

          {/* Two-column grid: How it Works + Key Benefits */}
          <div className="features-grid">

            {/* How It Works – numbered timeline */}
            <div className="how-it-works">
              <h3 className="features-column-title">HOW IT WORKS</h3>
              <div className="timeline">
                <div className="timeline-step">
                  <span className="timeline-number">01</span>
                  <div className="timeline-content">
                    <h4>Upload document</h4>
                    <p>
                      <span className="mobile-line">Drag and drop your PDF or document into Nexgn- ready in</span>{' '}
                      <span className="mobile-line">seconds</span>
                    </p>
                  </div>
                </div>
                <div className="timeline-step">
                  <span className="timeline-number">02</span>
                  <div className="timeline-content">
                    <h4>Add signers</h4>
                    <p>
                      <span className="mobile-line">Invite one or multiple signers by email with custom signing</span>{' '}
                      <span className="mobile-line">order</span>
                    </p>
                  </div>
                </div>
                <div className="timeline-step">
                  <span className="timeline-number">03</span>
                  <div className="timeline-content">
                    <h4>Sign &amp; Complete</h4>
                    <p>
                      <span className="mobile-line">Signers receive a link, sign digitally and the sealed document</span>{' '}
                      <span className="mobile-line">is delivered instantly</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Benefits – 2×2 card grid */}
            <div className="key-benefits">
              <h3 className="features-column-title">KEY BENEFITS</h3>
              <div className="benefits-grid">
                <div className="benefit-card">
                  <span className="benefit-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
                      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
                    </svg>
                  </span>
                  <h4>Paperless Workflow</h4>
                </div>
                <div className="benefit-card">
                  <span className="benefit-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </span>
                  <h4>Secured &amp; Trusted</h4>
                </div>
                <div className="benefit-card">
                  <span className="benefit-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                    </svg>
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

      {/* ── Extended Features (Paperless + Trust & Security) ──────── */}
      <section className="extended-section">

        {/* Background: image 62 + fade overlays (mobile only) */}
        <div className="extended-bg-group">
          <div className="extended-background"></div>
          <div className="extended-fade-top"></div>
          <div className="extended-fade-bottom"></div>
        </div>

        {/* Decorative lock graphic */}
        <div className="lock-graphic-container">
          <img src={isDarkMode ? lockGraphicDark : lockGraphicLight} alt="" className="lock-graphic-img" />
          <div className="lock-fade-bottom"></div>
          <div className="lock-fade-right"></div>
        </div>

        <div className="extended-container">

          {/* Paperless Block */}
          <div className="paperless-block">
            <h3 className="extended-subtitle">FEATURES</h3>
            <h2 className="extended-title">Everything you need to go paperless</h2>

            <div className="paperless-grid">
              <div className="paperless-item">
                <div className="paperless-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                </div>
                <p>Document Upload &amp;<br/>Management</p>
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
                <p>Audit Trail &amp; PDF<br/>Download</p>
              </div>

              {/* Decorative connecting lines (desktop only) */}
              <div className="paperless-line-1"></div>
              <div className="paperless-line-2"></div>
              <div className="paperless-line-3"></div>
            </div>
          </div>

          {/* Trust & Security Block */}
          <div className="security-block">
            <h3 className="extended-subtitle">TRUST &amp; SECURITY</h3>
            <h2 className="extended-title">Your documents are in safe hands</h2>

            <div className="security-grid">
              {/* Secure Signing */}
              <div className="security-card">
                <div className="security-icon">
                  <svg width="29" height="29" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <div className="security-text">
                  <h4>Secure Signing</h4>
                  <p>
                    <span className="mobile-line">End-to-end encryption for documents</span>{' '}
                    <span className="mobile-line">and signature exchanges.</span>
                  </p>
                </div>
              </div>

              {/* Audit Logs */}
              <div className="security-card">
                <div className="security-icon">
                  <svg width="29" height="29" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M 17 5 H 5 a 2 2 0 0 0 -2 2 a 2 2 0 0 0 2 2 H 7 V 19 H 19 a 2 2 0 0 0 2 -2 a 2 2 0 0 0 -2 -2 H 17 V 5 z" />
                    <line x1="9" y1="10" x2="15" y2="10" />
                    <line x1="9" y1="14" x2="15" y2="14" />
                  </svg>
                </div>
                <div className="security-text">
                  <h4>Audit Logs</h4>
                  <p>
                    <span className="mobile-line">Timestamped activity logs for every</span>{' '}
                    <span className="mobile-line">document and user action.</span>
                  </p>
                </div>
              </div>

              {/* Reliable Infrastructure */}
              <div className="security-card">
                <div className="security-icon">
                  <svg width="29" height="29" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4"  width="20" height="6" rx="2" ry="2" />
                    <rect x="2" y="14" width="20" height="6" rx="2" ry="2" />
                    <circle cx="6" cy="7"  r="1" fill="white" stroke="none" />
                    <circle cx="6" cy="17" r="1" fill="white" stroke="none" />
                  </svg>
                </div>
                <div className="security-text">
                  <h4>Reliable Infrastructure</h4>
                  <p>
                    <span className="mobile-line">High uptime with secure cloud</span>{' '}
                    <span className="mobile-line">backups.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Pricing Section ───────────────────────────────────────── */}
      <section className="pricing-section" id="pricing">
        <div className="pricing-container">
          <div className="pricing-header">
            <h3 className="extended-subtitle">FEATURES</h3>
            <h2 className="extended-title">Plans for every stage</h2>
            <p className="pricing-description">
              <span className="mobile-line">Simple, transparent plans designed around</span>{' '}
              <span className="mobile-line">usage and team size.</span>
            </p>
          </div>

          <div className="pricing-grid">

            {/* Free Plan */}
            <div className="pricing-card">
              <h3 className="pricing-price">$0</h3>
              <h4 className="pricing-name">Free</h4>
              <p className="pricing-target">Perfect for individuals and early exploration.</p>
              <ul className="pricing-features">
                <li><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E22A2A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="pricing-check"><polyline points="20 6 9 17 4 12"></polyline></svg> 25 documents per month</li>
                <li><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E22A2A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="pricing-check"><polyline points="20 6 9 17 4 12"></polyline></svg> Basic signing workflow</li>
                <li><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E22A2A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="pricing-check"><polyline points="20 6 9 17 4 12"></polyline></svg> Limited templates</li>
                <li><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E22A2A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="pricing-check"><polyline points="20 6 9 17 4 12"></polyline></svg> No credit card required</li>
              </ul>
              <button className="btn-primary pricing-btn">Choose Free</button>
            </div>

            {/* Starter Plan (Popular) */}
            <div className="pricing-card pricing-card--highlighted">
              <div className="pricing-badge">Popular</div>
              <h3 className="pricing-price">$9<span className="pricing-period">/month</span></h3>
              <h4 className="pricing-name">Starter</h4>
              <p className="pricing-target">Built for freelancers and small businesses.</p>
              <ul className="pricing-features">
                <li><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E22A2A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="pricing-check"><polyline points="20 6 9 17 4 12"></polyline></svg> 100 documents per month</li>
                <li><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E22A2A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="pricing-check"><polyline points="20 6 9 17 4 12"></polyline></svg> Professional signing tools</li>
                <li><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E22A2A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="pricing-check"><polyline points="20 6 9 17 4 12"></polyline></svg> Templates and reminders</li>
                <li><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E22A2A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="pricing-check"><polyline points="20 6 9 17 4 12"></polyline></svg> SETU integration</li>
                <li><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E22A2A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="pricing-check"><polyline points="20 6 9 17 4 12"></polyline></svg> Basic automation support</li>
              </ul>
              <button className="btn-primary pricing-btn">Choose Starter</button>
            </div>

            {/* Business Plan */}
            <div className="pricing-card">
              <h3 className="pricing-price">$19<span className="pricing-period">/month</span></h3>
              <h4 className="pricing-name">Business</h4>
              <p className="pricing-target">Designed for growing teams and operational workflows.</p>
              <ul className="pricing-features">
                <li><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E22A2A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="pricing-check"><polyline points="20 6 9 17 4 12"></polyline></svg> Unlimited documents</li>
                <li><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E22A2A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="pricing-check"><polyline points="20 6 9 17 4 12"></polyline></svg> Bulk sending</li>
                <li><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E22A2A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="pricing-check"><polyline points="20 6 9 17 4 12"></polyline></svg> Team collaboration</li>
                <li><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E22A2A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="pricing-check"><polyline points="20 6 9 17 4 12"></polyline></svg> API access</li>
                <li><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E22A2A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="pricing-check"><polyline points="20 6 9 17 4 12"></polyline></svg> Aadhaar verification credits</li>
                <li><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E22A2A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="pricing-check"><polyline points="20 6 9 17 4 12"></polyline></svg> Custom branding</li>
                <li><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E22A2A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="pricing-check"><polyline points="20 6 9 17 4 12"></polyline></svg> Priority support</li>
              </ul>
              <button className="btn-primary pricing-btn">Choose Business</button>
            </div>

            {/* Enterprise Plan */}
            <div className="pricing-card">
              <h3 className="pricing-price">Custom</h3>
              <h4 className="pricing-name">Enterprise</h4>
              <p className="pricing-target">Tailored for organizations requiring advanced scale and control.</p>
              <ul className="pricing-features">
                <li><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E22A2A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="pricing-check"><polyline points="20 6 9 17 4 12"></polyline></svg> Everything in Business</li>
                <li><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E22A2A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="pricing-check"><polyline points="20 6 9 17 4 12"></polyline></svg> Unlimited users</li>
                <li><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E22A2A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="pricing-check"><polyline points="20 6 9 17 4 12"></polyline></svg> Full API ecosystem</li>
                <li><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E22A2A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="pricing-check"><polyline points="20 6 9 17 4 12"></polyline></svg> Dedicated onboarding</li>
                <li><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E22A2A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="pricing-check"><polyline points="20 6 9 17 4 12"></polyline></svg> SLA and enterprise support</li>
                <li><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E22A2A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="pricing-check"><polyline points="20 6 9 17 4 12"></polyline></svg> Advanced security and compliance</li>
                <li><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E22A2A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="pricing-check"><polyline points="20 6 9 17 4 12"></polyline></svg> Custom infrastructure support</li>
              </ul>
              <button className="btn-primary pricing-btn">Choose Enterprise</button>
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA Section ───────────────────────────────────────────── */}
      <section className="cta-section">
        <div className="cta-bg-layer"></div>
        <div className="cta-content">
          <h2 className="cta-title">Start signing documents the simpler way</h2>
          <p className="cta-description">
            Join modern businesses sending and signing documents securely with Nexgn.
          </p>
          <button className="btn-primary cta-btn">Create your free account</button>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-top">

            {/* Brand + Contact */}
            <div className="footer-brand">
              <img src={isDarkMode ? logoDark : logoLight} alt="Nexgn" className="footer-logo" />
              <p className="footer-tagline">The Next Generation of Document<br />Signature</p>
              <p className="footer-email">gateway@nexgn.cloud</p>
              <div className="footer-socials">
                <a href="#" className="social-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#666666">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="social-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#666666">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
              <div className="footer-copyright">
                © 2026 Nexgn. All rights reserved.
              </div>
            </div>

            {/* Link Columns */}
            <div className="footer-links-container">
              <div className="footer-link-column">
                <h4>COMPANY</h4>
                <a href="#">About Us</a>
                <a href="#">Contact Us</a>
                <a href="#">Blog</a>
              </div>
              <div className="footer-link-column">
                <h4>RESOURCES</h4>
                <a href="#">Help center</a>
                <a href="#">System Status</a>
                <a href="#">Security</a>
              </div>
              <div className="footer-link-column">
                <h4>LEGAL &amp; TRUST</h4>
                <a href="#">Trust &amp; Compliance</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Terms &amp; Services</a>
              </div>
            </div>

          </div>
        </div>

        {/* Large decorative "NEXGN" text at the bottom */}
        <div className="footer-huge-text-wrapper">
          <div className="footer-blurry-bg-container">
            <div className="footer-blurry-bg"></div>
          </div>
          <div className="footer-huge-text-overlay">NEXGN</div>
        </div>
      </footer>

    </div>
  );
}
