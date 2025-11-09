import HeroSection from "./_components/home/HeroSection";
import PremiumSelectionSection from "./_components/home/PremiunSelectionSection";
import ReadyToStart from "./_components/home/ReadyToStart";
import WhyChooseUsSection from "./_components/home/WhyChooseUsSection";

export default function Home() {
  return (
    <div className="bg-zinc-950">
      <HeroSection />
      <PremiumSelectionSection />
      <WhyChooseUsSection />
      <ReadyToStart />
    </div>
  );
}
