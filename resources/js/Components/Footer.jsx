import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="flex items-center justify-between border-t border-edge bg-night px-[60px] py-8 max-[900px]:flex-col max-[900px]:gap-4 max-[900px]:px-6 max-[900px]:text-center">
            <div className="font-display text-[1.4rem] tracking-[3px] text-gold">DENNMAR</div>
            <div className="text-[0.7rem] tracking-[1px] text-dim">&copy; 2026 Dennmar. All rights reserved.</div>
            <div>
                <Link
                    href="/projects"
                    className="border border-edge px-3.5 py-1.5 text-[0.65rem] uppercase tracking-[2px] text-dim no-underline transition-all duration-300 hover:border-gold hover:text-gold"
                >
                    Admin Panel
                </Link>
            </div>
        </footer>
    );
}
