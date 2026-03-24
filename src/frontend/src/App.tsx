import { useCallback, useState } from "react";
import { ConfettiCanvas } from "./components/ConfettiCanvas";
import { ParticleCanvas } from "./components/ParticleCanvas";
import { ToastContainer, type ToastMessage } from "./components/Toast";
import { AboutTab } from "./components/tabs/AboutTab";
import { BenefitsTab } from "./components/tabs/BenefitsTab";
import { FeaturesTab } from "./components/tabs/FeaturesTab";
import { FutureScopeTab } from "./components/tabs/FutureScopeTab";
import { HomeTab } from "./components/tabs/HomeTab";
import { HowItWorksTab } from "./components/tabs/HowItWorksTab";
import {
  type AnalysisData,
  ResultsTab,
  generateAnalysisData,
} from "./components/tabs/ResultsTab";
import { UploadTab } from "./components/tabs/UploadTab";
import { useAudioEngine } from "./hooks/useAudioEngine";

type TabId =
  | "home"
  | "upload"
  | "features"
  | "how"
  | "benefits"
  | "results"
  | "about"
  | "future";

const TABS: { id: TabId; label: string; mobileLabel: string }[] = [
  { id: "home", label: "Home", mobileLabel: "🏠 Home" },
  { id: "upload", label: "Upload", mobileLabel: "📤 Upload" },
  { id: "features", label: "Features", mobileLabel: "✨ Features" },
  { id: "how", label: "How It Works", mobileLabel: "🔍 How It Works" },
  { id: "benefits", label: "Benefits", mobileLabel: "🎯 Benefits" },
  { id: "results", label: "Results", mobileLabel: "📊 Results" },
  { id: "future", label: "Future Scope", mobileLabel: "🚀 Future Scope" },
  { id: "about", label: "About", mobileLabel: "👥 About" },
];

let toastCounter = 0;

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("theme") !== "light",
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [analysing, setAnalysing] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const { playClick, playHover, playResults } = useAudioEngine();

  const showToast = useCallback(
    (message: string, type: "success" | "error" | "info") => {
      const id = ++toastCounter;
      setToasts((prev) => [...prev, { id, message, type }]);
    },
    [],
  );

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const switchTab = useCallback(
    (tab: TabId) => {
      playClick();
      setActiveTab(tab);
      setMobileOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [playClick],
  );

  function toggleTheme() {
    playClick();
    setIsDark((d) => {
      const next = !d;
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  }

  function startAnalysis() {
    switchTab("results");
    setAnalysing(true);
    setAnalysisData(null);
    setTimeout(() => {
      const data = generateAnalysisData();
      setAnalysisData(data);
      setAnalysing(false);
      playResults();
      if (data.ats >= 80) setConfettiActive(true);
      showToast("🎉 Analysis complete! Check your scores.", "success");
    }, 3500);
  }

  document.body.classList.toggle("light-mode", !isDark);

  return (
    <div style={{ minHeight: "100vh" }}>
      <ParticleCanvas />

      {/* NAV */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: isDark ? "rgba(8,11,20,0.85)" : "rgba(244,243,255,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--border)",
          padding: "0 24px",
          transition: "background var(--transition)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "64px",
            gap: "8px",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.25rem",
              fontWeight: 800,
              background: "linear-gradient(135deg, var(--accent), var(--cyan))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              whiteSpace: "nowrap",
              letterSpacing: "-0.02em",
              flexShrink: 0,
            }}
          >
            ⚡ ResumeAI
          </div>

          {/* Desktop tabs */}
          <div
            data-ocid="nav.tab"
            style={{
              display: "flex",
              gap: "2px",
              alignItems: "center",
              flexWrap: "nowrap",
              overflowX: "auto",
              scrollbarWidth: "none",
            }}
            className="hidden-mobile"
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                data-ocid={`nav.${tab.id}.link`}
                onClick={() => switchTab(tab.id)}
                onMouseEnter={playHover}
                style={{
                  background:
                    activeTab === tab.id ? "rgba(108,99,255,0.12)" : "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  color:
                    activeTab === tab.id ? "var(--accent2)" : "var(--text2)",
                  padding: "8px 14px",
                  borderRadius: "10px",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                  position: "relative",
                  letterSpacing: "0.01em",
                }}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: "4px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "20px",
                      height: "2px",
                      borderRadius: "2px",
                      background:
                        "linear-gradient(90deg, var(--accent), var(--cyan))",
                      display: "block",
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexShrink: 0,
            }}
          >
            <button
              type="button"
              data-ocid="nav.toggle"
              onClick={toggleTheme}
              title="Toggle theme"
              style={{
                background: "var(--surface2)",
                border: "1px solid var(--border)",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
                transition: "all 0.2s",
                color: "var(--text2)",
              }}
            >
              {isDark ? "🌙" : "☀️"}
            </button>

            <button
              type="button"
              data-ocid="nav.open_modal_button"
              aria-label="Menu"
              onClick={() => {
                setMobileOpen((o) => !o);
                playClick();
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                cursor: "pointer",
                background: "none",
                border: "none",
                padding: "6px",
              }}
              className="show-mobile"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    width: "22px",
                    height: "2px",
                    borderRadius: "2px",
                    background: "var(--text2)",
                    display: "block",
                    transition: "all 0.3s",
                    transform:
                      mobileOpen && i === 0
                        ? "rotate(45deg) translate(5px,5px)"
                        : mobileOpen && i === 2
                          ? "rotate(-45deg) translate(5px,-5px)"
                          : "none",
                    opacity: mobileOpen && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          data-ocid="nav.modal"
          style={{
            position: "fixed",
            top: "64px",
            left: 0,
            right: 0,
            zIndex: 99,
            background: isDark
              ? "rgba(8,11,20,0.97)"
              : "rgba(244,243,255,0.97)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid var(--border)",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              data-ocid={`nav.mobile.${tab.id}.link`}
              onClick={() => switchTab(tab.id)}
              style={{
                background:
                  activeTab === tab.id ? "rgba(108,99,255,0.12)" : "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                fontSize: "0.95rem",
                fontWeight: 500,
                color: activeTab === tab.id ? "var(--accent2)" : "var(--text2)",
                padding: "12px 16px",
                borderRadius: "10px",
                transition: "all 0.2s ease",
                textAlign: "left",
                width: "100%",
              }}
            >
              {tab.mobileLabel}
            </button>
          ))}
        </div>
      )}

      {/* MAIN */}
      <main
        style={{
          paddingTop: "64px",
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
        }}
      >
        {activeTab === "home" && (
          <div style={{ animation: "fadeSlideIn 0.45s ease" }}>
            <HomeTab onSwitchTab={(t) => switchTab(t as TabId)} />
          </div>
        )}
        {activeTab === "upload" && (
          <div style={{ animation: "fadeSlideIn 0.45s ease" }}>
            <UploadTab onAnalyze={startAnalysis} onToast={showToast} />
          </div>
        )}
        {activeTab === "features" && (
          <div style={{ animation: "fadeSlideIn 0.45s ease" }}>
            <FeaturesTab />
          </div>
        )}
        {activeTab === "how" && (
          <div style={{ animation: "fadeSlideIn 0.45s ease" }}>
            <HowItWorksTab />
          </div>
        )}
        {activeTab === "benefits" && (
          <div style={{ animation: "fadeSlideIn 0.45s ease" }}>
            <BenefitsTab />
          </div>
        )}
        {activeTab === "results" && (
          <div style={{ animation: "fadeSlideIn 0.45s ease" }}>
            {analysing ? (
              <section
                style={{
                  padding: "80px 24px",
                  maxWidth: "800px",
                  margin: "0 auto",
                }}
              >
                <div
                  data-ocid="results.loading_state"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "16px",
                    padding: "80px 40px",
                  }}
                >
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "50%",
                      border: "3px solid var(--border)",
                      borderTopColor: "var(--accent)",
                      animation: "spin 0.8s linear infinite",
                    }}
                  />
                  <div style={{ color: "var(--text2)", fontSize: "0.9rem" }}>
                    Running AI analysis...
                  </div>
                </div>
              </section>
            ) : (
              <ResultsTab
                data={analysisData}
                onGoUpload={() => switchTab("upload")}
                onReanalyze={() => {
                  setAnalysisData(null);
                  switchTab("upload");
                }}
                onToast={showToast}
              />
            )}
          </div>
        )}
        {activeTab === "future" && (
          <div style={{ animation: "fadeSlideIn 0.45s ease" }}>
            <FutureScopeTab />
          </div>
        )}
        {activeTab === "about" && (
          <div style={{ animation: "fadeSlideIn 0.45s ease" }}>
            <AboutTab />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "32px 24px",
          borderTop: "1px solid var(--border)",
          color: "var(--text3)",
          fontSize: "0.82rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        <p>
          © {new Date().getFullYear()} ResumeAI · Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            style={{ color: "var(--accent2)", textDecoration: "none" }}
            target="_blank"
            rel="noreferrer"
          >
            caffeine.ai
          </a>
          {" · "}
          <button
            type="button"
            onClick={() => switchTab("about")}
            style={{
              background: "none",
              border: "none",
              color: "var(--accent2)",
              cursor: "pointer",
              fontSize: "0.82rem",
              padding: 0,
            }}
          >
            About
          </button>
        </p>
      </footer>

      <ConfettiCanvas
        active={confettiActive}
        onDone={() => setConfettiActive(false)}
      />
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <style>{`
        .hidden-mobile { display: flex; }
        .show-mobile { display: none; }
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        .feature-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 0% 0%, var(--glow), transparent 60%);
          opacity: 0;
          transition: opacity var(--transition);
          border-radius: var(--radius2);
        }
        .feature-card:hover::before { opacity: 1; }
        .feature-card:hover {
          border-color: rgba(108,99,255,0.3) !important;
          transform: translateY(-6px) !important;
          box-shadow: 0 16px 50px rgba(0,0,0,0.3), 0 0 0 1px rgba(108,99,255,0.1) !important;
        }
      `}</style>
    </div>
  );
}
