import { useEffect, useRef } from "react";

const BENEFITS = [
  {
    emoji: "🎓",
    title: "Fresh Graduates",
    desc: "Turn limited experience into a compelling narrative. We help you highlight transferable skills, academic projects, and internships effectively.",
  },
  {
    emoji: "🔄",
    title: "Career Changers",
    desc: "Bridge the gap between your past and future. Our AI maps your existing experience to new industry requirements.",
  },
  {
    emoji: "⏱️",
    title: "Time Saver",
    desc: "What takes career coaches hours to review, we do in seconds — so you can apply to more jobs, faster.",
  },
  {
    emoji: "💰",
    title: "Completely Free",
    desc: "No subscription, no credits, no paywalls. Professional-grade resume analysis is a right, not a luxury.",
  },
  {
    emoji: "🌍",
    title: "Global Job Markets",
    desc: "Optimized for US, UK, EU, and Asia-Pacific job markets. Understands regional resume norms and expectations.",
  },
  {
    emoji: "📚",
    title: "Learn & Improve",
    desc: "Every suggestion comes with learning resources. Build resume-writing skills alongside a better resume.",
  },
];

export function BenefitsTab() {
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
      <div
        className="section-header reveal"
        style={{ textAlign: "center", marginBottom: "60px" }}
      >
        <div className="section-tag">Benefits</div>
        <h2 className="section-title">
          Built for Students
          <br />
          &amp; Job Seekers
        </h2>
        <p className="section-sub">
          Whether you&apos;re a fresh graduate or switching careers, ResumeAI
          levels the playing field.
        </p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "16px",
        }}
      >
        {BENEFITS.map((b) => (
          <div
            key={b.title}
            className="reveal"
            style={{
              padding: "28px 24px",
              borderRadius: "var(--radius2)",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              transition: "all var(--transition)",
              textAlign: "center",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.borderColor = "var(--border2)";
              el.style.transform = "translateY(-4px)";
              el.style.boxShadow = "0 12px 40px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.borderColor = "var(--border)";
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "none";
            }}
          >
            <span
              style={{
                fontSize: "2.5rem",
                display: "block",
                marginBottom: "16px",
              }}
            >
              {b.emoji}
            </span>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1rem",
                fontWeight: 700,
                marginBottom: "8px",
              }}
            >
              {b.title}
            </h3>
            <p
              style={{
                color: "var(--text2)",
                fontSize: "0.84rem",
                lineHeight: 1.65,
              }}
            >
              {b.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
