import NavBar from "@/components/ui/NavBar";
import Hero from "@/components/sections/Hero";
import TheGap from "@/components/sections/TheGap";
import TheBridge from "@/components/sections/TheBridge";
import VideoScrub from "@/components/sections/VideoScrub";
import TheGift from "@/components/sections/TheGift";
import TheMeeting from "@/components/sections/TheMeeting";
import Testimonials from "@/components/sections/Testimonials";
import WaitingList from "@/components/sections/WaitingList";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main className="relative bg-[#0D0E1A] min-h-screen">
      <NavBar />
      <Hero />
      <TheGap />
      <TheBridge />
      <VideoScrub />
      <TheGift />
      <TheMeeting />
      <Testimonials />
      <WaitingList />
      <FinalCTA />
    </main>
  );
}
