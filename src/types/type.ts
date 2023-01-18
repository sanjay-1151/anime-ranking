export interface ApiResponse {
  data: {
    rank: number;
    images: { jpg: { image_url: string } };
    title: string;
    title_english: string;
    airing: boolean;
    aired: {
      from: string;
      to?: string | null;
    };
    rating: string;
  }[];
}

export interface CardData {
  rank: number;
  imageUrl: string;
  title: string;
  releaseDate: string;
  lastest: string | null | undefined;
  rating: string;
}

export interface ChartData {
  year: number;
  anime: string[];
  numberOfAnime: number;
}

export interface ChartProps {
  data: CardData[];
}
