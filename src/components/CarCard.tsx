
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Car } from "@/types/car";
import { useState } from "react";
import { BookingForm } from "./BookingForm";
import { ScrollArea } from "./ui/scroll-area";

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);

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
        {!showBookingForm && !showMoreInfo ? (
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
              <div className="flex gap-2">
                <Button className="w-full" onClick={() => setShowBookingForm(true)}>
                  Book Now
                </Button>
                <Button variant="outline" className="w-full" onClick={() => setShowMoreInfo(true)}>
                  More Info
                </Button>
              </div>
            </div>
          </>
        ) : showMoreInfo ? (
          <>
            <DialogHeader>
              <DialogTitle>Detailed Information - {car.name}</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Overview</h3>
                  <p className="text-muted-foreground">
                    Experience luxury and performance with the {car.name}. This {car.category.toLowerCase()} vehicle offers comfort, style, and advanced features for an unforgettable driving experience.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Features</h3>
                  <ul className="list-disc pl-4 space-y-2 text-muted-foreground">
                    <li>Premium leather seats</li>
                    <li>Advanced climate control</li>
                    <li>360-degree parking camera</li>
                    <li>Premium sound system</li>
                    <li>Navigation system</li>
                    <li>Bluetooth connectivity</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Rental Terms</h3>
                  <ul className="list-disc pl-4 space-y-2 text-muted-foreground">
                    <li>Minimum rental period: 1 day</li>
                    <li>Maximum rental period: 30 days</li>
                    <li>Security deposit required</li>
                    <li>Valid driver's license required</li>
                    <li>Insurance included</li>
                    <li>24/7 roadside assistance</li>
                  </ul>
                </div>
                <Button className="w-full" onClick={() => {
                  setShowMoreInfo(false);
                  setShowBookingForm(true);
                }}>
                  Proceed to Booking
                </Button>
              </div>
            </ScrollArea>
          </>
        ) : (
          <BookingForm onClose={() => setShowBookingForm(false)} carPrice={car.pricePerDay} />
        )}
      </DialogContent>
    </Dialog>
  );
}
