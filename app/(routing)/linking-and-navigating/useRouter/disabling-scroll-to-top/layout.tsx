'use client';

import { useRouter } from "next/navigation";
 

export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    return (
        <>

        <style>
            {`
            body{
                padding: 0px !important;
            }
            `}
        </style>
        
            <section>
                <header className='bg-[#222126] min-h-[65px] flex items-center sticky top-0'>
                    <nav className='ml-[20%]'>
                        <ul className='flex gap-x-[15px] items-center text-white'>
                            <li>
                                <button onClick={() => router.push("/linking-and-navigating/useRouter/disabling-scroll-to-top/with-scroll#section3", { scroll: true })}>With Scroll</button>
                            </li>
                            <li>
                                <button onClick={() => router.push("/linking-and-navigating/useRouter/disabling-scroll-to-top/without-scroll#section3", { scroll: false })}>Without Scroll</button>
                            </li>
                        </ul>
                    </nav>
                </header>

                <div>
                    {children}
                </div>
            </section>
        </>
    );
}