"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const core_1 = require("@nestjs/core");
const app_module_1 = require("../src/app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const express_1 = __importDefault(require("express"));
const platform_express_1 = require("@nestjs/platform-express");
const server = (0, express_1.default)();
let cachedServer;
async function bootstrapServer() {
    if (!cachedServer) {
        const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(server));
        app.enableCors();
        app.useGlobalPipes(new common_1.ValidationPipe({
            whitelist: true,
            transform: true,
        }));
        const config = new swagger_1.DocumentBuilder()
            .setTitle('Urban Style E-Commerce API')
            .setDescription('Backend API Documentation for Urban Style Mini E-Commerce Platform')
            .setVersion('1.0')
            .addBearerAuth()
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('api/docs', app, document);
        await app.init();
        cachedServer = server;
    }
    return cachedServer;
}
async function handler(req, res) {
    const serverApp = await bootstrapServer();
    serverApp(req, res);
}
//# sourceMappingURL=index.js.map