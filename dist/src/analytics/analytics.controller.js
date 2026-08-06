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
exports.AnalyticsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const analytics_service_1 = require("./analytics.service");
const revenue_query_dto_1 = require("./dto/revenue-query.dto");
const low_stock_query_dto_1 = require("./dto/low-stock-query.dto");
let AnalyticsController = class AnalyticsController {
    analyticsService;
    constructor(analyticsService) {
        this.analyticsService = analyticsService;
    }
    getSummary() {
        return this.analyticsService.getSummary();
    }
    getOrdersByStatus() {
        return this.analyticsService.getOrdersByStatus();
    }
    getRevenueOverTime(query) {
        return this.analyticsService.getRevenueOverTime(query.range || revenue_query_dto_1.RevenueRange.DAY);
    }
    getTopProducts() {
        return this.analyticsService.getTopProducts();
    }
    getLowStock(query) {
        return this.analyticsService.getLowStock(query.threshold ?? 10);
    }
};
exports.AnalyticsController = AnalyticsController;
__decorate([
    (0, common_1.Get)('summary'),
    (0, swagger_1.ApiOperation)({ summary: 'Get summary statistics (total revenue, orders, products, pending orders)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return summary analytics' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getSummary", null);
__decorate([
    (0, common_1.Get)('orders-by-status'),
    (0, swagger_1.ApiOperation)({ summary: 'Get orders count grouped by status' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return counts grouped by orderStatus' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getOrdersByStatus", null);
__decorate([
    (0, common_1.Get)('revenue-over-time'),
    (0, swagger_1.ApiOperation)({ summary: 'Get revenue grouped by time range' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return revenue list over time' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [revenue_query_dto_1.RevenueQueryDto]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getRevenueOverTime", null);
__decorate([
    (0, common_1.Get)('top-products'),
    (0, swagger_1.ApiOperation)({ summary: 'Get best-selling products by quantity sold' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return top products' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getTopProducts", null);
__decorate([
    (0, common_1.Get)('low-stock'),
    (0, swagger_1.ApiOperation)({ summary: 'Get list of products below stock threshold' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return products with low stock' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [low_stock_query_dto_1.LowStockQueryDto]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getLowStock", null);
exports.AnalyticsController = AnalyticsController = __decorate([
    (0, swagger_1.ApiTags)('Analytics'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('analytics'),
    __metadata("design:paramtypes", [analytics_service_1.AnalyticsService])
], AnalyticsController);
//# sourceMappingURL=analytics.controller.js.map