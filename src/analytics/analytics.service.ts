import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RevenueRange } from './dto/revenue-query.dto';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

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

  async getRevenueOverTime(range: RevenueRange) {
    const orders = await this.prisma.order.findMany({
      where: { paymentStatus: 'PAID' },
      select: { createdAt: true, totalAmount: true },
      orderBy: { createdAt: 'asc' },
    });

    const revenueMap: { [key: string]: number } = {};

    orders.forEach((order) => {
      const date = new Date(order.createdAt);
      let key = '';

      if (range === RevenueRange.DAY) {
        key = date.toISOString().split('T')[0];
      } else if (range === RevenueRange.WEEK) {
        const day = date.getDay();
        const diff = date.getDate() - day;
        const weekDate = new Date(date.setDate(diff));
        key = weekDate.toISOString().split('T')[0];
      } else if (range === RevenueRange.MONTH) {
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

  async getLowStock(threshold: number) {
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
}
