import React, { useState, useEffect } from "react";
import "./Blog.css";
import ribbonBg from "../assets/privacy-bg-ribbon.png";
import ribbonBgDark from "../assets/helpcenter-dark-ribbon.png";
import blogIllustration from "../assets/Blog.png";
import blogFeatured from "../assets/Blog-featured.png";
import blogFeaturedDark from "../assets/dark-featured-blog.png";
import blogIllustrationDark from "../assets/dark-blog.png";
import darkBlogDivider from "../assets/dark-blog-divider.png";

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

function BlogFooterBrand({ dark }) {
  return (
    <div className="blog-footer-brand">
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
      <p className="blog-footer-tagline">
        The Next Generation of Document
        <br />
        Signature
      </p>
      <p className="blog-footer-email">gateway@nexgn.cloud</p>
      <div className="blog-footer-socials">
        <a href="#" className="blog-footer-social-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#666666">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </a>
        <a href="#" className="blog-footer-social-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#666666">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </a>
      </div>
      <div className="blog-footer-copyright">
        ©️ 2026 Nexgn. All rights reserved.
      </div>
    </div>
  );
}

function BlogFooterLinks() {
  return (
    <div className="blog-footer-links">
      <div className="blog-footer-link-column">
        <h4>COMPANY</h4>
        <a href="/about">About Us</a>
        <a href="/contact">Contact Us</a>
        <a href="/blog">Blog</a>
      </div>
      <div className="blog-footer-link-column">
        <h4>RESOURCES</h4>
        <a href="/help">Help center</a>
        <a href="#">System Status</a>
        <a href="/security">Security</a>
      </div>
      <div className="blog-footer-link-column">
        <h4>LEGAL &amp; TRUST</h4>
        <a href="/security">Trust &amp; Compliance</a>
        <a href="/privacy">Privacy Policy</a>
        <a href="/term">Terms &amp; Services</a>
      </div>
    </div>
  );
}

function BlogFooterWordmark() {
  return (
    <div className="blog-footer-wordmark-wrapper">
      <div className="blog-footer-blurry-bg-container">
        <div className="blog-footer-blurry-bg"></div>
      </div>
      <div className="blog-footer-wordmark-overlay">NEXGN</div>
    </div>
  );
}

function BlogFooter({ dark }) {
  return (
    <footer className="blog-footer">
      <div className="blog-footer-content">
        <div className="blog-footer-top">
          <BlogFooterBrand dark={dark} />
          <BlogFooterLinks />
        </div>
      </div>
      <BlogFooterWordmark />
    </footer>
  );
}

export default function Blog() {
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

  return (
    <>
      <div className="blog-page-wrapper">
        <Navbar dark={dark} setDark={setDark} />

        {/* ── RIBBON ── */}
        <img
          src={dark ? ribbonBgDark : ribbonBg}
          alt=""
          className="nexgn-hero-ribbon"
          aria-hidden="true"
        />

        {/* ── HERO ── */}
        <div className="blog-hero-wrapper">
          <div className="blog-hero">
            <span className="blog-hero__label">BLOG</span>
            <h1 className="blog-hero__title">Nexgn Blog</h1>
            <p className="blog-hero__sub">
              Insights on digital trust, secure infrastructure, and the future{" "}
              <br />
              of document automation.
            </p>
          </div>
          <img
            src={dark ? blogIllustrationDark : blogIllustration}
            alt="Blog illustration"
            className="blog-hero__illustration"
          />
        </div>

        {/* ── FILTER TABS ── */}
        <div className="blog-page-body blog-container">
          <div className="blog-filters">
            <button className="blog-filter blog-filter--active">All</button>
            <button className="blog-filter">Security</button>
            <button className="blog-filter">Engineering</button>
            <button className="blog-filter">Operations</button>
            <button className="blog-filter">ESG</button>
            <div className="blog-filter__search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="#000" strokeWidth="2" />
                <path
                  d="M16.5 16.5L21 21"
                  stroke="#000"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* ── BLOG CARDS ── */}
          <div className="blog-cards-section">
            <div className="blog-cards-grid">
              {[
                {
                  category: "Security",
                  color: "#FF0000",
                  bg: "#FFE3E4",
                  title: (
                    <>
                      Zero-Trust Architecture for E-
                      <br />
                      Signature Platforms
                    </>
                  ),
                  time: "5 min read",
                  date: "May 20, 2026",
                },
                {
                  category: "Security",
                  color: "#FF0000",
                  bg: "#FFE3E4",
                  title: (
                    <>
                      "Building Trust at Scale:
                      <br /> The Arcitecture Behind ..."
                    </>
                  ),
                  time: "6 min read",
                  date: "May 18, 2026",
                },
                {
                  category: "Engineering",
                  color: "#B45309",
                  bg: "#FEF3C7",
                  title: (
                    <>
                      Designing Cryptographic Integrity for High-
                      <br />
                      Volume ...
                    </>
                  ),
                  time: "7 min read",
                  date: "May 15, 2026",
                },
              ].map((card, i) => (
                <div className="blog-card" key={i}>
                  <div className="blog-card__img">
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                      <path
                        d="M7.5 28.5C6.675 28.5 6 27.825 6 27V9C6 8.175 6.675 7.5 7.5 7.5H28.5C29.325 7.5 30 8.175 30 9V27C30 27.825 29.325 28.5 28.5 28.5H7.5ZM7.5 27H28.5V9H7.5V27ZM9 25.5H27L21.75 18.75L17.25 24.375L14.25 20.625L9 25.5Z"
                        fill="#C5C5C5"
                      />
                    </svg>
                  </div>
                  <span
                    className="blog-card__tag"
                    style={{ color: card.color, background: card.bg }}
                    data-category={card.category}
                  >
                    {card.category}
                  </span>
                  <h3 className="blog-card__title">{card.title}</h3>
                  <div className="blog-card__meta">
                    <span className="blog-card__time">⏱ {card.time}</span>
                    <span className="blog-card__date">{card.date}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="blog-load-more">Load More Articles</button>
          </div>

          {/* ── FEATURED + POPULAR ── */}
          <div className="blog-featured-section">
            <div className="blog-featured-row">
              <div className="blog-featured-column">
                <div className="blog-featured-card">
                  <span className="blog-featured__label">FEATURED</span>
                  <img
                    src={dark ? blogFeaturedDark : blogFeatured}
                    alt="Featured"
                    className="blog-featured__img"
                  />
                  <span className="blog-featured__tag">Security</span>
                  <h2 className="blog-featured__title">
                    Building Trust at Scale: <br /> The Arcitecture Behind
                    Secure Document <br />
                    Signing
                  </h2>
                  <div className="blog-featured__meta">
                    <span>⏱ 6 min read</span>
                    <span>May 18, 2026</span>
                  </div>
                </div>
                <div className="blog-newsletter-wrapper">
                  <div className="blog-newsletter-card">
                    <h3 className="blog-newsletter__title">
                      Stay ahead with the latest insights
                    </h3>
                    <p className="blog-newsletter__sub">
                      Get updates on security, engineering best practice and
                      product news
                    </p>
                    <input
                      className="blog-newsletter__input"
                      type="email"
                      placeholder="Enter your email"
                    />
                    <button className="blog-newsletter__btn">Subscribe</button>
                    <p className="blog-newsletter__privacy">
                      We respect your privacy. Unsubscribe anytime
                    </p>
                  </div>
                </div>
              </div>
              <div className="blog-popular-and-newsletter">
                <div className="blog-popular-card">
                  <span className="blog-popular__label">POPULAR ARTICLES</span>
                  {[
                    {
                      title: (
                        <>
                          {" "}
                          "Zero-Trust Architecture for E-
                          <br />
                          Signature Platforms"
                        </>
                      ),
                      date: "May 20, 2026",
                    },
                    {
                      title: (
                        <>
                          "Zero-Trust Architecture for E-
                          <br />
                          Signature Platforms"
                        </>
                      ),
                      date: "May 20, 2026",
                    },
                    {
                      title: (
                        <>
                          "Zero-Trust Architecture for E-
                          <br />
                          Signature Platforms"
                        </>
                      ),
                      date: "May 20, 2026",
                    },
                  ].map((item, i) => (
                    <div className="blog-popular__item" key={i}>
                      <div className="blog-popular__thumb"></div>
                      <div className="blog-popular__info">
                        <h3 className="blog-popular__title">{item.title}</h3>
                        <p className="blog-popular__date">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="blog-newsletter-full">
              <div className="blog-newsletter-card">
                <h3 className="blog-newsletter__title">
                  Stay ahead with the latest insights
                </h3>
                <p className="blog-newsletter__sub">
                  Get updates on security, engineering best practice and product
                  news
                </p>
                <input
                  className="blog-newsletter__input"
                  type="email"
                  placeholder="Enter your email"
                />
                <button className="blog-newsletter__btn">Subscribe</button>
                <p className="blog-newsletter__privacy">
                  We respect your privacy. Unsubscribe anytime
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* ── DARK DIVIDER OVERLAY (desktop dark mode only) ── */}
        {dark && (
          <img
            src={darkBlogDivider}
            alt=""
            className="blog-dark-divider"
            aria-hidden="true"
          />
        )}
      </div>
      {/* end blog-page-wrapper */}
      {/* ── FOOTER ── */}
      <div className="nexgn-footer-wrapper">
        <BlogFooter dark={dark} />
      </div>
    </>
  );
}
