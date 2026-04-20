# 🤖 AI Customer Support Chatbot

A production-ready AI chatbot for 24/7 customer support — built with **Next.js 14**, **OpenAI GPT-4o-mini**, and deployed in minutes on Vercel.

---

## ✨ Features

| Feature | Details |
|---|---|
| 🧠 AI Chat | Streaming responses via OpenAI GPT-4o-mini |
| 📚 Custom FAQ Training | Edit `src/lib/faqs.ts` — no retraining needed |
| 📋 Lead Capture Form | Name, email, phone, message |
| 📧 Email Notification | Nodemailer + Gmail SMTP |
| 💬 WhatsApp Alert | Twilio WhatsApp API (optional) |
| ⚡ Edge Runtime | Deployed on Vercel Edge for ultra-low latency |
| 🎨 Dark UI | Polished widget with typing indicators & animations |

---

## 🗂 Project Structure

```
ai-support-chatbot/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/route.ts        ← OpenAI streaming endpoint
│   │   │   └── lead/route.ts        ← Lead capture + email + WhatsApp
│   │   ├── layout.tsx
│   │   ├── page.tsx                 ← Demo landing page
│   │   └── globals.css
│   ├── components/
│   │   ├── ChatWidget.tsx           ← Main chat bubble + window
│   │   ├── ChatMessage.tsx          ← Individual message bubble
│   │   ├── LeadForm.tsx             ← Lead capture form
│   │   └── QuickReplies.tsx         ← Suggested question chips
│   └── lib/
│       ├── faqs.ts                  ← ⭐ YOUR FAQ DATA GOES HERE
│       ├── types.ts                 ← TypeScript interfaces
│       └── useChatbot.ts            ← Chat state + streaming logic
├── .env.local.example               ← Copy to .env.local and fill in
├── next.config.js
├── tailwind.config.js
└── package.json
```

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in your keys:

```env
OPENAI_API_KEY=sk-...           # Required
EMAIL_USER=you@gmail.com        # For lead notifications
EMAIL_PASS=your-app-password    # Gmail App Password (not regular password)
EMAIL_TO=notify@yourcompany.com # Where leads are sent
# Twilio is optional — leave blank to skip WhatsApp
```

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — click the chat button (bottom right).

---

## 🧠 Customizing the FAQ (Most Important Step)

Open `src/lib/faqs.ts` and replace the example FAQs with your client's actual content:

```ts
export const faqs: FAQ[] = [
  {
    category: "Pricing",
    question: "How much does it cost?",
    answer: "Our plan starts at $X/month...",
  },
  // Add as many as you need
];
```

That's it. The system prompt is **auto-generated** from this list — no prompt engineering needed.

---

## 📧 Setting Up Gmail SMTP

1. Enable 2-factor authentication on your Google account
2. Go to **Google Account → Security → App Passwords**
3. Create an app password for "Mail"
4. Paste it as `EMAIL_PASS` in `.env.local`

> ⚠️ Never use your real Gmail password — always use an App Password.

---

## 💬 Setting Up WhatsApp (Twilio)

1. Create a free account at [twilio.com](https://www.twilio.com)
2. Activate the **WhatsApp Sandbox** in Twilio Console
3. Copy your `Account SID`, `Auth Token`, and sandbox number
4. Fill in the `TWILIO_*` variables in `.env.local`

> WhatsApp is optional. If keys are missing, lead submissions will silently skip it.

---

## 🌐 Deploy to Vercel (Free)

```bash
npm install -g vercel
vercel
```

Then add your environment variables in the **Vercel Dashboard → Settings → Environment Variables**.

Or deploy in one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

---

## 🔧 Tech Stack & Why

| Technology | Why |
|---|---|
| **Next.js 14** | Full-stack in one repo — API routes + React UI. No separate backend needed. |
| **OpenAI GPT-4o-mini** | Best cost/quality ratio for support bots (~$0.15/1M tokens) |
| **Edge Runtime** | API runs at the CDN edge → responses start in ~200ms worldwide |
| **Tailwind CSS** | Rapid UI development, no CSS files to manage |
| **Nodemailer** | Battle-tested email library, works with any SMTP |
| **Twilio** | Industry standard for WhatsApp Business API |

### Why Next.js over MERN or NestJS?

- **MERN** requires a separate Express server + React app + MongoDB — 3x more infrastructure for a chatbot.
- **NestJS** is great for large teams but overkill for a focused widget like this.
- **Next.js** gives you API routes, SSR, edge functions, and instant Vercel deployment all in one. Clients can go live in a day.

---

## 💰 Cost Estimate for Clients

| Usage | Monthly Cost |
|---|---|
| 1,000 conversations/mo | ~$0.50 (OpenAI) + $0 (Vercel hobby) |
| 10,000 conversations/mo | ~$5 (OpenAI) + $20 (Vercel pro) |
| 100,000 conversations/mo | ~$50 (OpenAI) + $20 (Vercel pro) |

> Very affordable SaaS to resell at $99–$299/month.

---

## 📦 Extending This Project

- **Database for leads**: Add Prisma + PostgreSQL (Neon.tech is free)
- **Dashboard**: Build an admin page to view all leads and chat logs
- **Multi-language**: Pass user language in the system prompt
- **Voice**: Add ElevenLabs TTS for voice responses
- **Analytics**: Track question categories with Vercel Analytics

---

## 📄 License

MIT — free to use for client projects.
