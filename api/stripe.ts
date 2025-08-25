/** @format */

// api/stripe.ts
import {Router} from "express";
import Stripe from "stripe";
import "dotenv/config";

const router = Router();

console.log("has secret:", !!process.env.STRIPE_SECRET_KEY);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: (process.env.STRIPE_API_VERSION as Stripe.LatestApiVersion) || "2024-06-20",
});

/**
 * POST /api/stripe/create-payment-intent
 * Body: { amount: number, currency?: string, email?: string, metadata?: Record<string,string> }
 * Returns: { clientSecret: string }
 *
 * Use for ONE-TIME payments with Stripe Elements (PaymentElement).
 */
router.post("/create-payment-intent", async (req, res) => {
	try {
		const {
			amount,
			currency = "usd",
			email,
			metadata,
		} = req.body as {
			amount: number;
			currency?: string;
			email?: string;
			metadata?: Record<string, string>;
		};

		if (!amount || amount <= 0) {
			return res.status(400).json({message: "Invalid amount"});
		}

		const params = {
			amount: Math.round(amount * 100), // cents
			currency,
			payment_method_types: ["card"],
			metadata: {source: "donations-api", ...(metadata || {})},
			statement_descriptor_suffix: "ZHMBC Donation",
		};

		if (email !== "") Object.assign(params, {receipt_email: email});

		const intent = await stripe.paymentIntents.create(params);

		return res.status(200).json({clientSecret: intent.client_secret});
	} catch (err: any) {
		console.error(err);
		return res.status(500).json({message: err?.message || "Stripe error"});
	}
});

// /**
//  * POST /api/stripe/create-subscription
//  * Body: { amount: number, currency?: string, email: string, metadata?: Record<string,string> }
//  * Returns: { clientSecret: string, subscriptionId: string, customerId: string }
//  *
//  * Use for MONTHLY donations:
//  * - Creates a Subscription with an inline price (monthly)
//  * - Expands latest_invoice.payment_intent and returns its client_secret
//  * - On the client, confirm via PaymentElement (same as one-time)
//  */
// router.post("/create-subscription", async (req, res) => {
// 	try {
// 		const {
// 			amount,
// 			currency = "usd",
// 			email,
// 			metadata,
// 		} = req.body as {
// 			amount: number;
// 			currency?: string;
// 			email: string;
// 			metadata?: Record<string, string>;
// 		};

// 		if (!amount || amount <= 0) {
// 			return res.status(400).json({message: "Invalid amount"});
// 		}
// 		if (!email) {
// 			return res.status(400).json({message: "Email is required for subscriptions"});
// 		}

// 		// In production, you might look up or reuse a customer by email.
// 		const customer = await stripe.customers.create({email});

// 		const subscription = await stripe.subscriptions.create({
// 			customer: customer.id,
// 			items: [
// 				{
// 					price_data: {
// 						currency,
// 						product_data: {name: "Monthly Donation"},
// 						recurring: {interval: "month"},
// 						unit_amount: Math.round(amount * 100),
// 					},
// 				},
// 			],
// 			payment_behavior: "default_incomplete",
// 			expand: ["latest_invoice.payment_intent"],
// 			metadata: {source: "donations-api", ...(metadata || {})},
// 		});

// 		const latestInvoice = subscription.latest_invoice as Stripe.Invoice;
// 		const pi = latestInvoice.payment_intent as Stripe.PaymentIntent;

// 		return res.status(200).json({
// 			clientSecret: pi.client_secret,
// 			subscriptionId: subscription.id,
// 			customerId: customer.id,
// 		});
// 	} catch (err: any) {
// 		console.error(err);
// 		return res.status(500).json({message: err?.message || "Stripe error"});
// 	}
// });

// /**
//  * (Optional helper) GET /api/stripe/checkout-session?session_id=cs_...
//  * Useful if you also use Stripe Checkout elsewhere and want to look up the session.
//  */
// router.get("/checkout-session", async (req, res) => {
// 	try {
// 		const sessionId = req.query.session_id as string | undefined;
// 		if (!sessionId) return res.status(400).json({message: "Missing session_id"});

// 		const session = await stripe.checkout.sessions.retrieve(sessionId);
// 		res.json({
// 			id: session.id,
// 			amount_total: session.amount_total,
// 			currency: session.currency,
// 			payment_status: session.payment_status,
// 			mode: session.mode,
// 		});
// 	} catch (err: any) {
// 		console.error(err);
// 		res.status(500).json({message: err?.message || "Stripe error"});
// 	}
// });

export default router;
