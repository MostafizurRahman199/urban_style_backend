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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const upload_service_1 = require("../upload/upload.service");
let ProductService = class ProductService {
    prisma;
    uploadService;
    constructor(prisma, uploadService) {
        this.prisma = prisma;
        this.uploadService = uploadService;
    }
    async create(createProductDto, files) {
        const category = await this.prisma.category.findUnique({
            where: { id: createProductDto.categoryId },
        });
        if (!category) {
            throw new common_1.NotFoundException(`Category with ID ${createProductDto.categoryId} not found`);
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
                    const uploadResult = await this.uploadService.uploadFile(file, 'product-images', `products/${product.id}`);
                    await this.prisma.productImage.create({
                        data: {
                            url: uploadResult.url,
                            path: uploadResult.path,
                            productId: product.id,
                            color: color || null,
                        },
                    });
                }
                catch (error) {
                    console.error(`Failed to upload file ${file.originalname}:`, error);
                }
            }
        }
        return this.findOne(product.id);
    }
    async findAll(query) {
        const { categoryId, isPopular, search, page = 1, limit = 10 } = query;
        const skip = (page - 1) * limit;
        const where = {};
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
    async findOne(id) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: {
                images: true,
                category: true,
            },
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }
    async update(id, updateProductDto) {
        await this.findOne(id);
        if (updateProductDto.categoryId) {
            const category = await this.prisma.category.findUnique({
                where: { id: updateProductDto.categoryId },
            });
            if (!category) {
                throw new common_1.NotFoundException(`Category with ID ${updateProductDto.categoryId} not found`);
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
    async addImages(id, files, imageColors) {
        await this.findOne(id);
        if (!files || files.length === 0) {
            throw new common_1.BadRequestException('No images provided');
        }
        const uploadedImages = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const color = imageColors?.[i] || null;
            const uploadResult = await this.uploadService.uploadFile(file, 'product-images', `products/${id}`);
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
    async removeImage(productId, imageId) {
        const image = await this.prisma.productImage.findFirst({
            where: { id: imageId, productId },
        });
        if (!image) {
            throw new common_1.NotFoundException(`Image with ID ${imageId} not found for product ${productId}`);
        }
        await this.uploadService.deleteFile('product-images', image.path);
        await this.prisma.productImage.delete({
            where: { id: imageId },
        });
        return { success: true, message: 'Image deleted successfully' };
    }
    async remove(id) {
        const product = await this.findOne(id);
        for (const image of product.images) {
            try {
                await this.uploadService.deleteFile('product-images', image.path);
            }
            catch (error) {
                console.error(`Failed to delete storage file ${image.path}:`, error);
            }
        }
        return this.prisma.product.delete({
            where: { id },
        });
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        upload_service_1.UploadService])
], ProductService);
//# sourceMappingURL=product.service.js.map