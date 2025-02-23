import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  CreditCard,
  ShoppingCartIcon as Paypal,
  Lock,
  Heart,
  DollarSign,
} from "lucide-react";
import placeholder from "/public/images/placeholder.svg";

const donationSchema = z.object({
  amount: z.string().min(1, "Please select or enter an amount"),
  paymentMethod: z.enum(["card", "paypal"]),
  cardName: z.string().optional(),
  cardNumber: z.string().min(16, "Invalid card number").optional(),
  expiry: z.string().optional(),
  cvc: z.string().min(3, "Invalid CVC").optional(),
  frequency: z.enum(["one-time", "monthly"]),
});

export default function Donations() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: "",
      paymentMethod: "card",
      frequency: "one-time",
    },
  });

  //const selectedPayment = watch("paymentMethod");

  const onSubmit = (data: typeof donationSchema) => {
    console.log("Form Submitted:", data);
  };

  const predefinedAmounts = ["10", "25", "50", "100", "250", "500"];

  return (
    <main className="flex-1 w-full">
      {/* Hero Section */}
      <section className="relative h-[300px]">
        <img
          src={placeholder}
          alt="Donate Banner"
          className="brightness-50 w-full max-h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Support Our Ministry
            </h1>
            <p className="text-xl md:text-2xl">
              Help us make a difference in our community
            </p>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-3xl">Make a Donation</CardTitle>
                <CardDescription className="text-lg">
                  Your generous donation helps support our community.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(() => onSubmit)}>
                  <div className="mb-8">
                    <Label>Select Amount</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                      {predefinedAmounts.map((amount) => (
                        <Button
                          key={amount}
                          type="button"
                          variant={
                            watch("amount") === amount ? "default" : "outline"
                          }
                          onClick={() => setValue("amount", amount)}
                        >
                          ${amount}
                        </Button>
                      ))}
                    </div>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        type="number"
                        placeholder="Custom Amount"
                        {...register("amount")}
                        className="pl-10"
                      />
                      {errors.amount && (
                        <p className="text-red-500">{errors.amount.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="mb-8">
                    <Label>Payment Method</Label>
                    <Tabs
                      defaultValue={watch("paymentMethod")}
                      className="w-full md:w-1/2"
                    >
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger
                          value="card"
                          onClick={() => setValue("paymentMethod", "card")}
                        >
                          <CreditCard className="mr-2 h-4 w-4" /> Credit Card
                        </TabsTrigger>
                        <TabsTrigger
                          value="paypal"
                          onClick={() => setValue("paymentMethod", "paypal")}
                        >
                          <Paypal className="mr-2 h-4 w-4" /> PayPal
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="card">
                        <Input
                          {...register("cardName")}
                          placeholder="Name on Card"
                        />
                        <Input
                          {...register("cardNumber")}
                          placeholder="Card Number"
                        />
                        <Input {...register("expiry")} placeholder="MM/YY" />
                        <Input {...register("cvc")} placeholder="CVC" />
                      </TabsContent>
                      <TabsContent value="paypal">
                        <p>
                          You will be redirected to PayPal to complete your
                          donation.
                        </p>
                      </TabsContent>
                    </Tabs>
                  </div>
                  <div className="mb-8">
                    <Label>Donation Frequency</Label>
                    <RadioGroup defaultValue="one-time" className="grid gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="one-time"
                          id="one-time"
                          {...register("frequency")}
                        />
                        <Label htmlFor="one-time">One-time donation</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="monthly"
                          id="monthly"
                          {...register("frequency")}
                        />
                        <Label htmlFor="monthly">Monthly donation</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <CardFooter className="flex flex-col space-y-4">
                    <Button className="w-full" size="lg" type="submit">
                      <Heart className="mr-2 h-5 w-5" /> Complete Donation
                    </Button>
                    <div className="flex items-center justify-center text-sm text-gray-500">
                      <Lock className="mr-2 h-4 w-4" /> Secure payment
                      processing
                    </div>
                  </CardFooter>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Impact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Your Donation Makes a Difference
            </h2>
            <p className="text-gray-600 mb-8">
              Your generous contributions help us maintain our facilities,
              support our ministries, and extend our outreach programs to those
              in need in our community.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-2xl font-bold text-indigo-600 mb-2">
                  100+
                </div>
                <div className="text-gray-600">Families Supported Monthly</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-indigo-600 mb-2">
                  12
                </div>
                <div className="text-gray-600">Active Ministry Programs</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-indigo-600 mb-2">
                  1000+
                </div>
                <div className="text-gray-600">Community Members Reached</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
