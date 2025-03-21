import  { CheckingActiveLinks, PathDisplay }  from '@/components/CheckingActiveLinks';

const navLinks = [
  { name: 'Home', href: '/linking-and-navigating/Link/checking-active-links' },
  { name: 'About', href: '/linking-and-navigating/Link/checking-active-links/about' },
  { name: 'Services', href: '/linking-and-navigating/Link/checking-active-links/services' },
  { name: 'Blog', href: '/linking-and-navigating/Link/checking-active-links/blog' },
  { name: 'Contact', href: '/linking-and-navigating/Link/checking-active-links/contact' }
];

export default async function Layout({ children }: { children: React.ReactNode }) {

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
            <nav className="p-4 bg-white shadow rounded-lg">
            <div className="flex flex-wrap gap-x-6 gap-y-2 w-max mx-auto">
          
                <CheckingActiveLinks links={navLinks} 
                                     activeStyling={{ active: 'bg-blue-500 text-white font-medium',
                                                      notActive: 'text-gray-700 hover:bg-gray-100' }}
                                     className='p-2 rounded-md'
                                     replace/>

            </div>
            
            <div className="mt-6 p-4 bg-gray-100 rounded-md w-max mx-auto">
                <h2 className="font-medium mb-2">Current Path:</h2>
                <code className="bg-gray-800 text-white p-2 rounded-md block"><PathDisplay /></code>
            </div>
            </nav>
        <div className='grid place-items-center text-[4rem] font-bold mt-[200px]'>{children}</div>
    </section>
    </>
    );
}