import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ListProductsDto } from './dto/list-products.dto';
export declare class ProductService {
    private prisma;
    private uploadService;
    constructor(prisma: PrismaService, uploadService: UploadService);
    create(createProductDto: CreateProductDto, files?: Express.Multer.File[]): Promise<{
        category: {
            name: string;
            id: string;
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
        description: string;
        name: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        quantity: number;
        colors: string[];
        isPopular: boolean;
        isActive: boolean;
        categoryId: string;
        id: string;
        discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(query: ListProductsDto): Promise<{
        data: ({
            category: {
                name: string;
                id: string;
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
            description: string;
            name: string;
            price: import("@prisma/client-runtime-utils").Decimal;
            quantity: number;
            colors: string[];
            isPopular: boolean;
            isActive: boolean;
            categoryId: string;
            id: string;
            discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
            createdAt: Date;
            updatedAt: Date;
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
            name: string;
            id: string;
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
        description: string;
        name: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        quantity: number;
        colors: string[];
        isPopular: boolean;
        isActive: boolean;
        categoryId: string;
        id: string;
        discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
        category: {
            name: string;
            id: string;
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
        description: string;
        name: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        quantity: number;
        colors: string[];
        isPopular: boolean;
        isActive: boolean;
        categoryId: string;
        id: string;
        discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    addImages(id: string, files: Express.Multer.File[], imageColors?: string[]): Promise<any[]>;
    removeImage(productId: string, imageId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    remove(id: string): Promise<{
        description: string;
        name: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        quantity: number;
        colors: string[];
        isPopular: boolean;
        isActive: boolean;
        categoryId: string;
        id: string;
        discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
