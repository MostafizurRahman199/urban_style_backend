import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ListOrdersDto } from './dto/list-orders.dto';
import { OrderStatus, PaymentStatus } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    return this.prisma.$transaction(async (tx) => {
      let totalAmount = 0;
      const orderItemsData: any[] = [];

      for (const item of createOrderDto.items) {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
        });

        if (!product) {
          throw new NotFoundException(`Product with ID ${item.productId} not found`);
        }

        if (!product.isActive) {
          throw new BadRequestException(`Product "${product.name}" is not active`);
        }

        if (product.quantity < item.quantity) {
          throw new BadRequestException(
            `Insufficient stock for "${product.name}". Available: ${product.quantity}, requested: ${item.quantity}`,
          );
        }

        const price = Number(product.price);
        const itemTotal = price * item.quantity;
        totalAmount += itemTotal;

        // Decrement stock
        await tx.product.update({
          where: { id: product.id },
          data: {
            quantity: {
              decrement: item.quantity,
            },
          },
        });

        orderItemsData.push({
          productId: product.id,
          quantity: item.quantity,
          price: product.price,
          color: item.color || null,
          size: item.size || null,
        });
      }

      const order = await tx.order.create({
        data: {
          customerName: createOrderDto.customerName,
          contactNumber: createOrderDto.contactNumber,
          address: createOrderDto.address,
          message: createOrderDto.message || null,
          totalAmount,
          items: {
            create: orderItemsData,
          },
        },
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });

      return order;
    });
  }

  async findAll(query: ListOrdersDto) {
    const { orderStatus, paymentStatus, startDate, endDate, search, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (orderStatus) {
      where.orderStatus = orderStatus;
    }

    if (paymentStatus) {
      where.paymentStatus = paymentStatus;
    }

    if (search) {
      where.OR = [
        { id: { contains: search, mode: 'insensitive' } },
        { cidNumber: { contains: search, mode: 'insensitive' } },
        { customerName: { contains: search, mode: 'insensitive' } },
        { contactNumber: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) {
        where.createdAt.gte = new Date(startDate);
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        where.createdAt.lte = end;
      }
    }

    const [total, data] = await Promise.all([
      this.prisma.order.count({ where }),
      this.prisma.order.findMany({
        where,
        skip,
        take: limit,
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  async updateOrderStatus(id: string, status: OrderStatus) {
    await this.findOne(id);
    return this.prisma.order.update({
      where: { id },
      data: { orderStatus: status },
    });
  }

  async updatePaymentStatus(id: string, status: PaymentStatus) {
    await this.findOne(id);
    return this.prisma.order.update({
      where: { id },
      data: { paymentStatus: status },
    });
  }

  async updateCidNumber(id: string, cidNumber: string) {
    await this.findOne(id);
    return this.prisma.order.update({
      where: { id },
      data: { cidNumber },
    });
  }
}
