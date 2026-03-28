import { useCallback, useEffect, useState } from "react";
import type { UserProfile } from "../../backend.d";
import { useActor } from "../../hooks/useActor";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";

const JOB_ROLES = [
  "Software Engineer",
  "Data Scientist",
  "Product Manager",
  "Marketing Manager",
  "UI/UX Designer",
  "Business Analyst",
  "DevOps Engineer",
  "Cybersecurity Analyst",
  "Healthcare Professional",
  "Finance Analyst",
  "Civil Engineer",
  "HR Manager",
  "Education Professional",
  "Other",
];

function formatDate(nanoseconds: bigint): string {
  const ms = Number(nanoseconds / BigInt(1_000_000));
  return new Date(ms).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface ProfileTabProps {
  onLogin: () => void;
}

export function ProfileTab({ onLogin }: ProfileTabProps) {
  const { identity, isLoggingIn } = useInternetIdentity();
  const { actor, isFetching } = useActor();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState("");

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [targetRole, setTargetRole] = useState("");

  const loadProfile = useCallback(async () => {
    if (!actor || !identity || isFetching) return;
    setLoadingProfile(true);
    setError("");
    try {
      const result = await actor.getProfile();
      if (result) {
        setProfile(result);
        setDisplayName(result.displayName);
        setEmail(result.email);
        setTargetRole(result.targetRole);
      } else {
        // New user — initialize empty profile
        setProfile(null);
        setDisplayName("");
        setEmail("");
        setTargetRole("");
      }
    } catch {
      setError("Failed to load profile.");
    } finally {
      setLoadingProfile(false);
    }
  }, [actor, identity, isFetching]);

  useEffect(() => {
    if (identity && actor && !isFetching) {
      loadProfile();
    }
  }, [identity, actor, isFetching, loadProfile]);

  async function handleSave() {
    if (!actor) return;
    setSaving(true);
    setError("");
    setSaveSuccess(false);
    try {
      const now = BigInt(Date.now()) * BigInt(1_000_000);
      const updated: UserProfile = {
        displayName,
        email,
        targetRole,
        resumeCount: profile?.resumeCount ?? BigInt(0),
        lastAnalysisScore: profile?.lastAnalysisScore ?? BigInt(0),
        createdAt: profile?.createdAt ?? now,
      };
      await actor.saveProfile(updated);
      setProfile(updated);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch {
      setError("Failed to save profile.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!actor) return;
    setDeleting(true);
    setError("");
    try {
      await actor.deleteProfile();
      setProfile(null);
      setDisplayName("");
      setEmail("");
      setTargetRole("");
      setConfirmDelete(false);
    } catch {
      setError("Failed to delete profile.");
    } finally {
      setDeleting(false);
    }
  }

  // Not logged in
  if (!identity) {
    return (
      <section
        data-ocid="profile.section"
        style={{
          padding: "80px 24px",
          maxWidth: "480px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0",
        }}
      >
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius2)",
            padding: "48px 40px",
            textAlign: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, rgba(108,99,255,0.2), rgba(0,212,255,0.2))",
              border: "2px solid rgba(108,99,255,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem",
              margin: "0 auto 24px",
            }}
          >
            👤
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "var(--text)",
              marginBottom: "12px",
            }}
          >
            Your Profile
          </h2>
          <p
            style={{
              color: "var(--text2)",
              fontSize: "0.93rem",
              lineHeight: 1.6,
              marginBottom: "32px",
            }}
          >
            Save your resume analysis history, target role preferences, and
            track your progress over time.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              marginBottom: "24px",
              textAlign: "left",
            }}
          >
            {[
              { icon: "📊", text: "Track analysis scores over time" },
              { icon: "🎯", text: "Save your target job role" },
              { icon: "🔒", text: "Secured by Internet Identity" },
            ].map((item) => (
              <div
                key={item.text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "10px 14px",
                  background: "var(--surface2)",
                  borderRadius: "10px",
                  border: "1px solid var(--border)",
                }}
              >
                <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
                <span style={{ color: "var(--text2)", fontSize: "0.88rem" }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          <button
            type="button"
            data-ocid="profile.primary_button"
            onClick={onLogin}
            disabled={isLoggingIn}
            style={{
              width: "100%",
              padding: "14px 24px",
              borderRadius: "12px",
              border: "none",
              background: "linear-gradient(135deg, var(--accent), var(--cyan))",
              color: "#fff",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "0.95rem",
              cursor: isLoggingIn ? "not-allowed" : "pointer",
              opacity: isLoggingIn ? 0.7 : 1,
              transition: "all 0.2s",
              letterSpacing: "0.02em",
            }}
          >
            {isLoggingIn ? "Connecting..." : "🔐 Login with Internet Identity"}
          </button>
        </div>
      </section>
    );
  }

  // Logged in — profile view
  const principal = identity.getPrincipal().toString();
  const shortPrincipal = `${principal.slice(0, 8)}...${principal.slice(-6)}`;

  return (
    <section
      data-ocid="profile.section"
      style={{
        padding: "48px 24px 80px",
        maxWidth: "640px",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, rgba(108,99,255,0.25), rgba(0,212,255,0.25))",
            border: "2px solid rgba(108,99,255,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            flexShrink: 0,
          }}
        >
          👤
        </div>
        <div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.4rem",
              fontWeight: 700,
              color: "var(--text)",
              margin: 0,
            }}
          >
            {displayName || "Your Profile"}
          </h1>
          <p
            style={{
              color: "var(--text3)",
              fontSize: "0.78rem",
              margin: "4px 0 0",
              fontFamily: "monospace",
            }}
          >
            {shortPrincipal}
          </p>
        </div>
      </div>

      {loadingProfile ? (
        <div
          data-ocid="profile.loading_state"
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "60px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "3px solid var(--border)",
              borderTopColor: "var(--accent)",
              animation: "spin 0.8s linear infinite",
            }}
          />
        </div>
      ) : (
        <>
          {/* Stats row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "12px",
              marginBottom: "24px",
            }}
          >
            {[
              {
                label: "Resumes Analyzed",
                value: profile ? String(profile.resumeCount) : "0",
                icon: "📄",
                color: "var(--accent)",
              },
              {
                label: "Last Score",
                value: profile ? `${profile.lastAnalysisScore}%` : "—",
                icon: "📊",
                color: "var(--cyan)",
              },
              {
                label: "Member Since",
                value: profile ? formatDate(profile.createdAt) : "—",
                icon: "📅",
                color: "#a78bfa",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  padding: "16px 12px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "1.25rem", marginBottom: "6px" }}>
                  {stat.icon}
                </div>
                <div
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: stat.color,
                    marginBottom: "4px",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--text3)",
                    lineHeight: 1.3,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Edit form */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius2)",
              padding: "28px",
              marginBottom: "20px",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1rem",
                fontWeight: 600,
                color: "var(--text)",
                marginBottom: "20px",
              }}
            >
              ✏️ Edit Profile
            </h3>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div>
                <label
                  htmlFor="displayName"
                  style={{
                    display: "block",
                    fontSize: "0.82rem",
                    fontWeight: 500,
                    color: "var(--text2)",
                    marginBottom: "6px",
                  }}
                >
                  Display Name
                </label>
                <input
                  id="displayName"
                  data-ocid="profile.input"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Your name"
                  style={inputStyle}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  style={{
                    display: "block",
                    fontSize: "0.82rem",
                    fontWeight: 500,
                    color: "var(--text2)",
                    marginBottom: "6px",
                  }}
                >
                  Email
                </label>
                <input
                  id="email"
                  data-ocid="profile.input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  style={inputStyle}
                />
              </div>

              <div>
                <label
                  htmlFor="targetRole"
                  style={{
                    display: "block",
                    fontSize: "0.82rem",
                    fontWeight: 500,
                    color: "var(--text2)",
                    marginBottom: "6px",
                  }}
                >
                  Target Role
                </label>
                <select
                  id="targetRole"
                  data-ocid="profile.select"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  style={{ ...inputStyle, cursor: "pointer" }}
                >
                  <option value="">Select your target role...</option>
                  {JOB_ROLES.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {error && (
              <div
                data-ocid="profile.error_state"
                style={{
                  marginTop: "16px",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  color: "#f87171",
                  fontSize: "0.85rem",
                }}
              >
                {error}
              </div>
            )}

            {saveSuccess && (
              <div
                data-ocid="profile.success_state"
                style={{
                  marginTop: "16px",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  background: "rgba(34,197,94,0.1)",
                  border: "1px solid rgba(34,197,94,0.3)",
                  color: "#4ade80",
                  fontSize: "0.85rem",
                }}
              >
                ✅ Profile saved successfully!
              </div>
            )}

            <button
              type="button"
              data-ocid="profile.save_button"
              onClick={handleSave}
              disabled={saving}
              style={{
                marginTop: "20px",
                width: "100%",
                padding: "12px 24px",
                borderRadius: "10px",
                border: "none",
                background: saving
                  ? "var(--surface2)"
                  : "linear-gradient(135deg, var(--accent), var(--cyan))",
                color: saving ? "var(--text3)" : "#fff",
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "0.9rem",
                cursor: saving ? "not-allowed" : "pointer",
                transition: "all 0.2s",
              }}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

          {/* Danger zone */}
          <div
            style={{
              background: "rgba(239,68,68,0.05)",
              border: "1px solid rgba(239,68,68,0.2)",
              borderRadius: "var(--radius2)",
              padding: "24px 28px",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "#f87171",
                marginBottom: "8px",
              }}
            >
              ⚠️ Danger Zone
            </h3>
            <p
              style={{
                color: "var(--text3)",
                fontSize: "0.83rem",
                marginBottom: "16px",
              }}
            >
              Permanently delete your profile and all associated data. This
              action cannot be undone.
            </p>
            {!confirmDelete ? (
              <button
                type="button"
                data-ocid="profile.delete_button"
                onClick={() => setConfirmDelete(true)}
                style={{
                  padding: "9px 18px",
                  borderRadius: "8px",
                  border: "1px solid rgba(239,68,68,0.4)",
                  background: "transparent",
                  color: "#f87171",
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                Delete Profile
              </button>
            ) : (
              <div
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <span style={{ color: "var(--text2)", fontSize: "0.85rem" }}>
                  Are you sure?
                </span>
                <button
                  type="button"
                  data-ocid="profile.confirm_button"
                  onClick={handleDelete}
                  disabled={deleting}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    border: "none",
                    background: "#ef4444",
                    color: "#fff",
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "0.83rem",
                    cursor: deleting ? "not-allowed" : "pointer",
                    opacity: deleting ? 0.7 : 1,
                  }}
                >
                  {deleting ? "Deleting..." : "Yes, Delete"}
                </button>
                <button
                  type="button"
                  data-ocid="profile.cancel_button"
                  onClick={() => setConfirmDelete(false)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    border: "1px solid var(--border)",
                    background: "transparent",
                    color: "var(--text2)",
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                    fontSize: "0.83rem",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: "8px",
  border: "1px solid var(--border)",
  background: "var(--surface2)",
  color: "var(--text)",
  fontFamily: "var(--font-body)",
  fontSize: "0.9rem",
  outline: "none",
  transition: "border-color 0.2s",
  boxSizing: "border-box",
};
