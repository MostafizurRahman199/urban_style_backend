import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ListOrdersDto } from './dto/list-orders.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { UpdatePaymentStatusDto } from './dto/update-payment-status.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
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
    updateStatus(id: string, updateOrderStatusDto: UpdateOrderStatusDto): Promise<{
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
    updatePayment(id: string, updatePaymentStatusDto: UpdatePaymentStatusDto): Promise<{
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
