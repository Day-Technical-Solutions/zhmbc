/** @format */

// api/email.ts
import {Router} from "express";
import {Resend} from "resend";

const router = Router();
const resend = new Resend(process.env.RESEND_API_KEY!);

router.post("/contact", async (req, res) => {
	try {
		const {to = "zhmbc5129@gmail.com", subject, html, phone, email, message} = req.body ?? {};
		if (!subject || !html) {
			return res.status(400).json({error: "Missing to/subject/html"});
		}

		const data = await resend.emails.send({
			from: email,
			to,
			subject,
			html, //Handle convert and message proceessing
		});

		res.status(200).json(data);
	} catch (err: any) {
		console.error("Email send failed:", err);
		res.status(500).json({error: err?.message || "Send failed"});
	}
});

router.post("/prayer-request", async (req, res) => {
	try {
		const {to = "zhmbc5129@gmail.com", subject, html, phone, email, message} = req.body ?? {};
		if (!subject || !html) {
			return res.status(400).json({error: "Missing to/subject/html"});
		}

		const data = await resend.emails.send({
			from: email,
			to,
			subject,
			html, //Handle convert and message proceessing
		});

		res.status(200).json(data);
	} catch (err: any) {
		console.error("Email send failed:", err);
		res.status(500).json({error: err?.message || "Send failed"});
	}
});

router.post("/application", async (req, res) => {
	try {
		const {to = "zhmbc5129@gmail.com", subject, html, phone, email, message} = req.body ?? {};
		if (!subject || !html) {
			return res.status(400).json({error: "Missing to/subject/html"});
		}

		const data = await resend.emails.send({
			from: email,
			to,
			subject,
			html, //Handle convert and message proceessing
		});

		res.status(200).json(data);
	} catch (err: any) {
		console.error("Email send failed:", err);
		res.status(500).json({error: err?.message || "Send failed"});
	}
});

export default router;
