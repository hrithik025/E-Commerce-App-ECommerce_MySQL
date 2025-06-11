"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui";
import { GetProductVariantImageData } from "@/server/entities/queries/ProductImage.query";
import { GetProductVariantImageSchema } from "@/server/types";
import { ImageDataSchema } from "@/server/types/ProductImage.type";
import React, { FC, useEffect, useState } from "react";

interface ClientCarouselProps {
  images: GetProductVariantImageSchema[];
  currentImageIdx: number;
  setCurrentImageIdx: (idx: number) => void;
}

export const ClientCarousel: FC<ClientCarouselProps> = ({
  images,
  currentImageIdx,
  setCurrentImageIdx,
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [imagesApi, setImagesApi] = useState<CarouselApi>();
  const [imagesData, setImagesData] = useState<ImageDataSchema>({});

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrentImageIdx(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    if (imagesApi) {
      scrollToNthImage(imagesApi, currentImageIdx);
    }

    if (api) {
      scrollToNthImage(api, currentImageIdx);
    }
  }, [currentImageIdx]);

  const scrollToNthImage = (api: CarouselApi, idx: number) => {
    if (!api) return;
    api.scrollTo(idx);
  };

  const loadImages = () => {
    images.forEach((image) => {
      GetProductVariantImageData(image.Id).then((result) => {
        if (result.success && result.data !== null) {
          setImagesData((prevData) => ({
            ...prevData,
            [image.Id]: result.data,
          }));
        }
      });
    });
  };

  useEffect(() => {
    loadImages();
  }, [images]);

  return (
    <>
      <div className="col-span-2">
        <Carousel
          opts={{ align: "start" }}
          orientation="vertical"
          setApi={setImagesApi}
        >
          <CarouselContent className="my-2 flex space-y-4 h-[580px]">
            {imagesData === null ? (
              <></>
            ) : (
              Object.values(imagesData).map((imageData, idx) => (
                <CarouselItem
                  key={idx}
                  className={`border-2 md:basis-1/5 ${
                    idx === currentImageIdx ? "border-default" : ""
                  }`}
                  onClick={() => setCurrentImageIdx(idx)}
                >
                  <img
                    src={imageData?.Data}
                    alt="ProductImage"
                    className="object-contain hover:cursor-pointer"
                  />
                </CarouselItem>
              ))
            )}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="col-span-10">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {imagesData === null ? (
              <></>
            ) : (
              Object.values(imagesData).map((imageData, idx) => (
                <CarouselItem
                  key={idx}
                  className="flex items-center justify-center"
                >
                  <img
                    src={imageData?.Data}
                    alt="ProductImage"
                    className="object-contain self-center h-[600px] hover:cursor-grab"
                  />
                </CarouselItem>
              ))
            )}
          </CarouselContent>
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>
      </div>
    </>
  );
};
