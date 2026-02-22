import { Hero } from "@/components/Hero";
import { Events } from "@/components/Events";
import { Story } from "@/components/Story";
import { RsvpForm } from "@/components/RsvpForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-sand text-foreground flex flex-col items-center">
      <Hero />
      <Story />
      <Events />
      <RsvpForm />
    </main>
  );
}
