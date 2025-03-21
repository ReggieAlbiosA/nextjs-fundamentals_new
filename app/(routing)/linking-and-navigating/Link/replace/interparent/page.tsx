import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Link Attribute: replace",
  };

export default function Page(){
    return (
        <section className="w-full max-w-[1200px] min-h-screen flex items-center mx-auto">
                <h1 className="text-[clamp(1rem,3vw,2rem)] font-bold">Now click back from the browser tab left arrow button..with replace Attribute you will notice the last link you clicked is skipped with the current link resulting to go straight to the homepage</h1>
        </section>
    )
}