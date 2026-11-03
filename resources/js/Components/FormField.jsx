// Reusable wrapper: label + input (children) + validation error shown BESIDE (under) the field.
export default function FormField({ label, htmlFor, error, required = false, hint, children }) {
    return (
        <div className="mb-6">
            <label htmlFor={htmlFor} className="mb-2 block text-[0.65rem] uppercase tracking-[3px] text-dim">
                {label} {required && <span className="text-crimson">*</span>}
            </label>
            {children}
            {error ? (
                <p role="alert" className="mt-2 text-xs text-crimson">
                    {error}
                </p>
            ) : (
                hint && <p className="mt-2 text-[0.7rem] text-dim">{hint}</p>
            )}
        </div>
    );
}

// Shared input styling; the border turns red when the field has an error.
export const inputClass = (error) =>
    `w-full border bg-night px-4 py-3 text-[0.82rem] text-ink outline-none transition-colors duration-300 focus:border-gold ${
        error ? 'border-crimson' : 'border-edge'
    }`;
