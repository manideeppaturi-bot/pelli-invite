import { Hero } from "@/components/Hero";
import { Events } from "@/components/Events";
import { Story } from "@/components/Story";
import { RsvpForm } from "@/components/RsvpForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#3B8A73] font-sans relative">
      {/* Fixed Hero Background for perfect Parallax scroll-over effect */}
      <div className="fixed inset-0 z-0 w-full h-screen">
        <Hero />
      </div>

      {/* Transparent Spacer to let user see the Hero fully before scrolling */}
      <div className="w-full h-[100svh] bg-transparent pointer-events-none" />

      {/* The rest of the content which slides UP *over* the Hero */}
      <div className="relative z-10 w-full rounded-t-[60px] md:rounded-t-[120px] shadow-[0_-20px_60px_rgba(0,0,0,0.4)] overflow-hidden bg-[#FDF9D2]">
        {/* Subtle Border Overlay on the rounded arch edge */}
        <div className="absolute top-2 left-0 w-full h-4 bg-[repeating-linear-gradient(90deg,#E79300,#E79300_15px,#CF2F2A_15px,#CF2F2A_30px)] shadow-md z-30 opacity-90" />

        <Story />
        <Events />
        <RsvpForm />
      </div>
    </main>
  );
}
