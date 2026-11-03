import SectionTitle from './SectionTitle';

const labelClass = 'text-[0.65rem] uppercase tracking-[3px] text-dim';
const fieldClass =
    'border border-edge bg-panel px-4 py-3 font-sans text-[0.82rem] text-ink outline-none transition-colors duration-300 focus:border-gold';

export default function ContactSection() {
    return (
        <section id="contact" className="bg-night2 px-[60px] py-[100px] max-[900px]:px-6 max-[900px]:py-[60px]">
            <SectionTitle label="Get In Touch">CONTACT</SectionTitle>
            <div className="grid grid-cols-2 items-center gap-20 max-[900px]:grid-cols-1">
                <div>
                    <p className="mb-8 text-[0.82rem] leading-[1.9] text-dim">
                        Looking to collaborate or have a project in mind? Feel free to reach out — I'd love to hear from
                        you and bring your creative vision to life.
                    </p>
                    {[
                        ['Email', 'dennmar@email.com'],
                        ['Location', 'Philippines'],
                        ['Available', 'Freelance & Projects'],
                    ].map(([label, value]) => (
                        <div key={label} className="mb-4 flex items-center gap-4">
                            <span className="min-w-20 text-[0.65rem] uppercase tracking-[3px] text-gold">{label}</span>
                            <span className="text-[0.82rem] text-ink">{value}</span>
                        </div>
                    ))}
                </div>

                <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="flex flex-col gap-1.5">
                        <label className={labelClass}>Name</label>
                        <input type="text" placeholder="Your name" className={fieldClass} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className={labelClass}>Email</label>
                        <input type="email" placeholder="your@email.com" className={fieldClass} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className={labelClass}>Message</label>
                        <textarea rows={5} placeholder="Tell me about your project..." className={`${fieldClass} resize-none`} />
                    </div>
                    <button className="cursor-pointer self-start border-0 bg-gold px-8 py-3.5 font-display text-base tracking-[3px] text-night transition-opacity duration-300 hover:opacity-85">
                        Send Message
                    </button>
                </form>
            </div>
        </section>
    );
}
