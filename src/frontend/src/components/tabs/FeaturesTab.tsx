import { useEffect, useRef, useState } from "react";

const FEATURES = [
  {
    icon: "📊",
    color: "rgba(108,99,255,0.18)",
    glowColor: "rgba(108,99,255,0.5)",
    accentHex: "#6C63FF",
    badge: "Analysis",
    badgeBg: "rgba(108,99,255,0.2)",
    badgeColor: "#a09cff",
    title: "Resume Score + Breakdown",
    desc: "Generates an overall resume health score out of 100, broken down across five key dimensions: format clarity, content depth, keyword density, impact language, and readability. Color-coded indicators show exactly which areas need the most attention so you can prioritize improvements efficiently.",
  },
  {
    icon: "🔍",
    color: "rgba(34,211,238,0.18)",
    glowColor: "rgba(34,211,238,0.5)",
    accentHex: "#22D3EE",
    badge: "Detection",
    badgeBg: "rgba(34,211,238,0.2)",
    badgeColor: "#67e8f9",
    title: "Missing Section Detector",
    desc: "Scans your resume for critical sections that recruiters and hiring managers expect — including professional summary, core skills, work experience, education, certifications, and contact info. Flags incomplete or absent sections with tailored guidance on what to add.",
  },
  {
    icon: "🎯",
    color: "rgba(244,114,182,0.18)",
    glowColor: "rgba(244,114,182,0.5)",
    accentHex: "#F472B6",
    badge: "Compatibility",
    badgeBg: "rgba(244,114,182,0.2)",
    badgeColor: "#f9a8d4",
    title: "ATS Compatibility Checker",
    desc: "Tests your resume against the parsing logic of major applicant tracking systems like Workday, Greenhouse, Lever, and Taleo. Identifies formatting issues, unreadable fonts, graphics, and special characters that cause ATS failures before your resume even reaches a human.",
  },
  {
    icon: "💡",
    color: "rgba(52,211,153,0.18)",
    glowColor: "rgba(52,211,153,0.5)",
    accentHex: "#34D399",
    badge: "AI Powered",
    badgeBg: "rgba(52,211,153,0.2)",
    badgeColor: "#6ee7b7",
    title: "Smart Suggestions",
    desc: "Delivers context-aware rewrite suggestions based on your industry, seniority level, and the specific role you're targeting. Each suggestion comes with a before/after comparison so you can see the improvement clearly and apply changes with confidence.",
  },
  {
    icon: "💼",
    color: "rgba(251,146,60,0.18)",
    glowColor: "rgba(251,146,60,0.5)",
    accentHex: "#FB923C",
    badge: "Matching",
    badgeBg: "rgba(251,146,60,0.2)",
    badgeColor: "#fdba74",
    title: "Job Role Match",
    desc: "Paste in any job description and get an instant percentage match showing how well your resume aligns with the role's requirements. Highlights matching skills, missing keywords, and experience gaps so you can tailor your resume precisely for each application.",
  },
  {
    icon: "📉",
    color: "rgba(167,139,250,0.18)",
    glowColor: "rgba(167,139,250,0.5)",
    accentHex: "#A78BFA",
    badge: "Gap Analysis",
    badgeBg: "rgba(167,139,250,0.2)",
    badgeColor: "#c4b5fd",
    title: "Skill Gap Analysis",
    desc: "Compares your current skill set against the most in-demand skills for your target role, sourced from thousands of real job postings. Ranks each gap by priority and suggests specific certifications, courses, or projects to close them fast.",
  },
  {
    icon: "🗺️",
    color: "rgba(99,202,183,0.18)",
    glowColor: "rgba(99,202,183,0.5)",
    accentHex: "#63CAB7",
    badge: "Visualization",
    badgeBg: "rgba(99,202,183,0.2)",
    badgeColor: "#99dfd5",
    title: "Resume Heatmap",
    desc: "Simulates recruiter eye-tracking behavior to show which sections of your resume capture attention and which get skipped. Color intensity reveals high-engagement zones so you can restructure your content for maximum impact in the first 6 seconds of review.",
  },
  {
    icon: "✍️",
    color: "rgba(248,113,113,0.18)",
    glowColor: "rgba(248,113,113,0.5)",
    accentHex: "#F87171",
    badge: "Optimization",
    badgeBg: "rgba(248,113,113,0.2)",
    badgeColor: "#fca5a5",
    title: "Action Verb Improver",
    desc: 'Identifies weak, overused, or passive verbs like "responsible for" and "helped with" throughout your bullet points. Suggests powerful, role-specific action verbs ranked by impact — making your achievements sound more authoritative and results-driven.',
  },
  {
    icon: "📏",
    color: "rgba(250,204,21,0.18)",
    glowColor: "rgba(250,204,21,0.5)",
    accentHex: "#FACC15",
    badge: "Analysis",
    badgeBg: "rgba(250,204,21,0.2)",
    badgeColor: "#fde68a",
    title: "Resume Length Analyzer",
    desc: "Evaluates whether your resume length is appropriate for your years of experience and the type of role you're applying for. Flags sections that are bloated, too thin, or padded with filler content, and recommends what to cut or expand.",
  },
  {
    icon: "🔁",
    color: "rgba(56,189,248,0.18)",
    glowColor: "rgba(56,189,248,0.5)",
    accentHex: "#38BDF8",
    badge: "Detection",
    badgeBg: "rgba(56,189,248,0.2)",
    badgeColor: "#7dd3fc",
    title: "Duplicate Content Detector",
    desc: "Detects repeated phrases, mirrored bullet points, and redundant skill mentions that appear across multiple sections. Eliminating duplicates tightens your resume, saves valuable space, and shows recruiters a focused, well-edited document.",
  },
];

function FeatureCard({ f, index }: { f: (typeof FEATURES)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      key={f.title}
      className="feature-card glass reveal"
      data-ocid={`feature.item.${index + 1}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "32px",
        borderRadius: "var(--radius2)",
        background: "var(--surface)",
        border: `1px solid ${hovered ? `${f.accentHex}66` : "var(--border)"}`,
        boxShadow: hovered
          ? `0 0 0 1px ${f.accentHex}33, 0 8px 32px ${f.glowColor}`
          : "none",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      {/* Badge */}
      <div
        style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          background: f.badgeBg,
          color: f.badgeColor,
          fontSize: "0.68rem",
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          padding: "3px 10px",
          borderRadius: "999px",
          border: `1px solid ${f.accentHex}44`,
          backdropFilter: "blur(6px)",
          transition: "background 0.3s ease",
        }}
      >
        {f.badge}
      </div>

      {/* Icon */}
      <div
        style={{
          width: hovered ? "60px" : "52px",
          height: hovered ? "60px" : "52px",
          borderRadius: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: hovered ? "1.7rem" : "1.5rem",
          marginBottom: "20px",
          marginTop: "4px",
          background: hovered ? f.color.replace("0.18", "0.32") : f.color,
          boxShadow: hovered ? `0 4px 16px ${f.glowColor}` : "none",
          transition: "all 0.3s ease",
        }}
      >
        {f.icon}
      </div>

      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.08rem",
          fontWeight: 700,
          marginBottom: "12px",
          paddingRight: "60px",
          color: hovered ? f.badgeColor : "var(--text1)",
          transition: "color 0.3s ease",
        }}
      >
        {f.title}
      </h3>
      <p
        style={{
          color: "var(--text2)",
          fontSize: "0.875rem",
          lineHeight: 1.75,
        }}
      >
        {f.desc}
      </p>
    </div>
  );
}

export function FeaturesTab() {
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
        <div className="section-tag">Features</div>
        <h2 className="section-title">
          Everything You Need to
          <br />
          Stand Out
        </h2>
        <p className="section-sub">
          Powered by advanced NLP and machine learning models trained on
          millions of job listings.
        </p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "20px",
          alignItems: "start",
        }}
      >
        {FEATURES.map((f, i) => (
          <FeatureCard key={f.title} f={f} index={i} />
        ))}
      </div>
    </section>
  );
}
