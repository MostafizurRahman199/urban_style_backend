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
