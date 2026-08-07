import { CreateOrderItemDto } from './create-order-item.dto';
export declare class CreateOrderDto {
    customerName: string;
    contactNumber: string;
    address: string;
    message?: string;
    deliveryCharge?: number;
    items: CreateOrderItemDto[];
}
