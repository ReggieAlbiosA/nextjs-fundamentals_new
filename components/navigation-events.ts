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
const npProgressStyle = `
  #nprogress .bar {
    background: var(--foreground) !important;
    height: 3px;
  }
  #nprogress .peg {
    box-shadow: 0 0 10px var(--foreground), 0 0 5px var(--foreground);
  }
`

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