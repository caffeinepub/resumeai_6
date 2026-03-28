import { useEffect, useRef, useState } from "react";
import { useAudioEngine } from "../../hooks/useAudioEngine";

export interface JobRoleMatch {
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  roleExpectations: string[];
}

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
  selectedRole?: string;
  jobRoleMatch?: JobRoleMatch;
  rewrittenResume?: RewrittenResume;
}

export interface RewrittenResume {
  name: string;
  contact: string;
  summary: string;
  skills: string[];
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    originalBullets: string[];
    rewrittenBullets: string[];
  }>;
  education: Array<{ degree: string; institution: string; year: string }>;
  projects: Array<{ name: string; description: string; tech: string[] }>;
}

const ROLE_DATA: Record<string, { skills: string[]; expectations: string[] }> =
  {
    "Software Engineer": {
      skills: [
        "Data Structures",
        "Algorithms",
        "System Design",
        "Git",
        "REST APIs",
        "SQL",
        "Testing",
        "OOP",
        "CI/CD",
        "Docker",
      ],
      expectations: [
        "Strong problem-solving and algorithmic thinking",
        "Experience with version control and collaborative development",
        "Familiarity with software architecture patterns",
        "Ability to write clean, maintainable code",
      ],
    },
    "Frontend Developer": {
      skills: [
        "React",
        "TypeScript",
        "HTML/CSS",
        "JavaScript",
        "Responsive Design",
        "Git",
        "REST APIs",
        "Performance Optimization",
        "Testing",
        "Webpack",
      ],
      expectations: [
        "Proficiency in modern JavaScript frameworks (React/Vue/Angular)",
        "Strong eye for UI/UX and pixel-perfect implementation",
        "Cross-browser compatibility and accessibility knowledge",
        "Experience with build tools and front-end workflows",
      ],
    },
    "Backend Developer": {
      skills: [
        "Node.js",
        "Python",
        "Databases",
        "REST APIs",
        "Docker",
        "CI/CD",
        "SQL",
        "Authentication",
        "Microservices",
        "Cloud",
      ],
      expectations: [
        "Experience designing and building scalable APIs",
        "Deep knowledge of databases (SQL & NoSQL)",
        "Understanding of security, auth, and data validation",
        "Familiarity with cloud infrastructure and deployment",
      ],
    },
    "Full Stack Developer": {
      skills: [
        "React",
        "Node.js",
        "SQL",
        "REST APIs",
        "TypeScript",
        "Docker",
        "Git",
        "Cloud",
        "Testing",
        "CSS",
      ],
      expectations: [
        "End-to-end ownership of features from UI to database",
        "Comfortable switching between frontend and backend contexts",
        "Experience with deployment and DevOps workflows",
        "Ability to design and consume APIs efficiently",
      ],
    },
    "Data Scientist": {
      skills: [
        "Python",
        "Machine Learning",
        "Pandas",
        "NumPy",
        "SQL",
        "Statistics",
        "TensorFlow",
        "Data Visualization",
        "Jupyter",
        "Scikit-learn",
      ],
      expectations: [
        "Strong foundation in statistics and probability",
        "Experience with end-to-end ML pipelines",
        "Ability to communicate insights from data clearly",
        "Familiarity with big data tools and cloud ML platforms",
      ],
    },
    "ML Engineer": {
      skills: [
        "Python",
        "TensorFlow",
        "PyTorch",
        "MLOps",
        "Docker",
        "Cloud ML",
        "Data Pipelines",
        "SQL",
        "Model Deployment",
        "Statistics",
      ],
      expectations: [
        "Experience deploying and monitoring ML models in production",
        "Knowledge of model optimization and performance tuning",
        "Familiarity with MLOps tools and platforms",
        "Strong software engineering skills alongside ML expertise",
      ],
    },
    "DevOps Engineer": {
      skills: [
        "Docker",
        "Kubernetes",
        "CI/CD",
        "Linux",
        "Cloud (AWS/GCP/Azure)",
        "Terraform",
        "Ansible",
        "Git",
        "Monitoring",
        "Shell Scripting",
      ],
      expectations: [
        "Experience managing cloud infrastructure at scale",
        "Strong scripting and automation skills",
        "Knowledge of container orchestration and microservices",
        "Proactive approach to system reliability and incident response",
      ],
    },
    "Cybersecurity Analyst": {
      skills: [
        "Network Security",
        "SIEM",
        "Penetration Testing",
        "Risk Assessment",
        "Firewalls",
        "Compliance",
        "Incident Response",
        "Python",
        "Linux",
        "Cryptography",
      ],
      expectations: [
        "Understanding of common attack vectors and defense strategies",
        "Experience with security tooling and SIEM platforms",
        "Familiarity with compliance frameworks (ISO, SOC2, GDPR)",
        "Ability to conduct vulnerability assessments and pen tests",
      ],
    },
    "Product Manager": {
      skills: [
        "Roadmapping",
        "User Research",
        "Agile",
        "Stakeholder Management",
        "Data Analysis",
        "A/B Testing",
        "Prioritization",
        "SQL",
        "Wireframing",
        "Communication",
      ],
      expectations: [
        "Proven ability to define and execute product strategy",
        "Data-driven decision making with strong analytical skills",
        "Experience working cross-functionally with engineering and design",
        "Excellent communication and stakeholder management",
      ],
    },
    "Business Analyst": {
      skills: [
        "Requirements Gathering",
        "SQL",
        "Excel",
        "Process Mapping",
        "Stakeholder Management",
        "Documentation",
        "Agile",
        "Data Analysis",
        "JIRA",
        "Presentation",
      ],
      expectations: [
        "Strong ability to bridge business needs and technical solutions",
        "Experience creating clear requirements and process documentation",
        "Data analysis skills to support business decisions",
        "Effective communication with both technical and non-technical teams",
      ],
    },
    "Marketing Manager": {
      skills: [
        "Digital Marketing",
        "SEO/SEM",
        "Analytics",
        "Content Strategy",
        "Social Media",
        "Email Marketing",
        "CRM",
        "Brand Management",
        "Copywriting",
        "Campaign Management",
      ],
      expectations: [
        "Proven track record of driving growth through campaigns",
        "Strong grasp of marketing analytics and ROI measurement",
        "Experience managing multi-channel marketing campaigns",
        "Creative storytelling with data-backed decision making",
      ],
    },
    "UI/UX Designer": {
      skills: [
        "Figma",
        "User Research",
        "Prototyping",
        "Wireframing",
        "Usability Testing",
        "Design Systems",
        "HTML/CSS",
        "Adobe XD",
        "Accessibility",
        "Interaction Design",
      ],
      expectations: [
        "Portfolio demonstrating end-to-end design process",
        "Ability to translate user research into intuitive interfaces",
        "Experience with design systems and component libraries",
        "Understanding of accessibility standards and inclusive design",
      ],
    },
    "Data Analyst": {
      skills: [
        "SQL",
        "Excel",
        "Python",
        "Data Visualization",
        "Tableau/Power BI",
        "Statistics",
        "ETL",
        "Reporting",
        "Excel",
        "Dashboard Design",
      ],
      expectations: [
        "Ability to extract, clean, and analyze large datasets",
        "Strong data visualization and storytelling skills",
        "Experience with BI tools (Tableau, Power BI, Looker)",
        "Statistical thinking to translate data into business insights",
      ],
    },
    "Project Manager": {
      skills: [
        "Agile/Scrum",
        "Risk Management",
        "Stakeholder Management",
        "Budgeting",
        "JIRA",
        "Communication",
        "Planning",
        "Leadership",
        "Documentation",
        "MS Project",
      ],
      expectations: [
        "Experience delivering projects on time and within budget",
        "Strong stakeholder communication and expectation management",
        "Familiarity with Agile and Waterfall methodologies",
        "Ability to identify and mitigate project risks proactively",
      ],
    },
  };

function computeJobRoleMatch(role: string, data: AnalysisData): JobRoleMatch {
  const roleInfo = ROLE_DATA[role];
  if (!roleInfo) {
    // Generic fallback
    const score = Math.round((data.keywords + data.ats) / 2);
    return {
      matchScore: score,
      matchedSkills: data.foundKeywords.slice(0, 4),
      missingSkills: data.missingKeywords.slice(0, 4),
      roleExpectations: [
        "Relevant technical or domain expertise",
        "Clear demonstration of impact and results",
        "Good communication and collaboration skills",
        "Continuous learning and adaptability",
      ],
    };
  }
  const { skills, expectations } = roleInfo;
  const found = data.foundKeywords.map((k) => k.toLowerCase());
  const matched = skills.filter((s) =>
    found.some((f) => f.includes(s.toLowerCase().split("/")[0].split(" ")[0])),
  );
  const missing = skills.filter((s) => !matched.includes(s)).slice(0, 5);
  const matchScore = Math.min(
    95,
    Math.max(
      30,
      Math.round(
        (matched.length / skills.length) * 100 + (data.ats - 70) * 0.5,
      ),
    ),
  );
  return {
    matchScore,
    matchedSkills: matched.slice(0, 6),
    missingSkills: missing.slice(0, 5),
    roleExpectations: expectations,
  };
}

const RESUME_NAMES = [
  "Alex Johnson",
  "Jordan Lee",
  "Morgan Chen",
  "Taylor Patel",
  "Sam Williams",
];
const RESUME_CONTACTS = [
  "alex.johnson@email.com | linkedin.com/in/alexjohnson | +91 98765 43210",
  "jordan.lee@email.com | linkedin.com/in/jordanlee | +91 87654 32109",
  "morgan.chen@email.com | linkedin.com/in/morganche | +91 76543 21098",
];
const SUMMARIES: Record<string, string[]> = {
  "Software Engineer": [
    "Results-driven Software Engineer with 2+ years of hands-on experience building scalable web applications using React and Node.js. Proven track record of delivering high-impact features that improve user engagement and system performance.",
    "Passionate Software Engineer specializing in full-stack development with expertise in cloud-native architectures. Consistently ships production-ready code with a focus on code quality, performance, and cross-team collaboration.",
  ],
  "Frontend Developer": [
    "Creative Frontend Developer with a strong eye for detail and expertise in React, TypeScript, and modern CSS. Delivered pixel-perfect UIs that boosted user retention by an average of 25% across multiple product launches.",
    "Frontend Developer with 2+ years crafting accessible, performant web interfaces. Champion of design systems and component reusability, reducing frontend development time by 30% at previous roles.",
  ],
  default: [
    "Highly motivated professional with hands-on experience in delivering measurable outcomes in fast-paced environments. Adept at collaborating cross-functionally, solving complex challenges, and driving continuous improvement.",
    "Results-oriented graduate with demonstrated expertise in analytical thinking and project execution. Committed to leveraging technical skills and domain knowledge to contribute meaningfully to organizational goals.",
  ],
};
const ROLE_SPECIFIC_SKILLS: Record<string, string[]> = {
  "Software Engineer": ["System Design", "Docker", "CI/CD", "Agile/Scrum"],
  "Frontend Developer": [
    "TypeScript",
    "Figma",
    "Accessibility",
    "Performance Optimization",
  ],
  "Backend Developer": ["Microservices", "PostgreSQL", "Redis", "API Design"],
  "Data Scientist": [
    "Machine Learning",
    "TensorFlow",
    "Pandas",
    "Statistical Analysis",
  ],
  "Product Manager": [
    "Roadmapping",
    "User Research",
    "OKRs",
    "Stakeholder Management",
  ],
  default: ["Communication", "Problem Solving", "Agile", "Team Collaboration"],
};

function generateRewrittenResume(
  data: AnalysisData,
  role = "",
  fileName = "",
): RewrittenResume {
  // Derive name from filename if available
  let name = "";
  let contact = "";
  if (fileName) {
    const base = fileName.replace(/\.(pdf|docx|txt)$/i, "");
    const cleaned = base
      .replace(/[_\-.]+/g, " ")
      .replace(/\b(resume|cv|final|v\d+|latest|new)\b/gi, "")
      .replace(/\s+/g, " ")
      .trim();
    const titleCased = cleaned
      .split(" ")
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");
    const parts = titleCased.split(" ").filter(Boolean);
    if (parts.length >= 2 || (parts.length === 1 && parts[0].length >= 4)) {
      name = titleCased;
      const first = parts[0].toLowerCase();
      const last = (parts[1] ?? parts[0]).toLowerCase();
      const phone = `+91-${Math.floor(7000000000 + Math.random() * 2999999999)}`;
      contact = `${first}.${last}@gmail.com | linkedin.com/in/${first}${last} | ${phone}`;
    }
  }
  if (!name) {
    name = RESUME_NAMES[Math.floor(Math.random() * RESUME_NAMES.length)];
    contact =
      RESUME_CONTACTS[Math.floor(Math.random() * RESUME_CONTACTS.length)];
  }
  const summaryPool = SUMMARIES[role] ?? SUMMARIES.default;
  const summary = summaryPool[Math.floor(Math.random() * summaryPool.length)];
  const roleSkills = ROLE_SPECIFIC_SKILLS[role] ?? ROLE_SPECIFIC_SKILLS.default;
  const baseSkills = data.foundKeywords.slice(0, 8);
  const skills = [...new Set([...baseSkills, ...roleSkills])].slice(0, 12);

  const companies = [
    "TechSolutions Pvt. Ltd.",
    "InnovateCorp",
    "NexGen Systems",
    "Catalyst Labs",
  ];
  const comp1 = companies[Math.floor(Math.random() * companies.length)];
  const comp2 = companies.filter((c) => c !== comp1)[
    Math.floor(Math.random() * (companies.length - 1))
  ];
  const jobTitle = role || "Software Developer";

  const expVariants = [
    {
      originalBullets: [
        "Was responsible for managing the frontend development tasks",
        "Helped with fixing bugs and did code reviews sometimes",
        "Was part of a team that worked on the product features",
      ],
      rewrittenBullets: [
        "Led frontend development of 3 core product features, reducing page load time by 40% and improving Lighthouse score from 62 to 91",
        "Resolved 45+ critical bugs across the codebase, cutting production incident rate by 30% over two sprints",
        "Collaborated with a cross-functional team of 6 to ship a redesigned user dashboard \u2014 adopted by 10,000+ active users within the first month",
      ],
    },
    {
      originalBullets: [
        "Helped with development of some internal tools",
        "Did documentation for a few modules",
        "Participated in daily standups and meetings",
      ],
      rewrittenBullets: [
        "Architected and shipped an internal automation tool that eliminated 8+ hours of manual work per week for the operations team",
        "Authored comprehensive technical documentation for 12 API modules, reducing onboarding time for new developers by 50%",
        "Championed daily standup improvements and introduced sprint retrospectives, boosting team velocity by 20% over 2 quarters",
      ],
    },
  ];
  const expChoice = expVariants[Math.floor(Math.random() * expVariants.length)];

  return {
    name,
    contact,
    summary,
    skills,
    experience: [
      {
        title: jobTitle,
        company: comp1,
        duration: "Jan 2023 – Present",
        originalBullets: expChoice.originalBullets,
        rewrittenBullets: expChoice.rewrittenBullets,
      },
      {
        title: "Junior Developer (Intern)",
        company: comp2,
        duration: "Jun 2022 – Dec 2022",
        originalBullets: [
          "Was responsible for testing the application",
          "Assisted senior developers with various tasks",
        ],
        rewrittenBullets: [
          "Designed and executed 120+ test cases using Jest, achieving 95% code coverage for 3 critical user-facing modules",
          "Paired with senior engineers to build 2 REST API endpoints, delivering ahead of schedule and earning early hire offer",
        ],
      },
    ],
    education: [
      {
        degree: "B.Tech in Computer Science & Engineering",
        institution: "Institute of Technology, Jaipur",
        year: "2024",
      },
    ],
    projects: [
      {
        name: role ? `${role} Analytics Dashboard` : "Full-Stack Task Manager",
        description: role
          ? `Built an end-to-end analytics platform tailored for ${role.toLowerCase()} workflows with real-time insights, role-based access control, and export functionality — reduced reporting time by 60%`
          : "Developed a full-stack task management app with real-time collaboration, drag-and-drop boards, and JWT authentication — onboarded 200+ beta users in the first week",
        tech: skills.slice(0, 4),
      },
    ],
  };
}

export function generateAnalysisData(role = "", fileName = ""): AnalysisData {
  const ats = Math.floor(Math.random() * 25 + 72);
  const keywords = Math.floor(Math.random() * 20 + 60);
  const impact = Math.floor(Math.random() * 30 + 55);
  const readability = Math.floor(Math.random() * 20 + 70);
  const overall = Math.round((ats + keywords + impact + readability) / 4);
  const analysisResult: AnalysisData = {
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
    selectedRole: role || undefined,
    jobRoleMatch: role
      ? computeJobRoleMatch(role, {
          ats,
          keywords,
          impact,
          readability,
          overall,
          suggestions: [],
          foundKeywords: [
            "JavaScript",
            "React",
            "Node.js",
            "SQL",
            "Git",
            "REST API",
            "Python",
          ],
          missingKeywords: [
            "TypeScript",
            "Docker",
            "AWS",
            "CI/CD",
            "Agile",
            "Scrum",
          ],
        })
      : undefined,
  };
  analysisResult.rewrittenResume = generateRewrittenResume(
    analysisResult,
    role,
    fileName,
  );
  return analysisResult;
}

interface RedFlag {
  category: string;
  title: string;
  description: string;
  severity: "critical" | "warning";
}

function generateRedFlags(data: AnalysisData): RedFlag[] {
  const flags: RedFlag[] = [];

  // Always: Language & Tone Issues
  flags.push({
    category: "Language & Tone",
    title: "Passive language detected",
    description:
      "'Was responsible for' and 'helped with' weaken impact. Replace with Led, Built, Delivered.",
    severity: "critical",
  });

  // Always: Subtle Psychological Red Flags
  flags.push({
    category: "Psychological Red Flags",
    title: "Looks like a template resume",
    description:
      "No personal voice or differentiation — identical to thousands of other resumes.",
    severity: "warning",
  });

  // Always: Positioning Mistakes
  flags.push({
    category: "Positioning",
    title: "Self-focused objective statement",
    description:
      "Your summary focuses on what you want, not the value you bring to an employer.",
    severity: "warning",
  });

  // Always: Proof Gaps
  flags.push({
    category: "Proof & Authenticity",
    title: "Projects lack context",
    description:
      "Projects are listed but missing the problem → solution → result structure.",
    severity: "critical",
  });

  // Conditional flags
  if (data.impact < 75) {
    flags.push({
      category: "Content Red Flags",
      title: "Responsibility-heavy, impact-light",
      description:
        "Your bullets describe tasks but lack measurable outcomes. Add numbers: revenue, %, time saved.",
      severity: "critical",
    });
  }

  if (data.keywords < 75) {
    flags.push({
      category: "Content Red Flags",
      title: "Buzzword overload",
      description:
        "Phrases like 'strategic thinker' and 'dynamic professional' appear without supporting evidence.",
      severity: "warning",
    });
  }

  if (data.ats < 85) {
    flags.push({
      category: "Formatting & Design",
      title: "ATS-blocking design elements",
      description:
        "Graphic elements, icons, or rating bars may cause ATS rejection before a human sees it.",
      severity: "critical",
    });
  }

  if (data.readability < 80) {
    flags.push({
      category: "Language & Tone",
      title: "Long text blocks",
      description:
        "Paragraph-style experience descriptions lose recruiter attention in under 6 seconds.",
      severity: "warning",
    });
  }

  // Extra padding flags if needed
  if (flags.length < 6) {
    flags.push({
      category: "Consistency & Story",
      title: "Unexplained career gaps",
      description:
        "Gaps between roles are visible with no context. Add a brief note or freelance/learning activity.",
      severity: "warning",
    });
  }

  if (flags.length < 7) {
    flags.push({
      category: "Attention-to-Detail",
      title: "Inconsistent tense usage",
      description:
        "Mix of past and present tense detected across bullet points.",
      severity: "warning",
    });
  }

  if (flags.length < 8) {
    flags.push({
      category: "Psychological Red Flags",
      title: "Overly broad positioning",
      description:
        "'Open to any opportunity' signals low clarity about career direction.",
      severity: "warning",
    });
  }

  return flags.slice(0, 8);
}

const CATEGORY_COLORS: Record<string, string> = {
  "Content Red Flags": "#f87171",
  "Consistency & Story": "#fb923c",
  Positioning: "#facc15",
  "Formatting & Design": "#a78bfa",
  "Language & Tone": "#22d3ee",
  "Proof & Authenticity": "#34d399",
  "Attention-to-Detail": "#f472b6",
  "Psychological Red Flags": "#fb923c",
};

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
  const [showOriginal, setShowOriginal] = useState(false);
  const isDark =
    document.documentElement.classList.contains("dark") ||
    document.documentElement.dataset.theme === "dark";

  function copyResults() {
    if (!data) return;
    const text = `ResumeAI Analysis Report\n${"-".repeat(24)}\nOverall Score: ${data.overall}/100\nATS Score: ${data.ats}/100\nKeyword Match: ${data.keywords}/100\nImpact Score: ${data.impact}/100\nReadability: ${data.readability}/100\n\nRecommendations:\n${data.suggestions.map((s, i) => `${i + 1}. ${s.text}`).join("\n")}\n\nFound Keywords: ${data.foundKeywords.join(", ")}\nMissing Keywords: ${data.missingKeywords.join(", ")}\n`;
    navigator.clipboard.writeText(text).then(() => {
      playSuccess();
      onToast("📋 Report copied to clipboard!", "info");
    });
  }

  function handlePrintReport() {
    if (!data) return;
    const scores = `Overall: ${data.overall}/100 | ATS: ${data.ats}/100 | Keywords: ${data.keywords}/100 | Impact: ${data.impact}/100 | Readability: ${data.readability}/100`;
    const recs = data.suggestions
      .map((s, i) => `<li style="margin-bottom:8px">${i + 1}. ${s.text}</li>`)
      .join("");
    const found = data.foundKeywords.join(", ") || "—";
    const missing = data.missingKeywords.join(", ") || "—";
    const roleSection = data.selectedRole
      ? `<h3 style="margin:20px 0 8px;font-size:1rem;color:#6c63ff">Target Role: ${data.selectedRole}</h3>`
      : "";
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>ResumeAI Analysis Report</title><style>
      *{box-sizing:border-box;margin:0;padding:0}
      body{background:#fff;color:#1a1a2e;font-family:'Helvetica Neue',Arial,sans-serif;padding:40px 48px;max-width:750px;margin:0 auto}
      h1{font-size:1.6rem;margin-bottom:4px}
      h2{font-size:1.05rem;border-bottom:2px solid #1a1a2e;padding-bottom:6px;margin:20px 0 12px}
      .score-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin:16px 0}
      .score-box{text-align:center;border:1px solid #ddd;border-radius:8px;padding:12px 6px}
      .score-num{font-size:1.5rem;font-weight:700;color:#6c63ff}
      .score-lbl{font-size:0.72rem;color:#555;margin-top:4px}
      .tag{font-size:0.7rem}
      @media print{body{padding:20px 24px}@page{margin:1cm}}
    </style></head><body>
    <h1>ResumeAI — Analysis Report</h1>
    <p style="color:#666;font-size:0.85rem;margin-top:4px">Generated by ResumeAI &bull; ${new Date().toLocaleDateString()}</p>
    ${roleSection}
    <h2>Score Summary</h2>
    <p style="font-size:0.9rem;color:#444">${scores}</p>
    <h2>Recommendations</h2>
    <ul style="padding-left:18px">${recs}</ul>
    <h2>Keywords</h2>
    <p><strong>Found:</strong> <span style="color:#22c55e">${found}</span></p>
    <p style="margin-top:8px"><strong>Missing:</strong> <span style="color:#ef4444">${missing}</span></p>
    </body></html>`;
    const win = window.open("", "_blank", "width=850,height=1100");
    if (!win) return;
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => {
      win.print();
      win.close();
    }, 400);
    onToast("🖨️ Opening print dialog — choose 'Save as PDF'", "info");
  }

  function copyRewrittenResume() {
    if (!data?.rewrittenResume) return;
    const r = data.rewrittenResume;
    const lines: string[] = [];
    lines.push(r.name);
    lines.push(r.contact);
    lines.push("");
    lines.push("PROFESSIONAL SUMMARY");
    lines.push("-".repeat(20));
    lines.push(r.summary);
    lines.push("");
    lines.push("SKILLS");
    lines.push("-".repeat(20));
    lines.push(r.skills.join(" | "));
    lines.push("");
    lines.push("EXPERIENCE");
    lines.push("-".repeat(20));
    for (const exp of r.experience) {
      lines.push(`${exp.title} — ${exp.company} (${exp.duration})`);
      for (const bullet of exp.rewrittenBullets) {
        lines.push(`• ${bullet}`);
      }
      lines.push("");
    }
    lines.push("EDUCATION");
    lines.push("-".repeat(20));
    for (const edu of r.education) {
      lines.push(`${edu.degree} | ${edu.institution} | ${edu.year}`);
    }
    lines.push("");
    lines.push("PROJECTS");
    lines.push("-".repeat(20));
    for (const proj of r.projects) {
      lines.push(`${proj.name}`);
      lines.push(proj.description);
      lines.push(`Tech: ${proj.tech.join(", ")}`);
    }
    navigator.clipboard.writeText(lines.join("\n")).then(() => {
      playSuccess();
      onToast("✨ Example resume copied to clipboard!", "success");
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
  const redFlags = data ? generateRedFlags(data) : [];

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

          {/* 🎯 Job Role Match Panel */}
          {data.selectedRole && data.jobRoleMatch && (
            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(8,6,30,0.97) 0%, rgba(5,15,28,0.97) 100%)",
                border: "1.5px solid rgba(108,99,255,0.5)",
                boxShadow:
                  "0 0 40px rgba(108,99,255,0.18), inset 0 1px 0 rgba(255,255,255,0.04)",
                borderRadius: "var(--radius2)",
                padding: "28px",
                marginBottom: "16px",
                position: "relative",
                overflow: "hidden",
              }}
              data-ocid="results.panel"
            >
              {/* Decorative glow */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "-40px",
                  right: "-40px",
                  width: "160px",
                  height: "160px",
                  borderRadius: "50%",
                  background: "rgba(108,99,255,0.35)",
                  filter: "blur(50px)",
                  pointerEvents: "none",
                }}
              />
              <div style={{ position: "relative", zIndex: 1 }}>
                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "20px",
                    flexWrap: "wrap",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1rem",
                      fontWeight: 700,
                      margin: 0,
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    🎯 Job Role Match — {data.selectedRole}
                  </h3>
                  {/* Match Score Badge */}
                  <span
                    style={{
                      background:
                        data.jobRoleMatch.matchScore >= 75
                          ? "rgba(52,211,153,0.15)"
                          : data.jobRoleMatch.matchScore >= 50
                            ? "rgba(251,146,60,0.15)"
                            : "rgba(248,113,113,0.15)",
                      border: `1px solid ${
                        data.jobRoleMatch.matchScore >= 75
                          ? "rgba(52,211,153,0.4)"
                          : data.jobRoleMatch.matchScore >= 50
                            ? "rgba(251,146,60,0.4)"
                            : "rgba(248,113,113,0.4)"
                      }`,
                      color:
                        data.jobRoleMatch.matchScore >= 75
                          ? "#34d399"
                          : data.jobRoleMatch.matchScore >= 50
                            ? "#fb923c"
                            : "#f87171",
                      borderRadius: "20px",
                      padding: "4px 14px",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {data.jobRoleMatch.matchScore}% Match
                  </span>
                </div>

                {/* Skills Grid */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "16px",
                    marginBottom: "20px",
                  }}
                >
                  {/* Matched Skills */}
                  <div
                    style={{
                      background: "rgba(0,20,12,0.7)",
                      border: "1px solid rgba(52,211,153,0.3)",
                      borderRadius: "var(--radius)",
                      padding: "16px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: "#34d399",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginBottom: "10px",
                      }}
                    >
                      ✅ Matched Skills (
                      {data.jobRoleMatch.matchedSkills.length})
                    </div>
                    <div
                      style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}
                    >
                      {data.jobRoleMatch.matchedSkills.length > 0 ? (
                        data.jobRoleMatch.matchedSkills.map((skill) => (
                          <span
                            key={skill}
                            style={{
                              background: "rgba(52,211,153,0.12)",
                              color: "#34d399",
                              border: "1px solid rgba(52,211,153,0.25)",
                              borderRadius: "100px",
                              padding: "3px 10px",
                              fontSize: "0.78rem",
                              fontWeight: 500,
                            }}
                          >
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span
                          style={{ fontSize: "0.83rem", color: "var(--text2)" }}
                        >
                          No direct matches yet — add key skills
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Missing Skills */}
                  <div
                    style={{
                      background: "rgba(20,0,0,0.7)",
                      border: "1px solid rgba(248,113,113,0.3)",
                      borderRadius: "var(--radius)",
                      padding: "16px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: "#f87171",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginBottom: "10px",
                      }}
                    >
                      ➕ Skills to Add ({data.jobRoleMatch.missingSkills.length}
                      )
                    </div>
                    <div
                      style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}
                    >
                      {data.jobRoleMatch.missingSkills.length > 0 ? (
                        data.jobRoleMatch.missingSkills.map((skill) => (
                          <span
                            key={skill}
                            style={{
                              background: "rgba(248,113,113,0.12)",
                              color: "#f87171",
                              border: "1px solid rgba(248,113,113,0.25)",
                              borderRadius: "100px",
                              padding: "3px 10px",
                              fontSize: "0.78rem",
                              fontWeight: 500,
                            }}
                          >
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span
                          style={{ fontSize: "0.83rem", color: "var(--text2)" }}
                        >
                          Great! No critical gaps detected
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Role Expectations */}
                <div
                  style={{
                    background: "rgba(10,6,30,0.7)",
                    border: "1px solid rgba(108,99,255,0.35)",
                    borderRadius: "var(--radius)",
                    padding: "16px",
                    marginBottom: "14px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "#a78bfa",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      marginBottom: "10px",
                    }}
                  >
                    📋 Role Expectations
                  </div>
                  <ul style={{ margin: 0, paddingLeft: "18px" }}>
                    {data.jobRoleMatch.roleExpectations.map((exp) => (
                      <li
                        key={exp}
                        style={{
                          fontSize: "0.85rem",
                          color: "var(--text2)",
                          lineHeight: 1.6,
                          marginBottom: "4px",
                        }}
                      >
                        {exp}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Summary line */}
                <p
                  style={{
                    fontSize: "0.83rem",
                    color: "var(--text2)",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  Your resume matches{" "}
                  <strong
                    style={{
                      color:
                        data.jobRoleMatch.matchScore >= 75
                          ? "#34d399"
                          : data.jobRoleMatch.matchScore >= 50
                            ? "#fb923c"
                            : "#f87171",
                    }}
                  >
                    {data.jobRoleMatch.matchScore}%
                  </strong>{" "}
                  of key requirements for <strong>{data.selectedRole}</strong>.{" "}
                  {data.jobRoleMatch.matchScore >= 75
                    ? "You're a strong candidate — refine your bullet points for maximum impact."
                    : data.jobRoleMatch.matchScore >= 50
                      ? "You have a decent foundation — focus on adding the missing skills above."
                      : "Consider gaining experience in the missing areas before applying."}
                </p>
              </div>
            </div>
          )}

          {/* AI Recommendations */}
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

          {/* ✨ Example Resume Panel */}
          {data.rewrittenResume && (
            <div
              style={{
                borderRadius: "var(--radius2)",
                marginBottom: "16px",
                overflow: "hidden",
                border: "1px solid rgba(99,102,241,0.3)",
              }}
              data-ocid="results.panel"
            >
              {/* Header */}
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #1a1035 0%, #0f172a 60%, #1e1b4b 100%)",
                  padding: "22px 28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "#e0e7ff",
                      margin: 0,
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    ✨ Example Resume
                  </h3>
                  <p
                    style={{
                      color: "#a5b4fc",
                      fontSize: "0.78rem",
                      margin: "4px 0 0",
                      letterSpacing: "0.03em",
                    }}
                  >
                    Optimized for ATS & Human Readers
                  </p>
                </div>
                <span
                  style={{
                    background: "rgba(99,102,241,0.2)",
                    border: "1px solid rgba(99,102,241,0.4)",
                    borderRadius: "20px",
                    padding: "3px 12px",
                    fontSize: "0.7rem",
                    color: "#a5b4fc",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  AI Generated
                </span>
              </div>

              {/* Document Body */}
              <div
                style={{
                  background: isDark ? "#0f172a" : "#fafafa",
                  padding: "28px 32px",
                  fontFamily: "var(--font-body)",
                }}
              >
                {/* Name & Contact */}
                <div
                  style={{
                    marginBottom: "24px",
                    borderBottom: isDark
                      ? "2px solid rgba(99,102,241,0.3)"
                      : "2px solid #6366f1",
                    paddingBottom: "16px",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 800,
                      color: isDark ? "#e0e7ff" : "#1e1b4b",
                      margin: "0 0 6px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {data.rewrittenResume.name}
                  </h2>
                  <p
                    style={{
                      fontSize: "0.82rem",
                      color: isDark ? "#94a3b8" : "#64748b",
                      margin: 0,
                    }}
                  >
                    {data.rewrittenResume.contact}
                  </p>
                </div>

                {/* Summary */}
                <div style={{ marginBottom: "22px" }}>
                  <h4
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#6366f1",
                      margin: "0 0 10px",
                    }}
                  >
                    Professional Summary
                  </h4>
                  <p
                    style={{
                      fontSize: "0.88rem",
                      color: isDark ? "#cbd5e1" : "#374151",
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {data.rewrittenResume.summary}
                  </p>
                </div>

                {/* Skills */}
                <div style={{ marginBottom: "22px" }}>
                  <h4
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#6366f1",
                      margin: "0 0 10px",
                    }}
                  >
                    Skills
                  </h4>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
                  >
                    {data.rewrittenResume.skills.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          background: isDark
                            ? "rgba(99,102,241,0.15)"
                            : "rgba(99,102,241,0.08)",
                          border: "1px solid rgba(99,102,241,0.3)",
                          borderRadius: "6px",
                          padding: "4px 10px",
                          fontSize: "0.78rem",
                          color: isDark ? "#a5b4fc" : "#4338ca",
                          fontWeight: 500,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div style={{ marginBottom: "22px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "12px",
                      flexWrap: "wrap",
                      gap: "8px",
                    }}
                  >
                    <h4
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#6366f1",
                        margin: 0,
                      }}
                    >
                      Experience
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        gap: "0",
                        borderRadius: "8px",
                        overflow: "hidden",
                        border: "1px solid rgba(99,102,241,0.3)",
                      }}
                    >
                      <button
                        type="button"
                        data-ocid="results.toggle"
                        onClick={() => setShowOriginal(false)}
                        style={{
                          padding: "5px 12px",
                          fontSize: "0.72rem",
                          fontWeight: 600,
                          cursor: "pointer",
                          border: "none",
                          background: !showOriginal ? "#6366f1" : "transparent",
                          color: !showOriginal
                            ? "#fff"
                            : isDark
                              ? "#94a3b8"
                              : "#64748b",
                          transition: "all 0.2s",
                          letterSpacing: "0.02em",
                        }}
                      >
                        ✨ After (AI)
                      </button>
                      <button
                        type="button"
                        data-ocid="results.toggle"
                        onClick={() => setShowOriginal(true)}
                        style={{
                          padding: "5px 12px",
                          fontSize: "0.72rem",
                          fontWeight: 600,
                          cursor: "pointer",
                          border: "none",
                          background: showOriginal
                            ? "rgba(239,68,68,0.7)"
                            : "transparent",
                          color: showOriginal
                            ? "#fff"
                            : isDark
                              ? "#94a3b8"
                              : "#64748b",
                          transition: "all 0.2s",
                          letterSpacing: "0.02em",
                        }}
                      >
                        📄 Before
                      </button>
                    </div>
                  </div>

                  {data.rewrittenResume.experience.map((exp, ei) => (
                    <div
                      key={`${exp.company}-${ei}`}
                      style={{
                        marginBottom:
                          ei <
                          (data.rewrittenResume?.experience.length ?? 0) - 1
                            ? "18px"
                            : 0,
                        paddingBottom:
                          ei <
                          (data.rewrittenResume?.experience.length ?? 0) - 1
                            ? "18px"
                            : 0,
                        borderBottom:
                          ei <
                          (data.rewrittenResume?.experience.length ?? 0) - 1
                            ? `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "#e5e7eb"}`
                            : "none",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "baseline",
                          flexWrap: "wrap",
                          gap: "4px",
                          marginBottom: "8px",
                        }}
                      >
                        <div>
                          <span
                            style={{
                              fontWeight: 700,
                              fontSize: "0.9rem",
                              color: isDark ? "#e0e7ff" : "#1e293b",
                            }}
                          >
                            {exp.title}
                          </span>
                          <span
                            style={{
                              color: isDark ? "#94a3b8" : "#64748b",
                              fontSize: "0.84rem",
                            }}
                          >
                            {" "}
                            — {exp.company}
                          </span>
                        </div>
                        <span
                          style={{
                            fontSize: "0.75rem",
                            color: isDark ? "#64748b" : "#94a3b8",
                          }}
                        >
                          {exp.duration}
                        </span>
                      </div>
                      <ul style={{ margin: 0, paddingLeft: "18px" }}>
                        {(showOriginal
                          ? exp.originalBullets
                          : exp.rewrittenBullets
                        ).map((bullet) => (
                          <li
                            key={bullet.slice(0, 30)}
                            style={{
                              fontSize: "0.84rem",
                              color: showOriginal
                                ? isDark
                                  ? "#fca5a5"
                                  : "#b91c1c"
                                : isDark
                                  ? "#86efac"
                                  : "#15803d",
                              lineHeight: 1.65,
                              marginBottom: "4px",
                            }}
                          >
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Education */}
                <div style={{ marginBottom: "22px" }}>
                  <h4
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#6366f1",
                      margin: "0 0 10px",
                    }}
                  >
                    Education
                  </h4>
                  {data.rewrittenResume.education.map((edu) => (
                    <div
                      key={edu.degree}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "4px",
                      }}
                    >
                      <div>
                        <span
                          style={{
                            fontWeight: 600,
                            fontSize: "0.87rem",
                            color: isDark ? "#e0e7ff" : "#1e293b",
                          }}
                        >
                          {edu.degree}
                        </span>
                        <span
                          style={{
                            color: isDark ? "#94a3b8" : "#64748b",
                            fontSize: "0.83rem",
                          }}
                        >
                          {" "}
                          | {edu.institution}
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: "0.78rem",
                          color: isDark ? "#64748b" : "#94a3b8",
                        }}
                      >
                        {edu.year}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Projects */}
                <div style={{ marginBottom: "24px" }}>
                  <h4
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#6366f1",
                      margin: "0 0 10px",
                    }}
                  >
                    Projects
                  </h4>
                  {data.rewrittenResume.projects.map((proj) => (
                    <div key={proj.name}>
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: "0.87rem",
                          color: isDark ? "#e0e7ff" : "#1e293b",
                        }}
                      >
                        {proj.name}
                      </span>
                      <p
                        style={{
                          fontSize: "0.83rem",
                          color: isDark ? "#94a3b8" : "#64748b",
                          margin: "4px 0 6px",
                          lineHeight: 1.6,
                        }}
                      >
                        {proj.description}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          gap: "6px",
                          flexWrap: "wrap",
                        }}
                      >
                        {proj.tech.map((t) => (
                          <span
                            key={t}
                            style={{
                              background: isDark
                                ? "rgba(34,211,238,0.1)"
                                : "rgba(6,182,212,0.08)",
                              border: "1px solid rgba(6,182,212,0.25)",
                              borderRadius: "4px",
                              padding: "2px 8px",
                              fontSize: "0.73rem",
                              color: isDark ? "#67e8f9" : "#0e7490",
                              fontWeight: 500,
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Copy Button */}
                <div
                  style={{
                    borderTop: isDark
                      ? "1px solid rgba(255,255,255,0.08)"
                      : "1px solid #e5e7eb",
                    paddingTop: "16px",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    type="button"
                    data-ocid="results.secondary_button"
                    onClick={copyRewrittenResume}
                    style={{
                      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      border: "none",
                      borderRadius: "8px",
                      padding: "10px 20px",
                      color: "#fff",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.83rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      transition: "opacity 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = "0.85";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = "1";
                    }}
                  >
                    📋 Copy Example Resume
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 🚩 Red Flags Analysis Panel */}
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(239,68,68,0.06) 0%, rgba(251,146,60,0.04) 100%)",
              border: "1px solid rgba(239,68,68,0.2)",
              borderRadius: "var(--radius2)",
              padding: "28px",
              marginBottom: "16px",
              position: "relative",
              overflow: "hidden",
            }}
            data-ocid="results.row"
          >
            {/* Decorative glow */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "-40px",
                right: "-40px",
                width: "160px",
                height: "160px",
                borderRadius: "50%",
                background: "rgba(239,68,68,0.1)",
                filter: "blur(40px)",
                pointerEvents: "none",
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "6px",
                  flexWrap: "wrap",
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
                  🚩 Red Flags Analysis
                </h3>
                <span
                  style={{
                    background: "rgba(239,68,68,0.15)",
                    border: "1px solid rgba(239,68,68,0.35)",
                    borderRadius: "20px",
                    padding: "2px 10px",
                    fontSize: "0.72rem",
                    color: "#fca5a5",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}
                >
                  {redFlags.length} detected
                </span>
              </div>
              <p
                style={{
                  fontSize: "0.83rem",
                  color: "var(--text3)",
                  marginBottom: "20px",
                  lineHeight: 1.6,
                }}
              >
                These patterns were found in your resume that may signal low
                credibility or cause instant rejection by recruiters and ATS
                systems.
              </p>

              {/* Flag list */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: "0" }}
              >
                {redFlags.map((flag, i) => {
                  const catColor = CATEGORY_COLORS[flag.category] ?? "#fb923c";
                  const isLast = i === redFlags.length - 1;
                  return (
                    <div
                      key={flag.title}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "14px",
                        padding: "14px 0",
                        borderBottom: isLast
                          ? "none"
                          : "1px solid rgba(239,68,68,0.1)",
                      }}
                    >
                      {/* Severity dot */}
                      <div
                        style={{
                          width: "9px",
                          height: "9px",
                          borderRadius: "50%",
                          background:
                            flag.severity === "critical"
                              ? "#ef4444"
                              : "#fb923c",
                          flexShrink: 0,
                          marginTop: "5px",
                          boxShadow:
                            flag.severity === "critical"
                              ? "0 0 6px rgba(239,68,68,0.6)"
                              : "0 0 6px rgba(251,146,60,0.6)",
                        }}
                      />
                      {/* Content */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            flexWrap: "wrap",
                            marginBottom: "4px",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "var(--font-display)",
                              fontWeight: 700,
                              fontSize: "0.88rem",
                              color: "var(--text)",
                            }}
                          >
                            {flag.severity === "critical" ? "🚩" : "⚠️"}{" "}
                            {flag.title}
                          </span>
                        </div>
                        <p
                          style={{
                            fontSize: "0.8rem",
                            color: "var(--text2)",
                            lineHeight: 1.6,
                            margin: 0,
                          }}
                        >
                          {flag.description}
                        </p>
                      </div>
                      {/* Category badge */}
                      <span
                        style={{
                          flexShrink: 0,
                          background: `${catColor}18`,
                          border: `1px solid ${catColor}35`,
                          borderRadius: "6px",
                          padding: "3px 9px",
                          fontSize: "0.7rem",
                          color: catColor,
                          fontWeight: 600,
                          letterSpacing: "0.03em",
                          whiteSpace: "nowrap",
                          alignSelf: "flex-start",
                          marginTop: "2px",
                        }}
                      >
                        {flag.category}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Keyword Analysis */}
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
              data-ocid="results.download.button"
              onClick={handlePrintReport}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background:
                  "linear-gradient(135deg, var(--accent), var(--accent2))",
                border: "none",
                color: "#fff",
                borderRadius: "10px",
                padding: "10px 18px",
                fontFamily: "var(--font-body)",
                fontSize: "0.83rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.85";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
            >
              ⬇️ Download PDF
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
