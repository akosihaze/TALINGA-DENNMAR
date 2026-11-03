export default function Hero() {
    return (
        <section
            id="home"
            className="relative grid min-h-screen grid-cols-3 items-center overflow-hidden px-[60px] max-[900px]:grid-cols-1 max-[900px]:px-6 max-[900px]:py-20 max-[900px]:text-center"
        >
            <div
                className="absolute inset-0"
                style={{
                    background:
                        'radial-gradient(ellipse at 60% 50%, rgba(200,169,110,0.06) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(230,57,70,0.04) 0%, transparent 50%)',
                }}
            />

            {/* LEFT */}
            <div className="relative animate-fade-up">
                <div className="mb-4 flex items-center gap-3 text-[0.7rem] uppercase tracking-[4px] text-dim before:h-px before:w-8 before:bg-gold before:content-[''] max-[900px]:justify-center">
                    Hi, I'm
                </div>
                <h1 className="font-display text-[clamp(4rem,8vw,7rem)] leading-[0.9] tracking-[2px]">DENNMAR</h1>
                <p className="mt-5 font-serif text-base italic text-dim">Creative Photo &amp; Video Editor</p>
                <div className="mt-8 flex gap-2 max-[900px]:justify-center">
                    <div className="size-2 rounded-full bg-crimson" />
                    <div className="size-2 rounded-full bg-gold" />
                    <div className="size-2 rounded-full bg-edge" />
                </div>
            </div>

            {/* CENTER PHOTO */}
            <div className="relative flex h-[80vh] items-end justify-center animate-fade-up [animation-delay:200ms] max-[900px]:h-[400px]">
                <div className="absolute h-[520px] w-[340px] translate-x-3 translate-y-3 border border-gold/20 max-[900px]:h-[400px] max-[900px]:w-[260px]" />
                <div className="relative border border-edge">
                    <img
                        src="/assets/dennmar-photo.jpg"
                        alt="Dennmar"
                        className="block h-[520px] w-[340px] object-cover contrast-[1.05] grayscale-[20%] max-[900px]:h-[400px] max-[900px]:w-[260px]"
                    />
                </div>
            </div>

            {/* RIGHT */}
            <div className="relative pl-10 animate-fade-up [animation-delay:400ms] max-[900px]:mt-10 max-[900px]:pl-0">
                <div className="mb-8 flex flex-wrap gap-2 max-[900px]:justify-center">
                    <a
                        href="#skills"
                        className="border border-edge px-5 py-2 text-[0.7rem] uppercase tracking-[2px] text-dim no-underline transition-all duration-300 hover:border-gold hover:text-gold"
                    >
                        Skills
                    </a>
                    <a
                        href="#projects"
                        className="border border-edge px-5 py-2 text-[0.7rem] uppercase tracking-[2px] text-dim no-underline transition-all duration-300 hover:border-gold hover:text-gold"
                    >
                        Projects
                    </a>
                    <a
                        href="#contact"
                        className="border border-edge px-5 py-2 text-[0.7rem] uppercase tracking-[2px] text-dim no-underline transition-all duration-300 hover:border-gold hover:text-gold"
                    >
                        Contact
                        <span className="ml-1.5 inline-block size-1.5 rounded-full bg-gold align-middle" />
                    </a>
                </div>
                <p className="max-w-[320px] text-[0.82rem] leading-[1.8] text-dim max-[900px]:mx-auto">
                    I am a creative photo and video editor with a passion for turning raw footage and images into
                    visually compelling content. I focus on clean edits, strong storytelling, and polished visuals that
                    connect with audiences — bringing ideas to life through colour, motion, and detail.
                </p>
            </div>
        </section>
    );
}
