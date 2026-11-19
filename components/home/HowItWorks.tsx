import Link from "next/link"

// All steps are here. To change the text, just edit this list.
const steps = [
  {
    number: 1,
    title: "Tell Us What You Need",
    description: "Search our website or submit your rental requirement.",
  },
  {
    number: 2,
    title: "Get Rental Options",
    description:
      "We help you find suitable equipment or services based on your requirement.",
  },
  {
    number: 3,
    title: "Confirm Your Rental",
    description:
      "Confirm availability, rental period, pricing and service requirements.",
  },
  {
    number: 4,
    title: "Rent & Use",
    description:
      "Arrange delivery or collection and use the equipment or service for your project.",
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4">
        {/* Heading */}
        <div className="text-center">
          <p className="text-sm font-semibold tracking-wide text-green-600 uppercase">
            How it works
          </p>
          <h2 className="mt-2 text-3xl font-bold text-black sm:text-4xl">
            Renting Made Simple
          </h2>
        </div>

        {/* Steps: 1 column on mobile, 2 on tablet, 4 on desktop */}
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {steps.map((step, index) => (
            <div key={step.number}>
              {/* Number circle + dotted line */}
              <div className="flex items-center">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-green-600 text-xl font-bold text-white">
                  {step.number}
                </div>

                {/* Dotted line: only on desktop, and not after the last step */}
                {index !== steps.length - 1 && (
                  <div className="mx-2 hidden flex-1 border-t-2 border-dotted border-green-600 lg:block" />
                )}
              </div>

              <h3 className="mt-5 text-xl font-semibold text-black">
                {step.title}
              </h3>
              <p className="mt-2 pr-6 text-gray-700">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="inline-block rounded-md bg-green-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700"
          >
            Request a Rental
          </Link>
        </div>
      </div>
    </section>
  )
}