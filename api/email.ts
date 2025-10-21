/** @format */

// api/email.ts
import { Router } from "express";
import nodemailer from "nodemailer";
import "dotenv/config";
import { render } from "@react-email/render";
import multer from "multer";
import ContactEmail from "./_emails/ContactEmail.js";
import ApplicationEmail from "./_emails/ApplicationEmail.js";
import PrayerRequestEmail from "./_emails/PrayerRequestEmail.js";

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
      ...(email ? { replyTo: email } : {}),
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
      ...(email ? { replyTo: email } : {}),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);

    return res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error("Prayer send failed:", err);
    return res.status(500).json({ error: err?.message || "Send failed" });
  }
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

router.post("/application", upload.single("cv"), async (req, res) => {
  try {
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

    const {
      firstName = "",
      lastName = "",
      email = "",
      phone = "",
      address = "",
      dateOfBirth = "",
      memberSince = "",
      positionApplying = "",
      ministry = "",
      experience = "",
      qualifications = "",
      motivation = "",
      availability = "",
      references = "",
      hasCV = "",
    } = (req.body ?? {}) as Record<string, string>;

    if (!firstName || !lastName || !email) {
      return res
        .status(400)
        .json({ error: "Missing firstName/lastName/email" });
    }

    const hasCvBool = String(hasCV).toLowerCase() === "true" || !!req.file;

    const html = await render(
      ApplicationEmail({
        firstName,
        lastName,
        email,
        phone,
        address,
        dateOfBirth,
        memberSince,
        positionApplying,
        ministry,
        experience,
        qualifications,
        motivation,
        availability,
        references,
        hasCV: hasCvBool,
        siteName: "ZHMBC",
      })
    );

    const attachments = [];
    if (req.file) {
      attachments.push({
        filename: req.file.originalname || "cv.pdf",
        content: req.file.buffer,
        contentType: req.file.mimetype || "application/octet-stream",
      });
    }

    const subject = `Leadership Application: ${firstName} ${lastName}${positionApplying ? ` — ${positionApplying}` : ""}`;

    const info = transporter.sendMail({
      from: `Leadership Applications <${DEFAULT_EMAIL}>`, // keep verified sender
      to: DEFAULT_EMAIL, // recipient mailbox
      subject,
      html,
      ...(email ? { replyTo: email } : {}),
      attachments,
    });

    return res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error("Email send failed:", err);
    res.status(500).json({ error: err?.message || "Send failed" });
  }
});

export default router;
