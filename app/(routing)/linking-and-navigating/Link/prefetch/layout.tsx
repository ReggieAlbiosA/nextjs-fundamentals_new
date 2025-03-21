// layout.tsx (Server Component)
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Link Attribute: prefetch",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
