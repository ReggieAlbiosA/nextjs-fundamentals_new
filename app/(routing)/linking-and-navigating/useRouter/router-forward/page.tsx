"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
    const router = useRouter();
    const [lastNavigationFailed, setLastNavigationFailed] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const navigationAttemptTime = useRef(0);
    
    useEffect(() => {
        // Set up a listener to detect when the location actually changes
        const handleLocationChange = () => {
            // If we detect location change within 500ms of navigation attempt, it was successful
            if (Date.now() - navigationAttemptTime.current < 500) {
                setLastNavigationFailed(false);
            }
        };
        
        window.addEventListener('popstate', handleLocationChange);
        
        return () => {
            window.removeEventListener('popstate', handleLocationChange);
        };
    }, []);
    
    const handleForward = () => {
        // Record the time of navigation attempt
        navigationAttemptTime.current = Date.now();
        
        // Try to navigate forward
        router.forward();
        
        // Start animation
        setIsAnimating(true);
        
        // After a short delay, if location didn't change, navigation failed
        setTimeout(() => {
            setIsAnimating(false);
            
            // If 300ms passed and no popstate event fired, navigation failed
            if (Date.now() - navigationAttemptTime.current > 300) {
                setLastNavigationFailed(true);
                
                // Reset the failure message after 3 seconds
                setTimeout(() => {
                    setLastNavigationFailed(false);
                }, 3000);
            }
        }, 300);
    };

    return (
        <section className="w-full max-w-[850px] min-h-screen mx-auto flex flex-col items-center justify-center gap-y-[40px]">
            <h1>
                Click below to navigate! If there&apos;s no next page, you&apos;re at the
                end of the timeline.
            </h1>
            <div className="flex flex-col items-center gap-4">
                <button
                    onClick={handleForward}
                    className={`${isAnimating ? "fast-beep": ""} bg-[#222126] text-white px-4 py-2 disabled:opacity-50`}
                >
                    Go Forward
                </button>
                {lastNavigationFailed && (
                    <>
                    <p className="text-red-500">No forward history available. You&apos;re at the last page.</p>
                    <Link className="bg-[#222126] text-white px-4 py-2 disabled:opacity-50" href="/linking-and-navigating/useRouter/router-forward/test">Click here to go forward</Link>
                    </>
                )}

            </div>
        </section>
    );
}