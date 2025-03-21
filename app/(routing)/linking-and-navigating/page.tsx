
import Link from "next/link";

export default function Page() {

  return (
      <section className="min-h-screen flex flex-col items-center gap-y-[80px] ">
        <div className="flex flex-col  items-center max-w-[1200px] gap-y-[40px] mt-[60px]">
          <h1 className="font-bold text-[clamp(2rem,5vw,3rem)] text-left">Linking and Navigating</h1>
        </div>

        <div className="max-w-[1200px] w-full flex flex-col gap-y-[40px]">
          <div>
            <h1 className="font-bold text-[1.5rem]">There are four ways to navigate between routes in Next.js:</h1>
            <ul className="list-disc pl-[20px]">
              <li className="underline"><Link href="/linking-and-navigating/Link">Link</Link></li>
              <li className="underline"><Link href="/linking-and-navigating/useRouter">useRouter()</Link></li>
              <li className="underline"><Link href="/linking-and-navigating/redirect">redirect()</Link></li>
            </ul>
          </div>
        </div>

      </section>

  );
}
