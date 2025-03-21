import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Link Attribute: replace",
  };

export default function Page(){
    return (
        <section className=" h-screen flex flex-col justify-center items-center gap-y-[80px]">
                <Link 
                 href={{
                    pathname: "replace/interparent"
                  }} 
                 className="p-[7px_20px] bg-blue-600 rounded text-white" 
                 replace={true}>
                    Click me 
                </Link>
        </section>
    )
}