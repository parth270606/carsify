
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { DialogDescription } from "@/components/ui/dialog";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  contact: z.string().min(10, "Contact number must be at least 10 digits"),
  license: z.string().min(5, "License number is required"),
  paymentMethod: z.enum(["upi", "cash"], {
    required_error: "Please select a payment method",
  }),
});

export function BookingForm({ onClose, carPrice }: { onClose: () => void; carPrice?: number }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      contact: "",
      license: "",
      paymentMethod: "upi",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.paymentMethod === "upi") {
      // Generate QR code URL using a mock UPI ID
      const upiUrl = `upi://pay?pa=carsify@upi&pn=Carsify&am=${carPrice}&cu=INR&tn=Car%20Rental%20Payment`;
      // In a real app, you would generate a QR code using the UPI URL
      toast.success("Payment QR code generated! Please scan to complete payment.");
    } else {
      toast.success("Cash payment selected. Our team will contact you for collection.");
    }
    console.log(values);
    onClose();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <DialogDescription>
          Please fill in your details to complete the booking.
        </DialogDescription>
        
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
                <Input placeholder="DL123456789" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Method</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
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
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("paymentMethod") === "upi" && carPrice && (
          <div className="p-4 bg-secondary/20 rounded-lg text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Scan QR code to pay ₹{carPrice}
            </p>
            <div className="w-48 h-48 mx-auto bg-white p-4 rounded-lg">
              <p className="text-black text-xs">QR Code Placeholder</p>
              <p className="text-black text-xs mt-2">Amount: ₹{carPrice}</p>
            </div>
          </div>
        )}

        <Button type="submit" className="w-full">Submit Booking</Button>
      </form>
    </Form>
  );
}
