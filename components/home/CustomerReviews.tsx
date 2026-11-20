import { Quote, Star } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

// Sample data: replace with real reviews
const REVIEWS = [
  {
    id: 1,
    name: "Rahim Uddin",
    role: "Event Organizer",
    rating: 5,
    comment:
      "I rented a generator and sound system for a wedding. Booking was quick and the equipment was in perfect condition.",
  },
  {
    id: 2,
    name: "Sadia Rahman",
    role: "Photographer",
    rating: 5,
    comment:
      "Renting a professional camera for a weekend shoot saved me a lot of money. The owner was friendly and on time.",
  },
  {
    id: 3,
    name: "Tanvir Hossain",
    role: "Contractor",
    rating: 4,
    comment:
      "Found construction machinery for our project within minutes. Flexible weekly rental made budgeting easy.",
  },
  {
    id: 4,
    name: "Nusrat Jahan",
    role: "Startup Founder",
    rating: 5,
    comment:
      "We rented laptops for a short-term team. Secure payment and clear terms gave us complete confidence.",
  },
  {
    id: 5,
    name: "Mahmudul Hasan",
    role: "Farmer",
    rating: 4,
    comment:
      "Rented agriculture equipment during harvest season at an affordable price. A stress-free experience.",
  },
]

const arrowClass =
  "h-11 w-11 border-white/20 bg-white/10 text-white backdrop-blur transition-all hover:scale-110 hover:border-green-400 hover:bg-green-500 hover:text-white disabled:opacity-40"

export function CustomerReviews() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-emerald-950 via-green-900 to-emerald-900">
      {/* glow decoration */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-green-400/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-emerald-300/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <Badge className="mb-4 border border-green-400/30 bg-green-400/10 px-3 py-1 text-green-300 hover:bg-green-400/10">
            Testimonials
          </Badge>
          <h2 className="text-balance text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Loved by <span className="text-green-400">customers</span> across
            Bangladesh
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-green-100/70 sm:text-base">
            Real experiences from people who rented equipment through Renthobe.
          </p>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{ align: "start", loop: true }}
          className="mx-auto mt-12 w-full sm:px-14"
        >
          <CarouselContent className="-ml-5 py-3">
            {REVIEWS.map((review) => (
              <CarouselItem
                key={review.id}
                className="basis-full pl-5 md:basis-1/2 lg:basis-1/3"
              >
                <Card className="group relative h-full overflow-hidden rounded-2xl border-white/10 bg-white/[0.07] text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-green-400/50 hover:bg-white/[0.12]">
                  {/* big faded quote */}
                  <Quote className="absolute right-5 top-5 h-14 w-14 text-green-400/15 transition-colors group-hover:text-green-400/30" />

                  <CardContent className="relative flex h-full flex-col gap-5 p-6 sm:p-7">
                    {/* rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={
                              i < review.rating
                                ? "h-4 w-4 fill-amber-400 text-amber-400"
                                : "h-4 w-4 fill-white/10 text-white/20"
                            }
                          />
                        ))}
                      </div>
                      <span className="rounded-full bg-amber-400/15 px-2 py-0.5 text-xs font-semibold text-amber-300">
                        {review.rating}.0
                      </span>
                    </div>

                    {/* comment */}
                    <p className="flex-1 text-sm leading-relaxed text-green-50/90 sm:text-base">
                      &ldquo;{review.comment}&rdquo;
                    </p>

                    {/* customer */}
                    <div className="flex items-center gap-3 border-t border-white/10 pt-5">
                      <Avatar className="h-12 w-12 ring-2 ring-green-400/40">
                        <AvatarFallback className="bg-gradient-to-br from-green-400 to-emerald-600 text-base font-bold text-white">
                          {review.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate font-semibold">{review.name}</p>
                        <p className="truncate text-xs text-green-200/60">
                          {review.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* left & right arrows */}
          <CarouselPrevious className={`left-1 sm:left-0 ${arrowClass}`} />
          <CarouselNext className={`right-1 sm:right-0 ${arrowClass}`} />
        </Carousel>
      </div>
    </section>
  )
}

export default CustomerReviews
