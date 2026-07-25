import React, { useState, useEffect } from "react";
import "./HelpCenter.css";
import ribbonBg from "../assets/privacy-bg-ribbon.png";
import ribbonBgDark from "../assets/helpcenter-dark-ribbon.png";
import headsetImg from "../assets/headset.png";
import heroBannerImg from "../assets/HelpCenter.png";
import heroBannerDark from "../assets/dark-helpcenter.png";
import darkHeadsetImg from "../assets/dark-headset.png";

/* ══════════════════════════════════════════════════════════════
   DATA — sidebar categories + FAQ content
   ══════════════════════════════════════════════════════════════ */

const categories = [
  {
    name: "Core Platform & Capabilities",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.8265 2.18036C12.566 2.06151 12.2829 2 11.9965 2C11.7102 2 11.4271 2.06151 11.1665 2.18036L2.59655 6.08036C2.4191 6.1586 2.26823 6.28676 2.16231 6.44921C2.05639 6.61167 2 6.80142 2 6.99536C2 7.18929 2.05639 7.37904 2.16231 7.5415C2.26823 7.70396 2.4191 7.83211 2.59655 7.91036L11.1765 11.8204C11.4371 11.9392 11.7202 12.0007 12.0065 12.0007C12.2929 12.0007 12.576 11.9392 12.8365 11.8204L21.4165 7.92036C21.594 7.84211 21.7449 7.71396 21.8508 7.5515C21.9567 7.38904 22.0131 7.19929 22.0131 7.00536C22.0131 6.81142 21.9567 6.62167 21.8508 6.45921C21.7449 6.29676 21.594 6.1686 21.4165 6.09036L12.8265 2.18036Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 12C1.99953 12.1913 2.05392 12.3787 2.15672 12.5399C2.25952 12.7012 2.40642 12.8297 2.58 12.91L11.18 16.82C11.4392 16.9374 11.7205 16.9981 12.005 16.9981C12.2895 16.9981 12.5708 16.9374 12.83 16.82L21.41 12.92C21.587 12.8404 21.737 12.7111 21.8418 12.5477C21.9466 12.3844 22.0015 12.1941 22 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 17C1.99953 17.1913 2.05392 17.3787 2.15672 17.5399C2.25952 17.7012 2.40642 17.8297 2.58 17.91L11.18 21.82C11.4392 21.9374 11.7205 21.9981 12.005 21.9981C12.2895 21.9981 12.5708 21.9374 12.83 21.82L21.41 17.92C21.587 17.8404 21.737 17.7111 21.8418 17.5477C21.9466 17.3844 22.0015 17.1941 22 17"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "The Signer Experience",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        width="24"
        height="24"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    name: "Security & Compliance",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        width="24"
        height="24"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    name: "Account & Billing",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        width="24"
        height="24"
      >
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
      </svg>
    ),
  },
  {
    name: "Enterprise, API & Customization",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 5H3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 19H3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 3V7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 17V21"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21 12H12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21 19H16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21 5H14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 10V14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 12H3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "Sustainability & ESG Impact",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.0056 20C9.24965 20.0053 7.55585 19.3505 6.26011 18.1654C4.96438 16.9803 4.16136 15.3515 4.01033 13.6021C3.8593 11.8527 4.37128 10.1104 5.44474 8.72074C6.5182 7.33112 8.07472 6.3957 9.80559 6.1C15.5056 5 17.0056 4.48 19.0056 2C20.0056 4 21.0056 6.18 21.0056 10C21.0056 15.5 16.2256 20 11.0056 20Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 21C2 18 3.85 15.64 7.08 15C9.5 14.52 12 13 13 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const faqs = [
  {
    title: "Core Platform & Capabilities",
    questions: [
      {
        q: "What is Nexgn?",
        a: "Nexgn is a next-generation digital signature and document infrastructure platform. Originating in New Mexico and built for the global enterprise, we provide a frictionless, highly secure environment to send, sign, and manage legally binding agreements.",
      },
      {
        q: "Who is Nexgn built for?",
        a: "Nexgn is designed for enterprises, legal teams, financial institutions, and any organization that needs a secure, auditable, and compliant workflow for document signing at scale.",
      },
      {
        q: "Which file formats are supported?",
        a: "Nexgn supports PDF, DOCX, XLSX, PPTX, and image formats (PNG, JPEG). All documents are converted to a standardized format for consistent rendering across devices.",
      },
      {
        q: "Is Nexgn optimized for mobile devices?",
        a: "Yes. Nexgn's signing experience is fully responsive and optimized for mobile browsers. Native iOS and Android apps are also available for on-the-go workflows.",
      },
      {
        q: "Can I save documents as reusable templates?",
        a: "Absolutely. You can save any document as a reusable template, pre-placing signature fields and data fields so future sends require just a few clicks.",
      },
      {
        q: "Can I send a document to multiple signers at once?",
        a: "Yes. Nexgn supports sequential and parallel signing workflows, so you can define the exact order in which signers receive and complete the document.",
      },
      {
        q: 'What is "Bulk Send" and how does it work?',
        a: "Bulk Send lets you upload a CSV of recipients and send a personalized version of a document to each one simultaneously — ideal for NDAs, onboarding forms, and policy acknowledgements.",
      },
    ],
  },
  {
    title: "The Signer Experience",
    questions: [
      {
        q: "Do signers need a Nexgn account?",
        a: "No. Recipients can sign documents directly from their email without creating an account, making the experience frictionless for external parties.",
      },
      {
        q: "How do signers verify their identity?",
        a: "Nexgn offers email-based verification, SMS OTP, knowledge-based authentication (KBA), and ID document verification depending on the compliance level required.",
      },
      {
        q: "Can signers decline or reassign a document?",
        a: "Yes. Signers can decline with a reason or reassign to another authorized party. Senders are notified immediately in either case.",
      },
    ],
  },
  {
    title: "Advanced Security & Legal Compliance",
    questions: [
      {
        q: "Are Nexgn signatures legally binding?",
        a: "Yes. Nexgn signatures comply with eIDAS (EU), ESIGN & UETA (US), and other international e-signature laws, making them legally enforceable in 180+ countries.",
      },
      {
        q: "How is data encrypted?",
        a: "All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Each document is stored with a unique key and a tamper-evident audit trail.",
      },
    ],
  },
  {
    title: "Enterprise, API & Customization",
    questions: [
      {
        q: "Does Nexgn offer an API?",
        a: "Yes. Nexgn provides a full-featured REST API that allows you to embed signing workflows directly into your product, automate document generation, and manage users programmatically.",
      },
      {
        q: "Can I white-label the signing experience?",
        a: "Enterprise customers can fully white-label Nexgn — custom domains, branded email notifications, and a customized signer interface that reflects your brand identity.",
      },
      {
        q: "What webhook events are available?",
        a: "Nexgn emits webhook events for document sent, viewed, signed, declined, completed, and expired — giving you real-time visibility into every step of the signing process.",
      },
    ],
  },
  {
    title: "Account Management & Billing",
    questions: [
      {
        q: "What plans does Nexgn offer?",
        a: "Nexgn offers Starter, Professional, and Enterprise tiers. All plans include unlimited signers; higher tiers unlock advanced authentication, API access, and dedicated support.",
      },
      {
        q: "Can I cancel at any time?",
        a: "Yes. Monthly plans can be cancelled at any time with no penalties. Annual plans are non-refundable after 30 days but remain active until the period ends.",
      },
    ],
  },
  {
    title: "Sustainability & Environmental Impact (ESG)",
    questions: [
      {
        q: "How does Nexgn contribute to sustainability?",
        a: "Every document signed digitally through Nexgn eliminates the need for printing, shipping, and physical storage — directly reducing paper waste and carbon emissions across your organization.",
      },
      {
        q: "Does Nexgn track ESG metrics?",
        a: "Yes. Nexgn's ESG dashboard provides real-time reporting on trees saved, CO₂ reduced, and paper eliminated — giving your sustainability team auditable data for ESG reporting.",
      },
      {
        q: "Is Nexgn carbon neutral?",
        a: "Nexgn offsets 100% of its cloud infrastructure emissions through certified carbon credits and partners with reforestation programs to go beyond net zero.",
      },
    ],
  },
];

/* ══════════════════════════════════════════════════════════════
   NAVBAR
   ══════════════════════════════════════════════════════════════ */

function Navbar({ dark, setDark }) {
  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <path
            d="M36.499 0C40.3359 0 43.4463 3.11041 43.4463 6.94727V36.499C43.4463 36.6885 43.4358 36.8759 43.4209 37.0615L32.6826 26.5566C31.3112 25.2156 29.0995 25.2276 27.7432 26.584L25.5107 28.8174C24.1546 30.1738 24.1663 32.3607 25.5371 33.7021L35.498 43.4463H7.1543L34.7979 16.4053C36.169 15.0637 36.1807 12.877 34.8242 11.5205L32.5918 9.28711C31.2353 7.93089 29.0237 7.91858 27.6523 9.25977L0 36.3096V7.89941L10.7188 18.3857C12.0901 19.727 14.3017 19.7147 15.6582 18.3584L17.8906 16.125C19.2471 14.7685 19.2355 12.5818 17.8643 11.2402L6.39746 0.0234375C6.57891 0.00922816 6.76217 0 6.94727 0H36.499Z"
            fill="#E22A2A"
          />
        </svg>
        <div className="navbar__logo-text">
          <span className="navbar__logo-name">Nexgn</span>
          <span className="navbar__logo-sub">Smart Signing</span>
        </div>
      </div>
      <button
        className="navbar__theme-toggle"
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

/* ══════════════════════════════════════════════════════════════
   HERO SECTION — ribbon bg, headline, search bar
   ══════════════════════════════════════════════════════════════ */

function HeroSection({ dark }) {
  return (
    <>
      <img
        src={dark ? ribbonBgDark : ribbonBg}
        alt=""
        className="nexgn-hero-ribbon"
        aria-hidden="true"
      />

      <div className="nexgn-hero-section">
        <img
          src={dark ? heroBannerDark : heroBannerImg}
          alt=""
          className="nexgn-hero-banner"
          aria-hidden="true"
        />
        <div className="nexgn-hero-left-wrap">
        <div className="nexgn-hero-left">
          <span className="nexgn-hero-label">Help Center</span>

          <h1 className="nexgn-hero-title">
            Find answers.
            <br />
            Get things done.
          </h1>

          <p className="nexgn-hero-subtitle">
            Everything you need to know about Nexgn's platform, features,
            <br className="subtitle-break" />
            security, billing, and more.
          </p>
        </div>

        <div className="nexgn-search-container">
          <div className="nexgn-hero-search">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="11"
                cy="11"
                r="8"
                stroke={dark ? "white" : "black"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 21L16.65 16.65"
                stroke={dark ? "white" : "black"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="nexgn-hero-search__text">
              Search for answers ...
            </span>
          </div>
          <button className="nexgn-filter-btn" aria-label="Filter">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="21" x2="4" y2="14" />
              <line x1="4" y1="10" x2="4" y2="3" />
              <line x1="12" y1="21" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12" y2="3" />
              <line x1="20" y1="21" x2="20" y2="16" />
              <line x1="20" y1="12" x2="20" y2="3" />
              <line x1="1" y1="14" x2="7" y2="14" />
              <line x1="9" y1="8" x2="15" y2="8" />
              <line x1="17" y1="16" x2="23" y2="16" />
            </svg>
          </button>
        </div>
        </div>
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════
   FAQ SECTION — category sidebar + accordion
   ══════════════════════════════════════════════════════════════ */

function FAQSidebar({ activeCategory, setActiveCategory }) {
  return (
    <aside className="nexgn-faq__sidebar">
      <p className="nexgn-faq__sidebar-label">Categories</p>
      {categories.map((cat, i) => (
        <div
          key={i}
          className={`nexgn-cat-item${activeCategory === i ? " nexgn-cat-item--active" : ""}`}
          onClick={() => setActiveCategory(i)}
        >
          <div className="nexgn-cat-icon">{cat.icon}</div>
          <span className="nexgn-cat-name">
            {i + 1}. {cat.name}
          </span>
        </div>
      ))}
    </aside>
  );
}

function FAQAccordion({
  openSection,
  setOpenSection,
  openQuestion,
  setOpenQuestion,
}) {
  return (
    <div className="nexgn-faq__content">
      {faqs.map((section, si) => (
        <div
          key={si}
          className={`nexgn-acc-section${openSection === si ? " nexgn-acc-section--open" : ""}`}
        >
          <div
            className="nexgn-acc-header"
            onClick={() => setOpenSection(openSection === si ? null : si)}
          >
            <div className="nexgn-acc-header-left">
              <span className="nexgn-acc-num">{si + 1}</span>
              <span className="nexgn-acc-title">{section.title}</span>
            </div>
            <svg
              className="nexgn-acc-chevron"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </div>

          {openSection === si && (
            <div className="nexgn-acc-body">
              {section.questions.map((qa, qi) => {
                const key = `${si}-${qi}`;
                return (
                  <div
                    key={qi}
                    className={`nexgn-acc-qa${openQuestion === key ? " nexgn-acc-qa--open" : ""}`}
                  >
                    <div
                      className="nexgn-acc-q"
                      onClick={() =>
                        setOpenQuestion(openQuestion === key ? null : key)
                      }
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                      <span className="nexgn-acc-q-text">{qa.q}</span>
                    </div>
                    {openQuestion === key && (
                      <p className="nexgn-acc-answer">{qa.a}</p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function FAQSection({
  activeCategory,
  setActiveCategory,
  openSection,
  setOpenSection,
  openQuestion,
  setOpenQuestion,
}) {
  return (
    <section className="nexgn-faq">
      <FAQSidebar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <FAQAccordion
        openSection={openSection}
        setOpenSection={setOpenSection}
        openQuestion={openQuestion}
        setOpenQuestion={setOpenQuestion}
      />
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   "STILL NEED HELP" BANNER
   ══════════════════════════════════════════════════════════════ */

function HelpBanner({ dark }) {
  return (
    <section className="nexgn-help-banner">
      <div className="nexgn-help-banner__image">
        <img src={dark ? darkHeadsetImg : headsetImg} alt="Support headset" />
      </div>
      <div className="nexgn-help-banner__body">
        <h2 className="nexgn-help-banner__title">Still need help?</h2>
        <p className="nexgn-help-banner__desc">
          Our team is here for you. Reach out and we'll get back to you as soon
          as possible.
        </p>
        <div className="nexgn-help-banner__actions">
          <button className="nexgn-help-btn nexgn-help-btn--primary">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            Contact Support
          </button>
          <button className="nexgn-help-btn nexgn-help-btn--secondary">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
            Visit Help Center
          </button>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   FOOTER
   ══════════════════════════════════════════════════════════════ */

function FooterBrand({ dark }) {
  return (
    <div className="footer-brand">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "17.78px",
        }}
      >
        <svg width="36" height="36" viewBox="0 0 44 44" fill="none">
          <path
            d="M36.499 0C40.3359 0 43.4463 3.11041 43.4463 6.94727V36.499C43.4463 36.6885 43.4358 36.8759 43.4209 37.0615L32.6826 26.5566C31.3112 25.2156 29.0995 25.2276 27.7432 26.584L25.5107 28.8174C24.1546 30.1738 24.1663 32.3607 25.5371 33.7021L35.498 43.4463H7.1543L34.7979 16.4053C36.169 15.0637 36.1807 12.877 34.8242 11.5205L32.5918 9.28711C31.2353 7.93089 29.0237 7.91858 27.6523 9.25977L0 36.3096V7.89941L10.7188 18.3857C12.0901 19.727 14.3017 19.7147 15.6582 18.3584L17.8906 16.125C19.2471 14.7685 19.2355 12.5818 17.8643 11.2402L6.39746 0.0234375C6.57891 0.00922816 6.76217 0 6.94727 0H36.499Z"
            fill="#E22A2A"
          />
        </svg>
        <span
          style={{
            fontFamily: "MuseoModerno, sans-serif",
            fontSize: "22px",
            color: dark ? "#ffffff" : "#111111",
          }}
        >
          Nexgn
        </span>
      </div>
      <p className="footer-tagline">
        The Next Generation of Document
        <br />
        Signature
      </p>
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
        ©️ 2026 Nexgn. All rights reserved.
      </div>
    </div>
  );
}

function FooterLinks() {
  return (
    <div className="footer-links-container">
      <div className="footer-link-column">
        <h4>COMPANY</h4>
        <a href="/about">About Us</a>
        <a href="/contact">Contact Us</a>
        <a href="/blog">Blog</a>
      </div>
      <div className="footer-link-column">
        <h4>RESOURCES</h4>
        <a href="/help">Help center</a>
        <a href="#">System Status</a>
        <a href="/security">Security</a>
      </div>
      <div className="footer-link-column">
        <h4>LEGAL &amp; TRUST</h4>
        <a href="/security">Trust &amp; Compliance</a>
        <a href="/privacy">Privacy Policy</a>
        <a href="/term">Terms &amp; Services</a>
      </div>
    </div>
  );
}

function FooterWordmark() {
  return (
    <div className="footer-huge-text-wrapper">
      <div className="footer-blurry-bg-container">
        <div className="footer-blurry-bg"></div>
      </div>
      <div className="footer-huge-text-overlay">NEXGN</div>
    </div>
  );
}

function SiteFooter({ dark }) {
  return (
    <footer className="landing-footer">
      <div className="footer-content">
        <div className="footer-top">
          <FooterBrand dark={dark} />
          <FooterLinks />
        </div>
      </div>
      <FooterWordmark />
    </footer>
  );
}

/* ══════════════════════════════════════════════════════════════
   PAGE — composes all sections
   ══════════════════════════════════════════════════════════════ */

export default function HelpCenter() {
  // theme
  const [dark, setDark] = useState(
    () =>
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  // FAQ interaction state
  const [activeCategory, setActiveCategory] = useState(0);
  const [openSection, setOpenSection] = useState(0);
  const [openQuestion, setOpenQuestion] = useState("0-0");

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      dark ? "dark" : "light",
    );
  }, [dark]);

  return (
    <div className="nexgn-root">
      <Navbar dark={dark} setDark={setDark} />

      <HeroSection dark={dark} />

      <FAQSection
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        openSection={openSection}
        setOpenSection={setOpenSection}
        openQuestion={openQuestion}
        setOpenQuestion={setOpenQuestion}
      />

      <HelpBanner dark={dark} />

      <SiteFooter dark={dark} />
    </div>
  );
}
