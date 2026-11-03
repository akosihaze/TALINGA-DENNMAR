// Small label + big title used by every section of the portfolio.
export default function SectionTitle({ label, children }) {
    return (
        <>
            <div className="mb-3 text-[0.65rem] uppercase tracking-[4px] text-gold">{label}</div>
            <h2 className="mb-[60px] font-display text-[clamp(3rem,6vw,5rem)] leading-none">{children}</h2>
        </>
    );
}
