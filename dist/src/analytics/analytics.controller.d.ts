import { AnalyticsService } from './analytics.service';
import { RevenueQueryDto } from './dto/revenue-query.dto';
import { LowStockQueryDto } from './dto/low-stock-query.dto';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    getSummary(): Promise<{
        totalRevenue: number;
        totalOrders: number;
        totalProducts: number;
        pendingOrdersCount: number;
    }>;
    getOrdersByStatus(): Promise<{
        status: import("@prisma/client").$Enums.OrderStatus;
        count: number;
    }[]>;
    getRevenueOverTime(query: RevenueQueryDto): Promise<{
        date: string;
        revenue: number;
    }[]>;
    getTopProducts(): Promise<{
        productId: string;
        name: string;
        quantitySold: number;
        price: number;
        imageUrl: string | null;
    }[]>;
    getLowStock(query: LowStockQueryDto): Promise<{
        id: string;
        name: string;
        quantity: number;
        price: number;
        categoryName: string;
    }[]>;
}
