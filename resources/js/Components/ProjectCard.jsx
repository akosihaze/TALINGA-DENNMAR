// One project on the PUBLIC portfolio page (data comes from the database).
export default function ProjectCard({ project }) {
    const card = (
        <div className="group cursor-pointer overflow-hidden border border-edge bg-panel transition duration-300 hover:-translate-y-1.5 hover:border-gold">
            <div className="relative overflow-hidden">
                {project.image_url ? (
                    <img
                        src={project.image_url}
                        alt={project.title}
                        className="block h-[220px] w-full object-cover grayscale-[30%] transition duration-400 group-hover:scale-[1.04] group-hover:grayscale-0"
                    />
                ) : (
                    <div className="flex h-[220px] w-full items-center justify-center bg-linear-to-br from-[#1a1a1a] to-[#0f0f0f] text-[0.7rem] uppercase tracking-[2px] text-dim">
                        No Image
                    </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-night/60 text-[0.7rem] uppercase tracking-[3px] text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    View Project ↗
                </div>
            </div>
            <div className="p-6">
                <div className="mb-2 text-[0.6rem] uppercase tracking-[3px] text-gold">{project.category}</div>
                <div className="mb-2 font-display text-[1.2rem] tracking-[2px]">{project.title}</div>
                <div className="mb-4 text-xs leading-[1.7] text-dim">{project.description}</div>
                {project.tools && <div className="mb-3 text-[0.65rem] tracking-[1px] text-dim">{project.tools}</div>}
                <div className="text-[0.65rem] tracking-[2px] text-crimson">{project.date_completed}</div>
            </div>
        </div>
    );

    // If the project has a URL, the whole card links to it.
    return project.project_url ? (
        <a href={project.project_url} target="_blank" rel="noreferrer" className="block no-underline text-inherit">
            {card}
        </a>
    ) : (
        card
    );
}
