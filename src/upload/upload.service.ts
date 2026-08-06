import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

@Injectable()
export class UploadService {
  constructor(configService: ConfigService) {
    cloudinary.config({
      cloud_name: configService.get<string>('CLOUDINARY_CLOUD_NAME') || 'q2zdn61f',
      api_key: configService.get<string>('CLOUDINARY_API_KEY') || '528379899599941',
      api_secret: configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadFile(
    file: Express.Multer.File,
    bucket: string,
    folder: string,
  ): Promise<{ url: string; path: string }> {
    return new Promise((resolve, reject) => {
      const targetFolder = `${bucket}/${folder}`;
      
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: targetFolder,
        },
        (error, result: UploadApiResponse | undefined) => {
          if (error) {
            return reject(
              new InternalServerErrorException(`Failed to upload file to Cloudinary: ${error.message}`),
            );
          }
          if (!result) {
            return reject(
              new InternalServerErrorException('Failed to upload file to Cloudinary: No response received'),
            );
          }
          resolve({
            url: result.secure_url,
            path: result.public_id,
          });
        },
      );

      uploadStream.end(file.buffer);
    });
  }

  async deleteFile(bucket: string, path: string): Promise<void> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(path, (error, result) => {
        if (error) {
          return reject(
            new InternalServerErrorException(`Failed to delete file from Cloudinary: ${error.message}`),
          );
        }
        if (result?.result !== 'ok' && result?.result !== 'not found') {
          return reject(
            new InternalServerErrorException(`Failed to delete file from Cloudinary: ${result?.result}`),
          );
        }
        resolve();
      });
    });
  }
}
