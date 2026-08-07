import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseInterceptors,
  UploadedFiles,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import type { Express } from 'express';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ListProductsDto } from './dto/list-products.dto';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'List products with filters & pagination' })
  @ApiResponse({ status: 200, description: 'Return paginated products' })
  findAll(@Query() query: ListProductsDto) {
    return this.productService.findAll(query);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiResponse({ status: 200, description: 'Return product details' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Post()
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('images'))
  @ApiOperation({ summary: 'Create a new product with images (Admin only)' })
  @ApiBody({
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
  })
  @ApiResponse({ status: 201, description: 'Product created' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024, message: 'Max size is 5MB' }),
          new FileTypeValidator({ fileType: 'image/(jpeg|png|webp)' }),
        ],
        fileIsRequired: false,
      }),
    )
    files?: Express.Multer.File[],
  ) {
    return this.productService.create(createProductDto, files);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update product fields (Admin only)' })
  @ApiResponse({ status: 200, description: 'Product updated' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Post(':id/images')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('images'))
  @ApiOperation({ summary: 'Add more images to a product (Admin only)' })
  @ApiBody({
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
  })
  @ApiResponse({ status: 201, description: 'Images added successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  addImages(
    @Param('id') id: string,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024, message: 'Max size is 5MB' }),
          new FileTypeValidator({ fileType: 'image/(jpeg|png|webp)' }),
        ],
      }),
    )
    files: Express.Multer.File[],
    @Body('imageColors') imageColors?: string | string[],
  ) {
    let colorsArray: string[] = [];
    if (imageColors) {
      if (typeof imageColors === 'string') {
        try {
          colorsArray = JSON.parse(imageColors);
          if (!Array.isArray(colorsArray)) {
            colorsArray = [imageColors];
          }
        } catch {
          colorsArray = [imageColors];
        }
      } else if (Array.isArray(imageColors)) {
        colorsArray = imageColors;
      }
    }
    return this.productService.addImages(id, files, colorsArray);
  }

  @Delete(':id/images/:imageId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a single image from a product (Admin only)' })
  @ApiResponse({ status: 200, description: 'Image deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Product or image not found' })
  removeImage(@Param('id') productId: string, @Param('imageId') imageId: string) {
    return this.productService.removeImage(productId, imageId);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a product (Admin only)' })
  @ApiResponse({ status: 200, description: 'Product deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
