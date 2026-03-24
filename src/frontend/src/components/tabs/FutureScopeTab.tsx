import { useEffect, useRef } from "react";

const FUTURE_ITEMS = [
  {
    icon: "🧠",
    title: "Real AI Resume Parsing",
    description:
      "Integrate large language models (LLMs) like GPT or Gemini to genuinely parse and understand resume content — extracting skills, experience, and achievements with true natural language understanding.",
    tag: "Core AI",
  },
  {
    icon: "🎯",
    title: "Job Description Matching",
    description:
      "Allow users to paste a job description and use AI to compute a semantic similarity score, identifying gaps in skills and suggesting targeted improvements for that specific role.",
    tag: "Personalization",
  },
  {
    icon: "✍️",
    title: "AI-Powered Rewriting",
    description:
      "Use generative AI to automatically rewrite weak bullet points, suggest stronger action verbs, and produce quantified achievement statements tailored to the candidate's industry.",
    tag: "Content AI",
  },
  {
    icon: "📊",
    title: "Real ATS Simulation",
    description:
      "Train a machine learning model on actual ATS systems to accurately predict how a resume would be scored and filtered, replacing the current simulated scoring with genuine predictions.",
    tag: "ML Model",
  },
  {
    icon: "🌐",
    title: "Industry-Specific AI Models",
    description:
      "Fine-tune AI models per industry (tech, finance, healthcare, etc.) so feedback and keyword suggestions are precisely aligned with what recruiters in each field actually look for.",
    tag: "Domain AI",
  },
  {
    icon: "📈",
    title: "Career Trajectory Analysis",
    description:
      "Use AI to analyze career progression patterns from resumes and suggest next logical roles, skill upgrades, and certifications based on the candidate's experience timeline.",
    tag: "Career AI",
  },
  {
    icon: "🔍",
    title: "Real-Time Job Market Insights",
    description:
      "Connect AI analysis with live job market data to surface trending skills, in-demand keywords, and salary benchmarks relevant to the candidate's target role and location.",
    tag: "Data & AI",
  },
  {
    icon: "🗣️",
    title: "AI Mock Interview Prep",
    description:
      "Extend beyond the resume: use AI to generate personalised interview questions based on resume content and provide coaching on likely areas where the candidate may be challenged.",
    tag: "Coaching AI",
  },
  {
    icon: "🌍",
    title: "Multilingual Resume Support",
    description:
      "Leverage AI translation and localisation models to support resumes in multiple languages and adapt feedback to region-specific hiring norms across different countries.",
    tag: "NLP",
  },
  {
    icon: "🔒",
    title: "Privacy-First On-Device AI",
    description:
      "Run lightweight AI models directly in the browser using WebAssembly or WebGPU so resume content is never sent to any server, maintaining full privacy while delivering real AI insights.",
    tag: "Edge AI",
  },
];

const TAG_COLORS: Record<string, string> = {
  "Core AI": "#6c63ff",
  Personalization: "#22d3ee",
  "Content AI": "#a78bfa",
  "ML Model": "#f59e0b",
  "Domain AI": "#10b981",
  "Career AI": "#f472b6",
  "Data & AI": "#fb923c",
  "Coaching AI": "#34d399",
  NLP: "#60a5fa",
  "Edge AI": "#e879f9",
};

export function FutureScopeTab() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reveals = sectionRef.current?.querySelectorAll(".reveal");
    if (!reveals) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const [i, e] of entries.entries()) {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("visible"), i * 80);
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
      style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}
    >
      {/* Header */}
      <div
        className="section-header reveal"
        style={{ textAlign: "center", marginBottom: "16px" }}
      >
        <div className="section-tag">Future Scope</div>
        <h2 className="section-title">The Road Ahead with AI</h2>
        <p
          className="section-sub"
          style={{ maxWidth: "620px", margin: "0 auto" }}
        >
          This is a demo project today — but here's how real AI can transform
          resume analysis into a truly intelligent career companion.
        </p>
      </div>

      {/* Vision banner */}
      <div
        className="reveal"
        style={{
          margin: "40px 0",
          padding: "32px 40px",
          borderRadius: "var(--radius2)",
          background:
            "linear-gradient(135deg, rgba(108,99,255,0.12), rgba(34,211,238,0.08))",
          border: "1px solid rgba(108,99,255,0.25)",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>🚀</div>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.3rem",
            fontWeight: 800,
            marginBottom: "10px",
            background: "linear-gradient(135deg, var(--accent), var(--cyan))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          From Simulated Demo to Real AI Intelligence
        </h3>
        <p
          style={{
            color: "var(--text2)",
            fontSize: "0.92rem",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          The features below outline a realistic path for evolving ResumeAI into
          a production-grade platform powered by genuine machine learning and
          large language models.
        </p>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          marginTop: "40px",
        }}
      >
        {FUTURE_ITEMS.map((item) => (
          <div
            key={item.title}
            className="reveal feature-card"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius2)",
              padding: "28px 24px",
              position: "relative",
              overflow: "hidden",
              transition: "all var(--transition)",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.transform = "translateY(-6px)";
              el.style.borderColor = "rgba(108,99,255,0.3)";
              el.style.boxShadow =
                "0 16px 50px rgba(0,0,0,0.25), 0 0 0 1px rgba(108,99,255,0.1)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.transform = "translateY(0)";
              el.style.borderColor = "var(--border)";
              el.style.boxShadow = "none";
            }}
          >
            {/* Tag */}
            <span
              style={{
                display: "inline-block",
                fontSize: "0.7rem",
                fontWeight: 700,
                padding: "3px 10px",
                borderRadius: "20px",
                marginBottom: "16px",
                background: `${TAG_COLORS[item.tag] ?? "#6c63ff"}22`,
                color: TAG_COLORS[item.tag] ?? "var(--accent2)",
                border: `1px solid ${TAG_COLORS[item.tag] ?? "#6c63ff"}44`,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              {item.tag}
            </span>

            <div
              style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}
            >
              <div
                style={{
                  fontSize: "1.75rem",
                  flexShrink: 0,
                  lineHeight: 1,
                  marginTop: "2px",
                }}
              >
                {item.icon}
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1rem",
                    fontWeight: 700,
                    marginBottom: "8px",
                    lineHeight: 1.3,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    color: "var(--text2)",
                    fontSize: "0.82rem",
                    lineHeight: 1.65,
                  }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Closing note */}
      <div
        className="reveal"
        style={{
          textAlign: "center",
          marginTop: "60px",
          padding: "40px",
          borderRadius: "var(--radius2)",
          background: "var(--surface)",
          border: "1px solid var(--border)",
        }}
      >
        <div style={{ fontSize: "2rem", marginBottom: "12px" }}>💡</div>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.25rem",
            fontWeight: 800,
            marginBottom: "12px",
          }}
        >
          Built as a College Project — Designed for the Future
        </h3>
        <p
          style={{
            color: "var(--text2)",
            fontSize: "0.88rem",
            maxWidth: "560px",
            margin: "0 auto",
            lineHeight: 1.75,
          }}
        >
          ResumeAI started as a semester project to explore how AI could
          revolutionise career tools. The scope above represents the natural
          next steps — turning this proof-of-concept into a real, AI-driven
          platform that genuinely helps job seekers land their dream roles.
        </p>
      </div>
    </section>
  );
}
