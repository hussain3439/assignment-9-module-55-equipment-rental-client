import Link from "next/link";
import type { Metadata } from "next";
import {
  Target,
  Eye,
  ShieldCheck,
  BadgeDollarSign,
  Handshake,
  Zap,
  Search,
  CalendarCheck,
  CreditCard,
  ArrowRight,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About Us | Renthobe",
  description:
    "Learn about Renthobe, a trusted equipment rental marketplace connecting owners and customers across Bangladesh.",
};

// NOTE: replace these with your real numbers
const STATS = [
  { value: "500+", label: "Equipment Listed" },
  { value: "200+", label: "Verified Owners" },
  { value: "1,000+", label: "Happy Customers" },
  { value: "6", label: "Equipment Categories" },
];

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Trust & Safety",
    text: "Every owner and listing is reviewed before going live, so renters can book with confidence.",
  },
  {
    icon: BadgeDollarSign,
    title: "Fair Pricing",
    text: "Transparent rental prices with no hidden charges. You see the total before you pay.",
  },
  {
    icon: Handshake,
    title: "Community First",
    text: "We help owners earn from idle equipment and help customers access what they need without buying.",
  },
  {
    icon: Zap,
    title: "Fast & Simple",
    text: "Search, book and pay online in minutes with flexible daily, weekly or monthly rentals.",
  },
];

const STEPS = [
  {
    icon: Search,
    title: "Find Equipment",
    text: "Search by name, location, category or price to find exactly what you need.",
  },
  {
    icon: CalendarCheck,
    title: "Book Your Dates",
    text: "Pick your rental period and quantity. Availability and total cost are calculated instantly.",
  },
  {
    icon: CreditCard,
    title: "Pay Securely",
    text: "Complete payment through Stripe and get your booking confirmed right away.",
  },
];

export default function AboutPage() {
  return (
    <main className="w-full overflow-x-hidden">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-emerald-50 to-background">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20 lg:py-24">
          <Badge
            variant="outline"
            className="mb-4 border-green-600/30 bg-green-50 px-3 py-1 text-green-700"
          >
            About Us
          </Badge>
          <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Making equipment rental{" "}
            <span className="text-green-600">simple, safe and affordable</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Renthobe is an equipment rental marketplace that connects equipment
            owners with customers. Whether it&apos;s a camera for a shoot, a
            generator for an event or machinery for a project, you can rent what
            you need, when you need it.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
            
              className="h-11 rounded-full bg-green-600 px-8 hover:bg-green-700"
            >
              <Link href="/equipment">
                Browse Equipment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button  variant="outline" className="h-11 rounded-full px-8">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Card className="-mt-6 border-green-600/20 shadow-lg shadow-green-600/5 sm:-mt-8">
          <CardContent className="grid grid-cols-2 gap-6 p-6 sm:p-8 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold text-green-600 sm:text-3xl lg:text-4xl">
                  {s.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                  {s.label}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* Mission & Vision */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              icon: Target,
              title: "Our Mission",
              text: "To make quality equipment accessible to everyone in Bangladesh by building a transparent, secure and easy-to-use rental marketplace for businesses, events, projects and individuals.",
            },
            {
              icon: Eye,
              title: "Our Vision",
              text: "To become the most trusted rental platform in the country, where owners earn more from their equipment and customers never have to overspend on things they only need for a short time.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <Card
              key={title}
              className="group transition-all duration-300 hover:-translate-y-1 hover:border-green-600/40 hover:shadow-xl hover:shadow-green-600/10"
            >
              <CardContent className="flex gap-4 p-6 sm:p-8">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600 transition-colors group-hover:bg-green-600 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {text}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              What we <span className="text-green-600">stand for</span>
            </h2>
            <p className="mt-4 text-sm text-muted-foreground sm:text-base">
              The principles behind every listing, booking and payment on our
              platform.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {VALUES.map(({ icon: Icon, title, text }) => (
              <Card
                key={title}
                className="group transition-all duration-300 hover:-translate-y-1 hover:border-green-600/40 hover:shadow-xl hover:shadow-green-600/10"
              >
                <CardContent className="flex h-full flex-col gap-3 p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600 transition-colors group-hover:bg-green-600 group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            How <span className="text-green-600">Renthobe</span> works
          </h2>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            Renting equipment takes just three simple steps.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <div key={title} className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-600 text-white shadow-lg shadow-green-600/20">
                <Icon className="h-7 w-7" />
              </div>
              <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-wider text-green-600">
                Step {i + 1}
              </span>
              <h3 className="mt-1 text-lg font-semibold">{title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8">
        <div className="rounded-2xl bg-green-600 px-6 py-10 text-center text-white sm:px-12 sm:py-14">
          <h2 className="text-balance text-2xl font-bold sm:text-3xl">
            Ready to rent or list your equipment?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-green-50 sm:text-base">
            Join Renthobe today and start renting or earning from your equipment.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              
              className="h-11 rounded-full bg-white px-8 text-green-700 hover:bg-green-50"
            >
              <Link href="/register">Get Started</Link>
            </Button>
            <Button
              
              variant="outline"
              className="h-11 rounded-full border-white bg-transparent px-8 text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/equipment">Explore Equipment</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

