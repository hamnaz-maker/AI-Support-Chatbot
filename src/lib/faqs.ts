// src/lib/faqs.ts
// ─────────────────────────────────────────────────────────
// This is the "training data" for the chatbot.
// Replace these with your client's actual FAQs.
// The system prompt is built from this list automatically.
// ─────────────────────────────────────────────────────────

export interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME ?? "AcmeCorp";

export const faqs: FAQ[] = [
  // Pricing
  {
    category: "Pricing",
    question: "How much does your service cost?",
    answer:
      "We offer three plans: Starter ($29/mo), Pro ($79/mo), and Enterprise (custom pricing). All plans include a 14-day free trial with no credit card required.",
  },
  {
    category: "Pricing",
    question: "Do you offer refunds?",
    answer:
      "Yes! We have a 30-day money-back guarantee. If you're not satisfied, contact support and we'll issue a full refund, no questions asked.",
  },
  {
    category: "Pricing",
    question: "Can I change my plan later?",
    answer:
      "Absolutely. You can upgrade or downgrade at any time from your dashboard. Upgrades are effective immediately; downgrades apply at the next billing cycle.",
  },

  // Technical
  {
    category: "Technical",
    question: "What integrations do you support?",
    answer:
      "We integrate with Slack, Zapier, HubSpot, Salesforce, Shopify, and over 200 other tools via our REST API and webhooks.",
  },
  {
    category: "Technical",
    question: "Is there an API available?",
    answer:
      "Yes. Our REST API is available on Pro and Enterprise plans. Full documentation is available at docs.acmecorp.com.",
  },
  {
    category: "Technical",
    question: "What uptime do you guarantee?",
    answer:
      "We guarantee 99.9% uptime backed by an SLA. Our infrastructure is hosted on AWS with multi-region failover.",
  },

  // Support
  {
    category: "Support",
    question: "How do I contact support?",
    answer:
      "You can reach us via live chat (24/7), email at support@acmecorp.com, or phone (Mon–Fri, 9am–6pm EST). Enterprise customers get a dedicated account manager.",
  },
  {
    category: "Support",
    question: "How long does it take to get a response?",
    answer:
      "Live chat: under 2 minutes. Email: within 4 hours. We also have an extensive knowledge base at help.acmecorp.com for self-service.",
  },

  // Account
  {
    category: "Account",
    question: "How do I reset my password?",
    answer:
      "Click 'Forgot password' on the login page and enter your email. You'll receive a reset link within 60 seconds. Check your spam folder if it doesn't arrive.",
  },
  {
    category: "Account",
    question: "Can I have multiple team members on one account?",
    answer:
      "Yes. Starter supports up to 3 seats, Pro up to 15, and Enterprise is unlimited. Team members can have different roles: Admin, Editor, or Viewer.",
  },

  // Onboarding
  {
    category: "Onboarding",
    question: "How do I get started?",
    answer:
      "Sign up for a free trial, complete the 5-minute onboarding wizard, and you're live. Most customers are fully set up within 30 minutes.",
  },
  {
    category: "Onboarding",
    question: "Do you offer onboarding assistance?",
    answer:
      "Yes! Pro and Enterprise plans include a 1-on-1 onboarding call with a customer success specialist. We also have 50+ video tutorials and a community forum.",
  },
];

// ─────────────────────────────────────────────────────────
// Build the system prompt dynamically from the FAQ list
// ─────────────────────────────────────────────────────────
export function buildSystemPrompt(): string {
  const faqBlock = faqs
    .map((f) => `Q: ${f.question}\nA: ${f.answer}`)
    .join("\n\n");

  return `You are a friendly, professional customer support assistant for ${COMPANY_NAME}.
Your job is to help users quickly and accurately based on the information below.

RULES:
- Answer ONLY based on the provided FAQ data unless the question is generic (greetings, thanks, etc.).
- If you don't know the answer, say: "I don't have that information right now — let me connect you with a human agent. You can also leave your details using the form below."
- Keep answers concise (2–4 sentences max) and conversational.
- Never make up pricing, dates, or features not listed below.
- If a user seems frustrated, empathize first, then help.
- End responses with a follow-up question when appropriate (e.g., "Is there anything else I can help you with?").

FAQ KNOWLEDGE BASE:
${faqBlock}

Today's date: ${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}`;
}
