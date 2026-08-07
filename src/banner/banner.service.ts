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

  async create(
    createBannerDto: CreateBannerDto,
    files: { image?: Express.Multer.File[]; mobileImage?: Express.Multer.File[] },
  ) {
    const desktopFile = files?.image?.[0];
    const mobileFile = files?.mobileImage?.[0];

    if (!desktopFile) {
      throw new BadRequestException('Desktop banner image file is required');
    }

    const uploadResult = await this.uploadService.uploadFile(
      desktopFile,
      'banner-images',
      'banners',
    );

    let mobileImageUrl: string | null = null;
    let mobileImagePath: string | null = null;

    if (mobileFile) {
      const mobileUploadResult = await this.uploadService.uploadFile(
        mobileFile,
        'banner-images',
        'banners/mobile',
      );
      mobileImageUrl = mobileUploadResult.url;
      mobileImagePath = mobileUploadResult.path;
    }

    return this.prisma.banner.create({
      data: {
        title: createBannerDto.title,
        description: createBannerDto.description,
        imageUrl: uploadResult.url,
        imagePath: uploadResult.path,
        mobileImageUrl,
        mobileImagePath,
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

  async update(
    id: string,
    updateBannerDto: UpdateBannerDto,
    files?: { image?: Express.Multer.File[]; mobileImage?: Express.Multer.File[] },
  ) {
    const banner = await this.findOne(id);

    let imageUrl = banner.imageUrl;
    let imagePath = banner.imagePath;
    let mobileImageUrl = banner.mobileImageUrl;
    let mobileImagePath = banner.mobileImagePath;

    const desktopFile = files?.image?.[0];
    const mobileFile = files?.mobileImage?.[0];

    if (desktopFile) {
      try {
        await this.uploadService.deleteFile('banner-images', banner.imagePath);
      } catch (error) {
        console.error(`Failed to delete old desktop banner image: ${error.message}`);
      }

      const uploadResult = await this.uploadService.uploadFile(
        desktopFile,
        'banner-images',
        'banners',
      );
      imageUrl = uploadResult.url;
      imagePath = uploadResult.path;
    }

    if (mobileFile) {
      if (banner.mobileImagePath) {
        try {
          await this.uploadService.deleteFile('banner-images', banner.mobileImagePath);
        } catch (error) {
          console.error(`Failed to delete old mobile banner image: ${error.message}`);
        }
      }

      const mobileUploadResult = await this.uploadService.uploadFile(
        mobileFile,
        'banner-images',
        'banners/mobile',
      );
      mobileImageUrl = mobileUploadResult.url;
      mobileImagePath = mobileUploadResult.path;
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
        mobileImageUrl,
        mobileImagePath,
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

    if (banner.mobileImagePath) {
      try {
        await this.uploadService.deleteFile('banner-images', banner.mobileImagePath);
      } catch (error) {
        console.error(`Failed to delete mobile banner image from storage: ${error.message}`);
      }
    }

    return this.prisma.banner.delete({
      where: { id },
    });
  }
}
