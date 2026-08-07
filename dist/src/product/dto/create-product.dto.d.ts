export declare class CreateProductDto {
    name: string;
    description: string;
    videoUrl?: string;
    price: number;
    discountPrice?: number | null;
    quantity: number;
    colors?: string[];
    isPopular?: boolean;
    isActive?: boolean;
    categoryId: string;
    imageColors?: string[];
}
