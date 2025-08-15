/** @format */

import {useForm, Controller, type FieldErrors} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {CreditCard, ShoppingCartIcon as Paypal, Lock, Heart, DollarSign} from "lucide-react";
import placeholder from "/src/images/placeholder.svg";

const baseSchema = z.object({
	amount: z.coerce.number().positive("Enter a positive amount"),
	frequency: z.enum(["one-time", "monthly"]),
});

const cardSchema = baseSchema.extend({
	paymentMethod: z.literal("card"),
	cardName: z.string().min(1, "Name on card is required"),
	cardNumber: z.string().min(13, "Invalid card number").max(19, "Invalid card number"),
	expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY format"),
	cvc: z.string().min(3, "Invalid CVC").max(4, "Invalid CVC"),
});

const paypalSchema = baseSchema.extend({
	paymentMethod: z.literal("paypal"),
	// No card fields required for PayPal
});

const donationSchema = z.discriminatedUnion("paymentMethod", [cardSchema, paypalSchema]);

type DonationForm = z.infer<typeof donationSchema>;
type CardForm = z.infer<typeof cardSchema>;

export default function Donations() {
	const {
		control,
		register,
		handleSubmit,
		watch,
		setValue,
		formState: {errors, isSubmitting},
	} = useForm<DonationForm>({
		resolver: zodResolver(donationSchema),
		defaultValues: {
			amount: 10,
			paymentMethod: "card",
			frequency: "one-time",
		},
		mode: "onTouched",
	});

	const paymentMethod = watch("paymentMethod");
	const amount = watch("amount");
	const predefinedAmounts = [10, 25, 50, 100, 250, 500];
	const cardErrors = errors as unknown as FieldErrors<CardForm>;

	const onSubmit = (data: DonationForm) => {
		console.log("Form Submitted:", data);
		// Handle Card

		//Handle Paypal
	};

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
						<h1 className="text-4xl md:text-6xl font-bold mb-4">Support Our Ministry</h1>
						<p className="text-xl md:text-2xl">Help us make a difference in our community</p>
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
								<form onSubmit={handleSubmit(onSubmit)} noValidate>
									{/* Amount */}
									<div className="mb-8">
										<Label>Select Amount</Label>
										<div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
											{predefinedAmounts.map((a) => (
												<Button
													key={a}
													type="button"
													variant={amount === a ? "default" : "outline"}
													onClick={() =>
														setValue("amount", a, {shouldValidate: true, shouldTouch: true})
													}>
													${a}
												</Button>
											))}
										</div>

										<div className="relative">
											<DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
											<Input
												type="number"
												step="1"
												min={1}
												placeholder="Custom Amount"
												// valueAsNumber ensures numeric value flows to RHF (still coerced in Zod)
												{...register("amount", {valueAsNumber: true})}
												className="pl-10"
											/>
											{errors.amount && (
												<p className="mt-1 text-red-500 text-sm">{errors.amount.message}</p>
											)}
										</div>
									</div>

									{/* Payment Method (controlled Tabs) */}
									<div className="mb-8">
										<Label>Payment Method</Label>

										<Controller
											name="paymentMethod"
											control={control}
											render={({field}) => (
												<Tabs
													value={field.value}
													onValueChange={(v) => field.onChange(v as DonationForm["paymentMethod"])}
													className="w-full md:w-1/2">
													<TabsList className="grid w-full grid-cols-2">
														<TabsTrigger value="card">
															<CreditCard className="mr-2 h-4 w-4" /> Credit Card
														</TabsTrigger>
														<TabsTrigger value="paypal">
															<Paypal className="mr-2 h-4 w-4" /> PayPal
														</TabsTrigger>
													</TabsList>

													<TabsContent value="card" className="space-y-3 pt-4">
														<Input placeholder="Name on Card" {...register("cardName")} />
														{paymentMethod === "card" && cardErrors.cardName && (
															<p className="text-red-500 text-sm">{cardErrors.cardName.message}</p>
														)}

														<Input
															inputMode="numeric"
															placeholder="Card Number"
															{...register("cardNumber")}
														/>
														{paymentMethod === "card" && cardErrors.cardNumber && (
															<p className="text-red-500 text-sm">
																{cardErrors.cardNumber.message}
															</p>
														)}

														<div className="grid grid-cols-2 gap-3">
															<Input placeholder="MM/YY" {...register("expiry")} />
															<Input inputMode="numeric" placeholder="CVC" {...register("cvc")} />
														</div>
														{paymentMethod === "card" && (cardErrors.expiry || cardErrors.cvc) && (
															<div className="text-red-500 text-sm">
																{cardErrors.expiry?.message || cardErrors.cvc?.message}
															</div>
														)}
													</TabsContent>

													<TabsContent value="paypal" className="pt-4">
														<p>You will be redirected to PayPal to complete your donation.</p>
													</TabsContent>
												</Tabs>
											)}
										/>
									</div>

									{/* Donation Frequency (controlled RadioGroup) */}
									<div className="mb-8">
										<Label>Donation Frequency</Label>
										<Controller
											name="frequency"
											control={control}
											render={({field}) => (
												<RadioGroup
													value={field.value}
													onValueChange={field.onChange}
													className="grid gap-4">
													<div className="flex items-center space-x-2">
														<RadioGroupItem value="one-time" id="one-time" />
														<Label htmlFor="one-time">One-time donation</Label>
													</div>
													<div className="flex items-center space-x-2">
														<RadioGroupItem value="monthly" id="monthly" />
														<Label htmlFor="monthly">Monthly donation</Label>
													</div>
												</RadioGroup>
											)}
										/>
										{errors.frequency && (
											<p className="mt-1 text-red-500 text-sm">{errors.frequency.message}</p>
										)}
									</div>

									<CardFooter className="flex flex-col space-y-4">
										<Button className="w-full" size="lg" type="submit" disabled={isSubmitting}>
											<Heart className="mr-2 h-5 w-5" />{" "}
											{isSubmitting ? "Processing..." : "Complete Donation"}
										</Button>
										<div className="flex items-center justify-center text-sm text-gray-500">
											<Lock className="mr-2 h-4 w-4" /> Secure payment processing
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
						<h2 className="text-3xl font-bold mb-6">Your Donation Makes a Difference</h2>
						<p className="text-gray-600 mb-8">
							Your generous contributions help us maintain our facilities, support our ministries,
							and extend our outreach programs to those in need in our community.
						</p>
						<div className="grid md:grid-cols-3 gap-8">
							<div>
								<div className="text-2xl font-bold text-indigo-600 mb-2">100+</div>
								<div className="text-gray-600">Families Supported Monthly</div>
							</div>
							<div>
								<div className="text-2xl font-bold text-indigo-600 mb-2">12</div>
								<div className="text-gray-600">Active Ministry Programs</div>
							</div>
							<div>
								<div className="text-2xl font-bold text-indigo-600 mb-2">1000+</div>
								<div className="text-gray-600">Community Members Reached</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
