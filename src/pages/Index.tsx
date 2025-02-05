import { useState } from "react";
import { CarCard } from "@/components/CarCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { cars, categories } from "@/data/cars";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredCars = selectedCategory === "all"
    ? cars
    : cars.filter((car) => car.category === selectedCategory);

  return (
    <div className="min-h-screen p-4 md:p-8 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gradient">Carsify</h1>
        
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;