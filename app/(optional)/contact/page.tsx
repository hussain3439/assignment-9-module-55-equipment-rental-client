"use client";

import * as React from "react";
import { Phone, Mail, MapPin, Clock, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// NOTE: replace with your real contact details
const CONTACTS = [
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+880 1XXX-XXXXXX"],
    href: "tel:+8801XXXXXXXXX",
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["support@renthobe.com"],
    href: "mailto:support@renthobe.com",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    lines: ["Barishal, Bangladesh"],
  },
  {
    icon: Clock,
    title: "Working Hours",
    lines: ["Sat – Thu: 9:00 AM – 8:00 PM", "Friday: Closed"],
  },
];

const FAQS = [
  {
    q: "How do I rent equipment?",
    a: "Browse the equipment list, choose your rental dates and quantity, then pay securely through Stripe. Your booking is confirmed after successful payment.",
  },
  {
    q: "How can I list my equipment?",
    a: "Register as an owner, open your dashboard and add your equipment. Our team reviews it and approves it before it goes live.",
  },
  {
    q: "What payment methods are supported?",
    a: "Payments are processed securely through Stripe, so you can pay with supported cards.",
  },
  {
    q: "Can I rent for a longer period?",
    a: "Yes. Equipment can be rented on a daily, weekly or monthly basis depending on what the owner offers.",
  },
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const EMPTY: FormState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactPage() {
  const [form, setForm] = React.useState<FormState>(EMPTY);
  const [loading, setLoading] = React.useState(false);

  const onChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: connect to your backend, e.g.
      // await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(form),
      // });
      await new Promise((r) => setTimeout(r, 800));
      toast.success("Message sent! We'll get back to you soon.");
      setForm(EMPTY);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full overflow-x-hidden">
      {/* Hero */}
      <section className="bg-gradient-to-b from-emerald-50 to-background">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-20">
          <Badge
            variant="outline"
            className="mb-4 border-green-600/30 bg-green-50 px-3 py-1 text-green-700"
          >
            Contact Us
          </Badge>
          <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            We&apos;d love to <span className="text-green-600">hear from you</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Have a question about renting or listing equipment? Send us a message
            and our team will respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Info cards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CONTACTS.map(({ icon: Icon, title, lines, href }) => {
            const body = (
              <CardContent className="flex h-full flex-col items-center gap-3 p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600 transition-colors group-hover:bg-green-600 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold">{title}</h3>
                <div className="space-y-0.5 text-sm text-muted-foreground">
                  {lines.map((l) => (
                    <p key={l} className="break-words">
                      {l}
                    </p>
                  ))}
                </div>
              </CardContent>
            );
            return (
              <Card
                key={title}
                className="group transition-all duration-300 hover:-translate-y-1 hover:border-green-600/40 hover:shadow-xl hover:shadow-green-600/10"
              >
                {href ? (
                  <a href={href} className="block h-full">
                    {body}
                  </a>
                ) : (
                  body
                )}
              </Card>
            );
          })}
        </div>
      </section>

      {/* Form + side panel */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">
                Send us a message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      required
                      value={form.name}
                      onChange={onChange("name")}
                      placeholder="Your name"
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={onChange("email")}
                      placeholder="you@example.com"
                      className="h-11"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={onChange("phone")}
                      placeholder="01XXXXXXXXX"
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      required
                      value={form.subject}
                      onChange={onChange("subject")}
                      placeholder="How can we help?"
                      className="h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={onChange("message")}
                    placeholder="Write your message here..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="h-11 w-full rounded-full bg-green-600 px-8 hover:bg-green-700 sm:w-auto"
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="mr-2 h-4 w-4" />
                  )}
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* FAQ */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold sm:text-2xl">
              Frequently asked questions
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Quick answers to common questions.
            </p>
            <Accordion  className="mt-4">
              {FAQS.map((f, i) => (
                <AccordionItem key={f.q} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-sm sm:text-base">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </main>
  );
}
