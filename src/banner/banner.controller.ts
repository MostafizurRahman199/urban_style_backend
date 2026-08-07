import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Banners')
@Controller('banners')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all active banners (ordered by sortOrder)' })
  @ApiResponse({ status: 200, description: 'Return active banners' })
  findActive() {
    return this.bannerService.findActive();
  }

  @Get('all')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all banners including inactive (Admin only)' })
  @ApiResponse({ status: 200, description: 'Return all banners' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll() {
    return this.bannerService.findAll();
  }

  @Post()
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'mobileImage', maxCount: 1 },
    ]),
  )
  @ApiOperation({ summary: 'Create a new banner (Admin only)' })
  @ApiResponse({ status: 201, description: 'Banner created' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(
    @Body() createBannerDto: CreateBannerDto,
    @UploadedFiles()
    files: { image?: Express.Multer.File[]; mobileImage?: Express.Multer.File[] },
  ) {
    return this.bannerService.create(createBannerDto, files);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'mobileImage', maxCount: 1 },
    ]),
  )
  @ApiOperation({ summary: 'Update banner fields / replace images (Admin only)' })
  @ApiResponse({ status: 200, description: 'Banner updated' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Banner not found' })
  update(
    @Param('id') id: string,
    @Body() updateBannerDto: UpdateBannerDto,
    @UploadedFiles()
    files?: { image?: Express.Multer.File[]; mobileImage?: Express.Multer.File[] },
  ) {
    return this.bannerService.update(id, updateBannerDto, files);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a banner (Admin only)' })
  @ApiResponse({ status: 200, description: 'Banner deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Banner not found' })
  remove(@Param('id') id: string) {
    return this.bannerService.remove(id);
  }
}
