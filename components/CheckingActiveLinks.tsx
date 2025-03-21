'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';


interface Links {
    name: string;
    href: string;
}

interface ActiveStyling{
    active: string
    notActive: string
}

export function CheckingActiveLinks({ links, 
                                              activeStyling, 
                                              className='', 
                                              replace=false,
                                              prefetch=false,
                                              scroll=false }:

                                             { links: Links[],
                                               activeStyling: ActiveStyling,
                                               className?: string,
                                               replace?: boolean,
                                               prefetch?: boolean,
                                               scroll?: boolean }) {
    const pathname = usePathname();
    return (
        <>
            {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={`${className} ${
                                                    isActive
                                                        ? activeStyling.active
                                                        : activeStyling.notActive
                                                 }`}
                        replace={replace}
                        prefetch={prefetch}
                        scroll={scroll}
                    >
                        {link.name}
                    </Link>
                );
            })}
        </>
    );
}
export function PathDisplay() {
    const pathname = usePathname();
    return <span>{pathname}</span>
}