'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// Simulated page routes that would be prefetched
const ROUTES = [
  { path: '/linking-and-navigating/useRouter/router-prefetch/products/1', name: 'Premium Headphones' },
  { path: '/linking-and-navigating/useRouter/router-prefetch/products/2', name: 'Wireless Keyboard' },
  { path: '/linking-and-navigating/useRouter/router-prefetch/products/3', name: 'Ultra HD Monitor' },
  { path: '/linking-and-navigating/useRouter/router-prefetch/products/4', name: 'Ergonomic Mouse' },
  { path: '/linking-and-navigating/useRouter/router-prefetch/products/5', name: 'Mechanical Keyboard' },
];

export default function RouterPrefetchDemo() {
  const router = useRouter();
  const [prefetchedRoutes, setPrefetchedRoutes] = useState<string[]>([]);
  const [hoverHistory, setHoverHistory] = useState<string[]>([]);
  const [manualPrefetch, setManualPrefetch] = useState<string | null>(null);
  const [prefetchStatus, setPrefetchStatus] = useState<'idle' | 'loading' | 'complete'>('idle');

  // Function to manually prefetch a specific route
  const handleManualPrefetch = (route: string): void => {
    setPrefetchStatus('loading');
    
    // Add to our prefetched routes list
    if (!prefetchedRoutes.includes(route)) {
      setPrefetchedRoutes(prev => [...prev, route]);
    }
    
    setManualPrefetch(route);
    
    // Use the router to prefetch the route
    router.prefetch(route);
    
    // Simulate prefetch completion (in a real app, we wouldn't need this timeout)
    setTimeout(() => {
      setPrefetchStatus('complete');
    }, 800);
  };

  // Function to handle mouse hover over a link
  const handleHover = (route: string): void => {
    // Record hover in history
    setHoverHistory(prev => [...prev, `Hovered over ${route} at ${new Date().toLocaleTimeString()}`]);
    
    // If not already prefetched, add to our list
    if (!prefetchedRoutes.includes(route)) {
      setPrefetchedRoutes(prev => [...prev, route]);
      
      // Use the router to prefetch the route
      router.prefetch(route);
    }
  };

  // Demonstrate automatic prefetching on component mount
  useEffect(() => {
    // Prefetch the first two routes automatically
    const routesToPrefetch = [ROUTES[0].path, ROUTES[1].path];
    
    routesToPrefetch.forEach(route => {
      if (!prefetchedRoutes.includes(route)) {
        router.prefetch(route);
        setPrefetchedRoutes(prev => [...prev, route]);
      }
    });
    
    setHoverHistory(prev => [
      ...prev, 
      `Auto-prefetched ${routesToPrefetch.join(', ')} on page load`
    ]);
  }, [router, prefetchedRoutes]);

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Next.js Router Prefetch Demo</h1>
      
      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">What is router.prefetch&#40;&#41;?</h2>
        <p className="mb-3">
          The <code className="bg-gray-100 px-1">router.prefetch&#40;&#41;</code> method allows you to 
          preload pages before the user navigates to them&#44; making subsequent navigation feel 
          instantaneous.
        </p>
        <div className="bg-white p-4 rounded border">
          <h3 className="font-medium mb-2">Benefits:</h3>
          <ul className="list-disc pl-5">
            <li>Faster page transitions</li>
            <li>Improved perceived performance</li>
            <li>Better user experience for predictable navigation paths</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-green-50 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">Product Navigation</h2>
        <p className="mb-1">Hover over links to trigger prefetching&#44; or click to navigate</p>
        <div className="bg-white p-4 rounded border mb-4 grid grid-cols-1 gap-2">
          {ROUTES.map((route) => (
            <div 
              key={route.path}
              className="flex justify-between items-center p-3 border rounded hover:bg-gray-50"
            >
              <Link 
                href={route.path}
                onMouseEnter={() => handleHover(route.path)}
                className="text-blue-600 hover:underline"
              >
                {route.name}
              </Link>
              
              <div className="flex items-center">
                {prefetchedRoutes.includes(route.path) && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded mr-2">
                    Prefetched
                  </span>
                )}
                <button
                  onClick={() => handleManualPrefetch(route.path)}
                  disabled={prefetchedRoutes.includes(route.path)}
                  className={`text-xs px-2 py-1 rounded ${
                    prefetchedRoutes.includes(route.path)
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                  }`}
                >
                  Prefetch
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-purple-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Manual Prefetch Status</h2>
          <div className="bg-white p-4 rounded border h-32">
            {manualPrefetch ? (
              <div>
                <p className="mb-2">
                  <strong>Route:</strong> {manualPrefetch}
                </p>
                <p className="mb-2">
                  <strong>Status:</strong>{' '}
                  {prefetchStatus === 'loading' ? (
                    <span className="text-yellow-600">Prefetching...</span>
                  ) : (
                    <span className="text-green-600">Ready for instant navigation</span>
                  )}
                </p>
                {prefetchStatus === 'complete' && (
                  <p className="text-sm text-gray-600">
                    The page is now cached and will load instantly when visited
                  </p>
                )}
              </div>
            ) : (
              <p className="text-gray-500">Click a &#34;Prefetch&#34; button to manually prefetch a route</p>
            )}
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Prefetch Log</h2>
          <div className="bg-white p-4 rounded border h-32 overflow-y-auto">
            {hoverHistory.length === 0 ? (
              <p className="text-gray-500">No prefetch activity yet</p>
            ) : (
              <ul className="list-disc pl-5">
                {hoverHistory.map((event, i) => (
                  <li key={i} className="mb-1 text-sm">{event}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}