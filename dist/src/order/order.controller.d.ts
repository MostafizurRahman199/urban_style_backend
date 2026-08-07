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
            quantity: number;
            price: import("@prisma/client-runtime-utils").Decimal;
            color: string | null;
            productId: string;
            orderId: string;
        })[];
    } & {
        id: string;
        customerName: string;
        contactNumber: string;
        address: string;
        message: string | null;
        totalAmount: import("@prisma/client-runtime-utils").Decimal;
        orderStatus: import("@prisma/client").$Enums.OrderStatus;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        createdAt: Date;
        updatedAt: Date;
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
                quantity: number;
                price: import("@prisma/client-runtime-utils").Decimal;
                color: string | null;
                productId: string;
                orderId: string;
            })[];
        } & {
            id: string;
            customerName: string;
            contactNumber: string;
            address: string;
            message: string | null;
            totalAmount: import("@prisma/client-runtime-utils").Decimal;
            orderStatus: import("@prisma/client").$Enums.OrderStatus;
            paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
            createdAt: Date;
            updatedAt: Date;
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
                createdAt: Date;
                updatedAt: Date;
                quantity: number;
                price: import("@prisma/client-runtime-utils").Decimal;
                name: string;
                description: string;
                discountPrice: import("@prisma/client-runtime-utils").Decimal | null;
                colors: string[];
                isPopular: boolean;
                isActive: boolean;
                categoryId: string;
            };
        } & {
            id: string;
            quantity: number;
            price: import("@prisma/client-runtime-utils").Decimal;
            color: string | null;
            productId: string;
            orderId: string;
        })[];
    } & {
        id: string;
        customerName: string;
        contactNumber: string;
        address: string;
        message: string | null;
        totalAmount: import("@prisma/client-runtime-utils").Decimal;
        orderStatus: import("@prisma/client").$Enums.OrderStatus;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateStatus(id: string, updateOrderStatusDto: UpdateOrderStatusDto): Promise<{
        id: string;
        customerName: string;
        contactNumber: string;
        address: string;
        message: string | null;
        totalAmount: import("@prisma/client-runtime-utils").Decimal;
        orderStatus: import("@prisma/client").$Enums.OrderStatus;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updatePayment(id: string, updatePaymentStatusDto: UpdatePaymentStatusDto): Promise<{
        id: string;
        customerName: string;
        contactNumber: string;
        address: string;
        message: string | null;
        totalAmount: import("@prisma/client-runtime-utils").Decimal;
        orderStatus: import("@prisma/client").$Enums.OrderStatus;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
