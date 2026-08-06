import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';

@Injectable()
export class BannerService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
  ) {}

  async create(createBannerDto: CreateBannerDto, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Banner image file is required');
    }

    const uploadResult = await this.uploadService.uploadFile(
      file,
      'banner-images',
      'banners',
    );

    return this.prisma.banner.create({
      data: {
        title: createBannerDto.title,
        description: createBannerDto.description,
        imageUrl: uploadResult.url,
        imagePath: uploadResult.path,
        isActive: createBannerDto.isActive ?? true,
        sortOrder: createBannerDto.sortOrder ?? 0,
      },
    });
  }

  async findActive() {
    return this.prisma.banner.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
  }

  async findAll() {
    return this.prisma.banner.findMany({
      orderBy: { sortOrder: 'asc' },
    });
  }

  async findOne(id: string) {
    const banner = await this.prisma.banner.findUnique({
      where: { id },
    });
    if (!banner) {
      throw new NotFoundException(`Banner with ID ${id} not found`);
    }
    return banner;
  }

  async update(id: string, updateBannerDto: UpdateBannerDto, file?: Express.Multer.File) {
    const banner = await this.findOne(id);

    let imageUrl = banner.imageUrl;
    let imagePath = banner.imagePath;

    if (file) {
      try {
        await this.uploadService.deleteFile('banner-images', banner.imagePath);
      } catch (error) {
        console.error(`Failed to delete old banner image: ${error.message}`);
      }

      const uploadResult = await this.uploadService.uploadFile(
        file,
        'banner-images',
        'banners',
      );
      imageUrl = uploadResult.url;
      imagePath = uploadResult.path;
    }

    return this.prisma.banner.update({
      where: { id },
      data: {
        ...(updateBannerDto.title !== undefined && { title: updateBannerDto.title }),
        ...(updateBannerDto.description !== undefined && { description: updateBannerDto.description }),
        ...(updateBannerDto.isActive !== undefined && { isActive: updateBannerDto.isActive }),
        ...(updateBannerDto.sortOrder !== undefined && { sortOrder: updateBannerDto.sortOrder }),
        imageUrl,
        imagePath,
      },
    });
  }

  async remove(id: string) {
    const banner = await this.findOne(id);

    try {
      await this.uploadService.deleteFile('banner-images', banner.imagePath);
    } catch (error) {
      console.error(`Failed to delete banner image from storage: ${error.message}`);
    }

    return this.prisma.banner.delete({
      where: { id },
    });
  }
}
