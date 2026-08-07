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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const product_service_1 = require("./product.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const list_products_dto_1 = require("./dto/list-products.dto");
const public_decorator_1 = require("../common/decorators/public.decorator");
let ProductController = class ProductController {
    productService;
    constructor(productService) {
        this.productService = productService;
    }
    findAll(query) {
        return this.productService.findAll(query);
    }
    findOne(id) {
        return this.productService.findOne(id);
    }
    create(createProductDto, files) {
        return this.productService.create(createProductDto, files);
    }
    update(id, updateProductDto) {
        return this.productService.update(id, updateProductDto);
    }
    addImages(id, files, imageColors) {
        let colorsArray = [];
        if (imageColors) {
            if (typeof imageColors === 'string') {
                try {
                    colorsArray = JSON.parse(imageColors);
                    if (!Array.isArray(colorsArray)) {
                        colorsArray = [imageColors];
                    }
                }
                catch {
                    colorsArray = [imageColors];
                }
            }
            else if (Array.isArray(imageColors)) {
                colorsArray = imageColors;
            }
        }
        return this.productService.addImages(id, files, colorsArray);
    }
    removeImage(productId, imageId) {
        return this.productService.removeImage(productId, imageId);
    }
    remove(id) {
        return this.productService.remove(id);
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List products with filters & pagination' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return paginated products' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_products_dto_1.ListProductsDto]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a product by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return product details' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images')),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new product with images (Admin only)' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string', example: 'Slim Fit Shirt' },
                description: { type: 'string', example: 'Comfortable cotton shirt' },
                price: { type: 'number', example: 49.99 },
                quantity: { type: 'integer', example: 100 },
                colors: { type: 'array', items: { type: 'string' }, example: ['Red', 'Blue'] },
                isPopular: { type: 'boolean', example: false },
                isActive: { type: 'boolean', example: true },
                categoryId: { type: 'string', example: 'category-uuid-here' },
                images: {
                    type: 'array',
                    items: { type: 'string', format: 'binary' },
                },
            },
            required: ['name', 'description', 'price', 'quantity', 'categoryId'],
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Product created' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024, message: 'Max size is 5MB' }),
            new common_1.FileTypeValidator({ fileType: 'image/(jpeg|png|webp)' }),
        ],
        fileIsRequired: false,
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto, Array]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update product fields (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Product updated' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/images'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images')),
    (0, swagger_1.ApiOperation)({ summary: 'Add more images to a product (Admin only)' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                images: {
                    type: 'array',
                    items: { type: 'string', format: 'binary' },
                },
            },
            required: ['images'],
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Images added successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFiles)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024, message: 'Max size is 5MB' }),
            new common_1.FileTypeValidator({ fileType: 'image/(jpeg|png|webp)' }),
        ],
    }))),
    __param(2, (0, common_1.Body)('imageColors')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "addImages", null);
__decorate([
    (0, common_1.Delete)(':id/images/:imageId'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a single image from a product (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Image deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product or image not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('imageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "removeImage", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a product (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Product deleted' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "remove", null);
exports.ProductController = ProductController = __decorate([
    (0, swagger_1.ApiTags)('Products'),
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
//# sourceMappingURL=product.controller.js.map