import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Link Attribute: scroll",
  };

export default function Page(){
    return(

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
                            <Link href="#section1" className='hover:underline' replace scroll={true}>Section1</Link>
                        </li>
                        <li>
                            <Link href="#section2" className='hover:underline'  replace scroll={true}>Section2</Link>
                        </li>
                        <li> 
                            <Link href="#section3" className='hover:underline'  replace scroll={true}>Section3</Link>
                        </li>
                    </ul>
                </nav>
            </header>

            <div>
                <section id="section1" className="min-h-screen  grid place-items-center bg-red-200">
                    <p>This is section 1</p>
                </section>
                <section id="section2" className="min-h-screen  grid place-items-center bg-blue-200">
                    <p>This is section 2</p>
                </section>
                <section id="section3" className="min-h-screen grid place-items-center bg-green-200">
                    <p>This is section 3</p>
                </section>
            </div>
        </section>
        </>
    )
}
