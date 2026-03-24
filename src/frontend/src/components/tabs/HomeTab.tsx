import { useEffect, useRef, useState } from "react";
import { useAudioEngine } from "../../hooks/useAudioEngine";

const PHRASES = [
  "Supercharged.",
  "ATS-Optimized.",
  "AI-Powered.",
  "Job-Ready.",
];

function useTypingEffect() {
  const [display, setDisplay] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = PHRASES[phraseIdx];

    if (!deleting) {
      if (charIdx < phrase.length) {
        const t = setTimeout(() => {
          setDisplay(phrase.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        }, 90);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(t);
    }

    if (charIdx > 0) {
      const t = setTimeout(() => {
        setDisplay(phrase.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      }, 50);
      return () => clearTimeout(t);
    }
    setDeleting(false);
    setPhraseIdx((i) => (i + 1) % PHRASES.length);
  }, [charIdx, deleting, phraseIdx]);

  return display;
}

function useCounter(target: number, started: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!started) return;
    setValue(0);
    const steps = target / (2000 / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + steps, target);
      setValue(Math.round(current));
      if (current >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target, started]);
  return value;
}

function StatCounter({
  target,
  label,
  suffix,
}: { target: number; label: string; suffix: string }) {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const value = useCounter(target, started);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const display = `${value}${suffix}`;

  return (
    <div ref={ref} className="text-center">
      <div
        className="grad-text"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "2.5rem",
          fontWeight: 800,
          lineHeight: 1,
        }}
      >
        {display}
      </div>
      <div
        style={{
          fontSize: "0.82rem",
          color: "var(--text3)",
          marginTop: "4px",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
    </div>
  );
}

interface HomeTabProps {
  onSwitchTab: (tab: string) => void;
}

export function HomeTab({ onSwitchTab }: HomeTabProps) {
  const typedText = useTypingEffect();
  const { playHover } = useAudioEngine();

  return (
    <div
      style={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "80px 24px 40px",
      }}
      data-ocid="home.section"
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          background: "rgba(108,99,255,0.12)",
          border: "1px solid rgba(108,99,255,0.3)",
          borderRadius: "100px",
          padding: "6px 16px",
          fontSize: "0.78rem",
          fontWeight: 500,
          color: "var(--accent2)",
          marginBottom: "32px",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}
      >
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "var(--green)",
            animation: "pulse 2s infinite",
            flexShrink: 0,
          }}
        />
        AI-Powered Analysis · 2026
      </div>

      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
          fontWeight: 800,
          lineHeight: 1.08,
          letterSpacing: "-0.03em",
          marginBottom: "24px",
        }}
      >
        Your Resume,
        <br />
        <span
          className="typing-cursor"
          style={{
            background:
              "linear-gradient(135deg, var(--accent) 0%, var(--cyan) 50%, var(--pink) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {typedText}
        </span>
      </h1>

      <p
        style={{
          fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
          color: "var(--text2)",
          maxWidth: "600px",
          margin: "0 auto 40px",
          lineHeight: 1.7,
          fontWeight: 300,
        }}
      >
        Upload your resume and get instant AI-driven feedback on ATS
        compatibility, keyword optimization, and actionable improvements to land
        your dream job.
      </p>

      <div
        style={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <button
          type="button"
          className="btn-primary"
          data-ocid="home.primary_button"
          onClick={() => onSwitchTab("upload")}
          onMouseEnter={playHover}
        >
          🚀 Analyze Resume
        </button>
        <button
          type="button"
          className="btn-secondary"
          data-ocid="home.secondary_button"
          onClick={() => onSwitchTab("how")}
          onMouseEnter={playHover}
        >
          Learn How →
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: "48px",
          marginTop: "64px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
        data-ocid="home.card"
      >
        <StatCounter target={98} label="ATS Accuracy" suffix="%" />
        <StatCounter target={4} label="Sec Analysis Time" suffix="s" />
        <StatCounter target={92} label="Success Rate" suffix="%" />
      </div>
    </div>
  );
}
