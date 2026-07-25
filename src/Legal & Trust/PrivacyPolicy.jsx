import React, { useState, useEffect } from "react";
import "./PrivacyPolicy.css";
import ribbonBg from "../assets/privacy-bg-ribbon.png";
import ribbonBgDark from "../assets/helpcenter-dark-ribbon.png";
import heroIllustration from "../assets/privacy-hero-illustration.png";
import heroIllustrationDark from "../assets/privacy-dark.png";
import FooterSection from "../FooterSection";

function Navbar({ dark, setDark }) {
  return (
    <nav className="privacy-policy__navbar">
      <div className="privacy-policy__navbar-brand">
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <path
            d="M36.499 0C40.3359 0 43.4463 3.11041 43.4463 6.94727V36.499C43.4463 36.6885 43.4358 36.8759 43.4209 37.0615L32.6826 26.5566C31.3112 25.2156 29.0995 25.2276 27.7432 26.584L25.5107 28.8174C24.1546 30.1738 24.1663 32.3607 25.5371 33.7021L35.498 43.4463H7.1543L34.7979 16.4053C36.169 15.0637 36.1807 12.877 34.8242 11.5205L32.5918 9.28711C31.2353 7.93089 29.0237 7.91858 27.6523 9.25977L0 36.3096V7.89941L10.7188 18.3857C12.0901 19.727 14.3017 19.7147 15.6582 18.3584L17.8906 16.125C19.2471 14.7685 19.2355 12.5818 17.8643 11.2402L6.39746 0.0234375C6.57891 0.00922816 6.76217 0 6.94727 0H36.499Z"
            fill="#E22A2A"
          />
        </svg>
        <div className="privacy-policy__navbar-logo-text">
          <span className="privacy-policy__navbar-logo-name">Nexgn</span>
          <span className="privacy-policy__navbar-logo-sub">Smart Signing</span>
        </div>
      </div>
      <button
        className="privacy-policy__navbar-theme-toggle"
        onClick={() => setDark(!dark)}
        aria-label="Toggle dark mode"
      >
        {dark ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>
    </nav>
  );
}

function PrivacyFooterBrand({ dark }) {
  return (
    <div className="privacy-policy__footer-brand">
      <div className="privacy-policy__footer-logo-row">
        <svg width="36" height="36" viewBox="0 0 44 44" fill="none">
          <path
            d="M36.499 0C40.3359 0 43.4463 3.11041 43.4463 6.94727V36.499C43.4463 36.6885 43.4358 36.8759 43.4209 37.0615L32.6826 26.5566C31.3112 25.2156 29.0995 25.2276 27.7432 26.584L25.5107 28.8174C24.1546 30.1738 24.1663 32.3607 25.5371 33.7021L35.498 43.4463H7.1543L34.7979 16.4053C36.169 15.0637 36.1807 12.877 34.8242 11.5205L32.5918 9.28711C31.2353 7.93089 29.0237 7.91858 27.6523 9.25977L0 36.3096V7.89941L10.7188 18.3857C12.0901 19.727 14.3017 19.7147 15.6582 18.3584L17.8906 16.125C19.2471 14.7685 19.2355 12.5818 17.8643 11.2402L6.39746 0.0234375C6.57891 0.00922816 6.76217 0 6.94727 0H36.499Z"
            fill="#E22A2A"
          />
        </svg>
        <span className="privacy-policy__footer-logo-text">Nexgn</span>
      </div>
      <p className="privacy-policy__footer-tagline">
        The Next Generation of Document
        <br />
        Signature
      </p>
      <p className="privacy-policy__footer-email">gateway@nexgn.cloud</p>
      <div className="privacy-policy__footer-socials">
        <a href="#" className="privacy-policy__footer-social-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#666666">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </a>
        <a href="#" className="privacy-policy__footer-social-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#666666">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </a>
      </div>
      <div className="privacy-policy__footer-copyright">
        ©️ 2026 Nexgn. All rights reserved.
      </div>
    </div>
  );
}

function PrivacyFooterLinks() {
  return (
    <div className="privacy-policy__footer-links">
      <div className="privacy-policy__footer-link-column">
        <h4>COMPANY</h4>
        <a href="/about">About Us</a>
        <a href="/contact">Contact Us</a>
        <a href="/blog">Blog</a>
      </div>
      <div className="privacy-policy__footer-link-column">
        <h4>RESOURCES</h4>
        <a href="/help">Help center</a>
        <a href="#">System Status</a>
        <a href="/security">Security</a>
      </div>
      <div className="privacy-policy__footer-link-column">
        <h4>LEGAL &amp; TRUST</h4>
        <a href="/security">Trust &amp; Compliance</a>
        <a href="/privacy">Privacy Policy</a>
        <a href="/term">Terms &amp; Services</a>
      </div>
    </div>
  );
}

function PrivacyFooterWordmark() {
  return (
    <div className="privacy-policy__footer-wordmark-wrapper">
      <div className="privacy-policy__footer-blurry-bg-container">
        <div className="privacy-policy__footer-blurry-bg"></div>
      </div>
      <div className="privacy-policy__footer-wordmark-overlay">NEXGN</div>
    </div>
  );
}

function PrivacyFooter({ dark }) {
  return (
    <footer className="privacy-policy__footer">
      <div className="privacy-policy__footer-content">
        <div className="privacy-policy__footer-top">
          <PrivacyFooterBrand dark={dark} />
          <PrivacyFooterLinks />
        </div>
      </div>
      <PrivacyFooterWordmark />
    </footer>
  );
}

export default function PrivacyPolicy() {
  const [dark, setDark] = useState(
    () =>
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      dark ? "dark" : "light",
    );
  }, [dark]);

  useEffect(() => {
    function updateZoom() {
      const w = window.innerWidth;
      let z = 1;
      if (w < 768) {
        z = w / 390;
      } else if (w >= 769 && w < 1180) {
        z = w / 1440;
      } else if (w >= 1180) {
        // Desktop / laptop / large-monitor widths: keep scaling the
        // same fixed 1440px canvas proportionally instead of leaving
        // it pinned at a fixed size. At exactly 1440px this evaluates
        // to 1, so appearance at the original design width is
        // unchanged.
        z = w / 1440;
      }
      document.documentElement.style.setProperty("--page-zoom", z);
    }
    updateZoom();
    window.addEventListener("resize", updateZoom);
    return () => window.removeEventListener("resize", updateZoom);
  }, []);

  return (
    <div className="privacy-policy">
      <div className="privacy-policy__page">
        <img
          src={dark ? ribbonBgDark : ribbonBg}
          alt=""
          className="privacy-policy__hero-ribbon"
          aria-hidden="true"
        />
        <Navbar dark={dark} setDark={setDark} />

        {/* ── HERO ILLUSTRATION ── */}
        <img
          src={dark ? heroIllustrationDark : heroIllustration}
          alt="Privacy security illustration"
          className="privacy-policy__hero-illustration"
        />

        {/* ── EYEBROW LABEL ── */}
        <span className="privacy-policy__eyebrow">Privacy Policy</span>

        {/* ── HERO TITLE ── */}
        <h1 className="privacy-policy__hero-title">
          Your Privacy Our Priority
        </h1>

        {/* ── DATA COLLECTION LIST ── */}
        <div className="privacy-policy__data-list">
          <div className="privacy-policy__data-item">
            <span className="privacy-policy__data-dot" />
            <p className="privacy-policy__data-text">
              <strong>Information You Provide Directly:</strong> When you join
              our wait list, register for an account, or contact support, we
              collect your email address, name and communication history.
            </p>
          </div>
          <div className="privacy-policy__data-item">
            <span className="privacy-policy__data-dot" />
            <p className="privacy-policy__data-text">
              <strong>Document &amp; Signature Data:</strong> To facilitate
              paperless workflows, we process the documents you upload, the
              names and email addresses of designated signers, and the digital
              signatures applied within the platform.
            </p>
          </div>
          <div className="privacy-policy__data-item">
            <span className="privacy-policy__data-dot" />
            <p className="privacy-policy__data-text">
              <strong>Automated Audit Trail &amp; Telemetry Data:</strong> To
              ensure network security and guarantee the legal validity of every
              signature, we automatically collect telemetry data. This includes
              IP addresses, browser types, request timestamps, routing headers,
              and the specific authentication steps taken during the signing
              process to create a tamper-evident audit trail.
            </p>
          </div>
          <div className="privacy-policy__data-item">
            <span className="privacy-policy__data-dot" />
            <p className="privacy-policy__data-text">
              <strong>Cookies and Tracking:</strong> We use strictly necessary
              cookies to maintain session states and security tokens. we do not
              use third-party advertising trackers
            </p>
          </div>
        </div>

        {/* ── DATA SHARING LIST ── */}
        <div className="privacy-policy__sharing-list">
          <div className="privacy-policy__sharing-item">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 22C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V4C4 3.46957 4.21071 2.96086 4.58579 2.58579C4.96086 2.21072 5.46957 2 6 2H14C14.3166 1.99949 14.6301 2.06161 14.9225 2.18277C15.215 2.30394 15.4806 2.48176 15.704 2.706L19.292 6.294C19.5168 6.51751 19.6952 6.78335 19.8167 7.07616C19.9382 7.36898 20.0005 7.68297 20 8V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 2V7C14 7.26522 14.1054 7.51957 14.2929 7.70711C14.4804 7.89464 14.7348 8 15 8H20"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 9H8"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 13H8"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 17H8"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="privacy-policy__sharing-text">
              <p className="privacy-policy__sharing-title">
                Document Participants
              </p>
              <p className="privacy-policy__sharing-desc">
                When you execute a document workflow, necessary information
                (such as your name, email, signature, and IP-based audit trail)
                is shared with the other authorized participants (signers,
                viewers) of that specific document.
              </p>
            </div>
          </div>
          <div className="privacy-policy__sharing-item">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 12C8 8.27674 9.43223 4.69615 12 2C14.5678 4.69615 16 8.27674 16 12C16 15.7233 14.5678 19.3038 12 22C9.43223 19.3038 8 15.7233 8 12Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12H22"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="privacy-policy__sharing-text">
              <p className="privacy-policy__sharing-title">Sub-processors</p>
              <p className="privacy-policy__sharing-desc">
                We share data with trusted infrastructure partners (such as our
                global CDN, cryptographic keystores, and secure cloud storage
                providers) strictly for the purpose of delivering the service.
                These partners are bound by rigorous confidentiality agreements.
              </p>
            </div>
          </div>
          <div className="privacy-policy__sharing-item">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 22C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V4C4 3.46957 4.21071 2.96086 4.58579 2.58579C4.96086 2.21072 5.46957 2 6 2H14C14.3166 1.99949 14.6301 2.06161 14.9225 2.18277C15.215 2.30394 15.4806 2.48176 15.704 2.706L19.292 6.294C19.5168 6.51751 19.6952 6.78335 19.8167 7.07616C19.9382 7.36898 20.0005 7.68297 20 8V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 2V7C14 7.26522 14.1054 7.51957 14.2929 7.70711C14.4804 7.89464 14.7348 8 15 8H20"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 9H8"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 13H8"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 17H8"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="privacy-policy__sharing-text">
              <p className="privacy-policy__sharing-title">Legal Compliance</p>
              <p className="privacy-policy__sharing-desc">
                If compelled by a legally binding subpoena, court order, or
                regulatory mandate, we will disclose necessary data. We commit
                to notifying you of any such request unless legally prohibited
                from doing so.
              </p>
            </div>
          </div>
        </div>

        {/* ── RIGHT TO ERASURE CARD ── */}
        <div className="privacy-policy__right-card privacy-policy__right-card--erasure">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6"
              stroke="#D70506"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 6H21"
              stroke="#D70506"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6"
              stroke="#D70506"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="privacy-policy__right-card-title">
            Right to Erasure
            <br />
            (Right to be
            <br />
            Forgotten)
          </p>
          <p className="privacy-policy__right-card-desc">
            Request the deletion of your personal data (subject to legal
            retention requirements for executed contracts)
          </p>
        </div>

        {/* ── RIGHT TO RECTIFICATION CARD ── */}
        <div className="privacy-policy__right-card privacy-policy__right-card--rectification">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 20H21"
              stroke="#D70506"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.5 3.5C16.8978 3.10217 17.4374 2.87868 18 2.87868C18.2786 2.87868 18.5544 2.93355 18.8118 3.04015C19.0692 3.14676 19.3032 3.30301 19.5 3.5C19.6968 3.69699 19.853 3.93083 19.9596 4.18821C20.0663 4.44558 20.1213 4.72142 20.1213 5C20.1213 5.27858 20.0663 5.55441 19.9596 5.81179C19.853 6.06916 19.6968 6.30301 19.5 6.5L7 19L3 20L4 16L16.5 3.5Z"
              stroke="#D70506"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="privacy-policy__right-card-title">
            Right to Rectification
          </p>
          <p className="privacy-policy__right-card-desc">
            Correct inaccurate or incomplete data.
          </p>
        </div>

        {/* ── RIGHT TO ACCESS CARD ── */}
        <div className="privacy-policy__right-card">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 20C20.5304 20 21.0391 19.7893 21.4142 19.4142C21.7893 19.0391 22 18.5304 22 18V8C22 7.46957 21.7893 6.96086 21.4142 6.58579C21.0391 6.21071 20.5304 6 20 6H12.1C11.7655 6.00328 11.4355 5.92261 11.1403 5.76538C10.8451 5.60815 10.594 5.37938 10.41 5.1L9.6 3.9C9.41789 3.62347 9.16997 3.39648 8.8785 3.2394C8.58702 3.08231 8.26111 3.00005 7.93 3H4C3.46957 3 2.96086 3.21071 2.58579 3.58579C2.21071 3.96086 2 4.46957 2 5V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H20Z"
              stroke="#D70506"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="privacy-policy__right-card-title">
            Right to Access
            <br />
            &amp; Potability
          </p>
          <p className="privacy-policy__right-card-desc">
            Request a copy the data we hold about you.
          </p>
        </div>

        {/* ── CONTACT BANNER ── */}
        <div className="privacy-policy__contact-banner">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4Z"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 6L12 13L2 6"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="privacy-policy__contact-text">
            <p className="privacy-policy__contact-label">
              To exercise these rights, please contact our privacy team at:
            </p>
            <p className="privacy-policy__contact-email">privacy@nexgn.cloud</p>
          </div>
        </div>

        {/* ── YOUR PRIVACY RIGHTS ── */}
        <div className="privacy-policy__rights-section">
          <div className="privacy-policy__info-icon-wrap">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C12 22 4 18 4 12V6L12 3L20 6V12C20 18 12 22 12 22Z"
                stroke="#D70506"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 12L11 14L15 10"
                stroke="#D70506"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="privacy-policy__info-content">
            <p className="privacy-policy__rights-title">Your Privacy Rights</p>
            <p className="privacy-policy__rights-desc">
              Regardless of your global location, Nexgn grants you the following
              rights concerning your data
            </p>
          </div>
        </div>

        {/* ── DATA RETENTION — BODY TEXT ── */}
        <div className="privacy-policy__retention-body">
          <p className="privacy-policy__retention-text">
            Your data is encrypted in transit using TLS 1.3 and secured at rest
            using modern cryptographic standards. We retain personal and
            document data only for as long as your account is active or as
            needed to fulfill our legal obligations, resolve disputes, and
            enforce our agreements. Completed documents and cryptographic audit
            trails are retained based on your account settings to ensure
            long-term legal validity. Conversely, transient network logs used
            solely for security mitigation are purged on a rolling 30-day basis.
          </p>
        </div>

        {/* ── DATA RETENTION AND SECURITY ── */}
        <div className="privacy-policy__info-section privacy-policy__info-section--data-retention">
          <div className="privacy-policy__info-icon-wrap">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C12 22 4 18 4 12V6L12 3L20 6V12C20 18 12 22 12 22Z"
                stroke="#D70506"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 12L11 14L15 10"
                stroke="#D70506"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="privacy-policy__info-content">
            <p className="privacy-policy__info-title">
              Data Retention and Security
            </p>
            <p className="privacy-policy__info-desc">
              Your data is encrypted in transit using TLS 1.3 and secured at
              rest
            </p>
          </div>
        </div>

        {/* ── DATA SHARING AND DISCLOSURE ── */}
        <div className="privacy-policy__info-section privacy-policy__info-section--data-sharing">
          <div className="privacy-policy__info-icon-wrap">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H6C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19V21"
                stroke="#D70506"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 3.12891C16.8578 3.35128 17.6174 3.85217 18.1597 4.55297C18.702 5.25377 18.9962 6.1148 18.9962 7.00091C18.9962 7.88702 18.702 8.74805 18.1597 9.44884C17.6174 10.1496 16.8578 10.6505 16 10.8729"
                stroke="#D70506"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 21.0028V19.0028C21.9993 18.1165 21.7044 17.2556 21.1614 16.5551C20.6184 15.8547 19.8581 15.3544 19 15.1328"
                stroke="#D70506"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                stroke="#D70506"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="privacy-policy__info-content">
            <p className="privacy-policy__info-title">
              Data Sharing and Disclosure
            </p>
            <p className="privacy-policy__info-desc">
              We do not sell, rent, or trade your personal data. We only share
              information under the following strict conditions
            </p>
          </div>
        </div>

        {/* ── HOW WE USE YOUR INFORMATION ── */}
        <div className="privacy-policy__info-section privacy-policy__info-section--how-we-use">
          <div className="privacy-policy__info-icon-wrap">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.67033 4.1342C9.72543 3.55454 9.99466 3.01624 10.4254 2.62448C10.8562 2.23271 11.4176 2.01562 11.9998 2.01562C12.5821 2.01562 13.1435 2.23271 13.5742 2.62448C14.005 3.01624 14.2742 3.55454 14.3293 4.1342C14.3624 4.50865 14.4853 4.86962 14.6875 5.18654C14.8896 5.50346 15.1652 5.76701 15.4908 5.95488C15.8164 6.14274 16.1825 6.2494 16.558 6.26582C16.9336 6.28224 17.3076 6.20793 17.6483 6.0492C18.1774 5.80898 18.777 5.77422 19.3303 5.95168C19.8837 6.12915 20.3512 6.50615 20.6418 7.0093C20.9325 7.51246 21.0256 8.10577 20.903 8.67377C20.7803 9.24177 20.4507 9.74381 19.9783 10.0822C19.6707 10.298 19.4196 10.5848 19.2462 10.9182C19.0729 11.2516 18.9824 11.6219 18.9824 11.9977C18.9824 12.3735 19.0729 12.7438 19.2462 13.0772C19.4196 13.4106 19.6707 13.6974 19.9783 13.9132C20.4507 14.2516 20.7803 14.7536 20.903 15.3216C21.0256 15.8896 20.9325 16.4829 20.6418 16.9861C20.3512 17.4892 19.8837 17.8662 19.3303 18.0437C18.777 18.2212 18.1774 18.1864 17.6483 17.9462C17.3076 17.7875 16.9336 17.7132 16.558 17.7296C16.1825 17.746 15.8164 17.8527 15.4908 18.0405C15.1652 18.2284 14.8896 18.4919 14.6875 18.8089C14.4853 19.1258 14.3624 19.4867 14.3293 19.8612C14.2742 20.4409 14.005 20.9792 13.5742 21.3709C13.1435 21.7627 12.5821 21.9798 11.9998 21.9798C11.4176 21.9798 10.8562 21.7627 10.4254 21.3709C9.99466 20.9792 9.72543 20.4409 9.67033 19.8612C9.63727 19.4866 9.51443 19.1255 9.31219 18.8085C9.10996 18.4914 8.8343 18.2278 8.50856 18.0399C8.18282 17.852 7.8166 17.7454 7.44091 17.7291C7.06522 17.7128 6.69113 17.7873 6.35033 17.9462C5.82122 18.1864 5.22165 18.2212 4.66833 18.0437C4.115 17.8662 3.6475 17.4892 3.35681 16.9861C3.06612 16.4829 2.97304 15.8896 3.09569 15.3216C3.21833 14.7536 3.54793 14.2516 4.02033 13.9132C4.32795 13.6974 4.57906 13.4106 4.75242 13.0772C4.92577 12.7438 5.01628 12.3735 5.01628 11.9977C5.01628 11.6219 4.92577 11.2516 4.75242 10.9182C4.57906 10.5848 4.32795 10.298 4.02033 10.0822C3.54859 9.74364 3.21958 9.24179 3.09723 8.67418C2.97488 8.10657 3.06794 7.51374 3.35831 7.01091C3.64869 6.50808 4.11564 6.13118 4.66842 5.95344C5.2212 5.7757 5.82031 5.80983 6.34933 6.0492C6.69009 6.20793 7.06407 6.28224 7.43963 6.26582C7.81519 6.2494 8.18126 6.14274 8.50687 5.95488C8.83247 5.76701 9.10802 5.50346 9.31019 5.18654C9.51237 4.86962 9.63521 4.50865 9.66833 4.1342"
                stroke="#D70506"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                stroke="#D70506"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="privacy-policy__info-content">
            <p className="privacy-policy__info-title">
              How We Use Your Information
            </p>
            <p className="privacy-policy__info-desc">
              We use your data exclusively for operational, legal, and security
              purposes
            </p>
          </div>
        </div>

        {/* ── HOW WE USE — USAGE LIST ── */}
        <div className="privacy-policy__usage-list">
          <div className="privacy-policy__data-item">
            <span className="privacy-policy__data-dot" />
            <p className="privacy-policy__data-text">
              To provision, maintain, and deliver our secure digital signing and
              cloud infrastructure services.
            </p>
          </div>
          <div className="privacy-policy__data-item">
            <span className="privacy-policy__data-dot" />
            <p className="privacy-policy__data-text">
              To authenticate user identities, generate cryptographically secure
              audit trails, and ensure all digital signatures are legally
              binding.
            </p>
          </div>
          <div className="privacy-policy__data-item">
            <span className="privacy-policy__data-dot" />
            <p className="privacy-policy__data-text">
              To route documents securely between you and your designated
              signers or authorized viewers.
            </p>
          </div>
          <div className="privacy-policy__data-item">
            <span className="privacy-policy__data-dot" />
            <p className="privacy-policy__data-text">
              To protect against malicious activity (e.g., DDoS attacks,
              credential stuffing) and analyze aggregated infrastructure load to
              improve performance.
            </p>
          </div>
          <div className="privacy-policy__data-item">
            <span className="privacy-policy__data-dot" />
            <p className="privacy-policy__data-text">
              To communicate transactional updates, signature requests, security
              alerts, and support responses.
            </p>
          </div>
        </div>

        {/* ── INFORMATION WE COLLECT ── */}
        <div className="privacy-policy__info-section">
          <div className="privacy-policy__info-icon-wrap">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                stroke="#D70506"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                stroke="#D70506"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="privacy-policy__info-content">
            <p className="privacy-policy__info-title">Information We Collect</p>
            <p className="privacy-policy__info-desc">
              We only collect information that is strictly necessary to provide,
              secure, and legally validate our services
            </p>
          </div>
        </div>

        {/* ── BODY TEXT ── */}
        <p className="privacy-policy__body-text">
          Welcome to Nexgn. We as a provider of next-generation secure cloud
          infrastructure, we believe that data privacy is a fundamental right.
          This Privacy Policy explains how we collect, use, disclose, and
          safeguard your information when you visit nexgn.cloud, use our
          services, or interact with our platform. We design our systems to
          comply with global privacy frameworks, including GDPR and CCPA, and we
          follow strict data minimization principles, collecting only what is
          necessary to operate securely and effectively.
        </p>
        <p className="privacy-policy__body-text--mobile">
          This Privacy Policy explains how we collect, use, disclose, and
          safeguard your information when you visit nexgn.cloud, use our
          services, or interact with our platform. We design our systems to
          comply with global privacy frameworks, including GDPR and CCPA, and we
          follow strict data minimization principles, collecting only what is
          necessary to operate securely and effectively.
        </p>
      </div>

      {/* ── FOOTER ── */}
      <div className="privacy-policy__footer-wrap">
        <PrivacyFooter dark={dark} />
      </div>
    </div>
  );
}
