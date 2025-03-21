'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons'


export default function Page(){

    const navigationEventsCode = `
// components/navigation-events.ts

'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // Import the styles

// Configure NProgress
NProgress.configure({ 
    showSpinner: false,
    minimum: 0.1,
    easing: 'ease',
    speed: 300
})

// Add custom styles for black color
const npProgressStyle = \`
    #nprogress .bar {
    background: var(--foreground) !important;
    height: 3px;
    }
    #nprogress .peg {
    box-shadow: 0 0 10px var(--foreground), 0 0 5px var(--foreground);
    }
\`

export function NavigationEvents() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    
    useEffect(() => {

    const styleElement = document.createElement('style')
    styleElement.innerHTML = npProgressStyle
    document.head.appendChild(styleElement)

    // Start the progress bar when component mounts
    NProgress.start()
    
    // Complete the progress bar when navigation is done
    const timer = setTimeout(() => {
        NProgress.done()
    }, 300)
    
    return () => {
        clearTimeout(timer)
        NProgress.remove()
    }
    }, [pathname, searchParams])
    
    return null
}
    `
    const layoutCode = `
// app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import './fontawesome';
import { Suspense } from 'react'
import { NavigationEvents } from '@/components/navigation-events'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Fundamentals Playground",
  description: "Learning Next.js fundamentals",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body
        className={\`\${geistSans.variable} \${geistMono.variable} antialiased p-[0_5%] pb-[100px]\`}
      >
        <main> {children}</main>
        <Suspense fallback={null}>
          <NavigationEvents />
        </Suspense>
      </body>
    </html>
  );
}

    `
      const [copied, setCopied] = useState({ ins1: false, ins2: false });

        const handleCopy = async (createSpecificEventReciever: string, index: number) => {
            try {
              await navigator.clipboard.writeText(createSpecificEventReciever)
              setCopied({ ...copied, [`ins${index}`]: true })
              setTimeout(() => setCopied({ ...copied, [`ins${index}`]: false }), 2000)
            } catch (err) {
              console.error('Failed to copy: ', err)
            }
    }
    
    return(
      <section className="w-full max-w-[850px] mx-auto pt-[50px] flex flex-col gap-y-[30px] ">
            <div>
                <h1 className="font-bold text-[2rem]">Router events</h1>      
                <hr className="border-b-[2px] border-[#222126]" />
            </div>

            <p className='flex items-center gap-x-[10px]'>
                <strong>forwardRef is a React function that allows a component to pass down a ref to one of its child elements. This is useful when you need direct access to a DOM element or a child component&apos;s instance.</strong>
            </p>

                 <div>
                    <p>
                        <strong>Example:</strong>
                    </p>
    
                    <div className='relative'>
                        <button className='flex gap-x-2 items-center text-[gray] absolute right-6 top-3' onClick={() => handleCopy(navigationEventsCode, 1)}>
                        <FontAwesomeIcon icon={copied.ins1 ? faCheck : faCopy} color='gray'/>
                        {copied.ins1 ? 'Copied!' : 'Copy'}
                        </button>
                        <SyntaxHighlighter language="javascript" style={oneDark}>
                            {navigationEventsCode}
                        </SyntaxHighlighter>
                    </div>
                </div>

            <p className='flex items-center gap-x-[10px]'>
                <strong>Which can be imported into a layout.</strong>
            </p>

            <div className='relative'>
                    <button className='flex gap-x-2 items-center text-[gray] absolute right-6 top-3' onClick={() => handleCopy(layoutCode, 2)}>
                        <FontAwesomeIcon icon={copied.ins2 ? faCheck : faCopy} color='gray'/>
                        {copied.ins2 ? 'Copied!' : 'Copy'}
                    </button>
                    <SyntaxHighlighter language="javascript" style={oneDark}>
                        {layoutCode}
                    </SyntaxHighlighter>  
            </div>

            <p>
                <strong>Output: </strong>
                Did you notice the bar line like loading at topmost of the page? It is a loading bar that is used to show the progress of the page.
                which comes from navigation-events and applied on layout.tsx &#40;note: that this page is using a nprogress bar dependency which is the loading bar, you can try
                different router event styles like topbar or react-spinners 
            </p>
            
        </section>
    )
}