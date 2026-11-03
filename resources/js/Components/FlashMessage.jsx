import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

// Shows the success message flashed by the controller (create / update / delete).
export default function FlashMessage() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(Boolean(flash?.success));

    useEffect(() => {
        setVisible(Boolean(flash?.success));

        if (flash?.success) {
            const timer = setTimeout(() => setVisible(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    if (!visible || !flash?.success) {
        return null;
    }

    return (
        <div
            role="status"
            className="mb-6 flex items-center justify-between border-l-[3px] border-gold bg-gold/8 px-5 py-3 text-[0.78rem] tracking-[1px] text-gold"
        >
            <span>{flash.success}</span>
            <button type="button" onClick={() => setVisible(false)} className="cursor-pointer text-gold" aria-label="Dismiss">
                ✕
            </button>
        </div>
    );
}
