export default function SkillCard({ number, name, sub, items }) {
    return (
        <div className="relative overflow-hidden border border-edge bg-panel px-8 py-10 transition duration-300 before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:origin-left before:scale-x-0 before:bg-gold before:transition-transform before:duration-400 before:content-[''] hover:-translate-y-1 hover:border-gold hover:before:scale-x-100">
            <div className="absolute right-5 top-5 font-display text-[4rem] leading-none text-gold/8">{number}</div>
            <div className="mb-1.5 font-display text-[1.6rem] tracking-[2px]">{name}</div>
            <div className="mb-5 font-serif text-[0.78rem] italic text-gold">{sub}</div>
            <ul className="list-none">
                {items.map((item) => (
                    <li key={item} className="border-b border-edge py-[5px] text-[0.78rem] leading-normal text-dim last:border-b-0">
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}
