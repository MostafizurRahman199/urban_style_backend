import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ListProductsDto } from './dto/list-products.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    findAll(query: ListProductsDto): Promise<{
        data: ({
            category: {
                id: string;
                name: string;
                slug: string;
            };
            images: {
                id: string;
                createdAt: Date;
                url: string;
                path: string;
                color: string | null;
                productId: string;
            }[];
        } & {
            id: string;
            name: string;
            description: string;
            price: import("@prisma/client-runtime-utils").Decimal;
            discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
            deliveryCharge: import("@prisma/client-runtime-utils").Decimal | null;
            quantity: number;
            colors: string[];
            sizes: string[];
            isPopular: boolean;
            isActive: boolean;
            videoUrl: string | null;
            createdAt: Date;
            updatedAt: Date;
            categoryId: string;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        category: {
            id: string;
            name: string;
            createdAt: Date;
            slug: string;
            iconUrl: string | null;
            iconPath: string | null;
        };
        images: {
            id: string;
            createdAt: Date;
            url: string;
            path: string;
            color: string | null;
            productId: string;
        }[];
    } & {
        id: string;
        name: string;
        description: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
        deliveryCharge: import("@prisma/client-runtime-utils").Decimal | null;
        quantity: number;
        colors: string[];
        sizes: string[];
        isPopular: boolean;
        isActive: boolean;
        videoUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string;
    }>;
    create(createProductDto: CreateProductDto, files?: Express.Multer.File[]): Promise<{
        category: {
            id: string;
            name: string;
            createdAt: Date;
            slug: string;
            iconUrl: string | null;
            iconPath: string | null;
        };
        images: {
            id: string;
            createdAt: Date;
            url: string;
            path: string;
            color: string | null;
            productId: string;
        }[];
    } & {
        id: string;
        name: string;
        description: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
        deliveryCharge: import("@prisma/client-runtime-utils").Decimal | null;
        quantity: number;
        colors: string[];
        sizes: string[];
        isPopular: boolean;
        isActive: boolean;
        videoUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string;
    }>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
        category: {
            id: string;
            name: string;
            createdAt: Date;
            slug: string;
            iconUrl: string | null;
            iconPath: string | null;
        };
        images: {
            id: string;
            createdAt: Date;
            url: string;
            path: string;
            color: string | null;
            productId: string;
        }[];
    } & {
        id: string;
        name: string;
        description: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
        deliveryCharge: import("@prisma/client-runtime-utils").Decimal | null;
        quantity: number;
        colors: string[];
        sizes: string[];
        isPopular: boolean;
        isActive: boolean;
        videoUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string;
    }>;
    addImages(id: string, files: Express.Multer.File[], imageColors?: string | string[]): Promise<any[]>;
    removeImage(productId: string, imageId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        description: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
        deliveryCharge: import("@prisma/client-runtime-utils").Decimal | null;
        quantity: number;
        colors: string[];
        sizes: string[];
        isPopular: boolean;
        isActive: boolean;
        videoUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string;
    }>;
}
