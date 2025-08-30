/** @format */

// api/email.ts
import { Router } from "express";
import { Resend } from "resend";
import ContactMessage from "../src/components/ContactEmail";
import { render } from "@react-email/components";
import "dotenv/config";

const router = Router();
const resend = new Resend(process.env.RESEND_API_KEY!);

router.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body ?? {};

    // basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Render React Email to HTML (and optional text)
    const html = await render(
      ContactMessage({
        name,
        email,
        phone,
        subject,
        message,
      }),
      { pretty: true }
    );

    const toAddress = "daytechnicalsolutions@gmail.com"; // where staff receives messages

    const result = await resend.emails.send({
      from: email, // use your verified sender/domain
      to: toAddress,
      subject: `[Contact] ${subject}`,
      html,
      replyTo: email, // so staff can reply directly to the sender
    });

    return res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error("Email send failed:", err);
    res.status(500).json({ error: err?.message || "Send failed" });
  }
});

router.post("/prayer-request", async (req, res) => {
  try {
    const {
      to = "zhmbc5129@gmail.com",
      subject,
      html,
      phone,
      email,
      message,
    } = req.body ?? {};
    if (!subject || !html) {
      return res.status(400).json({ error: "Missing to/subject/html" });
    }

    const data = await resend.emails.send({
      from: email,
      to,
      subject: "[Prayer Request] " + subject,
      html, //Handle convert and message proceessing
    });

    res.status(200).json(data);
  } catch (err: any) {
    console.error("Email send failed:", err);
    res.status(500).json({ error: err?.message || "Send failed" });
  }
});

router.post("/application", async (req, res) => {
  try {
    const {
      to = "zhmbc5129@gmail.com",
      subject,
      html,
      phone,
      email,
      message,
    } = req.body ?? {};
    if (!subject || !html) {
      return res.status(400).json({ error: "Missing to/subject/html" });
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
    res.status(500).json({ error: err?.message || "Send failed" });
  }
});

export default router;
