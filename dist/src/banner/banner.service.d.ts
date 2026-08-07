import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
export declare class BannerService {
    private prisma;
    private uploadService;
    constructor(prisma: PrismaService, uploadService: UploadService);
    create(createBannerDto: CreateBannerDto, file: Express.Multer.File): Promise<{
        id: string;
        createdAt: Date;
        description: string | null;
        title: string | null;
        isActive: boolean;
        sortOrder: number;
        imageUrl: string;
        imagePath: string;
    }>;
    findActive(): Promise<{
        id: string;
        createdAt: Date;
        description: string | null;
        title: string | null;
        isActive: boolean;
        sortOrder: number;
        imageUrl: string;
        imagePath: string;
    }[]>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        description: string | null;
        title: string | null;
        isActive: boolean;
        sortOrder: number;
        imageUrl: string;
        imagePath: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        description: string | null;
        title: string | null;
        isActive: boolean;
        sortOrder: number;
        imageUrl: string;
        imagePath: string;
    }>;
    update(id: string, updateBannerDto: UpdateBannerDto, file?: Express.Multer.File): Promise<{
        id: string;
        createdAt: Date;
        description: string | null;
        title: string | null;
        isActive: boolean;
        sortOrder: number;
        imageUrl: string;
        imagePath: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        description: string | null;
        title: string | null;
        isActive: boolean;
        sortOrder: number;
        imageUrl: string;
        imagePath: string;
    }>;
}
