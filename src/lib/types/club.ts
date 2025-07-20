export type BoothPosition = {
  building?: string;
  position?: number;
};

export type ClubItem = {
  id: number;
  name: string;
  description: string;
  logo?: string;
  ig?: string;
  boothPosition?: BoothPosition;
};

export type ClubGenre = {
  key: string;
  genre: string;
  icon: string;
};
