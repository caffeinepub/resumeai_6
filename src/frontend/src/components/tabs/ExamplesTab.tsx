import { useRef, useState } from "react";

interface ResumeExample {
  id: string;
  role: string;
  industry: string;
  industryColor: string;
  name: string;
  contact: string;
  summary: string;
  skills: string[];
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    bullets: string[];
  }>;
  education: { degree: string; institution: string; year: string };
  projects: Array<{ name: string; description: string; tech: string[] }>;
  certifications: string[];
}

interface ExamplesTabProps {
  onAnalyze: (role: string) => void;
  isDark: boolean;
}

const EXAMPLES: ResumeExample[] = [
  {
    id: "swe",
    role: "Software Engineer",
    industry: "Technology",
    industryColor: "#6c63ff",
    name: "Arjun Mehta",
    contact:
      "arjun.mehta@email.com | linkedin.com/in/arjunmehta | github.com/arjunm",
    summary:
      "Full-stack engineer with 4 years of experience building scalable web applications at fintech startups. Passionate about clean architecture, developer tooling, and shipping products users love.",
    skills: [
      "TypeScript",
      "React",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "Docker",
      "AWS",
      "GraphQL",
      "Git",
      "Kubernetes",
    ],
    experience: [
      {
        title: "Senior Software Engineer",
        company: "PaySwift Technologies",
        duration: "Jan 2022 – Present",
        bullets: [
          "Architected a real-time transaction notification system processing 2M+ events/day using Redis Streams and WebSockets, reducing alert latency by 78%.",
          "Led migration of monolithic API to microservices, cutting deployment cycle from 2 weeks to 4 hours and enabling independent team delivery.",
          "Built an internal developer portal adopted by 50+ engineers that automated environment provisioning and slashed onboarding time from 3 days to 2 hours.",
        ],
      },
      {
        title: "Software Engineer",
        company: "NexaCloud",
        duration: "Jul 2020 – Dec 2021",
        bullets: [
          "Developed RESTful APIs for a B2B SaaS platform serving 300+ enterprise clients, achieving 99.97% uptime over 18 months.",
          "Optimised PostgreSQL query performance by redesigning indexes and introducing materialized views, reducing p95 response time by 62%.",
          "Shipped a self-service billing dashboard that reduced support tickets related to invoicing by 40%.",
        ],
      },
    ],
    education: {
      degree: "B.Tech in Computer Science",
      institution: "IIT Delhi",
      year: "2020",
    },
    projects: [
      {
        name: "OpenAudit",
        description:
          "Open-source CLI tool that audits Node.js packages for license compliance and security vulnerabilities with CI/CD integration.",
        tech: ["Node.js", "TypeScript", "GitHub Actions"],
      },
    ],
    certifications: [
      "AWS Certified Solutions Architect – Associate",
      "Google Cloud Professional Developer",
      "Kubernetes CKA",
    ],
  },
  {
    id: "ds",
    role: "Data Scientist",
    industry: "Technology",
    industryColor: "#6c63ff",
    name: "Priya Nair",
    contact:
      "priya.nair@email.com | linkedin.com/in/priyanair | kaggle.com/priyanair",
    summary:
      "Data scientist with 3 years specialising in NLP and recommendation systems for e-commerce. Track record of turning messy datasets into revenue-generating ML pipelines in production.",
    skills: [
      "Python",
      "PyTorch",
      "Scikit-learn",
      "SQL",
      "Spark",
      "Airflow",
      "MLflow",
      "HuggingFace",
      "Tableau",
      "dbt",
    ],
    experience: [
      {
        title: "Data Scientist II",
        company: "ShopStream India",
        duration: "Mar 2022 – Present",
        bullets: [
          "Built a two-tower neural collaborative filtering model that increased recommendation click-through rate by 23%, generating ₹4.2 Cr in incremental annual revenue.",
          "Designed an NLP pipeline to auto-categorise 500K+ product listings using fine-tuned BERT, reducing manual tagging effort by 85%.",
          "Established a feature store using Feast + Redis serving 120 features with <10 ms latency to 5 production models simultaneously.",
        ],
      },
      {
        title: "Junior Data Analyst",
        company: "Analytix Consulting",
        duration: "Jul 2021 – Feb 2022",
        bullets: [
          "Delivered weekly executive dashboards in Tableau tracking KPIs for 6 retail clients, improving report delivery time by 70%.",
          "Conducted cohort analysis revealing a 15% churn spike in the 30-day window, informing a targeted retention campaign that recovered 800+ users.",
          "Automated ETL pipelines using Python + Airflow, eliminating 20 hrs/week of manual data preparation.",
        ],
      },
    ],
    education: {
      degree: "M.Sc. in Data Science",
      institution: "IISc Bangalore",
      year: "2021",
    },
    projects: [
      {
        name: "SentimentLens",
        description:
          "Real-time social media sentiment tracker for brand monitoring, aggregating 50K tweets/day with entity-level sentiment breakdown.",
        tech: ["Python", "HuggingFace", "FastAPI", "React"],
      },
    ],
    certifications: [
      "Google Professional ML Engineer",
      "DeepLearning.AI TensorFlow Developer",
      "Databricks Certified Associate Developer",
    ],
  },
  {
    id: "mm",
    role: "Marketing Manager",
    industry: "Business",
    industryColor: "#f59e0b",
    name: "Sneha Kapoor",
    contact:
      "sneha.kapoor@email.com | linkedin.com/in/snehakapoor | snehakapoor.com",
    summary:
      "Growth-focused marketing manager with 5 years driving digital campaigns for D2C consumer brands. Expert at blending data analytics with creative strategy to build brand equity and accelerate revenue.",
    skills: [
      "Google Ads",
      "Meta Ads",
      "SEO/SEM",
      "HubSpot",
      "Salesforce",
      "Content Strategy",
      "A/B Testing",
      "Copywriting",
      "Google Analytics 4",
      "Email Marketing",
    ],
    experience: [
      {
        title: "Marketing Manager",
        company: "Glow Republic (D2C Skincare)",
        duration: "Jun 2021 – Present",
        bullets: [
          "Owned ₹1.8 Cr annual performance marketing budget across Google and Meta, achieving a 3.4× ROAS — 60% above industry benchmark.",
          "Launched an influencer micro-marketing programme with 120 creators that drove a 45% lift in organic brand mentions and 28K new Instagram followers in 6 months.",
          "Redesigned email nurture sequences in HubSpot, increasing open rates from 18% to 34% and recovering ₹60L in abandoned-cart revenue.",
        ],
      },
      {
        title: "Digital Marketing Specialist",
        company: "Brandify Agency",
        duration: "Aug 2019 – May 2021",
        bullets: [
          "Managed SEO strategy for 12 e-commerce clients, growing aggregate organic traffic by 140% within 12 months through technical audits and content gap analysis.",
          "Created and A/B tested 50+ ad creatives, identifying winning formats that reduced cost-per-acquisition by 32% for the agency's top account.",
          "Produced a monthly analytics digest used by C-suite stakeholders at 8 client organisations to steer quarterly marketing investments.",
        ],
      },
    ],
    education: {
      degree: "MBA – Marketing",
      institution: "XLRI Jamshedpur",
      year: "2019",
    },
    projects: [
      {
        name: "GrowthPlaybook Blog",
        description:
          "Personal blog covering growth marketing case studies and channel teardowns, attracting 8K monthly readers and a 2K newsletter subscriber base.",
        tech: ["WordPress", "Mailchimp", "Ahrefs"],
      },
    ],
    certifications: [
      "Google Ads Certified",
      "HubSpot Marketing Software",
      "Meta Blueprint Certified",
    ],
  },
  {
    id: "ux",
    role: "UI/UX Designer",
    industry: "Design",
    industryColor: "#ec4899",
    name: "Rohan Desai",
    contact:
      "rohan.desai@email.com | rohandesai.co | linkedin.com/in/rohandesai",
    summary:
      "Product designer with 4 years crafting intuitive digital experiences for fintech and healthtech. Skilled at bridging user research and visual design to ship interfaces that reduce friction and drive engagement.",
    skills: [
      "Figma",
      "Prototyping",
      "User Research",
      "Usability Testing",
      "Design Systems",
      "Accessibility (WCAG)",
      "Interaction Design",
      "CSS",
      "Motion Design",
      "Framer",
    ],
    experience: [
      {
        title: "Senior Product Designer",
        company: "MediTrack Health",
        duration: "Apr 2022 – Present",
        bullets: [
          "Redesigned the patient onboarding flow based on 30 user interviews, reducing drop-off rate from 58% to 19% and onboarding 12K new users in Q1 2023 alone.",
          "Created and maintained a 400-component Figma design system used by 10 cross-functional teams, cutting design-to-handoff time by 50%.",
          "Ran 15 usability tests that uncovered critical pain points in the appointment booking feature, directly informing a redesign that boosted bookings by 35%.",
        ],
      },
      {
        title: "UX Designer",
        company: "Fintab Solutions",
        duration: "Jun 2020 – Mar 2022",
        bullets: [
          "Designed a mobile banking dashboard adopted by 200K+ users, receiving an App Store rating jump from 3.2 to 4.6 post-launch.",
          "Established an accessibility audit process ensuring WCAG 2.1 AA compliance across all product surfaces, eliminating legal compliance risk.",
          "Facilitated 20+ design sprints with engineering and product leads, shipping 8 major features on time and within scope.",
        ],
      },
    ],
    education: {
      degree: "B.Des in Interaction Design",
      institution: "NID Ahmedabad",
      year: "2020",
    },
    projects: [
      {
        name: "AccessFirst Plugin",
        description:
          "Figma plugin that auto-checks contrast ratios and ARIA label suggestions for designers in real time — 3.2K installs.",
        tech: ["Figma API", "TypeScript"],
      },
    ],
    certifications: [
      "Nielsen Norman Group UX Certification",
      "Google UX Design Certificate",
      "IAAP CPACC Accessibility",
    ],
  },
  {
    id: "pm",
    role: "Product Manager",
    industry: "Business",
    industryColor: "#f59e0b",
    name: "Anika Sharma",
    contact:
      "anika.sharma@email.com | linkedin.com/in/anikasharma | medium.com/@anikasharma",
    summary:
      "Strategic product manager with 5 years building B2B SaaS products from 0 to 1 and scaling them to $10M+ ARR. Expert at aligning cross-functional teams through clear roadmaps, OKRs, and ruthless prioritisation.",
    skills: [
      "Product Strategy",
      "Roadmapping",
      "OKRs",
      "SQL",
      "Figma",
      "JIRA",
      "Customer Discovery",
      "Go-to-Market",
      "Agile/Scrum",
      "Amplitude",
    ],
    experience: [
      {
        title: "Product Manager",
        company: "WorkflowOS",
        duration: "Feb 2021 – Present",
        bullets: [
          "Defined and shipped an AI-powered task automation feature that became the #1 reason cited in 68% of enterprise renewal surveys within 8 months of launch.",
          "Reduced average deal cycle by 3 weeks by partnering with Sales to build self-serve product tours, contributing to a 22% increase in trial-to-paid conversion.",
          "Led a quarterly OKR planning process across 4 squads, aligning 35 team members on shared metrics and eliminating 40% of low-priority backlog.",
        ],
      },
      {
        title: "Associate Product Manager",
        company: "ZenDesk Partner",
        duration: "Aug 2019 – Jan 2021",
        bullets: [
          "Launched a self-service help-centre builder used by 1,200 SMB clients, achieving NPS of 72 in first 3 months.",
          "Conducted 60+ customer discovery calls to validate a reporting feature, preventing ₹50L+ in potential engineering waste by pivoting scope early.",
          "Coordinated 3 cross-team sprints to close a critical GDPR compliance gap, avoiding potential regulatory fines ahead of a 6-week deadline.",
        ],
      },
    ],
    education: {
      degree: "MBA – Strategy & Entrepreneurship",
      institution: "IIM Bangalore",
      year: "2019",
    },
    projects: [
      {
        name: "PM Clarity Newsletter",
        description:
          "Bi-weekly newsletter with 5K subscribers covering product frameworks, case teardowns, and interview prep for aspiring PMs.",
        tech: ["Substack", "Notion"],
      },
    ],
    certifications: [
      "AIPMM Certified Product Manager",
      "Pragmatic Marketing Certified",
      "Scrum Product Owner (PSPO I)",
    ],
  },
  {
    id: "ba",
    role: "Business Analyst",
    industry: "Business",
    industryColor: "#f59e0b",
    name: "Vikram Joshi",
    contact: "vikram.joshi@email.com | linkedin.com/in/vikramjoshi",
    summary:
      "Results-driven business analyst with 3 years translating complex business requirements into actionable data insights and process improvements for banking and insurance clients. Bridges the gap between stakeholder needs and technical delivery.",
    skills: [
      "Business Requirements",
      "SQL",
      "Power BI",
      "Excel (Advanced)",
      "Process Mapping",
      "BPMN",
      "Stakeholder Management",
      "User Stories",
      "UAT",
      "Confluence",
    ],
    experience: [
      {
        title: "Business Analyst",
        company: "HDFC Life Insurance",
        duration: "Jan 2022 – Present",
        bullets: [
          "Mapped and re-engineered the policy issuance workflow, cutting processing time from 5 days to 18 hours and reducing error rate by 47%.",
          "Built 12 Power BI dashboards providing real-time visibility into claims KPIs for 200+ operations staff, replacing 6 manual Excel reports.",
          "Elicited and documented 180 business requirements for a core system migration, ensuring zero scope creep across a 14-month project.",
        ],
      },
      {
        title: "Junior Business Analyst",
        company: "Deloitte Consulting",
        duration: "Jul 2021 – Dec 2021",
        bullets: [
          "Supported gap analysis for a fintech client's regulatory reporting module, identifying 23 compliance gaps addressed ahead of an RBI audit.",
          "Created process flow diagrams and swim-lane charts for 8 banking workflows, accelerating developer understanding and reducing clarification queries by 60%.",
          "Performed UAT coordination for a loan origination system rollout across 3 branches, logging and tracking 140 defects to resolution.",
        ],
      },
    ],
    education: {
      degree: "B.Com (Hons) + PGDM – Finance",
      institution: "Symbiosis Pune",
      year: "2021",
    },
    projects: [
      {
        name: "Claims Anomaly Detector",
        description:
          "Excel + Python tool that flags statistically anomalous insurance claims using z-score analysis, surfacing fraud signals for the investigations team.",
        tech: ["Python", "Excel", "Pandas"],
      },
    ],
    certifications: [
      "IIBA ECBA",
      "Microsoft Power BI Data Analyst",
      "Agile Business Analysis (AgileBA)",
    ],
  },
  {
    id: "devops",
    role: "DevOps Engineer",
    industry: "Technology",
    industryColor: "#6c63ff",
    name: "Karan Verma",
    contact:
      "karan.verma@email.com | linkedin.com/in/karanverma | github.com/karanv",
    summary:
      "DevOps engineer with 4 years automating infrastructure and CI/CD pipelines at SaaS scaleups. Passionate about developer experience, reliability engineering, and reducing mean time to recovery.",
    skills: [
      "Kubernetes",
      "Terraform",
      "AWS",
      "Docker",
      "Jenkins",
      "GitHub Actions",
      "Prometheus",
      "Grafana",
      "Bash",
      "Python",
    ],
    experience: [
      {
        title: "Senior DevOps Engineer",
        company: "ScaleHub Technologies",
        duration: "Mar 2022 – Present",
        bullets: [
          "Designed a multi-region Kubernetes platform on AWS EKS hosting 60+ microservices, achieving 99.995% uptime over 18 months.",
          "Built GitOps-based CI/CD pipelines with ArgoCD and GitHub Actions, reducing average deployment lead time from 45 minutes to 4 minutes.",
          "Implemented Prometheus + Grafana observability stack with 200+ custom alerts, cutting mean time to detect incidents by 65%.",
        ],
      },
      {
        title: "DevOps Engineer",
        company: "CloudNine Hosting",
        duration: "Jun 2020 – Feb 2022",
        bullets: [
          "Migrated on-premise infrastructure to AWS using Terraform, reducing monthly infrastructure costs by ₹18L (42%).",
          "Automated SSL certificate rotation for 300+ domains using AWS Lambda + ACM, eliminating certificate-related outages entirely.",
          "Wrote Bash and Python automation scripts that replaced 25 hrs/week of manual ops tasks across the team.",
        ],
      },
    ],
    education: {
      degree: "B.E. in Information Technology",
      institution: "VIT Vellore",
      year: "2020",
    },
    projects: [
      {
        name: "InfraGraph",
        description:
          "Open-source Terraform module visualiser that auto-generates dependency graphs from HCL, helping teams audit and document cloud infrastructure.",
        tech: ["Python", "Graphviz", "Terraform"],
      },
    ],
    certifications: [
      "AWS DevOps Engineer Professional",
      "CKA – Certified Kubernetes Administrator",
      "HashiCorp Terraform Associate",
    ],
  },
  {
    id: "cyber",
    role: "Cybersecurity Analyst",
    industry: "Technology",
    industryColor: "#6c63ff",
    name: "Neha Singh",
    contact:
      "neha.singh@email.com | linkedin.com/in/nehasingh | tryhackme.com/neha_s",
    summary:
      "Cybersecurity analyst with 3 years in threat detection, vulnerability management, and incident response for BFSI sector clients. Proficient in offensive security techniques used defensively to harden enterprise attack surfaces.",
    skills: [
      "SIEM (Splunk)",
      "Penetration Testing",
      "Threat Intelligence",
      "Nessus",
      "Burp Suite",
      "Python",
      "Network Security",
      "ISO 27001",
      "Incident Response",
      "OWASP",
    ],
    experience: [
      {
        title: "Cybersecurity Analyst II",
        company: "Axis Bank Ltd.",
        duration: "Feb 2022 – Present",
        bullets: [
          "Triaged and responded to 1,200+ security alerts/month in Splunk SIEM, maintaining mean time to respond under 18 minutes for critical incidents.",
          "Led a bank-wide phishing simulation programme testing 4,500 employees, resulting in a 62% reduction in phishing click rates after targeted training.",
          "Identified and coordinated remediation of 38 critical CVEs across production systems during quarterly vulnerability assessments, reducing risk score by 71%.",
        ],
      },
      {
        title: "Security Analyst",
        company: "InfoGuard Cybersecurity",
        duration: "Aug 2021 – Jan 2022",
        bullets: [
          "Conducted web application penetration tests for 15 client engagements, discovering 90+ vulnerabilities including 4 critical SQL injections before production.",
          "Authored detailed remediation reports translating technical findings into business-risk language for non-technical stakeholders.",
          "Built a custom Python script automating CVE lookup and CVSS scoring against client asset inventories, saving 6 hrs per assessment cycle.",
        ],
      },
    ],
    education: {
      degree: "B.Tech in Computer Science (Cybersecurity)",
      institution: "Amity University",
      year: "2021",
    },
    projects: [
      {
        name: "ThreatMap Dashboard",
        description:
          "Internal SOC dashboard aggregating live threat feeds, CVE alerts, and IOC matching against network logs for rapid analyst triage.",
        tech: ["Python", "Elasticsearch", "Kibana", "Splunk API"],
      },
    ],
    certifications: [
      "CompTIA Security+",
      "CEH – Certified Ethical Hacker",
      "ISO 27001 Lead Implementer",
    ],
  },
  // ── NEW RESUMES ──────────────────────────────────────────────────────────────
  {
    id: "doctor",
    role: "Medical Officer / Doctor",
    industry: "Healthcare",
    industryColor: "#10b981",
    name: "Dr. Kavya Iyer",
    contact:
      "kavya.iyer@email.com | linkedin.com/in/drkavyaiyer | MCI Reg. No. 2018-MH-12345",
    summary:
      "MBBS + MD (General Medicine) physician with 5 years of clinical experience in tertiary-care hospitals. Proven ability to manage high-acuity wards, mentor junior residents, and drive quality-improvement initiatives that measurably lower patient complication rates.",
    skills: [
      "Clinical Diagnosis",
      "Critical Care (ICU/HDU)",
      "Emergency Medicine",
      "Evidence-Based Medicine",
      "Patient Counselling",
      "ECG Interpretation",
      "Ventilator Management",
      "Medical Research",
      "EMR / HIS Systems",
      "Team Leadership",
    ],
    experience: [
      {
        title: "Senior Medical Officer – General Medicine",
        company: "Apollo Hospitals, Chennai",
        duration: "Aug 2021 – Present",
        bullets: [
          "Managed a 40-bed general medicine ward averaging 18 admissions/day, maintaining a 30-day readmission rate of 4.2% — 38% below the national benchmark of 6.8%.",
          "Initiated a sepsis early-warning protocol in collaboration with the ICU team, cutting average time-to-antibiotic from 3.1 hours to 58 minutes and reducing sepsis mortality by 22%.",
          "Supervised and mentored 8 first-year residents, conducting weekly clinical case conferences that improved resident diagnostic accuracy scores by 31% over 6 months.",
        ],
      },
      {
        title: "Junior Resident Doctor",
        company: "AIIMS New Delhi",
        duration: "Aug 2018 – Jul 2021",
        bullets: [
          "Rotated across Medicine, Cardiology, Neurology, and Pulmonology, managing 600+ inpatient cases and performing 200+ procedures including lumbar punctures and central-line insertions.",
          "Co-authored a retrospective study on diabetic ketoacidosis outcomes published in the Indian Journal of Medicine (IF 2.3), with data from 180 patients over 3 years.",
          "Streamlined discharge summary documentation using a structured template, reducing average documentation time per patient from 45 minutes to 12 minutes across the ward.",
        ],
      },
    ],
    education: {
      degree: "MD (General Medicine) | MBBS",
      institution: "AIIMS New Delhi",
      year: "2021 | 2018",
    },
    projects: [
      {
        name: "DiabCare Outpatient Registry",
        description:
          "Designed and implemented a longitudinal HbA1c tracking registry for 1,200+ diabetic outpatients, enabling proactive risk stratification and reducing unplanned ER visits by 17% in Year 1.",
        tech: ["MS Excel", "REDCap", "SPSS"],
      },
    ],
    certifications: [
      "ACLS – Advanced Cardiac Life Support (AHA)",
      "ATLS – Advanced Trauma Life Support",
      "Fellowship in Diabetology – RSSDI",
    ],
  },
  {
    id: "analyst",
    role: "Investment Analyst",
    industry: "Finance",
    industryColor: "#3b82f6",
    name: "Rahul Bhatnagar",
    contact:
      "rahul.bhatnagar@email.com | linkedin.com/in/rahulbhatnagar | CFA Level III Candidate",
    summary:
      "Investment analyst with 4 years of experience in equity research and portfolio management at top-tier asset management firms. Adept at building financial models, generating alpha-generating investment theses, and communicating insights to institutional clients managing ₹2,000+ Cr in AUM.",
    skills: [
      "Equity Research",
      "Financial Modelling (DCF/LBO)",
      "Bloomberg Terminal",
      "Python (Pandas, NumPy)",
      "Portfolio Optimisation",
      "Sector Analysis",
      "SQL",
      "Macroeconomic Analysis",
      "Excel (VBA)",
      "FactSet",
    ],
    experience: [
      {
        title: "Investment Analyst – Equities",
        company: "Mirae Asset Investment Managers India",
        duration: "Feb 2022 – Present",
        bullets: [
          "Covered 18 mid-cap IT and consumer discretionary stocks; 11 of 14 buy recommendations outperformed the Nifty Midcap 150 by an average 14.2% over a 12-month horizon.",
          "Built a Python-based earnings estimate aggregation tool that reduced research note preparation time by 55% and is now standard across the 6-person research team.",
          "Presented monthly sector updates to fund managers overseeing ₹3,400 Cr AUM, contributing to a 210 bps outperformance vs benchmark in FY 2023–24.",
        ],
      },
      {
        title: "Junior Equity Research Analyst",
        company: "Motilal Oswal Financial Services",
        duration: "Jun 2020 – Jan 2022",
        bullets: [
          "Assisted senior analysts in coverage initiation reports for 8 FMCG companies, including a pharma initiating coverage note that became the most-downloaded report of Q3 FY22.",
          "Modelled 3-statement financial projections with sensitivity analysis for 20+ companies, achieving mean earnings-per-share forecast error of under 6%.",
          "Automated quarterly results trackers using Excel VBA macros, saving 8 analyst-hours per reporting cycle.",
        ],
      },
    ],
    education: {
      degree: "MBA – Finance (Gold Medallist)",
      institution: "IIM Calcutta",
      year: "2020",
    },
    projects: [
      {
        name: "QuantScreen – Factor Model",
        description:
          "Built a multi-factor quantitative stock screening model combining momentum, quality, and value signals across NSE 500 universe; backtested 10-year CAGR of 19.4% vs Nifty 500 benchmark of 12.8%.",
        tech: ["Python", "Pandas", "FactSet API", "Jupyter"],
      },
    ],
    certifications: [
      "CFA Level III Candidate (2025 Exam)",
      "NSE Certified Market Professional – Level 2",
      "Bloomberg Market Concepts (BMC)",
    ],
  },
  {
    id: "civil",
    role: "Civil Engineer",
    industry: "Engineering",
    industryColor: "#f97316",
    name: "Suresh Pillai",
    contact:
      "suresh.pillai@email.com | linkedin.com/in/sureshpillai | IE(I) Membership No. 1234567",
    summary:
      "Chartered civil engineer with 6 years delivering infrastructure and real-estate projects worth ₹800+ Cr across roads, bridges, and high-rise construction. Expert in structural design, project scheduling, and value-engineering to consistently bring projects in under budget and ahead of schedule.",
    skills: [
      "Structural Design (RCC/Steel)",
      "AutoCAD & STAAD.Pro",
      "Project Scheduling (Primavera P6)",
      "Quantity Estimation (BOQ)",
      "Site Supervision",
      "IS Codes & IRC Standards",
      "MS Project",
      "Surveying (Total Station/GPS)",
      "Quality Control (QC/QA)",
      "RERA Compliance",
    ],
    experience: [
      {
        title: "Project Engineer – Structures",
        company: "L&T Construction (Heavy Civil)",
        duration: "Mar 2021 – Present",
        bullets: [
          "Oversaw structural execution of a ₹320 Cr six-lane flyover across 2.4 km in Pune, completing pre-stressed concrete deck casting 3 weeks ahead of MoRTH milestone with zero rework.",
          "Implemented value-engineering on pile foundation design by switching to bored-cast-in-situ piles, saving ₹2.8 Cr (8% of structural budget) without compromising load-bearing capacity.",
          "Managed a site team of 45 engineers and 300+ labourers, maintaining a safety record of zero LTI incidents across 18 months and 1.2 million man-hours.",
        ],
      },
      {
        title: "Site Engineer",
        company: "Shapoorji Pallonji & Co.",
        duration: "Jul 2018 – Feb 2021",
        bullets: [
          "Supervised RCC framing and finishing works for a 38-storey residential tower (550 units) in Mumbai, tracking 140+ concurrent activities daily in Primavera P6.",
          "Reduced concrete wastage from 11% to 4.5% by introducing digital pour-scheduling and accurate mix-design adjustments, saving ₹45L across the project duration.",
          "Coordinated subcontractor interfaces for MEP, façade, and landscaping packages, resolving 90+ technical queries that prevented costly downstream clashes.",
        ],
      },
    ],
    education: {
      degree: "B.E. in Civil Engineering",
      institution: "NIT Trichy",
      year: "2018",
    },
    projects: [
      {
        name: "Seismic Vulnerability Mapping – Pune Old City",
        description:
          "Academic-to-industry collaboration mapping 200 pre-1970 unreinforced masonry structures in Pune using rapid visual screening (RVS) to prioritise retrofitting interventions; presented at ICI National Conference 2022.",
        tech: ["ArcGIS", "AutoCAD", "STAAD.Pro", "MS Excel"],
      },
    ],
    certifications: [
      "Chartered Engineer – Institution of Engineers India (IE(I))",
      "PMP – Project Management Professional",
      "STAAD.Pro V8i Advanced Certification",
    ],
  },
  {
    id: "hr",
    role: "HR Manager",
    industry: "HR",
    industryColor: "#a855f7",
    name: "Divya Rajan",
    contact:
      "divya.rajan@email.com | linkedin.com/in/divyarajan | SHRM-CP Certified",
    summary:
      "Strategic HR manager with 7 years building people-first cultures at high-growth technology and manufacturing companies. Specialist in talent acquisition, performance management, and DEI programme design that directly impacts employee retention and business performance.",
    skills: [
      "Talent Acquisition",
      "HRBP / Business Partnering",
      "Performance Management",
      "Compensation & Benefits",
      "Employee Relations",
      "DEI Strategy",
      "Learning & Development",
      "HRMS (Workday/Darwinbox)",
      "Labour Law Compliance",
      "OKR Implementation",
    ],
    experience: [
      {
        title: "HR Manager – People & Culture",
        company: "Razorpay",
        duration: "Apr 2021 – Present",
        bullets: [
          "Scaled the engineering headcount from 320 to 680 in 18 months by redesigning the technical hiring pipeline, reducing time-to-offer from 42 days to 19 days and improving offer-acceptance rate to 87%.",
          "Launched a 360-degree performance review framework in Workday adopted by 900+ employees, resulting in a 28% improvement in manager satisfaction scores and a 19% reduction in voluntary attrition.",
          "Designed and rolled out a DEI hiring programme increasing women in technical roles from 14% to 26% within 2 years, earning recognition at the 2023 Great Place to Work India awards.",
        ],
      },
      {
        title: "Senior HR Executive",
        company: "Mahindra & Mahindra – Auto Sector",
        duration: "Jun 2017 – Mar 2021",
        bullets: [
          "Managed end-to-end recruitment for a 1,200-employee manufacturing plant, filling an average of 80 positions/quarter with a 30-day average time-to-hire.",
          "Implemented a competency-based training calendar for shop-floor supervisors, reducing quality-defect incidents attributable to human error by 34% over 18 months.",
          "Handled 150+ employee grievance cases annually with a 92% resolution rate, maintaining a union-management relationship free of work stoppages for 4 consecutive years.",
        ],
      },
    ],
    education: {
      degree: "MBA – Human Resources Management",
      institution: "TISS Mumbai",
      year: "2017",
    },
    projects: [
      {
        name: "PulseCheck – Employee Sentiment Platform",
        description:
          "Designed and deployed a bi-weekly pulse survey system across Razorpay using Darwinbox + Google Forms integration, providing real-time eNPS tracking for 1,000+ employees and enabling proactive culture interventions.",
        tech: ["Darwinbox", "Google Forms", "Power BI"],
      },
    ],
    certifications: [
      "SHRM Certified Professional (SHRM-CP)",
      "NHRDN Certified HR Professional",
      "Workday HCM Certified",
    ],
  },
  {
    id: "teacher",
    role: "Secondary School Teacher",
    industry: "Education",
    industryColor: "#06b6d4",
    name: "Meera Subramanian",
    contact:
      "meera.subramanian@email.com | linkedin.com/in/meerasubramanian | CTET Qualified",
    summary:
      "Dedicated secondary school teacher with 8 years of experience teaching Mathematics and Science to Grades 9–12 in CBSE schools. Passionate about inquiry-based learning, educational technology integration, and creating inclusive classrooms where every student achieves measurable academic growth.",
    skills: [
      "Curriculum Design (CBSE/NCF)",
      "Mathematics (Grades 9–12)",
      "Physics & Chemistry",
      "Differentiated Instruction",
      "Classroom Management",
      "Google Classroom & Workspace",
      "Formative Assessment Design",
      "Student Counselling",
      "STEM Project Mentoring",
      "Parent Communication",
    ],
    experience: [
      {
        title: "Senior Mathematics Teacher & Academic Coordinator",
        company: "Delhi Public School, R.K. Puram",
        duration: "Jun 2020 – Present",
        bullets: [
          "Improved Grade 12 Mathematics board examination average from 74% to 88% over 3 academic years by introducing concept-mapping, spaced-repetition revision schedules, and weekly mock assessments.",
          "Designed and led a school-wide STEM club for 120 students, with 3 student teams qualifying for the CBSE Science Exhibition National Level in consecutive years (2022 and 2023).",
          "Mentored 6 fellow teachers in integrating Google Classroom and Kahoot for hybrid learning, reducing homework submission default rates from 28% to 9% across mentored classes.",
        ],
      },
      {
        title: "Mathematics & Science Teacher",
        company: "Kendriya Vidyalaya No. 1, Pune",
        duration: "Jul 2016 – May 2020",
        bullets: [
          "Taught Mathematics and Physical Science to 280+ students across 6 sections annually; 94% of Grade 10 students passed board examinations with distinction in Mathematics.",
          "Introduced visual-learning techniques and manipulative-based instruction for algebra and geometry units, reducing the percentage of students scoring below 50% from 18% to 5%.",
          "Organised an inter-school Mathematics Olympiad participated in by 14 schools (650 students), managing question-setting, logistics, and award ceremony single-handedly.",
        ],
      },
    ],
    education: {
      degree: "M.Sc. Mathematics + B.Ed.",
      institution: "University of Delhi",
      year: "2016",
    },
    projects: [
      {
        name: "MathViz – Interactive Concept Library",
        description:
          "Created a self-hosted digital library of 80+ interactive GeoGebra applets and animated explainer videos covering the entire CBSE Grade 10–12 Mathematics syllabus; used by 1,200+ students across 4 schools.",
        tech: ["GeoGebra", "Google Sites", "Canva", "YouTube Studio"],
      },
    ],
    certifications: [
      "CTET (Central Teacher Eligibility Test) – Paper II Qualified",
      "Google Certified Educator Level 2",
      "Cambridge International Teaching & Learning Certificate",
    ],
  },
];

const INDUSTRIES = [
  "All",
  "Technology",
  "Business",
  "Design",
  "Healthcare",
  "Finance",
  "Engineering",
  "HR",
  "Education",
];

const INDUSTRY_BG: Record<string, string> = {
  Technology: "rgba(108,99,255,0.15)",
  Business: "rgba(245,158,11,0.15)",
  Design: "rgba(236,72,153,0.15)",
  Healthcare: "rgba(16,185,129,0.15)",
  Finance: "rgba(59,130,246,0.15)",
  Engineering: "rgba(249,115,22,0.15)",
  HR: "rgba(168,85,247,0.15)",
  Education: "rgba(6,182,212,0.15)",
};

export function ExamplesTab({ onAnalyze, isDark }: ExamplesTabProps) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<ResumeExample | null>(null);
  const resumeDocRef = useRef<HTMLDivElement>(null);

  function handlePrintResume() {
    if (!resumeDocRef.current || !selected) return;
    const html = resumeDocRef.current.innerHTML;
    const win = window.open("", "_blank", "width=850,height=1100");
    if (!win) return;
    win.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>${selected.name} — Resume</title><style>
      @import url('https://fonts.googleapis.com/css2?family=Georgia&display=swap');
      *{box-sizing:border-box;margin:0;padding:0}
      body{background:#fff;color:#1a1a2e;font-family:'Georgia','Times New Roman',serif;padding:0}
      @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
    </style></head><body>${html}</body></html>`);
    win.document.close();
    win.focus();
    setTimeout(() => {
      win.print();
      win.close();
    }, 400);
  }

  const filtered = EXAMPLES.filter((ex) => {
    const matchIndustry = filter === "All" || ex.industry === filter;
    const matchSearch =
      search === "" ||
      ex.role.toLowerCase().includes(search.toLowerCase()) ||
      ex.name.toLowerCase().includes(search.toLowerCase()) ||
      ex.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    return matchIndustry && matchSearch;
  });

  const card = (ex: ResumeExample) => (
    <div
      key={ex.id}
      data-ocid={`examples.${ex.id}.card`}
      style={{
        background: isDark ? "rgba(20,22,35,0.85)" : "rgba(255,255,255,0.9)",
        border: `1px solid ${isDark ? "rgba(108,99,255,0.2)" : "rgba(108,99,255,0.15)"}`,
        borderRadius: "16px",
        padding: "24px",
        cursor: "pointer",
        transition:
          "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform =
          "translateY(-4px) scale(1.01)";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          `0 12px 40px ${ex.industryColor}33`;
        (e.currentTarget as HTMLDivElement).style.borderColor =
          `${ex.industryColor}66`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "";
        (e.currentTarget as HTMLDivElement).style.borderColor = isDark
          ? "rgba(108,99,255,0.2)"
          : "rgba(108,99,255,0.15)";
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: `linear-gradient(90deg, ${ex.industryColor}, ${ex.industryColor}88)`,
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "12px",
          marginBottom: "10px",
        }}
      >
        <h3
          style={{
            fontSize: "1.15rem",
            fontWeight: 700,
            color: "var(--text1)",
            margin: 0,
          }}
        >
          {ex.role}
        </h3>
        <span
          style={{
            background: INDUSTRY_BG[ex.industry] ?? "rgba(108,99,255,0.15)",
            color: ex.industryColor,
            border: `1px solid ${ex.industryColor}44`,
            borderRadius: "999px",
            padding: "2px 10px",
            fontSize: "0.72rem",
            fontWeight: 600,
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          {ex.industry}
        </span>
      </div>
      <p
        style={{
          fontSize: "0.82rem",
          color: "var(--text2)",
          margin: "0 0 10px",
        }}
      >
        {ex.name}
      </p>
      <p
        style={{
          fontSize: "0.83rem",
          color: "var(--text2)",
          lineHeight: 1.5,
          margin: "0 0 16px",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {ex.summary}
      </p>

      {/* Top 5 skills */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "6px",
          marginBottom: "18px",
        }}
      >
        {ex.skills.slice(0, 5).map((sk) => (
          <span
            key={sk}
            style={{
              background: isDark
                ? "rgba(108,99,255,0.1)"
                : "rgba(108,99,255,0.08)",
              color: "var(--accent2)",
              border: "1px solid rgba(108,99,255,0.2)",
              borderRadius: "999px",
              padding: "2px 9px",
              fontSize: "0.73rem",
              fontWeight: 500,
            }}
          >
            {sk}
          </span>
        ))}
      </div>

      <button
        type="button"
        data-ocid={`examples.${ex.id}.button`}
        style={{
          background: "linear-gradient(135deg, var(--accent), var(--accent2))",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          padding: "9px 18px",
          fontSize: "0.82rem",
          fontWeight: 600,
          cursor: "pointer",
          width: "100%",
        }}
        onClick={(e) => {
          e.stopPropagation();
          setSelected(ex);
        }}
      >
        View Full Resume →
      </button>
    </div>
  );

  return (
    <section
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "40px 24px 60px",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(108,99,255,0.1)",
            border: "1px solid rgba(108,99,255,0.25)",
            borderRadius: "999px",
            padding: "4px 14px",
            fontSize: "0.78rem",
            color: "var(--accent2)",
            marginBottom: "14px",
            fontWeight: 600,
          }}
        >
          📄 Resume Examples
        </div>
        <h2
          style={{
            fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
            fontWeight: 800,
            color: "var(--text1)",
            margin: "0 0 10px",
          }}
        >
          Industry Resume Examples
        </h2>
        <p
          style={{
            color: "var(--text2)",
            fontSize: "1rem",
            maxWidth: "520px",
            margin: "0 auto",
          }}
        >
          Learn from real-world optimised resumes across industries. Click any
          card to view the full document.
        </p>
      </div>

      {/* Search + Filter */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "32px",
          alignItems: "center",
        }}
      >
        <input
          data-ocid="examples.search_input"
          type="text"
          placeholder="Search by role, name, or skill…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            minWidth: "200px",
            background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
            border: `1px solid ${isDark ? "rgba(108,99,255,0.25)" : "rgba(108,99,255,0.2)"}`,
            borderRadius: "10px",
            padding: "10px 16px",
            color: "var(--text1)",
            fontSize: "0.875rem",
            outline: "none",
          }}
        />
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {INDUSTRIES.map((ind) => (
            <button
              type="button"
              key={ind}
              data-ocid={`examples.${ind.toLowerCase()}.tab`}
              onClick={() => setFilter(ind)}
              style={{
                background:
                  filter === ind
                    ? "linear-gradient(135deg, var(--accent), var(--accent2))"
                    : isDark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.05)",
                color: filter === ind ? "#fff" : "var(--text2)",
                border: `1px solid ${filter === ind ? "transparent" : isDark ? "rgba(108,99,255,0.2)" : "rgba(0,0,0,0.1)"}`,
                borderRadius: "8px",
                padding: "8px 16px",
                fontSize: "0.82rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {ind}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div
          data-ocid="examples.empty_state"
          style={{
            textAlign: "center",
            padding: "60px 24px",
            color: "var(--text2)",
          }}
        >
          <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>🔍</div>
          <p style={{ fontSize: "1rem" }}>
            No resumes match your search. Try a different keyword.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {filtered.map(card)}
        </div>
      )}

      {/* Modal */}
      {selected && (
        <div
          data-ocid="examples.modal"
          role="presentation"
          tabIndex={-1}
          onClick={() => setSelected(null)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setSelected(null);
          }}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(6px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "40px 20px",
            overflowY: "auto",
          }}
        >
          {/* Outer wrapper — dark/light mode applies here */}
          <div
            role="document"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "780px",
              position: "relative",
            }}
          >
            {/* Close button — outside document */}
            <button
              type="button"
              data-ocid="examples.close_button"
              onClick={() => setSelected(null)}
              style={{
                position: "absolute",
                top: "-14px",
                right: "0px",
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(4px)",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: "50%",
                width: "38px",
                height: "38px",
                cursor: "pointer",
                color: "#fff",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
              }}
            >
              ✕
            </button>

            {/* Resume document — always white */}
            <div
              ref={resumeDocRef}
              style={{
                background: "#ffffff",
                color: "#1a1a2e",
                borderRadius: "4px",
                boxShadow:
                  "0 8px 40px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.3)",
                fontFamily: "'Georgia', 'Times New Roman', serif",
                overflow: "hidden",
              }}
            >
              {/* Resume Header */}
              <div
                style={{
                  padding: "36px 44px 28px",
                  borderBottom: "2px solid #1a1a2e",
                }}
              >
                <h1
                  style={{
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "#1a1a2e",
                    margin: "0 0 4px",
                    letterSpacing: "-0.01em",
                    fontFamily: "'Arial', 'Helvetica Neue', sans-serif",
                  }}
                >
                  {selected.name}
                </h1>
                <p
                  style={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#444",
                    margin: "0 0 12px",
                    fontFamily: "'Arial', 'Helvetica Neue', sans-serif",
                  }}
                >
                  {selected.role}
                </p>
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "#666",
                    margin: 0,
                    fontFamily: "'Arial', 'Helvetica Neue', sans-serif",
                  }}
                >
                  {selected.contact}
                </p>
              </div>

              {/* Resume Body */}
              <div style={{ padding: "0 44px 36px" }}>
                {/* Summary */}
                <ResumeSection title="Professional Summary">
                  <p
                    style={{
                      color: "#333",
                      fontSize: "0.875rem",
                      lineHeight: 1.7,
                      margin: 0,
                      fontFamily: "'Georgia', serif",
                    }}
                  >
                    {selected.summary}
                  </p>
                </ResumeSection>

                {/* Experience */}
                <ResumeSection title="Experience">
                  {selected.experience.map((exp) => (
                    <div key={exp.company} style={{ marginBottom: "20px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "baseline",
                          flexWrap: "wrap",
                          gap: "4px",
                          marginBottom: "2px",
                        }}
                      >
                        <span
                          style={{
                            fontWeight: 700,
                            color: "#1a1a2e",
                            fontSize: "0.9rem",
                            fontFamily: "'Arial', 'Helvetica Neue', sans-serif",
                          }}
                        >
                          {exp.title}
                          <span
                            style={{
                              fontWeight: 400,
                              color: "#444",
                              marginLeft: "6px",
                            }}
                          >
                            — {exp.company}
                          </span>
                        </span>
                        <span
                          style={{
                            color: "#666",
                            fontSize: "0.8rem",
                            fontFamily: "'Arial', 'Helvetica Neue', sans-serif",
                            flexShrink: 0,
                          }}
                        >
                          {exp.duration}
                        </span>
                      </div>
                      <ul
                        style={{
                          margin: "8px 0 0",
                          paddingLeft: "18px",
                          listStyleType: "disc",
                        }}
                      >
                        {exp.bullets.map((b) => (
                          <li
                            key={b.slice(0, 30)}
                            style={{
                              color: "#444",
                              fontSize: "0.85rem",
                              lineHeight: 1.65,
                              marginBottom: "4px",
                              fontFamily: "'Georgia', serif",
                            }}
                          >
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </ResumeSection>

                {/* Education */}
                <ResumeSection title="Education">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      flexWrap: "wrap",
                      gap: "4px",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontWeight: 700,
                          color: "#1a1a2e",
                          fontSize: "0.9rem",
                          fontFamily: "'Arial', 'Helvetica Neue', sans-serif",
                        }}
                      >
                        {selected.education.degree}
                      </span>
                      <span
                        style={{
                          color: "#555",
                          fontSize: "0.85rem",
                          marginLeft: "6px",
                          fontFamily: "'Georgia', serif",
                        }}
                      >
                        — {selected.education.institution}
                      </span>
                    </div>
                    <span
                      style={{
                        color: "#666",
                        fontSize: "0.8rem",
                        fontFamily: "'Arial', 'Helvetica Neue', sans-serif",
                        flexShrink: 0,
                      }}
                    >
                      {selected.education.year}
                    </span>
                  </div>
                </ResumeSection>

                {/* Skills */}
                <ResumeSection title="Skills">
                  <p
                    style={{
                      color: "#333",
                      fontSize: "0.875rem",
                      lineHeight: 1.7,
                      margin: 0,
                      fontFamily: "'Georgia', serif",
                    }}
                  >
                    {selected.skills.join(" • ")}
                  </p>
                </ResumeSection>

                {/* Projects */}
                <ResumeSection title="Projects">
                  {selected.projects.map((proj) => (
                    <div key={proj.name} style={{ marginBottom: "16px" }}>
                      <p
                        style={{
                          fontWeight: 700,
                          color: "#1a1a2e",
                          margin: "0 0 4px",
                          fontSize: "0.88rem",
                          fontFamily: "'Arial', 'Helvetica Neue', sans-serif",
                        }}
                      >
                        {proj.name}
                      </p>
                      <p
                        style={{
                          color: "#444",
                          margin: "0 0 6px",
                          fontSize: "0.85rem",
                          lineHeight: 1.6,
                          fontFamily: "'Georgia', serif",
                        }}
                      >
                        {proj.description}
                      </p>
                      <p
                        style={{
                          color: "#666",
                          margin: 0,
                          fontSize: "0.8rem",
                          fontStyle: "italic",
                          fontFamily: "'Georgia', serif",
                        }}
                      >
                        Tech: {proj.tech.join(", ")}
                      </p>
                    </div>
                  ))}
                </ResumeSection>

                {/* Certifications */}
                <ResumeSection title="Certifications">
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: "18px",
                      listStyleType: "disc",
                    }}
                  >
                    {selected.certifications.map((c) => (
                      <li
                        key={c}
                        style={{
                          color: "#444",
                          fontSize: "0.85rem",
                          lineHeight: 1.65,
                          fontFamily: "'Georgia', serif",
                        }}
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                </ResumeSection>
              </div>
            </div>

            {/* Footer actions — below document */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                marginTop: "16px",
              }}
            >
              <button
                type="button"
                data-ocid="examples.analyze.primary_button"
                onClick={() => {
                  setSelected(null);
                  onAnalyze(selected.role);
                }}
                style={{
                  flex: 1,
                  minWidth: "200px",
                  background:
                    "linear-gradient(135deg, var(--accent), var(--accent2))",
                  color: "#fff",
                  border: "none",
                  borderRadius: "10px",
                  padding: "12px 24px",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                🔍 Analyse This Resume Style
              </button>
              <button
                type="button"
                data-ocid="examples.download.button"
                onClick={handlePrintResume}
                style={{
                  background: "rgba(255,255,255,0.12)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.35)",
                  borderRadius: "10px",
                  padding: "12px 20px",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                ⬇️ Download PDF
              </button>
              <button
                type="button"
                data-ocid="examples.close_button"
                onClick={() => setSelected(null)}
                style={{
                  background: "rgba(255,255,255,0.12)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "10px",
                  padding: "12px 20px",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function ResumeSection({
  title,
  children,
}: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: "22px" }}>
      <h3
        style={{
          fontSize: "0.72rem",
          fontWeight: 700,
          color: "#444",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          margin: "0 0 8px",
          fontFamily: "'Arial', 'Helvetica Neue', sans-serif",
          paddingBottom: "5px",
          borderBottom: "1px solid #d0d0d0",
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}
