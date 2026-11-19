"use client"

import * as React from "react"
import { Phone, MessageCircle, Search, Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"

type RentalBannerProps = {
  /** YouTube video ID (the part after `v=` in the URL) */
  youtubeVideoId: string
  videoTitle?: string
  phone?: string
  whatsappNumber?: string
  onSearch?: (query: string) => void
}

const RENTAL_TYPES = ["Daily", "Weekly", "Monthly Rentals"]

export function Banner({
  youtubeVideoId='peF3guVs01g',
  videoTitle = "Equipment rental video",
  phone = "+8801XXXXXXXXX",
  whatsappNumber = "8801XXXXXXXXX",
  onSearch,
}: RentalBannerProps) {
  const [query, setQuery] = React.useState("")
  const [playing, setPlaying] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(query.trim())
  }

  return (
    <section className="w-full overflow-x-hidden bg-emerald-50/60">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-6 px-4 py-8 sm:gap-8 sm:px-6 sm:py-10 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-14">
        {/* Content */}
        <div className="min-w-0 space-y-4 sm:space-y-5">
          <h1 className="text-2xl leading-tight font-bold tracking-tight text-balance sm:text-3xl lg:text-4xl">
            Rental Service in Bangladesh
          </h1>

          <h2 className="text-base font-semibold sm:text-lg">
            Rent What You Need. When You Need It.
          </h2>

          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            Renthobe is a{" "}
            <strong className="text-foreground">
              rental service platform in Bangladesh
            </strong>{" "}
            offering equipment, products and professional rental solutions for
            businesses, events, projects and individuals.
          </p>

          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            Rent{" "}
            <strong className="text-foreground">
              generators, laptops, office equipment, event equipment, medical
              equipment, construction machinery, cameras and videography
              equipment
            </strong>{" "}
            through Renthobe.
          </p>

          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {RENTAL_TYPES.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-2 w-2 shrink-0 rounded-full bg-green-600" />
                {item}
              </li>
            ))}
          </ul>

          {/* Search: stacked on phones, inline from sm */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 sm:flex-row"
          >
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type to start searching..."
              aria-label="Search rentals"
              className="h-11 min-w-0 flex-1 border-green-600 bg-white focus-visible:ring-green-600 sm:h-12"
            />
            <Button
              type="submit"
              className="h-11 w-full bg-green-600 px-6 hover:bg-green-700 sm:h-12 sm:w-auto"
            >
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </form>

          {/* CTAs: side by side on all sizes, full width on tiny screens */}
          {/* <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:flex sm:flex-wrap">
            <Button className="h-11 rounded-full bg-green-600 px-6 hover:bg-green-700 sm:h-12 sm:px-8">
              <a href={`tel:${phone}`}>
                <Phone className="mr-2 h-4 w-4" />
                Call Now
              </a>
            </Button>
            <Button className="h-11 rounded-full bg-black px-6 text-white hover:bg-black/80 sm:h-12 sm:px-8">
              <Link
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Send Message
              </Link>
            </Button>
          </div> */}
        </div>

        {/* Video: always 16:9, scales with container */}
        <div className="mx-auto w-full max-w-2xl min-w-0 overflow-hidden rounded-lg border-2 border-green-600 bg-black shadow-lg sm:border-[3px] lg:max-w-none">
          <div className="relative aspect-video w-full">
            {playing ? (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0`}
                title={videoTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={`Play video: ${videoTitle}`}
                className="group absolute inset-0 h-full w-full"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <Image
                  src={`https://img.youtube.com/vi/${youtubeVideoId}/hqdefault.jpg`}
                  alt={videoTitle}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition group-hover:bg-black/30">
                  <span className="flex h-11 w-16 items-center justify-center rounded-xl bg-red-600 shadow-lg transition group-hover:scale-105 sm:h-14 sm:w-20">
                    <Play className="h-5 w-5 fill-white text-white sm:h-6 sm:w-6" />
                  </span>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Banner

/*
Usage:

<RentalBanner
  youtubeVideoId="YOUR_VIDEO_ID"
  videoTitle="Renthobe - The Fastest Rental Service in Bangladesh"
  phone="+8801XXXXXXXXX"
  whatsappNumber="8801XXXXXXXXX"
  onSearch={(q) => router.push(`/search?q=${encodeURIComponent(q)}`)}
/>

Required: npx shadcn@latest add button input
Requires Tailwind v3.3+ (text-balance, min-[420px]:) 
*/
