import { IconSection } from "@/components/custom/NavigationBar/IconSection";
import { MenuSection } from "@/components/custom/NavigationBar/MenuSection";
import EventBriteLogo from "@public/static/cropped-eventbrite.png";
import Image from "next/image";

export const NavigationBar = () => {
  return (
    <div className="grid grid-cols-12 h-20 py-2 px-3 place-items-center border-b-2">
      <div className="col-span-2">
        <Image
          src={EventBriteLogo}
          alt="Logo"
          className="h-12 object-contain"
        />
      </div>
      <div className="col-span-7">
        <MenuSection />
      </div>
      <div className="col-span-3">
        <IconSection />
      </div>
    </div>
  );
};
