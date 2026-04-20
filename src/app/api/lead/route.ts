// src/app/api/lead/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface LeadPayload {
  name: string;
  email: string;
  phone?: string;
  message?: string;
}

// ── WhatsApp click-to-chat link ───────────────────────────
function getWhatsAppLink(lead: LeadPayload): string {
  const msg = encodeURIComponent(
    `Hi ${lead.name}, thanks for reaching out! How can we help you today?`
  );
  const phone = lead.phone?.replace(/\D/g, "") ?? "";
  return phone ? `https://wa.me/${phone}?text=${msg}` : "";
}

// ── Email ─────────────────────────────────────────────────
async function sendLeadEmail(lead: LeadPayload) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT ?? 587),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const whatsappRow = getWhatsAppLink(lead)
    ? `<tr><td style="padding:8px;font-weight:bold">WhatsApp</td><td style="padding:8px"><a href="${getWhatsAppLink(lead)}">Click to message on WhatsApp</a></td></tr>`
    : "";

  await transporter.sendMail({
    from: `"AI Support Bot" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: `🆕 New Lead from Chatbot — ${lead.name}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto">
        <h2 style="color:#4f6ef7">New Lead Captured via Chatbot</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Name</td><td style="padding:8px;border-bottom:1px solid #eee">${lead.name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Email</td><td style="padding:8px;border-bottom:1px solid #eee">${lead.email}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Phone</td><td style="padding:8px;border-bottom:1px solid #eee">${lead.phone ?? "Not provided"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Message</td><td style="padding:8px;border-bottom:1px solid #eee">${lead.message ?? "No message"}</td></tr>
          ${whatsappRow}
        </table>
        <p style="color:#999;font-size:12px;margin-top:24px">Submitted at ${new Date().toISOString()}</p>
      </div>
    `,
  });
}

// ── Route Handler ─────────────────────────────────────────
export async function POST(req: Request) {
  try {
    const body: LeadPayload = await req.json();

    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    await sendLeadEmail(body);

    return NextResponse.json({
      success: true,
      message: "Lead captured! We'll be in touch shortly.",
    });
  } catch (err) {
    console.error("[Lead API Error]", err);
    return NextResponse.json({ error: "Failed to process lead." }, { status: 500 });
  }
}