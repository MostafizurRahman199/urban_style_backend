import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class CategoryService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
  ) {}

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }

  async create(createCategoryDto: CreateCategoryDto, file?: Express.Multer.File) {
    const slug = createCategoryDto.slug
      ? this.generateSlug(createCategoryDto.slug)
      : this.generateSlug(createCategoryDto.name);

    const existing = await this.prisma.category.findFirst({
      where: {
        OR: [{ name: createCategoryDto.name }, { slug }],
      },
    });

    if (existing) {
      throw new ConflictException('Category with this name or slug already exists');
    }

    let iconUrl: string | null = null;
    let iconPath: string | null = null;

    if (file) {
      const uploadResult = await this.uploadService.uploadFile(
        file,
        'category-icons',
        'categories',
      );
      iconUrl = uploadResult.url;
      iconPath = uploadResult.path;
    }

    return this.prisma.category.create({
      data: {
        name: createCategoryDto.name,
        slug,
        iconUrl,
        iconPath,
      },
    });
  }

  async findAll() {
    return this.prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto, file?: Express.Multer.File) {
    const category = await this.findOne(id);

    let slug = updateCategoryDto.slug;
    if (updateCategoryDto.name && !slug) {
      slug = this.generateSlug(updateCategoryDto.name);
    } else if (slug) {
      slug = this.generateSlug(slug);
    }

    if (updateCategoryDto.name || slug) {
      const existing = await this.prisma.category.findFirst({
        where: {
          id: { not: id },
          OR: [
            ...(updateCategoryDto.name ? [{ name: updateCategoryDto.name }] : []),
            ...(slug ? [{ slug }] : []),
          ],
        },
      });

      if (existing) {
        throw new ConflictException('Another category with this name or slug already exists');
      }
    }

    let iconUrl = category.iconUrl;
    let iconPath = category.iconPath;

    if (file) {
      if (category.iconPath) {
        try {
          await this.uploadService.deleteFile('category-icons', category.iconPath);
        } catch (error) {
          console.error(`Failed to delete old category icon: ${error.message}`);
        }
      }

      const uploadResult = await this.uploadService.uploadFile(
        file,
        'category-icons',
        'categories',
      );
      iconUrl = uploadResult.url;
      iconPath = uploadResult.path;
    }

    return this.prisma.category.update({
      where: { id },
      data: {
        ...(updateCategoryDto.name && { name: updateCategoryDto.name }),
        ...(slug && { slug }),
        iconUrl,
        iconPath,
      },
    });
  }

  async remove(id: string) {
    const category = await this.findOne(id);
    
    const productCount = await this.prisma.product.count({
      where: { categoryId: id },
    });

    if (productCount > 0) {
      throw new ConflictException('Cannot delete category because it contains products');
    }

    if (category.iconPath) {
      try {
        await this.uploadService.deleteFile('category-icons', category.iconPath);
      } catch (error) {
        console.error(`Failed to delete category icon from storage: ${error.message}`);
      }
    }

    return this.prisma.category.delete({
      where: { id },
    });
  }
}
