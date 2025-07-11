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
