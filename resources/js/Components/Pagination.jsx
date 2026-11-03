import { Link } from '@inertiajs/react';

// Renders the "links" array that Laravel's paginate() sends.
export default function Pagination({ links }) {
    if (!links || links.length <= 3) {
        return null;
    }

    return (
        <nav className="mt-6 flex flex-wrap gap-2" aria-label="Pagination">
            {links.map((link, index) => {
                const base = 'border px-3.5 py-2 text-[0.7rem] tracking-[1px] transition-all duration-300';

                if (!link.url) {
                    return (
                        <span
                            key={index}
                            className={`${base} border-edge text-dim/50`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    );
                }

                return (
                    <Link
                        key={index}
                        href={link.url}
                        preserveScroll
                        className={`${base} ${
                            link.active ? 'border-gold bg-gold text-night' : 'border-edge text-dim hover:border-gold hover:text-gold'
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                );
            })}
        </nav>
    );
}
