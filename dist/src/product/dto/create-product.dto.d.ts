export declare class CreateProductDto {
    name: string;
    description: string;
    videoUrl?: string;
    price: number;
    discountPrice?: number | null;
    deliveryCharge?: number;
    quantity: number;
    colors?: string[];
    sizes?: string[];
    isPopular?: boolean;
    isActive?: boolean;
    categoryId: string;
    imageColors?: string[];
}
