
import Link from "next/link"; 

export default function Page() {
 
  return (
      <section className="min-h-screen flex flex-col items-center gap-y-[80px] ">
        <div className="flex flex-col  items-center max-w-[1200px] gap-y-[40px] mt-[60px]">
          <h1 className="font-bold text-[clamp(2rem,5vw,3rem)] text-left">useRouter() API Reference</h1>
          <p className="text-justify text-[clamp(1rem,3vw,2rem)]">- The useRouter hook allows you to programmatically change routes inside Client Components.</p>
        </div>

        <div className="max-w-[1200px] w-full flex flex-col gap-y-[40px]">
          <div>
            <h1 className="font-bold text-[1.5rem]">useRouter() methods</h1>
            <ul className="list-disc pl-[20px]">
              <li className="underline"><Link href="/linking-and-navigating/useRouter/router-push">router.push()</Link></li>
              <li className="underline"><Link href="/linking-and-navigating/useRouter/router-replace">router.replace()</Link></li>
              <li className="underline"><Link href="/linking-and-navigating/useRouter/router-refresh">router.refresh()</Link></li>
              <li className="underline"><Link href="/linking-and-navigating/useRouter/router-prefetch">router.prefetch()</Link></li>
              <li className="underline"><Link href="/linking-and-navigating/useRouter/router-back">router.back()</Link></li>
              <li className="underline"><Link href="/linking-and-navigating/useRouter/router-forward">router.forward()</Link></li>
            </ul>
          </div>

          <div>
            <h1 className="font-bold text-[1.5rem]">More Example use of Cases</h1>
            <ul className="list-disc pl-[20px]">
              <li className="underline"><Link href="/linking-and-navigating/useRouter/router-events">Router events</Link></li>
              <li className="underline"><Link href="/linking-and-navigating/useRouter/disabling-scroll-to-top">Disabling scroll to top</Link></li>
            </ul>
          </div>

        </div>

      </section>

  );
}
