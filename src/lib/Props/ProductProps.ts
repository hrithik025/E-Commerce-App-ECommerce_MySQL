import BaseProps from "@/lib/Props/BaseProps";

export interface ProductProps extends BaseProps {
    name: string;
    shortName?: string;
    originalPrice: number;
    latestPrice: number;
    rating: number;
    discount?: number;
    isOutOfStock?: boolean;
    isWishlisted?: boolean;
}