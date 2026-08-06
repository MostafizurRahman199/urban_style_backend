"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const upload_service_1 = require("../upload/upload.service");
let BannerService = class BannerService {
    prisma;
    uploadService;
    constructor(prisma, uploadService) {
        this.prisma = prisma;
        this.uploadService = uploadService;
    }
    async create(createBannerDto, file) {
        if (!file) {
            throw new common_1.BadRequestException('Banner image file is required');
        }
        const uploadResult = await this.uploadService.uploadFile(file, 'banner-images', 'banners');
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
    async findOne(id) {
        const banner = await this.prisma.banner.findUnique({
            where: { id },
        });
        if (!banner) {
            throw new common_1.NotFoundException(`Banner with ID ${id} not found`);
        }
        return banner;
    }
    async update(id, updateBannerDto, file) {
        const banner = await this.findOne(id);
        let imageUrl = banner.imageUrl;
        let imagePath = banner.imagePath;
        if (file) {
            try {
                await this.uploadService.deleteFile('banner-images', banner.imagePath);
            }
            catch (error) {
                console.error(`Failed to delete old banner image: ${error.message}`);
            }
            const uploadResult = await this.uploadService.uploadFile(file, 'banner-images', 'banners');
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
    async remove(id) {
        const banner = await this.findOne(id);
        try {
            await this.uploadService.deleteFile('banner-images', banner.imagePath);
        }
        catch (error) {
            console.error(`Failed to delete banner image from storage: ${error.message}`);
        }
        return this.prisma.banner.delete({
            where: { id },
        });
    }
};
exports.BannerService = BannerService;
exports.BannerService = BannerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        upload_service_1.UploadService])
], BannerService);
//# sourceMappingURL=banner.service.js.map