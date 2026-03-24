import { useEffect, useRef } from "react";

const TEAM = [
  { avatar: "👩‍💻", name: "Harshpreet Kaur" },
  { avatar: "🧑‍💻", name: "Harshvardhan Singh Rathore" },
  { avatar: "👩‍🎨", name: "Isha Singhal" },
  { avatar: "👩‍🔬", name: "Khushali Garg" },
  { avatar: "👩‍💼", name: "Mahi Jangid" },
  { avatar: "🧑‍🔬", name: "Mahipal Singh Rathore" },
  { avatar: "👩‍🏫", name: "Mishika Agrawal" },
];

const TECH = [
  "⚛️ React 19",
  "🔷 TypeScript",
  "🎨 CSS Variables",
  "🧠 Claude AI",
  "⚡ Canvas API",
  "🎭 Web Audio API",
  "📱 Mobile First",
  "🌐 Vite",
];

export function AboutTab() {
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
        <div className="section-tag">About</div>
        <h2 className="section-title">Meet the Team</h2>
        <p className="section-sub">
          Built with passion by students, for students. Powered by cutting-edge
          AI research.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {TEAM.map((m) => (
          <div
            key={m.name}
            className="reveal"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius2)",
              padding: "32px 24px",
              textAlign: "center",
              transition: "all var(--transition)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.transform = "translateY(-4px)";
              el.style.borderColor = "var(--border2)";
              el.style.boxShadow = "0 12px 40px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.transform = "translateY(0)";
              el.style.borderColor = "var(--border)";
              el.style.boxShadow = "none";
            }}
          >
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                margin: "0 auto 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
                background:
                  "linear-gradient(135deg, var(--accent), var(--cyan))",
              }}
            >
              {m.avatar}
            </div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1rem",
                fontWeight: 700,
              }}
            >
              {m.name}
            </h3>
          </div>
        ))}
      </div>

      <div
        style={{ textAlign: "center", marginTop: "60px" }}
        className="reveal"
      >
        <div className="section-tag" style={{ marginBottom: "24px" }}>
          Tech Stack
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          {TECH.map((t) => (
            <span
              key={t}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "var(--surface)",
                border: "1px solid var(--border2)",
                borderRadius: "10px",
                padding: "8px 14px",
                fontSize: "0.8rem",
                fontWeight: 500,
                color: "var(--text2)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLSpanElement;
                el.style.color = "var(--accent2)";
                el.style.borderColor = "rgba(108,99,255,0.3)";
                el.style.background = "rgba(108,99,255,0.08)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLSpanElement;
                el.style.color = "var(--text2)";
                el.style.borderColor = "var(--border2)";
                el.style.background = "var(--surface)";
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

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
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.5rem",
            fontWeight: 800,
            marginBottom: "12px",
          }}
        >
          This is a college project demo
        </h3>
        <p
          style={{
            color: "var(--text2)",
            fontSize: "0.9rem",
            maxWidth: "500px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          ResumeAI demonstrates AI-powered resume analysis with a real-looking
          frontend. The analysis shown is simulated for demo purposes. Built as
          a semester project in Computer Science.
        </p>
      </div>
    </section>
  );
}
