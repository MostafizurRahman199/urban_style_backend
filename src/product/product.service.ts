import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ListProductsDto } from './dto/list-products.dto';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
  ) {}

  async create(createProductDto: CreateProductDto, files?: Express.Multer.File[]) {
    const category = await this.prisma.category.findUnique({
      where: { id: createProductDto.categoryId },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${createProductDto.categoryId} not found`);
    }

    const product = await this.prisma.product.create({
      data: {
        name: createProductDto.name,
        description: createProductDto.description,
        price: createProductDto.price,
        quantity: createProductDto.quantity,
        colors: createProductDto.colors || [],
        isPopular: createProductDto.isPopular ?? false,
        isActive: createProductDto.isActive ?? true,
        categoryId: createProductDto.categoryId,
      },
    });

    if (files && files.length > 0) {
      const imageColors = createProductDto.imageColors || [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const color = imageColors[i] || null;
        try {
          const uploadResult = await this.uploadService.uploadFile(
            file,
            'product-images',
            `products/${product.id}`,
          );
          await this.prisma.productImage.create({
            data: {
              url: uploadResult.url,
              path: uploadResult.path,
              productId: product.id,
              color: color || null,
            },
          });
        } catch (error) {
          console.error(`Failed to upload file ${file.originalname}:`, error);
        }
      }
    }

    return this.findOne(product.id);
  }

  async findAll(query: ListProductsDto) {
    const { categoryId, isPopular, search, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (isPopular !== undefined) {
      where.isPopular = isPopular;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [total, data] = await Promise.all([
      this.prisma.product.count({ where }),
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        include: {
          images: true,
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        images: true,
        category: true,
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.findOne(id);

    if (updateProductDto.categoryId) {
      const category = await this.prisma.category.findUnique({
        where: { id: updateProductDto.categoryId },
      });
      if (!category) {
        throw new NotFoundException(`Category with ID ${updateProductDto.categoryId} not found`);
      }
    }

    return this.prisma.product.update({
      where: { id },
      data: {
        ...(updateProductDto.name && { name: updateProductDto.name }),
        ...(updateProductDto.description && { description: updateProductDto.description }),
        ...(updateProductDto.price !== undefined && { price: updateProductDto.price }),
        ...(updateProductDto.quantity !== undefined && { quantity: updateProductDto.quantity }),
        ...(updateProductDto.colors && { colors: updateProductDto.colors }),
        ...(updateProductDto.isPopular !== undefined && { isPopular: updateProductDto.isPopular }),
        ...(updateProductDto.isActive !== undefined && { isActive: updateProductDto.isActive }),
        ...(updateProductDto.categoryId && { categoryId: updateProductDto.categoryId }),
      },
      include: {
        images: true,
        category: true,
      },
    });
  }

  async addImages(id: string, files: Express.Multer.File[], imageColors?: string[]) {
    await this.findOne(id);

    if (!files || files.length === 0) {
      throw new BadRequestException('No images provided');
    }

    const uploadedImages: any[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const color = imageColors?.[i] || null;
      const uploadResult = await this.uploadService.uploadFile(
        file,
        'product-images',
        `products/${id}`,
      );
      const img = await this.prisma.productImage.create({
        data: {
          url: uploadResult.url,
          path: uploadResult.path,
          productId: id,
          color: color || null,
        },
      });
      uploadedImages.push(img);
    }

    return uploadedImages;
  }

  async removeImage(productId: string, imageId: string) {
    const image = await this.prisma.productImage.findFirst({
      where: { id: imageId, productId },
    });

    if (!image) {
      throw new NotFoundException(`Image with ID ${imageId} not found for product ${productId}`);
    }

    await this.uploadService.deleteFile('product-images', image.path);

    await this.prisma.productImage.delete({
      where: { id: imageId },
    });

    return { success: true, message: 'Image deleted successfully' };
  }

  async remove(id: string) {
    const product = await this.findOne(id);

    for (const image of product.images) {
      try {
        await this.uploadService.deleteFile('product-images', image.path);
      } catch (error) {
        console.error(`Failed to delete storage file ${image.path}:`, error);
      }
    }

    return this.prisma.product.delete({
      where: { id },
    });
  }
}
