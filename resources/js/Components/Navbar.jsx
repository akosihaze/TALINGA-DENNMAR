import { navLinks } from '../data/portfolio';

export default function Navbar() {
    return (
        <nav className="fixed inset-x-0 top-0 z-100 flex items-center justify-between bg-linear-to-b from-night/95 to-transparent px-[60px] py-5 backdrop-blur-[4px] max-[900px]:px-6 max-[900px]:py-4">
            <div className="font-display text-[1.6rem] tracking-[3px] text-gold">DENNMAR</div>
            <ul className="flex list-none gap-8 max-[600px]:gap-4">
                {navLinks.map((link) => (
                    <li key={link.href}>
                        <a
                            href={link.href}
                            className="text-xs uppercase tracking-[2px] text-dim no-underline transition-colors duration-300 hover:text-gold"
                        >
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
