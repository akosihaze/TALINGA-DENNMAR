import { Link, useForm } from '@inertiajs/react';
import { useEffect, useMemo } from 'react';
import FormField, { inputClass } from './FormField';

const today = () => new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD (local time)

/**
 * Reusable form used by BOTH Projects/Create and Projects/Edit.
 * - project === null  -> create mode (POST /projects)
 * - project !== null  -> edit mode   (PUT  /projects/{id})
 */
export default function ProjectForm({ project = null, categories }) {
    const isEdit = project !== null;

    const { data, setData, post, processing, errors, transform } = useForm({
        title: project?.title ?? '',
        category: project?.category ?? '',
        description: project?.description ?? '',
        tools: project?.tools ?? '',
        project_url: project?.project_url ?? '',
        date_completed: project?.date_completed ?? today(),
        image: null,
    });

    // Preview of the newly chosen image (falls back to the current image when editing)
    const preview = useMemo(() => (data.image ? URL.createObjectURL(data.image) : project?.image_url ?? null), [data.image, project]);

    useEffect(() => {
        return () => {
            if (data.image && preview) URL.revokeObjectURL(preview);
        };
    }, [data.image, preview]);

    function submit(e) {
        e.preventDefault();

        // Browsers cannot send files with a real PUT, so we POST and spoof the method for Laravel.
        transform((formData) => (isEdit ? { ...formData, _method: 'put' } : formData));

        post(isEdit ? `/projects/${project.id}` : '/projects', {
            forceFormData: true, // needed for the image upload
            preserveScroll: true,
        });
    }

    return (
        <form onSubmit={submit} noValidate className="border border-edge bg-panel p-10 max-[600px]:p-5">
            <FormField label="Title" htmlFor="title" error={errors.title} required>
                <input
                    id="title"
                    type="text"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    placeholder="Enter project title"
                    className={inputClass(errors.title)}
                />
            </FormField>

            <FormField label="Category" htmlFor="category" error={errors.category} required>
                <select
                    id="category"
                    value={data.category}
                    onChange={(e) => setData('category', e.target.value)}
                    className={inputClass(errors.category)}
                >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </FormField>

            <FormField label="Description" htmlFor="description" error={errors.description} required hint="20 to 500 characters.">
                <textarea
                    id="description"
                    rows={5}
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    placeholder="Describe this project..."
                    className={`${inputClass(errors.description)} resize-y`}
                />
            </FormField>

            <FormField label="Tools Used" htmlFor="tools" error={errors.tools} hint="Example: Photoshop, Premiere Pro">
                <input
                    id="tools"
                    type="text"
                    value={data.tools}
                    onChange={(e) => setData('tools', e.target.value)}
                    placeholder="Photoshop, After Effects"
                    className={inputClass(errors.tools)}
                />
            </FormField>

            <FormField label="Project URL" htmlFor="project_url" error={errors.project_url}>
                <input
                    id="project_url"
                    type="text"
                    value={data.project_url}
                    onChange={(e) => setData('project_url', e.target.value)}
                    placeholder="https://example.com/my-project"
                    className={inputClass(errors.project_url)}
                />
            </FormField>

            <FormField label="Date Completed" htmlFor="date_completed" error={errors.date_completed} required>
                <input
                    id="date_completed"
                    type="date"
                    value={data.date_completed}
                    onChange={(e) => setData('date_completed', e.target.value)}
                    className={inputClass(errors.date_completed)}
                />
            </FormField>

            <FormField
                label="Cover Image"
                htmlFor="image"
                error={errors.image}
                hint={isEdit ? 'Leave empty to keep the current image. JPG, PNG or WEBP, max 2 MB.' : 'JPG, PNG or WEBP, max 2 MB.'}
            >
                <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setData('image', e.target.files[0] ?? null)}
                    className={`${inputClass(errors.image)} cursor-pointer !py-2`}
                />
                {preview && (
                    <img src={preview} alt="Preview" className="mt-3 h-28 w-44 border border-edge object-cover" />
                )}
            </FormField>

            <div className="mt-8 flex gap-3">
                <button
                    type="submit"
                    disabled={processing}
                    className="cursor-pointer border-0 bg-gold px-8 py-3 font-display text-base tracking-[3px] text-night transition-opacity duration-300 hover:opacity-85 disabled:opacity-50"
                >
                    {processing ? 'Saving...' : isEdit ? 'Update Project' : 'Save Project'}
                </button>
                <Link
                    href="/projects"
                    className="inline-flex items-center border border-edge px-6 py-3 text-[0.72rem] uppercase tracking-[2px] text-dim no-underline transition-all duration-300 hover:border-gold hover:text-gold"
                >
                    Cancel
                </Link>
            </div>
        </form>
    );
}
