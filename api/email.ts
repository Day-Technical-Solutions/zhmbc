/** @format */

// api/email.ts
import { Router } from "express";
import nodemailer from "nodemailer";
import "dotenv/config";
import ContactEmail from "../src/components/ContactEmail";
import PrayerRequestEmail from "../src/components/PrayerRequestEmail";
import { render } from "@react-email/components";

const router = Router();
const DEFAULT_EMAIL = "zhmbc17@gmail.com";

router.post("/contact", async (req, res) => {
  console.log(req.body);

  try {
    const {
      to = DEFAULT_EMAIL,
      subject = "hello world",
      html = "<p>Sent From Contact Form!</p>",
      phone,
      email,
      message,
      name,
    } = req.body ?? {};
    if (!subject || !html) {
      return res.status(400).json({ error: "Missing to/subject/html" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Use SSL/TLS
      auth: {
        user: DEFAULT_EMAIL, // Your Gmail address
        pass: process.env.GOOGLE_APP_PASSWORD, // The App Password you generated
      },
    });
    const contactEmailHtml = await render(
      ContactEmail({ name, email, phone, message, subject })
    );

    const mailOptions = {
      from: `${name} <${DEFAULT_EMAIL}>`,
      to: DEFAULT_EMAIL,
      subject: `[Contact] ${subject}`,
      html: contactEmailHtml,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);

    return res.status(200).json(info);
  } catch (err: any) {
    console.error("Email send failed:", err);
    return res.status(500).json({ error: err?.message || "Send failed" });
  }
});

router.post("/prayer-request", async (req, res) => {
  try {
    const {
      name,
      email,
      requestType,
      urgent,
      isPrivate,
      request,
      to = DEFAULT_EMAIL,
    } = (req.body ?? {}) as {
      name?: string;
      email?: string;
      requestType?: string;
      urgent?: boolean;
      isPrivate?: boolean;
      request?: string;
      to?: string;
    };

    if (!name || !email || !requestType || !request) {
      return res
        .status(400)
        .json({ error: "Missing name/email/requestType/request" });
    }

    const prayerHtml = await render(
      PrayerRequestEmail({
        name,
        email,
        requestType,
        urgent: !!urgent,
        isPrivate: !!isPrivate,
        request,
      })
    );

    const subject = `[Prayer Request] ${requestType.toUpperCase()}${urgent ? " (Urgent)" : ""}${
      isPrivate ? " (Private)" : ""
    }`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Use SSL/TLS
      auth: {
        user: DEFAULT_EMAIL, // Your Gmail address
        pass: process.env.GOOGLE_APP_PASSWORD, // The App Password you generated
      },
    });

    const mailOptions = {
      from: `${name} <${DEFAULT_EMAIL}>`,
      to: DEFAULT_EMAIL,
      subject: subject,
      html: prayerHtml,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);

    return res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error("Prayer send failed:", err);
    return res.status(500).json({ error: err?.message || "Send failed" });
  }
});

// router.post("/application", async (req, res) => {
// 	try {
// 		const {to = "zhmbc5129@gmail.com", subject, html, phone, email, message} = req.body ?? {};
// 		if (!subject || !html) {
// 			return res.status(400).json({error: "Missing to/subject/html"});
// 		}

// 		const data = await resend.emails.send({
// 			from: email,
// 			to,
// 			subject,
// 			html, //Handle convert and message proceessing
// 		});

// 		res.status(200).json(data);
// 	} catch (err: any) {
// 		console.error("Email send failed:", err);
// 		res.status(500).json({error: err?.message || "Send failed"});
// 	}
// });

export default router;
