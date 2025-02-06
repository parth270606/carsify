import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserCircle, Settings, History, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ProfileMenu() {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/auth");
  };

  // Mock rental history data - replace with actual data in production
  const rentalHistory = [
    {
      id: 1,
      carName: "Tesla Model S",
      date: "2024-02-15",
      duration: "3 days",
      status: "Completed"
    },
    {
      id: 2,
      carName: "BMW M4",
      date: "2024-01-20",
      duration: "2 days",
      status: "Completed"
    }
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <UserCircle className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Profile Settings</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Profile Settings</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="John Doe" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john@example.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue="+1234567890" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="recovery">Recovery Contact</Label>
                <Input id="recovery" type="tel" defaultValue="+1987654321" />
              </div>
              <Button variant="destructive">Delete Account</Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <History className="mr-2 h-4 w-4" />
              <span>Rental History</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Rental History</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[400px] pr-4">
              {rentalHistory.length > 0 ? (
                <div className="space-y-4">
                  {rentalHistory.map((rental) => (
                    <div
                      key={rental.id}
                      className="flex flex-col space-y-2 border rounded-lg p-4"
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold">{rental.carName}</h4>
                        <span className="text-sm text-green-500">{rental.status}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>Date: {rental.date}</p>
                        <p>Duration: {rental.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  No rental history found.
                </p>
              )}
            </ScrollArea>
          </DialogContent>
        </Dialog>

        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}