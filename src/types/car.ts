export interface Car {
  id: string;
  name: string;
  category: string;
  image: string;
  pricePerDay: number;
  seats: number;
  transmission: "Manual" | "Automatic";
  available: boolean;
}