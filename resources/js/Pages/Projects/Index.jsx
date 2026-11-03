import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import ConfirmDialog from '../../Components/ConfirmDialog';
import { inputClass } from '../../Components/FormField';
import Pagination from '../../Components/Pagination';
import AdminLayout from '../../Layouts/AdminLayout';

export default function Index({ projects, filters, categories }) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [category, setCategory] = useState(filters.category ?? '');
    const [toDelete, setToDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);

    function applyFilters(next) {
        const params = { search, category, ...next };
        const clean = Object.fromEntries(Object.entries(params).filter(([, value]) => value));

        router.get('/projects', clean, { preserveState: true, replace: true });
    }

    function confirmDelete() {
        setDeleting(true);

        router.delete(`/projects/${toDelete.id}`, {
            preserveScroll: true,
            onFinish: () => {
                setDeleting(false);
                setToDelete(null);
            },
        });
    }

    return (
        <AdminLayout title="Projects">
            <div className="mb-8 flex items-end justify-between gap-4 max-[600px]:flex-col max-[600px]:items-start">
                <div>
                    <div className="mb-1.5 text-[0.65rem] uppercase tracking-[4px] text-gold">Project Management</div>
                    <h1 className="font-display text-5xl">ALL PROJECTS</h1>
                </div>
                <Link
                    href="/projects/create"
                    className="inline-flex items-center bg-crimson px-6 py-2.5 text-[0.72rem] uppercase tracking-[2px] text-white no-underline transition-opacity duration-300 hover:opacity-85"
                >
                    + New Project
                </Link>
            </div>

            {/* Search + filter */}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    applyFilters({});
                }}
                className="mb-6 flex flex-wrap gap-3"
            >
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by title..."
                    className={`${inputClass(false)} !w-64`}
                />
                <select
                    value={category}
                    onChange={(e) => {
                        setCategory(e.target.value);
                        applyFilters({ category: e.target.value });
                    }}
                    className={`${inputClass(false)} !w-52`}
                >
                    <option value="">All categories</option>
                    {categories.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
                <button
                    type="submit"
                    className="cursor-pointer border border-edge px-5 py-2 text-[0.7rem] uppercase tracking-[2px] text-dim transition-all duration-300 hover:border-gold hover:text-gold"
                >
                    Search
                </button>
            </form>

            <div className="overflow-x-auto border border-edge bg-panel">
                {projects.data.length === 0 ? (
                    <div className="p-20 text-center text-[0.82rem] tracking-[2px] text-dim">
                        No projects found.{' '}
                        <Link href="/projects/create" className="text-gold">
                            Create a project →
                        </Link>
                    </div>
                ) : (
                    <table className="w-full border-collapse">
                        <thead className="bg-night2">
                            <tr>
                                {['ID', 'Image', 'Title', 'Category', 'Date', 'Actions'].map((heading) => (
                                    <th
                                        key={heading}
                                        className="border-b border-edge px-5 py-3.5 text-left text-[0.65rem] font-normal uppercase tracking-[3px] text-dim"
                                    >
                                        {heading}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {projects.data.map((project) => (
                                <tr key={project.id} className="hover:bg-gold/3">
                                    <td className="w-[50px] border-b border-edge px-5 py-4 text-xs text-dim">{project.id}</td>
                                    <td className="border-b border-edge px-5 py-4">
                                        {project.image_url ? (
                                            <img src={project.image_url} alt="" className="block h-10 w-14 border border-edge object-cover" />
                                        ) : (
                                            <div className="flex h-10 w-14 items-center justify-center border border-edge bg-night2 text-[0.55rem] text-dim">
                                                No img
                                            </div>
                                        )}
                                    </td>
                                    <td className="border-b border-edge px-5 py-4">
                                        <div className="text-[0.82rem] font-medium">{project.title}</div>
                                        <div className="mt-1 max-w-[300px] text-[0.72rem] leading-normal text-dim">
                                            {project.description.length > 80 ? `${project.description.slice(0, 80)}...` : project.description}
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap border-b border-edge px-5 py-4 text-xs text-gold">{project.category}</td>
                                    <td className="whitespace-nowrap border-b border-edge px-5 py-4 text-xs text-dim">{project.date_completed}</td>
                                    <td className="border-b border-edge px-5 py-4">
                                        <div className="flex gap-2">
                                            <Link
                                                href={`/projects/${project.id}/edit`}
                                                className="border border-gold px-4 py-1.5 text-[0.65rem] uppercase tracking-[2px] text-gold no-underline transition-all duration-300 hover:bg-gold hover:text-night"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => setToDelete(project)}
                                                className="cursor-pointer border border-crimson px-4 py-1.5 text-[0.65rem] uppercase tracking-[2px] text-crimson transition-all duration-300 hover:bg-crimson hover:text-white"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <Pagination links={projects.links} />

            <ConfirmDialog
                open={toDelete !== null}
                title="Delete this project?"
                message={`"${toDelete?.title ?? ''}" will be permanently removed from the database and from your public portfolio.`}
                processing={deleting}
                onConfirm={confirmDelete}
                onCancel={() => setToDelete(null)}
            />
        </AdminLayout>
    );
}
