import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }

  async create(createCategoryDto: CreateCategoryDto) {
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

    return this.prisma.category.create({
      data: {
        name: createCategoryDto.name,
        slug,
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

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    await this.findOne(id);

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

    return this.prisma.category.update({
      where: { id },
      data: {
        ...(updateCategoryDto.name && { name: updateCategoryDto.name }),
        ...(slug && { slug }),
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    
    const productCount = await this.prisma.product.count({
      where: { categoryId: id },
    });

    if (productCount > 0) {
      throw new ConflictException('Cannot delete category because it contains products');
    }

    return this.prisma.category.delete({
      where: { id },
    });
  }
}
