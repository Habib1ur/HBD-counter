import { Hero } from "@/components/home/Hero";
import { BirthdaySpotlight } from "@/components/home/BirthdaySpotlight";
import { FriendsGrid } from "@/components/home/FriendsGrid";
import { DoubleBirthdayBanner } from "@/components/home/DoubleBirthdayBanner";
import { WishesSection } from "@/components/home/WishesSection";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-6 sm:gap-10">
      <Hero />
      <BirthdaySpotlight />
      <FriendsGrid />
      <DoubleBirthdayBanner />
      <WishesSection />
    </div>
  );
}
