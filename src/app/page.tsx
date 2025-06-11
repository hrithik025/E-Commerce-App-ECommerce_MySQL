import { BannerSection, PromiseSection } from "@/components/custom/Home";
import { BestProductSection } from "@/components/custom/Home/BestProductSection";

export default function Home() {
  return (
    <div className="px-20">
      <BannerSection />
      <PromiseSection />
      <BestProductSection />
    </div>
  );
}
