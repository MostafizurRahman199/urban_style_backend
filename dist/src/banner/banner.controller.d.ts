import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
export declare class BannerController {
    private readonly bannerService;
    constructor(bannerService: BannerService);
    findActive(): Promise<{
        id: string;
        createdAt: Date;
        description: string | null;
        isActive: boolean;
        title: string | null;
        imageUrl: string;
        imagePath: string;
        mobileImageUrl: string | null;
        mobileImagePath: string | null;
        sortOrder: number;
    }[]>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        description: string | null;
        isActive: boolean;
        title: string | null;
        imageUrl: string;
        imagePath: string;
        mobileImageUrl: string | null;
        mobileImagePath: string | null;
        sortOrder: number;
    }[]>;
    create(createBannerDto: CreateBannerDto, files: {
        image?: Express.Multer.File[];
        mobileImage?: Express.Multer.File[];
    }): Promise<{
        id: string;
        createdAt: Date;
        description: string | null;
        isActive: boolean;
        title: string | null;
        imageUrl: string;
        imagePath: string;
        mobileImageUrl: string | null;
        mobileImagePath: string | null;
        sortOrder: number;
    }>;
    update(id: string, updateBannerDto: UpdateBannerDto, files?: {
        image?: Express.Multer.File[];
        mobileImage?: Express.Multer.File[];
    }): Promise<{
        id: string;
        createdAt: Date;
        description: string | null;
        isActive: boolean;
        title: string | null;
        imageUrl: string;
        imagePath: string;
        mobileImageUrl: string | null;
        mobileImagePath: string | null;
        sortOrder: number;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        description: string | null;
        isActive: boolean;
        title: string | null;
        imageUrl: string;
        imagePath: string;
        mobileImageUrl: string | null;
        mobileImagePath: string | null;
        sortOrder: number;
    }>;
}
