
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

export function BookingHistory() {
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
