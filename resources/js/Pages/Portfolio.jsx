import { Head, Link } from '@inertiajs/react';
import ContactSection from '../Components/ContactSection';
import Footer from '../Components/Footer';
import Hero from '../Components/Hero';
import Navbar from '../Components/Navbar';
import ProjectCard from '../Components/ProjectCard';
import SectionTitle from '../Components/SectionTitle';
import SkillCard from '../Components/SkillCard';
import Ticker from '../Components/Ticker';
import { skills, tools } from '../data/portfolio';

// Public portfolio page. "projects" comes from PortfolioController (database).
export default function Portfolio({ projects }) {
    return (
        <>
            <Head title="Creative Portfolio" />
            <Navbar />
            <Hero />
            <Ticker />

            {/* SKILLS (static) */}
            <section id="skills" className="bg-night2 px-[60px] py-[100px] max-[900px]:px-6 max-[900px]:py-[60px]">
                <SectionTitle label="What I Do">MY SKILLS</SectionTitle>
                <div className="grid grid-cols-3 gap-0.5 max-[900px]:grid-cols-1">
                    {skills.map((skill, index) => (
                        <SkillCard key={skill.name} number={String(index + 1).padStart(2, '0')} {...skill} />
                    ))}
                </div>
                <div className="mt-[60px] flex flex-wrap items-center gap-3">
                    <span className="mr-2 text-[0.65rem] uppercase tracking-[3px] text-dim">Tools:</span>
                    {tools.map((tool) => (
                        <span key={tool} className="border border-edge px-4 py-1.5 text-[0.65rem] uppercase tracking-[2px] text-dim">
                            {tool}
                        </span>
                    ))}
                </div>
            </section>

            {/* PROJECTS (dynamic - from the database) */}
            <section id="projects" className="bg-night px-[60px] py-[100px] max-[900px]:px-6 max-[900px]:py-[60px]">
                <SectionTitle label="Selected Work">MY PROJECTS</SectionTitle>
                <div className="grid grid-cols-3 gap-5 max-[900px]:grid-cols-1">
                    {projects.length === 0 ? (
                        <div className="col-span-full py-[60px] text-center text-[0.82rem] tracking-[2px] text-dim">
                            No projects yet.{' '}
                            <Link href="/projects/create" className="text-gold">
                                Add your first project →
                            </Link>
                        </div>
                    ) : (
                        projects.map((project) => <ProjectCard key={project.id} project={project} />)
                    )}
                </div>
            </section>

            <ContactSection />
            <Footer />
        </>
    );
}
