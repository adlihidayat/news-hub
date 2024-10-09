export interface NewsArticle {
  author: string;
  urlToImage: string;
  content: string;
  description: string;
  publishedAt: string;
  title: string;
  url: string;
  source: {
    id: string | null;
    name: string;
  };
}