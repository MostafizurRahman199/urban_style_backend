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
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cloudinary_1 = require("cloudinary");
let UploadService = class UploadService {
    constructor(configService) {
        cloudinary_1.v2.config({
            cloud_name: configService.get('CLOUDINARY_CLOUD_NAME') || 'q2zdn61f',
            api_key: configService.get('CLOUDINARY_API_KEY') || '528379899599941',
            api_secret: configService.get('CLOUDINARY_API_SECRET'),
        });
    }
    async uploadFile(file, bucket, folder) {
        return new Promise((resolve, reject) => {
            const targetFolder = `${bucket}/${folder}`;
            const uploadStream = cloudinary_1.v2.uploader.upload_stream({
                folder: targetFolder,
            }, (error, result) => {
                if (error) {
                    return reject(new common_1.InternalServerErrorException(`Failed to upload file to Cloudinary: ${error.message}`));
                }
                if (!result) {
                    return reject(new common_1.InternalServerErrorException('Failed to upload file to Cloudinary: No response received'));
                }
                resolve({
                    url: result.secure_url,
                    path: result.public_id,
                });
            });
            uploadStream.end(file.buffer);
        });
    }
    async deleteFile(bucket, path) {
        return new Promise((resolve, reject) => {
            cloudinary_1.v2.uploader.destroy(path, (error, result) => {
                if (error) {
                    return reject(new common_1.InternalServerErrorException(`Failed to delete file from Cloudinary: ${error.message}`));
                }
                if (result?.result !== 'ok' && result?.result !== 'not found') {
                    return reject(new common_1.InternalServerErrorException(`Failed to delete file from Cloudinary: ${result?.result}`));
                }
                resolve();
            });
        });
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], UploadService);
//# sourceMappingURL=upload.service.js.map