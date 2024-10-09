import type { Metadata } from "next"; // Importing the Metadata type from Next.js
import "./globals.css"; // Importing global CSS styles
import Nav from "./components/Nav"; // Importing the navigation component
import { Titillium_Web } from "next/font/google"; // Importing a Google font
import { NewsProvider } from "../contexts/NewsProvider"; // Importing a context provider for news
import { GoogleOAuthProvider } from "@react-oauth/google"; // Importing Google OAuth provider
import { fetchNewsByCategory } from "@/lib/apiClient";

const titilliumWeb = Titillium_Web({
  weight: ["200", "300", "400", "600", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NewsHub | A concise, straightforward name for a news platform.",
  description: "A concise, straightforward name for a news platform.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; // Type annotation for children
}>) {
  const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string;
  const [topHeadlines, sportsNews, financeNews, technologyNews] =
    await Promise.all([
      fetchNewsByCategory("general"),
      fetchNewsByCategory("sports"),
      fetchNewsByCategory("business"),
      fetchNewsByCategory("technology"),
    ]);

  const initialData = {
    topHeadlines,
    sportsNews,
    financeNews,
    technologyNews,
  };

  // Rendering the layout
  return (
    <html lang="en">
      <body className={`${titilliumWeb.className} overflow-x-hidden`}>
        <NewsProvider initialData={initialData}>
          <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <Nav />
            {children}
          </GoogleOAuthProvider>
        </NewsProvider>
      </body>
    </html>
  );
}
