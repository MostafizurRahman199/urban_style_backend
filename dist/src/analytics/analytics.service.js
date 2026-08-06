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
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const revenue_query_dto_1 = require("./dto/revenue-query.dto");
let AnalyticsService = class AnalyticsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getSummary() {
        const [totalRevenueResult, totalOrders, totalProducts, pendingOrders] = await Promise.all([
            this.prisma.order.aggregate({
                where: { paymentStatus: 'PAID' },
                _sum: { totalAmount: true },
            }),
            this.prisma.order.count(),
            this.prisma.product.count(),
            this.prisma.order.count({
                where: { orderStatus: 'PENDING' },
            }),
        ]);
        return {
            totalRevenue: Number(totalRevenueResult._sum.totalAmount || 0),
            totalOrders,
            totalProducts,
            pendingOrdersCount: pendingOrders,
        };
    }
    async getOrdersByStatus() {
        const result = await this.prisma.order.groupBy({
            by: ['orderStatus'],
            _count: {
                id: true,
            },
        });
        return result.map((item) => ({
            status: item.orderStatus,
            count: item._count.id,
        }));
    }
    async getRevenueOverTime(range) {
        const orders = await this.prisma.order.findMany({
            where: { paymentStatus: 'PAID' },
            select: { createdAt: true, totalAmount: true },
            orderBy: { createdAt: 'asc' },
        });
        const revenueMap = {};
        orders.forEach((order) => {
            const date = new Date(order.createdAt);
            let key = '';
            if (range === revenue_query_dto_1.RevenueRange.DAY) {
                key = date.toISOString().split('T')[0];
            }
            else if (range === revenue_query_dto_1.RevenueRange.WEEK) {
                const day = date.getDay();
                const diff = date.getDate() - day;
                const weekDate = new Date(date.setDate(diff));
                key = weekDate.toISOString().split('T')[0];
            }
            else if (range === revenue_query_dto_1.RevenueRange.MONTH) {
                const month = String(date.getMonth() + 1).padStart(2, '0');
                key = `${date.getFullYear()}-${month}`;
            }
            const amount = Number(order.totalAmount);
            revenueMap[key] = (revenueMap[key] || 0) + amount;
        });
        return Object.entries(revenueMap).map(([date, revenue]) => ({
            date,
            revenue,
        }));
    }
    async getTopProducts() {
        const result = await this.prisma.orderItem.groupBy({
            by: ['productId'],
            _sum: {
                quantity: true,
            },
            orderBy: {
                _sum: {
                    quantity: 'desc',
                },
            },
            take: 10,
        });
        const products = await this.prisma.product.findMany({
            where: {
                id: { in: result.map((r) => r.productId) },
            },
            include: {
                images: { take: 1 },
            },
        });
        return result
            .map((r) => {
            const product = products.find((p) => p.id === r.productId);
            return {
                productId: r.productId,
                name: product?.name || 'Unknown',
                quantitySold: r._sum.quantity || 0,
                price: product ? Number(product.price) : 0,
                imageUrl: product?.images[0]?.url || null,
            };
        })
            .sort((a, b) => b.quantitySold - a.quantitySold);
    }
    async getLowStock(threshold) {
        const products = await this.prisma.product.findMany({
            where: {
                quantity: { lte: threshold },
            },
            include: {
                category: {
                    select: {
                        name: true,
                    },
                },
            },
            orderBy: { quantity: 'asc' },
        });
        return products.map((product) => ({
            id: product.id,
            name: product.name,
            quantity: product.quantity,
            price: Number(product.price),
            categoryName: product.category.name,
        }));
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map