// Delete confirmation modal.
export default function ConfirmDialog({ open, title, message, confirmLabel = 'Delete', processing = false, onConfirm, onCancel }) {
    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-200 flex items-center justify-center bg-black/70 px-4" role="dialog" aria-modal="true">
            <div className="w-full max-w-md border border-edge bg-panel p-8">
                <div className="mb-2 text-[0.65rem] uppercase tracking-[4px] text-crimson">Confirm</div>
                <h2 className="mb-3 font-display text-[2rem] tracking-[1px]">{title}</h2>
                <p className="mb-8 text-[0.82rem] leading-[1.7] text-dim">{message}</p>
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={processing}
                        className="cursor-pointer bg-crimson px-6 py-3 text-[0.72rem] uppercase tracking-[2px] text-white transition-opacity duration-300 hover:opacity-85 disabled:opacity-50"
                    >
                        {processing ? 'Deleting...' : confirmLabel}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="cursor-pointer border border-edge px-6 py-3 text-[0.72rem] uppercase tracking-[2px] text-dim transition-all duration-300 hover:border-gold hover:text-gold"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
