import { useEffect, useRef } from "react";
import { useAudioEngine } from "../../hooks/useAudioEngine";

export interface AnalysisData {
  ats: number;
  keywords: number;
  impact: number;
  readability: number;
  overall: number;
  suggestions: Array<{
    type: "success" | "warning" | "error" | "info";
    text: string;
  }>;
  foundKeywords: string[];
  missingKeywords: string[];
}

export function generateAnalysisData(): AnalysisData {
  const ats = Math.floor(Math.random() * 25 + 72);
  const keywords = Math.floor(Math.random() * 20 + 60);
  const impact = Math.floor(Math.random() * 30 + 55);
  const readability = Math.floor(Math.random() * 20 + 70);
  const overall = Math.round((ats + keywords + impact + readability) / 4);
  return {
    ats,
    keywords,
    impact,
    readability,
    overall,
    suggestions: [
      {
        type: "warning",
        text: 'Add quantifiable achievements (e.g., "Increased sales by 35%") — 73% of shortlisted resumes use specific numbers.',
      },
      {
        type: "error",
        text: 'Missing key ATS keywords: "Agile", "cross-functional", "stakeholder management" — found in 80%+ of relevant job postings.',
      },
      {
        type: "success",
        text: 'Strong action verbs detected: "Developed", "Led", "Architected". Keep using industry-standard power words.',
      },
      {
        type: "warning",
        text: "Work experience section could use stronger bullet point formatting — start each with a past-tense action verb.",
      },
      {
        type: "info",
        text: "Consider adding a professional summary at the top. Resumes with summaries get 40% more recruiter attention.",
      },
    ],
    foundKeywords: [
      "JavaScript",
      "React",
      "Node.js",
      "SQL",
      "Git",
      "REST API",
      "Python",
    ],
    missingKeywords: ["TypeScript", "Docker", "AWS", "CI/CD", "Agile", "Scrum"],
  };
}

interface ScoreRingProps {
  value: number;
  label: string;
  color: string;
}

function ScoreRing({ value, label, color }: ScoreRingProps) {
  const circleRef = useRef<SVGCircleElement>(null);
  const r = 38;
  const circ = 2 * Math.PI * r;

  useEffect(() => {
    const el = circleRef.current;
    if (!el) return;
    el.style.strokeDashoffset = String(circ * (1 - value / 100));
  }, [value, circ]);

  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius2)",
        padding: "28px",
        textAlign: "center",
        transition: "all var(--transition)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(-4px)";
        el.style.boxShadow = "0 12px 40px var(--glow)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "none";
      }}
    >
      <div
        style={{
          width: "90px",
          height: "90px",
          borderRadius: "50%",
          margin: "0 auto 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          fontFamily: "var(--font-display)",
          fontSize: "1.4rem",
          fontWeight: 800,
        }}
      >
        <svg
          width="90"
          height="90"
          viewBox="0 0 90 90"
          style={{
            position: "absolute",
            inset: 0,
            transform: "rotate(-90deg)",
          }}
          aria-hidden="true"
        >
          <circle
            cx="45"
            cy="45"
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="6"
          />
          <circle
            ref={circleRef}
            cx="45"
            cy="45"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeDasharray={circ}
            strokeDashoffset={circ}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1.5s ease" }}
          />
        </svg>
        <span style={{ position: "relative", zIndex: 1, color }}>{value}</span>
      </div>
      <div
        style={{
          fontSize: "0.8rem",
          color: "var(--text2)",
          fontWeight: 500,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
    </div>
  );
}

interface FutureScopeItem {
  icon: string;
  title: string;
  description: string;
  tag: string;
  tagColor: string;
}

function getFutureScopeItems(data: AnalysisData): FutureScopeItem[] {
  const items: FutureScopeItem[] = [];

  if (data.keywords < 80) {
    items.push({
      icon: "🤖",
      title: "AI-Powered Keyword Injection",
      description:
        "A future AI model could scan live job postings and auto-suggest the most relevant missing keywords tailored to your target role — boosting your ATS pass rate significantly.",
      tag: "NLP · Job Matching",
      tagColor: "#6c63ff",
    });
  }

  if (data.impact < 80) {
    items.push({
      icon: "✍️",
      title: "Generative Bullet Point Rewriter",
      description:
        'With a GPT-style model, weak or passive bullet points could be automatically rewritten into strong, quantified achievement statements — transforming "Worked on features" into "Delivered 4 features reducing load time by 40%".',
      tag: "Generative AI",
      tagColor: "#f472b6",
    });
  }

  if (data.ats < 90) {
    items.push({
      icon: "🎯",
      title: "Live Job Description Matching",
      description:
        "An AI agent could accept a pasted job description and produce a real-time gap analysis — showing exactly which skills, phrases, and experience to add for that specific role.",
      tag: "LLM · Role Fit",
      tagColor: "#22d3ee",
    });
  }

  items.push({
    icon: "📝",
    title: "AI Summary Generator",
    description:
      "A language model trained on thousands of winning resumes could auto-draft a personalized professional summary section based on your experience and target industry — one of the highest-impact additions to any resume.",
    tag: "Generative AI",
    tagColor: "#34d399",
  });

  items.push({
    icon: "🗂️",
    title: "Smart Section Reordering",
    description:
      "AI could analyse recruiter attention patterns and recommend an optimal section order for your specific career stage — for example, placing Projects before Experience for fresh graduates.",
    tag: "ML · UX Optimisation",
    tagColor: "#fb923c",
  });

  if (data.readability < 85) {
    items.push({
      icon: "📖",
      title: "Readability & Tone Enhancer",
      description:
        "An NLP model could detect overly complex sentences, passive voice, and inconsistent tense — and suggest cleaner rewrites that are easier for both humans and automated scanners to parse.",
      tag: "NLP · Readability",
      tagColor: "#a78bfa",
    });
  }

  items.push({
    icon: "🌐",
    title: "Multi-Role Resume Versioning",
    description:
      "AI could maintain a master resume and automatically generate tailored versions for different roles — so you send a slightly different, optimised resume to each company without manual editing.",
    tag: "Automation",
    tagColor: "#6c63ff",
  });

  return items.slice(0, 5);
}

interface ResultsTabProps {
  data: AnalysisData | null;
  onGoUpload: () => void;
  onReanalyze: () => void;
  onToast: (msg: string, type: "success" | "error" | "info") => void;
}

const TYPE_MAP = {
  success: { dot: "#34d399", icon: "✅" },
  warning: { dot: "#fb923c", icon: "⚠️" },
  error: { dot: "#f87171", icon: "🔴" },
  info: { dot: "#6c63ff", icon: "ℹ️" },
};

export function ResultsTab({
  data,
  onGoUpload,
  onReanalyze,
  onToast,
}: ResultsTabProps) {
  const { playSuccess } = useAudioEngine();

  function copyResults() {
    if (!data) return;
    const text = `ResumeAI Analysis Report\n${"-".repeat(24)}\nOverall Score: ${data.overall}/100\nATS Score: ${data.ats}/100\nKeyword Match: ${data.keywords}/100\nImpact Score: ${data.impact}/100\nReadability: ${data.readability}/100\n\nRecommendations:\n${data.suggestions.map((s, i) => `${i + 1}. ${s.text}`).join("\n")}\n\nFound Keywords: ${data.foundKeywords.join(", ")}\nMissing Keywords: ${data.missingKeywords.join(", ")}\n`;
    navigator.clipboard.writeText(text).then(() => {
      playSuccess();
      onToast("📋 Report copied to clipboard!", "info");
    });
  }

  const scores = data
    ? [
        {
          label: "Overall Score",
          value: data.overall,
          color:
            data.overall >= 80
              ? "#34d399"
              : data.overall >= 60
                ? "#fb923c"
                : "#f87171",
        },
        { label: "ATS Score", value: data.ats, color: "#6c63ff" },
        { label: "Keyword Match", value: data.keywords, color: "#22d3ee" },
        { label: "Impact Score", value: data.impact, color: "#f472b6" },
        { label: "Readability", value: data.readability, color: "#34d399" },
      ]
    : [];

  const futureScopeItems = data ? getFutureScopeItems(data) : [];

  return (
    <section
      style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}
    >
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <div className="section-tag">Results</div>
        <h2 className="section-title">Your Analysis Report</h2>
        <p className="section-sub">
          Comprehensive AI-powered insights about your resume.
        </p>
      </div>

      {!data ? (
        <div
          data-ocid="results.empty_state"
          style={{
            textAlign: "center",
            padding: "80px 40px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius2)",
          }}
        >
          <span style={{ fontSize: "3rem" }}>📊</span>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              marginTop: "16px",
              marginBottom: "8px",
              fontSize: "1.3rem",
              fontWeight: 700,
            }}
          >
            No results yet
          </h3>
          <p style={{ color: "var(--text2)", marginBottom: "24px" }}>
            Upload your resume on the Upload tab and click &ldquo;Analyze
            Now&rdquo; to generate your report.
          </p>
          <button
            type="button"
            className="btn-primary"
            data-ocid="results.primary_button"
            style={{ margin: "0 auto", display: "inline-flex" }}
            onClick={onGoUpload}
          >
            Go to Upload →
          </button>
        </div>
      ) : (
        <div
          data-ocid="results.section"
          style={{ animation: "fadeSlideIn 0.45s ease" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "16px",
              marginBottom: "24px",
            }}
            data-ocid="results.card"
          >
            {scores.map((s) => (
              <ScoreRing
                key={s.label}
                value={s.value}
                label={s.label}
                color={s.color}
              />
            ))}
          </div>

          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius2)",
              padding: "28px",
              marginBottom: "16px",
            }}
            data-ocid="results.panel"
          >
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1rem",
                fontWeight: 700,
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              💡 AI Recommendations
            </h3>
            {data.suggestions.map((s, i) => (
              <div
                key={s.text}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  padding: "12px 0",
                  borderBottom:
                    i < data.suggestions.length - 1
                      ? "1px solid var(--border)"
                      : "none",
                  fontSize: "0.87rem",
                  color: "var(--text2)",
                  lineHeight: 1.6,
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: TYPE_MAP[s.type].dot,
                    flexShrink: 0,
                    marginTop: "6px",
                  }}
                />
                <span>
                  {TYPE_MAP[s.type].icon} {s.text}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius2)",
              padding: "28px",
              marginBottom: "16px",
            }}
            data-ocid="results.table"
          >
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1rem",
                fontWeight: 700,
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              🔑 Keyword Analysis
            </h3>
            <div style={{ marginBottom: "16px" }}>
              <div
                style={{
                  fontSize: "0.82rem",
                  color: "var(--text3)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "8px",
                }}
              >
                Found Keywords
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {data.foundKeywords.map((k) => (
                  <span
                    key={k}
                    style={{
                      background: "rgba(52,211,153,0.1)",
                      border: "1px solid rgba(52,211,153,0.2)",
                      borderRadius: "8px",
                      padding: "4px 12px",
                      fontSize: "0.8rem",
                      color: "#34d399",
                    }}
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: "0.82rem",
                  color: "var(--text3)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "8px",
                }}
              >
                Missing Keywords
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {data.missingKeywords.map((k) => (
                  <span
                    key={k}
                    style={{
                      background: "rgba(248,113,113,0.1)",
                      border: "1px solid rgba(248,113,113,0.2)",
                      borderRadius: "8px",
                      padding: "4px 12px",
                      fontSize: "0.8rem",
                      color: "#f87171",
                    }}
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Future Scope Panel */}
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(108,99,255,0.08) 0%, rgba(34,211,238,0.05) 100%)",
              border: "1px solid rgba(108,99,255,0.25)",
              borderRadius: "var(--radius2)",
              padding: "28px",
              marginBottom: "16px",
              position: "relative",
              overflow: "hidden",
            }}
            data-ocid="results.future_scope"
          >
            {/* decorative glow */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "-40px",
                right: "-40px",
                width: "160px",
                height: "160px",
                borderRadius: "50%",
                background: "rgba(108,99,255,0.12)",
                filter: "blur(40px)",
                pointerEvents: "none",
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "6px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1rem",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    margin: 0,
                  }}
                >
                  🚀 Future Scope — AI-Powered Improvements
                </h3>
                <span
                  style={{
                    background: "rgba(108,99,255,0.15)",
                    border: "1px solid rgba(108,99,255,0.3)",
                    borderRadius: "20px",
                    padding: "2px 10px",
                    fontSize: "0.72rem",
                    color: "#a78bfa",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}
                >
                  Coming Soon
                </span>
              </div>
              <p
                style={{
                  fontSize: "0.83rem",
                  color: "var(--text3)",
                  marginBottom: "24px",
                  lineHeight: 1.6,
                }}
              >
                Based on your analysis scores, here are the AI-driven
                enhancements that could take your resume to the next level.
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: "14px",
                }}
              >
                {futureScopeItems.map((item) => (
                  <div
                    key={item.title}
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: "12px",
                      padding: "18px 20px",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.borderColor = "rgba(108,99,255,0.4)";
                      el.style.transform = "translateY(-2px)";
                      el.style.boxShadow = "0 8px 24px rgba(108,99,255,0.12)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.borderColor = "var(--border)";
                      el.style.transform = "translateY(0)";
                      el.style.boxShadow = "none";
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "12px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "1.4rem",
                          lineHeight: 1,
                          flexShrink: 0,
                        }}
                      >
                        {item.icon}
                      </span>
                      <div>
                        <div
                          style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 700,
                            fontSize: "0.88rem",
                            marginBottom: "6px",
                            color: "var(--text)",
                          }}
                        >
                          {item.title}
                        </div>
                        <p
                          style={{
                            fontSize: "0.8rem",
                            color: "var(--text2)",
                            lineHeight: 1.55,
                            margin: "0 0 10px",
                          }}
                        >
                          {item.description}
                        </p>
                        <span
                          style={{
                            display: "inline-block",
                            background: `${item.tagColor}18`,
                            border: `1px solid ${item.tagColor}35`,
                            borderRadius: "6px",
                            padding: "2px 8px",
                            fontSize: "0.72rem",
                            color: item.tagColor,
                            fontWeight: 600,
                            letterSpacing: "0.03em",
                          }}
                        >
                          {item.tag}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              marginTop: "8px",
            }}
          >
            <button
              type="button"
              data-ocid="results.secondary_button"
              onClick={copyResults}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "var(--surface)",
                border: "1px solid var(--border2)",
                color: "var(--text2)",
                borderRadius: "10px",
                padding: "10px 18px",
                fontFamily: "var(--font-body)",
                fontSize: "0.83rem",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.2s",
                letterSpacing: "0.01em",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = "var(--surface2)";
                el.style.color = "var(--text)";
                el.style.borderColor = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = "var(--surface)";
                el.style.color = "var(--text2)";
                el.style.borderColor = "var(--border2)";
              }}
            >
              📋 Copy Report
            </button>
            <button
              type="button"
              className="btn-primary"
              data-ocid="results.primary_button"
              onClick={onReanalyze}
            >
              🔄 Re-analyze
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
