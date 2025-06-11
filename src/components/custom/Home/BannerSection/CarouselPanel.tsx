import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image, { StaticImageData } from "next/image";
import CarouselImage1 from "@public/static/Carousel1.png";
import CarouselImage2 from "@public/static/Carousel2.png";
import React, { FC, ReactNode } from "react";
import Link from "next/link";
import BaseProps from "@/lib/Props/BaseProps";
import classNames from "classnames";

interface CustomCarouselItemProps extends BaseProps {
  src: StaticImageData;
  alt: string;
  link: string;
}

const CustomCarouselItem: FC<CustomCarouselItemProps> = (props) => {
  return (
    <CarouselItem className={classNames("", props.className)}>
      <Link href={props.link}>
        <Image src={props.src} alt={props.alt} className="object-cover" />
      </Link>
    </CarouselItem>
  );
};

export const CarouselPanel = () => {
  return (
    <div>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          <CustomCarouselItem
            src={CarouselImage1}
            alt="Carousel Image 1"
            link={"/"}
          />
          <CustomCarouselItem
            src={CarouselImage2}
            alt="Carousel Image 2"
            link={"/"}
          />
        </CarouselContent>
      </Carousel>
    </div>
  );
};
