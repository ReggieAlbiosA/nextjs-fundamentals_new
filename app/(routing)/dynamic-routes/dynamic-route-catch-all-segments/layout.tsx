export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section className="w-full max-w-[850px] mx-auto pt-[50px] flex flex-col gap-y-[40px]">
                {children}
        </section>
    );
}