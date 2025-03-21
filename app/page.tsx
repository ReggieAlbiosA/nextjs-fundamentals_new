
import Link from "next/link";

export default function Home() {
  const sections = [
    {
      title: "Routing",
      links: [
        { href: "/linking-and-navigating", text: "Linking and Navigating" },
        { href: "/dynamic-routes", text: "Dynamic Routes" },
      ],
    },
    {
      title: "Rendering",
      links: [
        { href: "/server-components", text: "Server Components" },
        { href: "/client-components", text: "Client Components" }, 
      ]
    },
    {
      title: "Real World Web Apps",
      links: [
        { href: "/color-picker/ff0000", text: "Color Picker" },
        { href: "/tribute-post", text: "Tribute Post" },
      ],
    },
  ];

  return (
    <section className="min-h-screen flex flex-col items-center gap-y-20">
      <header className="flex flex-col items-center max-w-5xl gap-y-10 mt-16">
        <h1 className="font-bold text-[clamp(2rem,5vw,3rem)]">Next.js Fundamentals and Implementations</h1>
      </header>

      <div className="max-w-5xl w-full flex flex-col gap-y-10">
        {sections.map(({ title, links }) => (
          <div key={title}>
            <h2 className="font-bold text-2xl">{title}</h2>
            <ul className="list-disc pl-5">
              {links.map(({ href, text }) => (
                <li key={href} className="underline">
                  <Link href={href}>{text}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
