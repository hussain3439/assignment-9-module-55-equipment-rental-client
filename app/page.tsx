import Banner from "@/components/home/Banner"
import CustomerReviews from "@/components/home/CustomerReviews"
import HowItWorks from "@/components/home/HowItWorks"
import WhyChooseUs from "@/components/home/WhyChooseUs"
import { Navbar } from "@/components/shared/Navbar"

export default function Page() {
  return (
    <div>
      <Navbar />

      <Banner
        youtubeVideoId="peF3guVs01g"
        videoTitle="Renthobe - The Fastest Rental Service in Bangladesh"
        phone="+8801XXXXXXXXX"
        whatsappNumber="8801XXXXXXXXX"
      />
      <HowItWorks />
      <CustomerReviews/>
      <WhyChooseUs />
    </div>
  )
}
