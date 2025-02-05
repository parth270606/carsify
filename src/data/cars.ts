import { Car } from "@/types/car";

export const cars: Car[] = [
  {
    id: "1",
    name: "Tesla Model 3",
    category: "Electric",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    pricePerDay: 5000,
    seats: 5,
    transmission: "Automatic",
    available: true,
  },
  {
    id: "2",
    name: "BMW X5",
    category: "SUV",
    image: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    pricePerDay: 8000,
    seats: 7,
    transmission: "Automatic",
    available: true,
  },
  {
    id: "3",
    name: "Mercedes-Benz C-Class",
    category: "Luxury",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    pricePerDay: 7000,
    seats: 5,
    transmission: "Automatic",
    available: true,
  },
  {
    id: "4",
    name: "Porsche 911",
    category: "Sports",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    pricePerDay: 12000,
    seats: 2,
    transmission: "Automatic",
    available: true,
  },
  {
    id: "5",
    name: "Toyota Innova",
    category: "Family",
    image: "https://images.unsplash.com/photo-1633859947224-8a6f38e1c7dd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    pricePerDay: 3000,
    seats: 7,
    transmission: "Manual",
    available: true,
  },
];

export const categories = Array.from(new Set(cars.map((car) => car.category)));