import { PrismaService } from '../prisma/prisma.service';
import { RevenueRange } from './dto/revenue-query.dto';
export declare class AnalyticsService {
    private prisma;
    constructor(prisma: PrismaService);
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
    getRevenueOverTime(range: RevenueRange): Promise<{
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
    getLowStock(threshold: number): Promise<{
        id: string;
        name: string;
        quantity: number;
        price: number;
        categoryName: string;
    }[]>;
}
