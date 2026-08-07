export declare class CreateProductDto {
    name: string;
    description: string;
    price: number;
    quantity: number;
    colors?: string[];
    isPopular?: boolean;
    isActive?: boolean;
    categoryId: string;
    imageColors?: string[];
}
