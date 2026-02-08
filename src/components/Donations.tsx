/** @format */

import {useForm, Controller} from "react-hook-form";
import {useEffect, useMemo, useState} from "react";

import {stripePromise} from "../lib/stripe";
import {Elements, PaymentElement, useStripe, useElements} from "@stripe/react-stripe-js";

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
import {
	CreditCard,
	ShoppingCartIcon as Paypal,
	Lock,
	Heart,
	DollarSign,
	Smartphone,
	Check,
	Copy,
	Mail,
} from "lucide-react";
import PaypalLogo from "/src/images/Paypal.svg";
import HeroPhoto from "/images/church_pulpit_full.jpg";

import {useDebouncedValue} from "../hooks/useDebouncedValue";

const donationSchema = z.object({
	amount: z.coerce.number().positive("Enter a positive amount"),
	frequency: z.enum(["one-time", "monthly"]),
	paymentMethod: z.enum(["card", "paypal"]),
	email: z.string().email("Enter a valid email").or(z.literal("")).optional(),
});

type DonationForm = z.infer<typeof donationSchema>;

export default function Donations() {
	const {
		control,
		register,
		watch,
		setValue,
		formState: {errors},
	} = useForm<DonationForm>({
		resolver: zodResolver(donationSchema),
		defaultValues: {
			amount: 10,
			paymentMethod: "card",
			frequency: "one-time",
			email: "",
		},
		mode: "onTouched",
	});

	const [copiedCashApp, setCopiedCashApp] = useState(false);
	const [copiedZelle, setCopiedZelle] = useState(false);

	const cashAppId = "$Zhmbcfinance";
	const zelleEmail = " Zhmbcfinance@yahoo.com";

	const handleCopy = (text: string, type: "cashapp" | "zelle") => {
		navigator.clipboard.writeText(text);
		if (type === "cashapp") {
			setCopiedCashApp(true);
			setTimeout(() => setCopiedCashApp(false), 2000);
		} else {
			setCopiedZelle(true);
			setTimeout(() => setCopiedZelle(false), 2000);
		}
	};

	const paymentMethod = watch("paymentMethod");
	const amount = watch("amount");
	const email = watch("email");
	const debouncedEmail = useDebouncedValue(email, 600);
	const predefinedAmounts = [10, 25, 50, 100, 250, 500];

	const [clientSecret, setClientSecret] = useState<string | null>(null);
	const [loadingPI, setLoadingPI] = useState(false);

	// Stripe Elements options (only when clientSecret exists)
	const elementsOptions = useMemo(
		() =>
			clientSecret
				? ({
						clientSecret,
						appearance: {
							theme: "stripe",
						},
						layout: {
							type: "accordion",
							defaultCollapsed: false,
						},
					} as const)
				: undefined,
		[clientSecret],
	);

	useEffect(() => {
		const fetchPaymentIntent = async () => {
			setLoadingPI(true);
			if (paymentMethod !== "card" || !amount || amount <= 0) {
				setClientSecret(null);
				return;
			}

			try {
				const res = await fetch("/api/stripe/create-payment-intent", {
					method: "POST",
					headers: {"Content-Type": "application/json"},
					body: JSON.stringify({
						amount,
						email,
					}),
				});

				if (!res.ok) {
					const {message} = await res
						.json()
						.catch(() => ({message: "Failed to initialize payment"}));
					throw new Error(message);
				}

				const resData = await res.json();
				setClientSecret(resData.clientSecret);
			} catch (error) {
				console.log("Error fetching payment intent: ", error);
			} finally {
				setLoadingPI(false);
			}
		};
		fetchPaymentIntent();
	}, [paymentMethod, amount, debouncedEmail]);

	return (
		<main className="flex-1 w-full">
			{/* Hero Section */}
			<section className="relative h-[450px]">
				<img
					src={HeroPhoto}
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

			<section className="flex items-start py-16">
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
								<form noValidate>
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
														setValue("amount", a, {
															shouldValidate: true,
															shouldTouch: true,
														})
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
									<div className="mb-5">
										<Label htmlFor="donor-email">Email for receipt (optional)</Label>
										<Input
											id="donor-email"
											type="email"
											value={email}
											placeholder="YourEmail@example.com"
											onChange={(e) =>
												setValue("email", e.target.value, {
													shouldValidate: true,
													shouldTouch: true,
												})
											}
										/>
										{errors.email && (
											<p className="mt-1 text-red-500 text-sm">{errors.email?.message}</p>
										)}
									</div>
									<Label>Payment Method</Label>
									{/* Payment Method (controlled Tabs) */}
									<div className="mb-8 flex justify-center">
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

													<TabsContent value="card" className="pt-4 space-y-3">
														{!amount || amount <= 0 ? (
															<p className="text-sm text-gray-600">
																Enter a donation amount to load the secure card field.
															</p>
														) : loadingPI ? (
															<p className="text-sm text-gray-600">Preparing secure payment…</p>
														) : elementsOptions ? (
															<Elements
																stripe={stripePromise}
																options={{
																	...elementsOptions,
																}}
																key={clientSecret /* force remount when intent changes */}>
																<StripeCardSection
																	onSuccess={() => (window.location.href = "/donate/success")}
																/>
															</Elements>
														) : (
															<p className="text-sm text-red-600">
																We couldn’t initialize payment. Please adjust the amount or try
																again.
															</p>
														)}
													</TabsContent>

													<TabsContent value="paypal" className="pt-4">
														<div id="paypal-container-QRV24MM6HQ4Z8"></div>
														<p>You will be redirected to PayPal to complete your donation.</p>

														<a href="https://www.paypal.com/donate/?hosted_button_id=YET7B7H5XAB62">
															<div className="bg-[#f5c842] rounded-4xl w-full p- mt-10 cursor-pointer flex justify-center">
																<img className="m-3" width="120px" src={PaypalLogo}></img>
															</div>
														</a>
													</TabsContent>
												</Tabs>
											)}
										/>
									</div>

									<CardFooter className="flex flex-col space-y-4">
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

			{/* Alternative Payment Methods */}
			<div className="flex justify-center">
				<div className="grid md:grid-cols-2 gap-6 mt-8 px-5 pb-10 w-6xl justify-center">
					{/* CashApp Card */}
					<Card className="border-2 border-green-200 bg-green-50/50">
						<CardHeader className="pb-3">
							<div className="flex items-center gap-3">
								<div className="bg-green-100 p-2.5 rounded-full">
									<Smartphone className="h-6 w-6 text-green-600" />
								</div>
								<div>
									<CardTitle className="text-lg">CashApp</CardTitle>
									<CardDescription>Send your donation via CashApp</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<div className="bg-white rounded-lg p-4 flex items-center justify-between border border-green-200">
								<div>
									<p className="text-sm text-gray-500 mb-1">CashApp ID</p>
									<p className="text-lg font-bold text-green-700">{cashAppId}</p>
								</div>
								<Button
									variant="outline"
									size="sm"
									className="border-green-300 text-green-700 hover:bg-green-100 bg-transparent"
									onClick={() => handleCopy(cashAppId, "cashapp")}>
									{copiedCashApp ? (
										<>
											<Check className="mr-1.5 h-4 w-4" /> Copied
										</>
									) : (
										<>
											<Copy className="mr-1.5 h-4 w-4" /> Copy
										</>
									)}
								</Button>
							</div>
							<p className="text-sm text-gray-500 mt-3">
								Open your CashApp, tap Pay, enter the ID above, and send your donation.
							</p>
						</CardContent>
					</Card>

					{/* Zelle Card */}
					<Card className="border-2 border-purple-200 bg-purple-50/50">
						<CardHeader className="pb-3">
							<div className="flex items-center gap-3">
								<div className="bg-purple-100 p-2.5 rounded-full">
									<Mail className="h-6 w-6 text-purple-600" />
								</div>
								<div>
									<CardTitle className="text-lg">Zelle</CardTitle>
									<CardDescription>Send your donation via Zelle</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<div className="bg-white rounded-lg p-4 flex items-center justify-between border border-purple-200">
								<div>
									<p className="text-sm text-gray-500 mb-1">Zelle Email</p>
									<p className="text-lg font-bold text-purple-700">{zelleEmail}</p>
								</div>
								<Button
									variant="outline"
									size="sm"
									className="border-purple-300 text-purple-700 hover:bg-purple-100 bg-transparent"
									onClick={() => handleCopy(zelleEmail, "zelle")}>
									{copiedZelle ? (
										<>
											<Check className="mr-1.5 h-4 w-4" /> Copied
										</>
									) : (
										<>
											<Copy className="mr-1.5 h-4 w-4" /> Copy
										</>
									)}
								</Button>
							</div>
							<p className="text-sm text-gray-500 mt-3">
								Open your banking app, select Zelle, enter the email above, and send your donation.
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
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
								<div className="text-2xl font-bold text-indigo-600 mb-2">4</div>
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

function StripeCardSection({onSuccess}: {onSuccess: () => void}) {
	const stripe = useStripe();
	const elements = useElements();
	const [submitting, setSubmitting] = useState(false);
	const [err, setErr] = useState<string | null>(null);

	const handleConfirm = async () => {
		if (!stripe || !elements) {
			setErr("Payment is not ready yet.");
			return;
		}

		// Ensure the Payment Element is mounted
		if (!elements.getElement(PaymentElement)) {
			setErr("Payment field hasn’t loaded yet. Please wait a moment.");
			return;
		}

		setSubmitting(true);
		setErr(null);

		const {error} = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: `${window.location.origin}/donate/success`,
			},
			redirect: "if_required",
		});

		setSubmitting(false);

		if (error) {
			setErr(error.message || "We couldn’t confirm your payment.");
			return;
		}

		onSuccess();
	};

	return (
		<div className="space-y-3">
			<PaymentElement />
			{err && <p className="text-sm text-red-600">{err}</p>}
			<Button
				type="button"
				className="w-full"
				onClick={handleConfirm}
				disabled={submitting || !stripe || !elements}>
				{submitting ? "Processing…" : "Complete Donation"}
				<Heart className="mr-2 h-5 w-5" />
			</Button>
		</div>
	);
}
