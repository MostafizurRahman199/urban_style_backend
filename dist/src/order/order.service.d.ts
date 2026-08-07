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
                id: string;
                name: string;
            };
        } & {
            id: string;
            price: import("@prisma/client-runtime-utils").Decimal;
            quantity: number;
            color: string | null;
            productId: string;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        orderStatus: import("@prisma/client").$Enums.OrderStatus;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        customerName: string;
        contactNumber: string;
        address: string;
        message: string | null;
        totalAmount: import("@prisma/client-runtime-utils").Decimal;
    }>;
    findAll(query: ListOrdersDto): Promise<{
        data: ({
            items: ({
                product: {
                    id: string;
                    name: string;
                };
            } & {
                id: string;
                price: import("@prisma/client-runtime-utils").Decimal;
                quantity: number;
                color: string | null;
                productId: string;
                orderId: string;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            orderStatus: import("@prisma/client").$Enums.OrderStatus;
            paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
            customerName: string;
            contactNumber: string;
            address: string;
            message: string | null;
            totalAmount: import("@prisma/client-runtime-utils").Decimal;
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
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                description: string;
                categoryId: string;
                price: import("@prisma/client-runtime-utils").Decimal;
                quantity: number;
                colors: string[];
                isPopular: boolean;
                isActive: boolean;
            };
        } & {
            id: string;
            price: import("@prisma/client-runtime-utils").Decimal;
            quantity: number;
            color: string | null;
            productId: string;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        orderStatus: import("@prisma/client").$Enums.OrderStatus;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        customerName: string;
        contactNumber: string;
        address: string;
        message: string | null;
        totalAmount: import("@prisma/client-runtime-utils").Decimal;
    }>;
    updateOrderStatus(id: string, status: OrderStatus): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        orderStatus: import("@prisma/client").$Enums.OrderStatus;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        customerName: string;
        contactNumber: string;
        address: string;
        message: string | null;
        totalAmount: import("@prisma/client-runtime-utils").Decimal;
    }>;
    updatePaymentStatus(id: string, status: PaymentStatus): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        orderStatus: import("@prisma/client").$Enums.OrderStatus;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        customerName: string;
        contactNumber: string;
        address: string;
        message: string | null;
        totalAmount: import("@prisma/client-runtime-utils").Decimal;
    }>;
}
