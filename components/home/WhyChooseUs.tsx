import { BadgeDollarSign, ShieldCheck, CalendarClock, Lock } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  highlight: string;
};

const FEATURES: Feature[] = [
  {
    icon: BadgeDollarSign,
    title: "Affordable Rental Prices",
    description:
      "Get the equipment you need at competitive, transparent prices. No hidden charges, so you only pay for what you use.",
    highlight: "Best value",
  },
  {
    icon: ShieldCheck,
    title: "Verified Equipment Owners",
    description:
      "Every owner and listing is checked by our team, so you can rent with confidence and get reliable, well-maintained equipment.",
    highlight: "100% verified",
  },
  {
    icon: CalendarClock,
    title: "Flexible Rental Period",
    description:
      "Rent for a day, a week or a month. Choose the duration that fits your event, project or business needs.",
    highlight: "Daily · Weekly · Monthly",
  },
  {
    icon: Lock,
    title: "Secure Payment System",
    description:
      "Pay safely through trusted payment methods. Your transactions and personal information are protected at every step.",
    highlight: "Safe & protected",
  },
];

export function WhyChooseUs() {
  return (
    <section className="relative w-full overflow-hidden bg-background">
      {/* soft background decoration */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-emerald-50 to-transparent"
      />

      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <Badge
            variant="outline"
            className="mb-4 border-green-600/30 bg-green-50 px-3 py-1 text-green-700"
          >
            Why Choose Us
          </Badge>
          <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            Why customers choose <span className="text-green-600">Renthobe</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Bangladesh&apos;s trusted rental platform, built to make renting
            equipment simple, safe and affordable.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, description, highlight }) => (
            <Card
              key={title}
              className="group relative overflow-hidden border-border/60 transition-all duration-300 hover:-translate-y-1 hover:border-green-600/40 hover:shadow-xl hover:shadow-green-600/10"
            >
              {/* top accent line */}
              <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-green-600 transition-transform duration-300 group-hover:scale-x-100" />

              <CardContent className="flex h-full flex-col gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600 ring-1 ring-green-600/10 transition-colors duration-300 group-hover:bg-green-600 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="text-lg font-semibold leading-snug">{title}</h3>

                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>

                <Badge
                  variant="secondary"
                  className="w-fit bg-green-50 font-medium text-green-700 hover:bg-green-50"
                >
                  {highlight}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;

