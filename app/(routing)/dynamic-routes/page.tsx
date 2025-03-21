import Link from "next/link";

export default function Page(){

   const HT = ['\'','[',']'];
    
   return (
        <section className="min-h-screen flex flex-col items-center gap-y-[80px] ">
            <div className="flex flex-col  items-center max-w-[1200px] gap-y-[40px] mt-[60px]">
                <h1 className=" font-bold text-[clamp(2rem,5vw,3rem)] text-left">Dynamic Routes</h1>
                <p className="text-justify text-[clamp(1rem,3vw,2rem)]">When you don{HT[0]}t know the exact segment names ahead of time and want to create routes from dynamic data, you can use Dynamic Segments that are filled in at request time or prerendered at build time.</p>
            </div>

            <div className="max-w-[1200px] w-full flex flex-col gap-y-[40px]">
                <div className="flex flex-col gap-y-[10px]">
                    <h1 className="font-bold text-[1.5rem]">Convention</h1>
                
                    <div className="flex flex-col gap-y-[2px]">
                        <p>A Dynamic Segment can be created by wrapping a folder{HT[0]}s name in square brackets: {HT[1]}folderName{HT[2]}. For example, {HT[1]}id{HT[2]} or {HT[1]}slug{HT[2]}.</p>
                        <p>Dynamic Segments are passed as the params prop to layout, page, route, and generateMetadata functions.</p>
                    </div>
                </div>

                <div className="flex flex-col gap-y-[10px]">
                    <h1 className="font-bold text-[1.5rem]">Use Cases</h1>
                
                    <div className="flex flex-col gap-y-[2px]">
                        <ul>
                            <li className="underline"><Link href="/dynamic-routes/dynamic-route-segments">Dynamic Route Segments</Link></li>
                            <li className="underline"><Link href="/dynamic-routes/dynamic-route-catch-all-segments">Dynamic Route Catch-all Segments</Link></li>
                            <li className="underline"><Link href="/dynamic-routes/dynamic-route-optional-catch-all-segments">Dynamic Route Catch-all Segments</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            
        </section>
   )
}