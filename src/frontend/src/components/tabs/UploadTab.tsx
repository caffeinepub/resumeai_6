import { useRef, useState } from "react";
import { useAudioEngine } from "../../hooks/useAudioEngine";

export interface UploadedFile {
  name: string;
  size: number;
}

interface UploadTabProps {
  onAnalyze: (role: string, fileName: string) => void;
  onToast: (msg: string, type: "success" | "error" | "info") => void;
}

type UploadState = "idle" | "uploading" | "progressing" | "done";

export function UploadTab({ onAnalyze, onToast }: UploadTabProps) {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [selectedRole, setSelectedRole] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");
  const [spinnerLabel, setSpinnerLabel] = useState("Uploading your resume...");
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { playSuccess, playHover } = useAudioEngine();

  function handleFile(file: File) {
    const allowed = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];
    if (
      !allowed.includes(file.type) &&
      !file.name.match(/\.(pdf|docx|txt)$/i)
    ) {
      onToast("❌ Please upload a PDF, DOCX, or TXT file", "error");
      return;
    }

    setUploadState("uploading");
    setSpinnerLabel("Uploading your resume...");
    const labels = [
      "Uploading your resume...",
      "Parsing document...",
      "Validating format...",
    ];
    let li = 0;
    const labelInterval = setInterval(() => {
      li = Math.min(li + 1, labels.length - 1);
      setSpinnerLabel(labels[li]);
    }, 700);

    setTimeout(() => {
      clearInterval(labelInterval);
      setUploadState("progressing");
      setProgress(0);

      const steps = [
        { to: 30, label: "Uploading file..." },
        { to: 60, label: "Parsing document..." },
        { to: 85, label: "Validating structure..." },
        { to: 100, label: "Complete!" },
      ];
      let prog = 0;
      let si = 0;

      const interval = setInterval(() => {
        prog += Math.random() * 4 + 1;
        if (prog >= steps[si].to) {
          prog = steps[si].to;
          setProgressLabel(steps[si].label);
          if (si < steps.length - 1) si++;
        }
        const p = Math.min(prog, 100);
        setProgress(p);
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploadedFile({ name: file.name, size: file.size });
            setUploadState("done");
            playSuccess();
            onToast("✅ Resume uploaded successfully!", "success");
          }, 300);
        }
      }, 80);
    }, 2000);
  }

  function addRipple(e: React.MouseEvent<HTMLButtonElement>) {
    const btn = e.currentTarget;
    const ripple = document.createElement("span");
    const rect = btn.getBoundingClientRect();
    ripple.style.cssText = `
      position:absolute;border-radius:50%;
      width:100px;height:100px;
      background:rgba(255,255,255,0.3);
      transform:scale(0);animation:rippleAnim 0.5s ease-out;
      left:${e.clientX - rect.left - 50}px;top:${e.clientY - rect.top - 50}px;
      pointer-events:none;z-index:5;
    `;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }

  return (
    <section
      style={{ padding: "80px 24px", maxWidth: "800px", margin: "0 auto" }}
    >
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <div className="section-tag">Upload</div>
        <h2 className="section-title">Drop Your Resume Here</h2>
        <p className="section-sub">
          We support PDF, DOCX, and TXT files. Your data is processed securely
          and never stored.
        </p>
      </div>

      {(uploadState === "idle" || uploadState === "done") && (
        <div
          data-ocid="upload.dropzone"
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            const file = e.dataTransfer.files[0];
            if (file) handleFile(file);
          }}
          style={{
            border: `2px dashed ${dragOver ? "var(--accent)" : "var(--border2)"}`,
            borderRadius: "var(--radius2)",
            padding: "60px 40px",
            textAlign: "center",
            transition: "all var(--transition)",
            background: dragOver ? "rgba(108,99,255,0.06)" : "var(--surface)",
            boxShadow: dragOver
              ? "0 0 40px var(--glow), inset 0 0 40px rgba(108,99,255,0.03)"
              : "none",
            transform: dragOver ? "scale(1.01)" : "scale(1)",
          }}
        >
          <span
            style={{ fontSize: "4rem", display: "block", marginBottom: "20px" }}
          >
            📄
          </span>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.4rem",
              fontWeight: 700,
              marginBottom: "12px",
            }}
          >
            Drag &amp; Drop your resume
          </h3>
          <p
            style={{
              color: "var(--text2)",
              marginBottom: "24px",
              fontSize: "0.9rem",
            }}
          >
            or click to browse files from your computer
          </p>
          <button
            type="button"
            className="btn-primary"
            data-ocid="upload.upload_button"
            onClick={(e) => {
              addRipple(e);
              fileInputRef.current?.click();
            }}
            onMouseEnter={playHover}
          >
            Choose File
          </button>
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              flexWrap: "wrap",
              marginTop: "16px",
            }}
          >
            {["PDF", "DOCX", "TXT", "Max 10MB"].map((f) => (
              <span
                key={f}
                style={{
                  background: "var(--surface2)",
                  border: "1px solid var(--border2)",
                  borderRadius: "8px",
                  padding: "4px 12px",
                  fontSize: "0.75rem",
                  color: "var(--text2)",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                }}
              >
                {f}
              </span>
            ))}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.txt"
            style={{ display: "none" }}
            onChange={(e) => {
              if (e.target.files?.[0]) handleFile(e.target.files[0]);
            }}
          />
        </div>
      )}

      {uploadState === "uploading" && (
        <div
          data-ocid="upload.loading_state"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            padding: "40px",
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
            {spinnerLabel}
          </div>
        </div>
      )}

      {uploadState === "progressing" && (
        <div style={{ marginTop: "16px" }} data-ocid="upload.loading_state">
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "100px",
              height: "8px",
              overflow: "hidden",
              margin: "16px 0",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background:
                  "linear-gradient(90deg, var(--accent), var(--cyan))",
                borderRadius: "100px",
                transition: "width 0.3s ease",
                boxShadow: "0 0 12px var(--glow)",
              }}
            />
          </div>
          <div
            style={{
              textAlign: "center",
              fontSize: "0.82rem",
              color: "var(--text2)",
            }}
          >
            {progressLabel}
          </div>
        </div>
      )}

      {uploadState === "done" && uploadedFile && (
        <div style={{ marginTop: "20px", animation: "fadeSlideIn 0.4s ease" }}>
          <div
            data-ocid="upload.success_state"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              background: "rgba(52,211,153,0.08)",
              border: "1px solid rgba(52,211,153,0.2)",
              borderRadius: "var(--radius)",
              padding: "20px 24px",
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontSize: "2rem" }}>✅</span>
            <div style={{ flex: 1 }}>
              <strong
                style={{
                  display: "block",
                  marginBottom: "2px",
                  color: "var(--green)",
                }}
              >
                Resume uploaded successfully!
              </strong>
              <span style={{ fontSize: "0.83rem", color: "var(--text2)" }}>
                {uploadedFile.name} · {(uploadedFile.size / 1024).toFixed(0)}KB
                · Ready for analysis
              </span>
            </div>
          </div>

          {/* Target Job Role Selector */}
          <div
            style={{
              background: "rgba(10,10,20,0.85)",
              border: "1px solid rgba(108,99,255,0.4)",
              boxShadow: "0 0 24px rgba(108,99,255,0.12)",
              borderRadius: "var(--radius)",
              padding: "20px 24px",
              marginTop: "12px",
            }}
          >
            <label
              htmlFor="job-role-select"
              style={{
                display: "block",
                fontSize: "0.85rem",
                fontWeight: 600,
                marginBottom: "10px",
                color: "var(--text2)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              🎯 Target Job Role{" "}
              <span
                style={{
                  color: "var(--text2)",
                  fontWeight: 400,
                  textTransform: "none",
                  letterSpacing: 0,
                }}
              >
                (optional — improves match analysis)
              </span>
            </label>
            <select
              id="job-role-select"
              data-ocid="upload.select"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "var(--radius)",
                border: "1px solid rgba(108,99,255,0.3)",
                background: "#0d0d1a",
                color: "var(--text)",
                fontSize: "0.9rem",
                outline: "none",
                cursor: "pointer",
                appearance: "none",
                WebkitAppearance: "none",
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23888' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 14px center",
                paddingRight: "36px",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => {
                (e.target as HTMLSelectElement).style.borderColor =
                  "var(--accent)";
              }}
              onBlur={(e) => {
                (e.target as HTMLSelectElement).style.borderColor =
                  "var(--border)";
              }}
            >
              <option value="">— Select a role —</option>
              <optgroup label="Technology">
                <option value="Software Engineer">Software Engineer</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Full Stack Developer">
                  Full Stack Developer
                </option>
                <option value="Data Scientist">Data Scientist</option>
                <option value="ML Engineer">ML Engineer</option>
                <option value="DevOps Engineer">DevOps Engineer</option>
                <option value="Cybersecurity Analyst">
                  Cybersecurity Analyst
                </option>
                <option value="Product Manager">Product Manager</option>
              </optgroup>
              <optgroup label="Business">
                <option value="Business Analyst">Business Analyst</option>
                <option value="Marketing Manager">Marketing Manager</option>
                <option value="Sales Executive">Sales Executive</option>
                <option value="Operations Manager">Operations Manager</option>
                <option value="HR Manager">HR Manager</option>
                <option value="Finance Analyst">Finance Analyst</option>
              </optgroup>
              <optgroup label="Design">
                <option value="UI/UX Designer">UI/UX Designer</option>
                <option value="Graphic Designer">Graphic Designer</option>
              </optgroup>
              <optgroup label="Other">
                <option value="Content Writer">Content Writer</option>
                <option value="Project Manager">Project Manager</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="Research Analyst">Research Analyst</option>
              </optgroup>
            </select>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "12px",
            }}
          >
            <button
              type="button"
              className="btn-primary"
              data-ocid="upload.submit_button"
              onClick={(e) => {
                addRipple(e);
                onAnalyze(selectedRole, uploadedFile?.name ?? "");
              }}
              onMouseEnter={playHover}
            >
              Analyze Now →
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
