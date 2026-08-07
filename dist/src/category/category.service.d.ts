import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UploadService } from '../upload/upload.service';
export declare class CategoryService {
    private prisma;
    private uploadService;
    constructor(prisma: PrismaService, uploadService: UploadService);
    private generateSlug;
    create(createCategoryDto: CreateCategoryDto, file?: Express.Multer.File): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        slug: string;
        iconUrl: string | null;
        iconPath: string | null;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        slug: string;
        iconUrl: string | null;
        iconPath: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        slug: string;
        iconUrl: string | null;
        iconPath: string | null;
    }>;
    update(id: string, updateCategoryDto: UpdateCategoryDto, file?: Express.Multer.File): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        slug: string;
        iconUrl: string | null;
        iconPath: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        slug: string;
        iconUrl: string | null;
        iconPath: string | null;
    }>;
}
