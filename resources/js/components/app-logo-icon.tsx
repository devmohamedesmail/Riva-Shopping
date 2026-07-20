import { usePage } from '@inertiajs/react';
import type { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
   const {settings}:any = usePage().props
    return (
        <div>
            <img src={settings?.logo} alt={settings?.name_ar} />
        </div>
    );
}
