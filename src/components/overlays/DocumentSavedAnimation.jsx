import { useEffect, useRef } from "react";
import "./DocumentSavedAnimation.css";

const STRIPS = 13;
const STRIP_H = 20;
const EASE = "cubic-bezier(.2,.8,.2,1)";
const LINE_WIDTHS = [100, 92, 97, 60, 100, 85, 94, 55];

/**
 * Props
 *  - playId      : change this value (e.g. increment a number) to replay
 *  - onComplete  : called when the sequence finishes
 *  - title       : text shown at top of the document
 *  - signature   : signature text on the document
 *  - label       : confirmation text
 *  - fullscreen  : true = fixed blurred overlay, false = renders inline
 */
export default function DocumentSavedAnimation({
  playId = 0,
  onComplete,
  title = "SERVICE AGREEMENT",
  signature = "J. Carter",
  label = "DOCUMENT SAVED",
  fullscreen = true,
}) {
  const stripRefs = useRef([]);
  const ringRef = useRef(null);
  const shieldRef = useRef(null);
  const pulseRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const anims = [];
    const strips = stripRefs.current.filter(Boolean);
    const ring = ringRef.current;
    const shield = shieldRef.current;
    const pulse = pulseRef.current;
    const text = labelRef.current;

    const play = (el, keyframes, opts) => {
      const a = el.animate(keyframes, { fill: "forwards", easing: EASE, ...opts });
      anims.push(a);
      return a;
    };

    // Respect reduced-motion: jump straight to the final state
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      strips.forEach((s) => (s.style.opacity = 0));
      shield.style.opacity = 1;
      text.style.opacity = 1;
      onComplete?.();
      return;
    }

    // Phase 1 (0.5s - 1.5s): shred, then condense to center
    strips.forEach((s, i) => {
      const off = i * STRIP_H + STRIP_H / 2 - 130;
      play(
        s,
        [
          { transform: "translateY(0) scaleY(1)" },
          { transform: `translateY(${off * 0.35}px) scaleY(.12)`, offset: 0.5 },
          { transform: `translateY(${off * 0.35}px) scaleY(.12)` },
        ],
        { duration: 500, delay: 500 + i * 6 }
      );
      play(
        s,
        [
          { transform: `translateY(${off * 0.35}px) scaleY(.12) scaleX(1)`, opacity: 1 },
          { transform: "translateY(0) scaleY(.12) scaleX(.2)", opacity: 0 },
        ],
        { duration: 450, delay: 1000 + i * 3, easing: "cubic-bezier(.6,0,.2,1)" }
      );
    });

    // Phase 2: spinning security ring
    play(
      ring,
      [
        { opacity: 0, transform: "scale(.4) rotate(0deg)" },
        { opacity: 1, transform: "scale(1) rotate(180deg)", offset: 0.25 },
        { opacity: 1, transform: "scale(1) rotate(900deg)" },
      ],
      { duration: 800, delay: 1450, easing: "cubic-bezier(.3,0,.4,1)" }
    );

    // Phase 3: snap to shield, pulse, label
    play(
      ring,
      [
        { opacity: 1, transform: "scale(1)" },
        { opacity: 0, transform: "scale(.5)" },
      ],
      { duration: 140, delay: 2310 }
    );
    play(
      shield,
      [
        { opacity: 0, transform: "scale(.5)" },
        { opacity: 1, transform: "scale(1.12)", offset: 0.6 },
        { opacity: 1, transform: "scale(1)" },
      ],
      { duration: 260, delay: 2330, easing: "cubic-bezier(.3,1.4,.5,1)" }
    );
    play(
      pulse,
      [
        { opacity: 0.8, transform: "scale(1)" },
        { opacity: 0, transform: "scale(2.4)" },
      ],
      { duration: 650, delay: 2450 }
    );
    const last = play(
      text,
      [
        { opacity: 0, transform: "translateY(6px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 320, delay: 2600 }
    );
    last.onfinish = () => onComplete?.();

    return () => anims.forEach((a) => a.cancel());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playId]);

  return (
    <div className={`dsa-root ${fullscreen ? "dsa-fullscreen" : ""}`} role="status" aria-live="polite">
      <div className="dsa-blur" aria-hidden="true">
        <b className="dsa-blob dsa-blob-a" />
        <b className="dsa-blob dsa-blob-b" />
        <b className="dsa-blob dsa-blob-c" />
      </div>

      <div className="dsa-stage">
        <div className="dsa-doc">
          {Array.from({ length: STRIPS }, (_, i) => (
            <div
              key={i}
              className="dsa-strip"
              style={{ top: i * STRIP_H }}
              ref={(el) => (stripRefs.current[i] = el)}
            >
              <div className="dsa-page" style={{ top: -i * STRIP_H }}>
                <h4>{title}</h4>
                {LINE_WIDTHS.map((w, k) => (
                  <i key={k} style={{ width: `${w}%` }} />
                ))}
                <div className="dsa-sig">{signature}</div>
              </div>
            </div>
          ))}
        </div>

        <svg ref={ringRef} className="dsa-ring" viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r="50" fill="none" stroke="#e11d48" strokeWidth="5" strokeLinecap="round" strokeDasharray="210 105" />
          <circle cx="60" cy="60" r="38" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeDasharray="40 200" opacity=".8" />
        </svg>

        <div ref={pulseRef} className="dsa-pulse" />

        <svg ref={shieldRef} className="dsa-shield" viewBox="0 0 64 64" aria-hidden="true">
          <path d="M32 3 56 12v20c0 15-10 25-24 30C18 57 8 47 8 32V12z" fill="#e11d48" />
          <path d="M21 32l8 8 15-16" fill="none" stroke="#fff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div ref={labelRef} className="dsa-label">{label}</div>
    </div>
  );
}
