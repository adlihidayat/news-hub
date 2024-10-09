import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search News",
  description: "Search specific news based on title",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
