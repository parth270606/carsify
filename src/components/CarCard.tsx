import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Car } from "@/types/car";
import { useState } from "react";
import { BookingForm } from "./BookingForm";

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  const [showBookingForm, setShowBookingForm] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="car-card p-4 rounded-xl">
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-4">
            <img
              src={car.image}
              alt={car.name}
              className="object-cover w-full h-full"
            />
            <Badge className="absolute top-2 right-2 bg-primary/80">
              ₹{car.pricePerDay}/day
            </Badge>
          </div>
          <h3 className="text-lg font-semibold mb-2">{car.name}</h3>
          <p className="text-muted-foreground text-sm">{car.category}</p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {!showBookingForm ? (
          <>
            <DialogHeader>
              <DialogTitle>{car.name}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="aspect-[16/9] rounded-lg overflow-hidden">
                <img
                  src={car.image}
                  alt={car.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Category</span>
                  <span>{car.category}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Price per day</span>
                  <span>₹{car.pricePerDay}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Seats</span>
                  <span>{car.seats}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Transmission</span>
                  <span>{car.transmission}</span>
                </div>
              </div>
              <Button className="w-full" onClick={() => setShowBookingForm(true)}>
                Book Now
              </Button>
            </div>
          </>
        ) : (
          <BookingForm onClose={() => setShowBookingForm(false)} />
        )}
      </DialogContent>
    </Dialog>
  );
}