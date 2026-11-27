function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Go back",
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-background p-6 shadow-xl">
        <h2 className="text-xl font-bold text-primary">{title}</h2>

        <p className="mt-3 text-sm leading-6 text-primary/60">{message}</p>

        <div className="mt-7 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-lg border border-primary/20 px-5 py-2.5 text-sm font-semibold text-primary"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
