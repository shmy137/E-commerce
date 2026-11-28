import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CircleAlert, CircleCheck, X } from "lucide-react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const dismissToast = useCallback(() => setToast(null), []);
  const showToast = useCallback((type, message) => {
    setToast({ type, message, id: Date.now() });
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(dismissToast, 3500);
    return () => window.clearTimeout(timer);
  }, [toast, dismissToast]);

  const isError = toast?.type === "error";

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {toast && (
        <div
          key={toast.id}
          role={isError ? "alert" : "status"}
          aria-live={isError ? "assertive" : "polite"}
          className={`fixed right-4 top-20 z-[100] flex w-[min(24rem,calc(100vw-2rem))] items-center gap-3 rounded-lg border bg-white px-4 py-3 text-sm shadow-lg ${
            isError
              ? "border-red-200 text-red-800"
              : "border-green-200 text-green-800"
          }`}
        >
          {isError ? (
            <CircleAlert size={19} className="shrink-0" aria-hidden="true" />
          ) : (
            <CircleCheck size={19} className="shrink-0" aria-hidden="true" />
          )}
          <span className="flex-1">{toast.message}</span>
          <button
            type="button"
            onClick={dismissToast}
            aria-label="Dismiss notification"
            className="rounded p-1 opacity-70 transition hover:bg-black/5 hover:opacity-100"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const showToast = useContext(ToastContext);
  if (!showToast) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return showToast;
}
