import { Head, Link } from '@inertiajs/react';
import FlashMessage from '../Components/FlashMessage';

// Shared shell for the management pages (Index, Create, Edit).
export default function AdminLayout({ title, back, maxWidth = 'max-w-[1100px]', children }) {
    return (
        <div className="min-h-screen bg-night">
            <Head title={title} />

            <header className="flex items-center justify-between border-b border-edge bg-night2 px-12 py-6 max-[600px]:px-4">
                <div>
                    <div className="font-display text-[1.4rem] tracking-[3px] text-gold">DENNMAR</div>
                    <div className="mt-0.5 text-[0.65rem] uppercase tracking-[3px] text-dim">Project Management</div>
                </div>
                <Link
                    href={back?.href ?? '/'}
                    className="border border-edge px-4 py-2 text-[0.65rem] uppercase tracking-[2px] text-dim no-underline transition-all duration-300 hover:border-gold hover:text-gold"
                >
                    {back?.label ?? '← View Portfolio'}
                </Link>
            </header>

            <main className={`mx-auto p-12 max-[600px]:p-4 ${maxWidth}`}>
                <FlashMessage />
                {children}
            </main>
        </div>
    );
}
