import { OrderStatus, PaymentStatus } from '@prisma/client';
export declare class ListOrdersDto {
    orderStatus?: OrderStatus;
    paymentStatus?: PaymentStatus;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
}
