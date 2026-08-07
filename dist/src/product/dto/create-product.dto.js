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
exports.CreateProductDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateProductDto {
    name;
    description;
    videoUrl;
    price;
    discountPrice;
    quantity;
    colors;
    sizes;
    isPopular;
    isActive;
    categoryId;
    imageColors;
}
exports.CreateProductDto = CreateProductDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Slim Fit Shirt', description: 'Product name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'A classic cotton shirt.', description: 'Product description' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://youtube.com/watch?v=...', description: 'Youtube video URL', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "videoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 49.99, description: 'Product price' }),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value)),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 39.99, description: 'Discount price', required: false }),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === null || value === 'null' || value === '' || value === undefined)
            return null;
        const parsed = parseFloat(value);
        return isNaN(parsed) ? null : parsed;
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateProductDto.prototype, "discountPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100, description: 'Stock quantity' }),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value, 10)),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['Red', 'Blue'], description: 'Available colors', required: false }),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (typeof value === 'string') {
            try {
                return JSON.parse(value);
            }
            catch {
                return value.split(',').map((c) => c.trim());
            }
        }
        return value;
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateProductDto.prototype, "colors", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['S (28 inch)', 'M (30 inch)'], description: 'Available sizes', required: false }),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (typeof value === 'string') {
            try {
                return JSON.parse(value);
            }
            catch {
                return value.split(',').map((s) => s.trim());
            }
        }
        return value;
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateProductDto.prototype, "sizes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, description: 'Is the product popular?', required: false }),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateProductDto.prototype, "isPopular", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Is the product active?', required: false }),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true || value === undefined),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateProductDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-category-id', description: 'Category ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['Red', 'Blue'], description: 'Image colors mapped to uploaded images by index', required: false }),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (typeof value === 'string') {
            try {
                return JSON.parse(value);
            }
            catch {
                return [value];
            }
        }
        return value;
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateProductDto.prototype, "imageColors", void 0);
//# sourceMappingURL=create-product.dto.js.map