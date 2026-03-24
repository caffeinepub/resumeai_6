import { useEffect, useState } from "react";

export interface ToastMessage {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

interface ToastItemProps {
  toast: ToastMessage;
  onRemove: (id: number) => void;
}

function ToastItem({ toast, onRemove }: ToastItemProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 10);
    const t2 = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onRemove(toast.id), 350);
    }, 3000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [toast.id, onRemove]);

  const borderColor =
    toast.type === "success"
      ? "rgba(52,211,153,0.3)"
      : toast.type === "error"
        ? "rgba(248,113,113,0.3)"
        : "rgba(108,99,255,0.3)";

  return (
    <div
      style={{
        background: "var(--surface2)",
        border: `1px solid ${borderColor}`,
        backdropFilter: "blur(20px)",
        borderRadius: "14px",
        padding: "14px 20px",
        fontSize: "0.88rem",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        maxWidth: "320px",
        boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
        color: "var(--text)",
        transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        transform: visible ? "translateY(0)" : "translateY(100px)",
        opacity: visible ? 1 : 0,
      }}
    >
      {toast.message}
    </div>
  );
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onRemove: (id: number) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onRemove={onRemove} />
      ))}
    </div>
  );
}
