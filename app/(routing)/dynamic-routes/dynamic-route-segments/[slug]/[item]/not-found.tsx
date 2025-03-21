import Link from "next/link";

export default function NotFound() {

    const HT = {a:'\'',
                b:'[',
                c:']',
                d:'(',
                e:')',
                f:'/'};

    return (
        <div className="h-screen flex items-center justify-center bg-white absolute inset-0 ">
            <h1 className="w-full  max-w-[1000px] text-[1.7rem]">
                Oops!! your looking for something that doesn{HT.a}t exist this is because the dynamic-routes{HT.f}dynamic-route-segments
                uses a single dynamic one dimensional route segment only {HT.d} {HT.b}slug{HT.c} {HT.e} which in this case you can visit the food category Page
                but not its items page to view a specific item you can move to <Link className="underline" href={"/dynamic-routes/dynamic-route-catch-all-segments"}>/dynamic-routes/dynamic-route-catch-all-segments</Link>
            </h1>
        </div>
    );
}