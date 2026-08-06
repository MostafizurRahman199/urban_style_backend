import { ConfigService } from '@nestjs/config';
export declare class UploadService {
    constructor(configService: ConfigService);
    uploadFile(file: Express.Multer.File, bucket: string, folder: string): Promise<{
        url: string;
        path: string;
    }>;
    deleteFile(bucket: string, path: string): Promise<void>;
}
