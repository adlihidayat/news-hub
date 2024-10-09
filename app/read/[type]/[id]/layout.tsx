import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Read News",
  description: "read the detail of news",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
