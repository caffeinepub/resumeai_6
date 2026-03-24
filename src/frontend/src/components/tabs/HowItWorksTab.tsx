import { useEffect, useRef } from "react";

const STEPS = [
  {
    num: "01",
    title: "Upload Your Resume",
    desc: "Drag and drop your PDF, DOCX, or TXT file. Our parser handles any format — no special formatting required. Supports resumes from all major builders including LinkedIn, Canva, and Novoresume.",
  },
  {
    num: "02",
    title: "AI Parses & Understands",
    desc: "Our NLP engine extracts structured data — contact info, work history, education, skills, certifications — and builds a semantic graph of your career profile.",
  },
  {
    num: "03",
    title: "Multi-Dimensional Scoring",
    desc: "We run 17 independent analysis modules including ATS simulation, keyword density analysis, readability scoring, and impact measurement — all in parallel.",
  },
  {
    num: "04",
    title: "Get Actionable Insights",
    desc: 'Receive a detailed report with prioritized, specific recommendations. Each suggestion includes the "why" behind it and an example of how to implement it.',
  },
];

export function HowItWorksTab() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reveals = sectionRef.current?.querySelectorAll(".reveal");
    if (!reveals) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const [i, e] of entries.entries()) {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("visible"), i * 100);
            observer.unobserve(e.target);
          }
        }
      },
      { threshold: 0.1 },
    );
    for (const r of Array.from(reveals)) {
      r.classList.remove("visible");
      observer.observe(r);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ padding: "80px 24px", maxWidth: "800px", margin: "0 auto" }}
    >
      <div
        className="section-header reveal"
        style={{ textAlign: "center", marginBottom: "60px" }}
      >
        <div className="section-tag">Process</div>
        <h2 className="section-title">How It Works</h2>
        <p className="section-sub">
          From upload to insights in four intelligent steps.
        </p>
      </div>
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            left: "35px",
            top: "40px",
            bottom: "40px",
            width: "2px",
            background:
              "linear-gradient(to bottom, var(--accent), var(--cyan), var(--pink))",
            borderRadius: "2px",
            opacity: 0.3,
          }}
          className="hidden-mobile"
        />
        {STEPS.map((s) => (
          <div
            key={s.num}
            className="reveal"
            style={{
              display: "flex",
              gap: "32px",
              alignItems: "flex-start",
              padding: "32px",
              marginBottom: "16px",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius2)",
              transition: "all var(--transition)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.borderColor = "var(--border2)";
              el.style.transform = "translateX(8px)";
              el.style.boxShadow = "0 8px 30px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.borderColor = "var(--border)";
              el.style.transform = "translateX(0)";
              el.style.boxShadow = "none";
            }}
          >
            <div
              className="grad-text"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.8rem",
                fontWeight: 800,
                lineHeight: 1,
                flexShrink: 0,
                width: "40px",
              }}
            >
              {s.num}
            </div>
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  marginBottom: "8px",
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  color: "var(--text2)",
                  fontSize: "0.88rem",
                  lineHeight: 1.7,
                }}
              >
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
