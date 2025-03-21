'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface ServerData {
  timestamp: string;
  randomValue: number;
}

export default function RouterRefreshDemo() {
  const router = useRouter();
  const [count, setCount] = useState<number>(0);
  const [lastRefresh, setLastRefresh] = useState<string | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  // Simulated data that would normally come from a server component
  const [serverData, setServerData] = useState<ServerData>({
    timestamp: new Date().toLocaleTimeString(),
    randomValue: Math.floor(Math.random() * 100)
  });

  // Function to demonstrate router.refresh()
  const handleRefresh = (): void => {
    // Log when refresh was triggered
    const refreshTime = new Date().toLocaleTimeString();
    setLastRefresh(refreshTime);
    
    // Add a message to our log
    setMessages(prev => [...prev, `Manual refresh triggered at ${refreshTime}`]);
    
    // This will re-execute all server components in the current route
    // without doing a full page navigation
    router.refresh();
    
    // Update our simulated server data
    // In a real app, this would be fetched fresh from the server
    setServerData({
      timestamp: new Date().toLocaleTimeString(),
      randomValue: Math.floor(Math.random() * 100)
    });
  };

  // Demonstrate that client state is preserved across refreshes
  const incrementCount = (): void => {
    setCount(prev => prev + 1);
    setMessages(prev => [...prev, `Count incremented to ${count + 1} at ${new Date().toLocaleTimeString()}`]);
  };

  // Simulate an automatic refresh every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const autoRefreshTime = new Date().toLocaleTimeString();
      setLastRefresh(autoRefreshTime);
      setMessages(prev => [...prev, `Auto refresh at ${autoRefreshTime}`]);
      
      router.refresh();
      
      setServerData({
        timestamp: new Date().toLocaleTimeString(),
        randomValue: Math.floor(Math.random() * 100)
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Next.js Router Refresh Demo</h1>
      
      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">Simulated Server Data</h2>
        <p className="mb-1">This would normally come from a server component and be re-fetched on router.refresh()</p>
        <div className="bg-white p-4 rounded border">
          <p><strong>Timestamp:</strong> {serverData.timestamp}</p>
          <p><strong>Random Value:</strong> {serverData.randomValue}</p>
        </div>
      </div>
      
      <div className="bg-green-50 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">Client State</h2>
        <p className="mb-1">This state is preserved across router.refresh() calls</p>
        <div className="bg-white p-4 rounded border mb-4">
          <p><strong>Count:</strong> {count}</p>
          <button 
            onClick={incrementCount}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Increment Count
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <button 
          onClick={handleRefresh} 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Trigger router.refresh()
        </button>
        {lastRefresh && (
          <p className="mt-2 text-sm text-gray-600">Last refreshed at: {lastRefresh}</p>
        )}
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Activity Log</h2>
        <div className="bg-white p-4 rounded border h-48 overflow-y-auto">
          {messages.length === 0 ? (
            <p className="text-gray-500">No activity yet</p>
          ) : (
            <ul className="list-disc pl-5">
              {messages.map((msg, i) => (
                <li key={i} className="mb-1 text-sm">{msg}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}