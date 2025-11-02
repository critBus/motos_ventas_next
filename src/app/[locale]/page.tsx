import HeroSection from "./_components/home/HeroSection";
import PremiumSelectionSection from "./_components/home/PremiunSelectionSection";

export default function Home() {
  return (
    <main className="pt-20">
      <div className="bg-zinc-950">
        <HeroSection />
        <PremiumSelectionSection />
      </div>
    </main>
  );
}
