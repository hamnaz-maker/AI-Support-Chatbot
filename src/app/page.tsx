// src/app/page.tsx
import ChatWidget from "@/components/ChatWidget";
import { Zap, Shield, Clock, BarChart3, ArrowRight, CheckCircle } from "lucide-react";

const features = [
  { icon: Clock, title: "24/7 Availability", desc: "Never miss a customer query — your AI agent works around the clock, even on holidays." },
  { icon: Zap, title: "Instant Responses", desc: "Sub-second response times powered by GPT-4o-mini. No more waiting in queues." },
  { icon: Shield, title: "Custom FAQ Training", desc: "Train the bot on your exact knowledge base. It answers using your business data." },
  { icon: BarChart3, title: "Lead Capture", desc: "Automatically collect leads and get notified via email and WhatsApp instantly." },
];

const pricingPlans = [
  { name: "Starter", price: "$29", period: "/mo", features: ["1 chatbot", "500 conversations/mo", "Email support", "Basic analytics"], cta: "Start free trial" },
  { name: "Pro", price: "$79", period: "/mo", featured: true, features: ["5 chatbots", "5,000 conversations/mo", "WhatsApp integration", "Lead capture CRM", "Priority support"], cta: "Start free trial" },
  { name: "Enterprise", price: "Custom", period: "", features: ["Unlimited chatbots", "Unlimited conversations", "Dedicated account manager", "Custom integrations", "SLA guarantee"], cta: "Contact sales" },
];

export default function Home() {
  return (
    <main className="min-h-screen font-sans">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/5 max-w-6xl mx-auto">
        <span className="font-display font-bold text-xl tracking-tight">
          <span className="text-brand-500">Acme</span>Corp
        </span>
        <div className="hidden md:flex gap-8 text-sm text-gray-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#demo" className="hover:text-white transition-colors">Demo</a>
        </div>
        <button className="text-sm bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg transition-colors">
          Get started free
        </button>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-8 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 text-brand-500 rounded-full px-4 py-1.5 text-xs font-medium mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
          AI-powered · Replies in under 2 seconds
        </div>
        <h1 className="font-display font-extrabold text-5xl md:text-7xl leading-tight mb-6">
          Customer support<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-blue-400">
            without the team
          </span>
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10">
          Deploy an AI chatbot trained on your FAQs in minutes. Capture leads 24/7 and never leave a customer waiting again.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-brand-500/25">
            Start free — no card needed <ArrowRight size={16} />
          </button>
          <button className="border border-white/10 hover:border-white/20 text-gray-300 hover:text-white px-8 py-3.5 rounded-xl font-medium transition-colors">
            See demo ↓
          </button>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-8 py-20">
        <h2 className="font-display font-bold text-3xl text-center mb-12">
          Everything you need to automate support
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-surface-1 border border-white/5 rounded-2xl p-6 hover:border-brand-500/30 transition-colors group">
              <div className="w-10 h-10 bg-brand-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-500/20 transition-colors">
                <Icon size={20} className="text-brand-500" />
              </div>
              <h3 className="font-display font-semibold text-white mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Demo section */}
      <section id="demo" className="max-w-6xl mx-auto px-8 py-10 text-center">
        <div className="bg-surface-1 border border-white/5 rounded-3xl p-12">
          <h2 className="font-display font-bold text-3xl mb-4">Try it live</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Click the chat button in the bottom-right corner. Ask about pricing, integrations, or anything else.
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            {["What plans do you offer?", "How do I reset my password?", "Do you have an API?"].map(q => (
              <span key={q} className="bg-surface-2 border border-white/10 text-gray-400 px-3 py-1.5 rounded-full">{q}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-6xl mx-auto px-8 py-20">
        <h2 className="font-display font-bold text-3xl text-center mb-12">Simple, transparent pricing</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-6 border ${
                plan.featured
                  ? "bg-brand-500/5 border-brand-500/40 shadow-lg shadow-brand-500/10"
                  : "bg-surface-1 border-white/5"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                  Most popular
                </span>
              )}
              <p className="font-display font-semibold text-white mb-1">{plan.name}</p>
              <div className="flex items-end gap-1 mb-5">
                <span className="font-display font-extrabold text-4xl">{plan.price}</span>
                <span className="text-gray-500 text-sm mb-1">{plan.period}</span>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2 text-sm text-gray-400">
                    <CheckCircle size={15} className="text-green-400 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  plan.featured
                    ? "bg-brand-500 hover:bg-brand-600 text-white"
                    : "border border-white/10 hover:border-white/20 text-gray-300 hover:text-white"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-8 py-8 text-center text-gray-600 text-sm max-w-6xl mx-auto">
        © 2024 AcmeCorp · Built with Next.js + OpenAI
      </footer>

      {/* The Chatbot */}
      <ChatWidget />
    </main>
  );
}
