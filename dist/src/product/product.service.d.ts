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
        createdAt: Date;
        updatedAt: Date;
        description: string;
        categoryId: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        quantity: number;
        colors: string[];
        isPopular: boolean;
        isActive: boolean;
    }>;
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
            createdAt: Date;
            updatedAt: Date;
            description: string;
            categoryId: string;
            price: import("@prisma/client-runtime-utils").Decimal;
            quantity: number;
            colors: string[];
            isPopular: boolean;
            isActive: boolean;
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
        createdAt: Date;
        updatedAt: Date;
        description: string;
        categoryId: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        quantity: number;
        colors: string[];
        isPopular: boolean;
        isActive: boolean;
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
        createdAt: Date;
        updatedAt: Date;
        description: string;
        categoryId: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        quantity: number;
        colors: string[];
        isPopular: boolean;
        isActive: boolean;
    }>;
    addImages(id: string, files: Express.Multer.File[], imageColors?: string[]): Promise<any[]>;
    removeImage(productId: string, imageId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        categoryId: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        quantity: number;
        colors: string[];
        isPopular: boolean;
        isActive: boolean;
    }>;
}
