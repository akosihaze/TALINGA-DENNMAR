import { tickerItems } from '../data/portfolio';

export default function Ticker() {
    // The list is rendered twice so the -50% animation loops without a gap.
    const items = [...tickerItems, ...tickerItems];

    return (
        <div className="overflow-hidden border-y border-edge bg-night2 py-3.5">
            <div className="flex w-max animate-ticker gap-12 whitespace-nowrap text-[0.65rem] uppercase tracking-[3px] text-dim">
                {items.map((item, index) => (
                    <div key={index} className="flex gap-12">
                        <span className="text-gold">★</span>
                        <span>{item}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
