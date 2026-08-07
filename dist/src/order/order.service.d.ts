import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ListOrdersDto } from './dto/list-orders.dto';
import { OrderStatus, PaymentStatus } from '@prisma/client';
export declare class OrderService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createOrderDto: CreateOrderDto): Promise<{
        items: ({
            product: {
                name: string;
                id: string;
            };
        } & {
            price: import("@prisma/client-runtime-utils").Decimal;
            quantity: number;
            id: string;
            color: string | null;
            productId: string;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        customerName: string;
        contactNumber: string;
        address: string;
        message: string | null;
        totalAmount: import("@prisma/client-runtime-utils").Decimal;
        orderStatus: import("@prisma/client").$Enums.OrderStatus;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
    }>;
    findAll(query: ListOrdersDto): Promise<{
        data: ({
            items: ({
                product: {
                    name: string;
                    id: string;
                };
            } & {
                price: import("@prisma/client-runtime-utils").Decimal;
                quantity: number;
                id: string;
                color: string | null;
                productId: string;
                orderId: string;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            customerName: string;
            contactNumber: string;
            address: string;
            message: string | null;
            totalAmount: import("@prisma/client-runtime-utils").Decimal;
            orderStatus: import("@prisma/client").$Enums.OrderStatus;
            paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        items: ({
            product: {
                description: string;
                name: string;
                price: import("@prisma/client-runtime-utils").Decimal;
                quantity: number;
                colors: string[];
                isPopular: boolean;
                isActive: boolean;
                categoryId: string;
                id: string;
                discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            price: import("@prisma/client-runtime-utils").Decimal;
            quantity: number;
            id: string;
            color: string | null;
            productId: string;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        customerName: string;
        contactNumber: string;
        address: string;
        message: string | null;
        totalAmount: import("@prisma/client-runtime-utils").Decimal;
        orderStatus: import("@prisma/client").$Enums.OrderStatus;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
    }>;
    updateOrderStatus(id: string, status: OrderStatus): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        customerName: string;
        contactNumber: string;
        address: string;
        message: string | null;
        totalAmount: import("@prisma/client-runtime-utils").Decimal;
        orderStatus: import("@prisma/client").$Enums.OrderStatus;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
    }>;
    updatePaymentStatus(id: string, status: PaymentStatus): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        customerName: string;
        contactNumber: string;
        address: string;
        message: string | null;
        totalAmount: import("@prisma/client-runtime-utils").Decimal;
        orderStatus: import("@prisma/client").$Enums.OrderStatus;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
    }>;
}
