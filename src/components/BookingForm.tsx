
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { DialogDescription, DialogContent } from "@/components/ui/dialog";
import { addDays, format, isValid } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Info } from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  contact: z.string().min(10, "Contact number must be at least 10 digits"),
  license: z.string()
    .min(15, "License number must be exactly 15 characters")
    .max(15, "License number must be exactly 15 characters")
    .regex(/^[A-Z0-9]+$/, "License number must contain only uppercase letters and numbers"),
  startDate: z.date({
    required_error: "Start date is required",
  }),
  endDate: z.date({
    required_error: "End date is required",
  }),
  paymentMethod: z.enum(["upi", "cash"], {
    required_error: "Please select a payment method",
  }),
});

interface BookingFormProps {
  onClose: () => void;
  carPrice?: number;
  carId: string;
  carName: string;
}

export function BookingForm({ onClose, carPrice = 0, carId, carName }: BookingFormProps) {
  const [showPayment, setShowPayment] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [datePopoverOpen, setDatePopoverOpen] = useState<'start' | 'end' | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      contact: "",
      license: "",
      paymentMethod: "upi",
    },
    mode: "onChange",
  });

  const startDate = form.watch("startDate");
  const endDate = form.watch("endDate");

  const calculateTotalPrice = (start: Date, end: Date) => {
    if (!start || !end) return carPrice;
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    let discount = 0;
    if (days >= 7) discount = 0.1;
    if (days >= 14) discount = 0.15;
    if (days >= 30) discount = 0.2;
    const totalPrice = carPrice * days * (1 - discount);
    return Math.round(totalPrice);
  };

  const totalPrice = startDate && endDate ? calculateTotalPrice(startDate, endDate) : carPrice;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const days = Math.ceil((values.endDate.getTime() - values.startDate.getTime()) / (1000 * 60 * 60 * 24));
    if (days < 1 || days > 30) {
      toast.error("Rental duration must be between 1 and 30 days");
      return;
    }
    setShowPayment(true);
  }

  const handlePaymentConfirmation = async () => {
    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please login to complete the booking");
        return;
      }

      const values = form.getValues();
      
      const { error } = await supabase.from('rentals').insert({
        user_id: user.id,
        car_id: carId,
        car_name: carName,
        start_date: format(values.startDate, 'yyyy-MM-dd'),
        end_date: format(values.endDate, 'yyyy-MM-dd'),
        total_amount: totalPrice,
        name: values.name,
        email: values.email,
        contact: values.contact,
        license: values.license,
        payment_method: values.paymentMethod,
        booking_status: 'completed',
        payment_status: 'completed'
      });

      if (error) {
        console.error('Booking error:', error);
        toast.error("Failed to complete booking. Please try again.");
        return;
      }

      toast.success(`Booking completed for ${carName}!`, {
        description: "Your car has been successfully booked.",
      });
      onClose();
    } catch (error) {
      console.error('Submission error:', error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showPayment) {
    return (
      <DialogContent className="max-w-md">
        <Form {...form}>
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold">Complete Payment</h3>
              <p className="text-sm text-muted-foreground">Choose your payment method to proceed</p>
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-col space-y-4"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="upi" />
                          </FormControl>
                          <FormLabel className="font-normal">UPI Payment</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="cash" />
                          </FormControl>
                          <FormLabel className="font-normal">Cash Payment</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />

              {form.watch("paymentMethod") === "upi" && (
                <div className="p-4 bg-white rounded-lg text-center space-y-4">
                  <img 
                    src="/lovable-uploads/8e6ef68f-f191-4ab2-885f-ab80f018ef6f.png" 
                    alt="UPI QR Code"
                    className="w-48 h-48 mx-auto"
                  />
                  <p className="text-sm font-medium">Amount: ₹{totalPrice}</p>
                </div>
              )}

              {form.watch("paymentMethod") === "cash" && (
                <div className="p-4 bg-secondary/20 rounded-lg">
                  <p className="text-sm">Our representative will contact you for cash collection.</p>
                </div>
              )}

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowPayment(false)}
                  disabled={isSubmitting}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  className="w-full"
                  onClick={handlePaymentConfirmation}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Confirm Payment"}
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </DialogContent>
    );
  }

  return (
    <DialogContent className="max-w-md">
      <ScrollArea className="h-[80vh] pr-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <DialogDescription className="mb-4">
              Please fill in your details to complete the booking. All bookings require approval and document verification.
            </DialogDescription>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover 
                      open={datePopoverOpen === 'start'} 
                      onOpenChange={(open) => open ? setDatePopoverOpen('start') : setDatePopoverOpen(null)}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal flex justify-between items-center",
                              !field.value && "text-muted-foreground",
                              field.value && isValid(field.value) && "text-foreground border-primary"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="h-4 w-4 opacity-70" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-popover shadow-lg rounded-md" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            field.onChange(date);
                            setDatePopoverOpen(null);
                            if (date && endDate && date > endDate) {
                              form.setValue('endDate', undefined);
                            }
                          }}
                          disabled={(date) =>
                            date < new Date() || date > addDays(new Date(), 90)
                          }
                          initialFocus
                        />
                        <div className="p-3 border-t text-xs text-muted-foreground">
                          Available booking: next 90 days
                        </div>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date</FormLabel>
                    <Popover 
                      open={datePopoverOpen === 'end'} 
                      onOpenChange={(open) => open ? setDatePopoverOpen('end') : setDatePopoverOpen(null)}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal flex justify-between items-center",
                              !field.value && "text-muted-foreground",
                              field.value && isValid(field.value) && "text-foreground border-primary"
                            )}
                            disabled={!startDate}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>{startDate ? "Pick end date" : "Select start date first"}</span>
                            )}
                            <CalendarIcon className="h-4 w-4 opacity-70" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-popover shadow-lg rounded-md" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            field.onChange(date);
                            setDatePopoverOpen(null);
                          }}
                          disabled={(date) =>
                            !startDate || 
                            date < startDate || 
                            date > addDays(startDate, 30)
                          }
                          initialFocus
                        />
                        <div className="p-3 border-t text-xs text-muted-foreground flex items-center gap-1">
                          <Info className="h-3 w-3" />
                          <span>Maximum rental period: 30 days</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john@example.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+91 1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="license"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Driving License Number</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter valid Driving License number" 
                      {...field} 
                      maxLength={15}
                      onChange={(e) => {
                        const value = e.target.value.toUpperCase();
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="p-4 bg-secondary/20 rounded-lg">
              <p className="text-sm font-medium mb-2">Booking Summary</p>
              {startDate && endDate && (
                <div className="space-y-1 text-sm">
                  <p>Duration: {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} days</p>
                  <p>Base price per day: ₹{carPrice}</p>
                  <p className="font-medium">Total amount: ₹{totalPrice}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    * Discounts applied for longer rentals: 10% for 7+ days, 15% for 14+ days, 20% for 30 days
                  </p>
                </div>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={!form.formState.isValid}
            >
              Proceed to Payment
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Note: Full refund available on booking cancellation before the start date. 
              You can modify your booking up to 24 hours before the start time.
            </p>
          </form>
        </Form>
      </ScrollArea>
    </DialogContent>
  );
}
