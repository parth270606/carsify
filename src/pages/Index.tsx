import { useState, useEffect } from "react";
import { CarCard } from "@/components/CarCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { cars, categories } from "@/data/cars";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sun, Moon } from "lucide-react";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const navigate = useNavigate();

  const filteredCars = selectedCategory === "all"
    ? cars
    : cars.filter((car) => car.category === selectedCategory);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/auth");
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-6xl font-bold animate-fade-in text-gradient">
          Carsify
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gradient">Carsify</h1>
          <div className="flex gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        <section className="glass-card p-8 rounded-xl space-y-6">
          <h2 className="text-3xl font-semibold text-gradient">
            Premium Car Rentals Made Easy
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Simple Booking</h3>
              <p className="text-muted-foreground">
                Book your dream car in minutes with our streamlined process. No hidden fees, 
                just transparent pricing and instant confirmation.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Flexible Rentals</h3>
              <p className="text-muted-foreground">
                Choose from daily to monthly rentals with competitive pricing. Free cancellation 
                up to 24 hours before pickup.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Premium Fleet</h3>
              <p className="text-muted-foreground">
                Access our curated collection of luxury and performance vehicles. 
                All cars are regularly maintained and sanitized.
              </p>
            </div>
          </div>
        </section>
        
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;