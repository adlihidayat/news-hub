import { Metadata } from "next";

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    category: string; // The category should be passed as a prop
  };
}

export const generateMetadata = ({ params }: RootLayoutProps): Metadata => {
  const { category } = params;

  // Default values for title and description
  let title = "NewsHub";
  let description = "Stay updated with the latest news.";

  // Set title and description based on the category
  if (category) {
    switch (category) {
      case "sportsNews":
        title = "Sports NewsHub";
        description = "Latest updates and highlights in sports.";
        break;
      case "financeNews":
        title = "Finance NewsHub";
        description = "Financial news and market updates.";
        break;
      case "technologyNews":
        title = "Tech NewsHub";
        description = "Latest technology trends and innovations.";
        break;
      default:
        title = "NewsHub";
        description = "Stay updated with the latest news.";
    }
  }

  return {
    title,
    description,
  };
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
