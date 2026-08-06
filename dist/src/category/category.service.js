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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CategoryService = class CategoryService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    generateSlug(name) {
        return name
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    }
    async create(createCategoryDto) {
        const slug = createCategoryDto.slug
            ? this.generateSlug(createCategoryDto.slug)
            : this.generateSlug(createCategoryDto.name);
        const existing = await this.prisma.category.findFirst({
            where: {
                OR: [{ name: createCategoryDto.name }, { slug }],
            },
        });
        if (existing) {
            throw new common_1.ConflictException('Category with this name or slug already exists');
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
    async findOne(id) {
        const category = await this.prisma.category.findUnique({
            where: { id },
        });
        if (!category) {
            throw new common_1.NotFoundException(`Category with ID ${id} not found`);
        }
        return category;
    }
    async update(id, updateCategoryDto) {
        await this.findOne(id);
        let slug = updateCategoryDto.slug;
        if (updateCategoryDto.name && !slug) {
            slug = this.generateSlug(updateCategoryDto.name);
        }
        else if (slug) {
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
                throw new common_1.ConflictException('Another category with this name or slug already exists');
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
    async remove(id) {
        await this.findOne(id);
        const productCount = await this.prisma.product.count({
            where: { categoryId: id },
        });
        if (productCount > 0) {
            throw new common_1.ConflictException('Cannot delete category because it contains products');
        }
        return this.prisma.category.delete({
            where: { id },
        });
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoryService);
//# sourceMappingURL=category.service.js.map