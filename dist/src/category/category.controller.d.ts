import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    findAll(): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        slug: string;
        iconUrl: string | null;
        iconPath: string | null;
    }[]>;
    create(createCategoryDto: CreateCategoryDto, file?: Express.Multer.File): Promise<{
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
