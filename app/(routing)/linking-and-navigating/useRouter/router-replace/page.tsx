'use client'

import { useRouter } from "next/navigation";

export default function Page() {

    const router = useRouter();

    return (
        <section className="w-full max-w-[850px] min-h-screen mx-auto flex flex-col items-center justify-center gap-y-[40px]">
            <h1 className="text-[clamp(1rem,3vw,2rem)]">&quot;Once you click the button below, you&apos;ll be teleported to the homepage—but there&apos;s no turning back. The last link is lost forever... because you&rsquo;re entering a black hole!&quot;</h1>
            <button onClick={() => router.replace("/")} className="bg-[#222126] text-white px-[20px] py-[10px]">Button</button>
        </section>
    )
        
}