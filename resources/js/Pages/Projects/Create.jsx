import ProjectForm from '../../Components/ProjectForm';
import AdminLayout from '../../Layouts/AdminLayout';

export default function Create({ categories }) {
    return (
        <AdminLayout title="New Project" maxWidth="max-w-[780px]" back={{ href: '/projects', label: '← Back to Projects' }}>
            <div className="mb-1.5 text-[0.65rem] uppercase tracking-[4px] text-gold">Project Management</div>
            <h1 className="mb-10 font-display text-5xl">NEW PROJECT</h1>
            <ProjectForm categories={categories} />
        </AdminLayout>
    );
}
