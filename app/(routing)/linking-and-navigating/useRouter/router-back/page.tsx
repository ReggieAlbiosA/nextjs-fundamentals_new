'use client'

import { useRouter } from "next/navigation";

export default function Page() {

    const router = useRouter();

    return (
        <section className="w-full max-w-[850px] min-h-screen mx-auto flex flex-col items-center justify-center gap-y-[40px]">
            <h1 className="text-[clamp(1rem,3vw,2rem)]">&quot;Click the button and you will Navigate backwards to the previous page in the browser&apos;s history&quot;</h1>
            <button onClick={() => router.back()} className="bg-[#222126] text-white px-[20px] py-[10px]">Button</button>
        </section>
    )
        
}