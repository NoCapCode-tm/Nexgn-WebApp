import React from "react";
import logoLight from "../../assets/logo-light.png";
import { ShieldCheck, Zap, Footprints } from "lucide-react";

export default function LeftPanel() {
  return (
    <div className="login-signup-left">
      <div className="brand-header">
        <img src={logoLight} alt="Nexgn Logo" className="brand-logo-img" />
      </div>

      <div className="brand-hero">
        <h1 className="brand-hero__title">
          Documents signed.<br />
          <span className="brand-hero__title--red">Trust delivered.</span>
        </h1>
        <p className="brand-hero__subtext">
          Nexgn brings speed, clarity & trust to every signature.
          Built for modern teams and important agreements.
        </p>
        <div className="brand-hero__divider" />
      </div>

      <div className="brand-features">
        <div className="brand-feature-item">
          <div className="brand-feature-item__icon-wrap">
            <ShieldCheck size={28} className="brand-feature-item__icon" />
          </div>
          <div className="brand-feature-item__info">
            <h4 className="brand-feature-item__title">Legally Secure</h4>
            <p className="brand-feature-item__desc">
              Enterprise-grade<br />security at<br />every step
            </p>
          </div>
        </div>

        <div className="brand-feature-item">
          <div className="brand-feature-item__icon-wrap">
            <Zap size={28} className="brand-feature-item__icon" />
          </div>
          <div className="brand-feature-item__info">
            <h4 className="brand-feature-item__title">Fast & Simple</h4>
            <p className="brand-feature-item__desc">
              Sign documents<br />in under<br />2 minutes
            </p>
          </div>
        </div>

        <div className="brand-feature-item">
          <div className="brand-feature-item__icon-wrap">
            <Footprints size={28} className="brand-feature-item__icon" />
          </div>
          <div className="brand-feature-item__info">
            <h4 className="brand-feature-item__title">Track Everything</h4>
            <p className="brand-feature-item__desc">
              Realtime status<br />and<br />audit trails
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
