import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
export declare class BannerService {
    private prisma;
    private uploadService;
    constructor(prisma: PrismaService, uploadService: UploadService);
    create(createBannerDto: CreateBannerDto, files: {
        image?: Express.Multer.File[];
        mobileImage?: Express.Multer.File[];
    }): Promise<{
        description: string | null;
        title: string | null;
        id: string;
        createdAt: Date;
        isActive: boolean;
        sortOrder: number;
        imageUrl: string;
        imagePath: string;
        mobileImageUrl: string | null;
        mobileImagePath: string | null;
    }>;
    findActive(): Promise<{
        description: string | null;
        title: string | null;
        id: string;
        createdAt: Date;
        isActive: boolean;
        sortOrder: number;
        imageUrl: string;
        imagePath: string;
        mobileImageUrl: string | null;
        mobileImagePath: string | null;
    }[]>;
    findAll(): Promise<{
        description: string | null;
        title: string | null;
        id: string;
        createdAt: Date;
        isActive: boolean;
        sortOrder: number;
        imageUrl: string;
        imagePath: string;
        mobileImageUrl: string | null;
        mobileImagePath: string | null;
    }[]>;
    findOne(id: string): Promise<{
        description: string | null;
        title: string | null;
        id: string;
        createdAt: Date;
        isActive: boolean;
        sortOrder: number;
        imageUrl: string;
        imagePath: string;
        mobileImageUrl: string | null;
        mobileImagePath: string | null;
    }>;
    update(id: string, updateBannerDto: UpdateBannerDto, files?: {
        image?: Express.Multer.File[];
        mobileImage?: Express.Multer.File[];
    }): Promise<{
        description: string | null;
        title: string | null;
        id: string;
        createdAt: Date;
        isActive: boolean;
        sortOrder: number;
        imageUrl: string;
        imagePath: string;
        mobileImageUrl: string | null;
        mobileImagePath: string | null;
    }>;
    remove(id: string): Promise<{
        description: string | null;
        title: string | null;
        id: string;
        createdAt: Date;
        isActive: boolean;
        sortOrder: number;
        imageUrl: string;
        imagePath: string;
        mobileImageUrl: string | null;
        mobileImagePath: string | null;
    }>;
}
