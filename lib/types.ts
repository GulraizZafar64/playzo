export type Game = {
  slug: string;
  name: string;
  title: string;
  description: string;
  iframeUrl: string;
  thumb: string | null;
  category?: string;
  genre?: string;
};
