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
        sortOrder: number;
    }[]>;
    create(createBannerDto: CreateBannerDto, file: Express.Multer.File): Promise<{
        id: string;
        createdAt: Date;
        description: string | null;
        isActive: boolean;
        title: string | null;
        imageUrl: string;
        imagePath: string;
        sortOrder: number;
    }>;
    update(id: string, updateBannerDto: UpdateBannerDto, file?: Express.Multer.File): Promise<{
        id: string;
        createdAt: Date;
        description: string | null;
        isActive: boolean;
        title: string | null;
        imageUrl: string;
        imagePath: string;
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
        sortOrder: number;
    }>;
}
