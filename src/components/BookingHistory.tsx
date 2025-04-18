
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { CalendarClock, IndianRupee } from "lucide-react";

export function BookingHistory() {
  const isMobile = useIsMobile();
  
  const { data: bookings, isLoading } = useQuery({
    queryKey: ["completed-bookings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("rentals")
        .select("*")
        .eq("booking_status", "completed")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div className="p-4">Loading booking history...</div>;
  }

  if (isMobile) {
    return (
      <ScrollArea className="h-[400px]">
        <div className="space-y-4 p-2">
          {bookings?.map((booking) => (
            <div
              key={booking.id}
              className="rounded-lg border p-4 space-y-2 bg-card"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{booking.car_name}</h3>
                <span className="text-xs bg-muted px-2 py-1 rounded-full capitalize">
                  {booking.booking_status}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarClock className="h-4 w-4" />
                <span>{new Date(booking.start_date).toLocaleDateString()}</span>
                <span>→</span>
                <span>{new Date(booking.end_date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1 text-sm font-medium">
                <IndianRupee className="h-4 w-4" />
                {booking.total_amount}
              </div>
            </div>
          ))}
          {!bookings?.length && (
            <div className="text-center p-4 text-muted-foreground">
              No completed bookings found
            </div>
          )}
        </div>
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="h-[400px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Car</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings?.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell className="font-medium">{booking.car_name}</TableCell>
              <TableCell>
                {new Date(booking.start_date).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(booking.end_date).toLocaleDateString()}
              </TableCell>
              <TableCell>₹{booking.total_amount}</TableCell>
              <TableCell className="capitalize">{booking.booking_status}</TableCell>
            </TableRow>
          ))}
          {!bookings?.length && (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No completed bookings found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
