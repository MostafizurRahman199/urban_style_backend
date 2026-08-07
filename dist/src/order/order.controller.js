"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const order_service_1 = require("./order.service");
const create_order_dto_1 = require("./dto/create-order.dto");
const list_orders_dto_1 = require("./dto/list-orders.dto");
const update_order_status_dto_1 = require("./dto/update-order-status.dto");
const update_payment_status_dto_1 = require("./dto/update-payment-status.dto");
const update_cid_dto_1 = require("./dto/update-cid.dto");
const update_delivery_charge_dto_1 = require("./dto/update-delivery-charge.dto");
const public_decorator_1 = require("../common/decorators/public.decorator");
const throttler_1 = require("@nestjs/throttler");
let OrderController = class OrderController {
    orderService;
    constructor(orderService) {
        this.orderService = orderService;
    }
    create(createOrderDto) {
        return this.orderService.create(createOrderDto);
    }
    findAll(query) {
        return this.orderService.findAll(query);
    }
    findOne(id) {
        return this.orderService.findOne(id);
    }
    updateStatus(id, updateOrderStatusDto) {
        return this.orderService.updateOrderStatus(id, updateOrderStatusDto.status);
    }
    updatePayment(id, updatePaymentStatusDto) {
        return this.orderService.updatePaymentStatus(id, updatePaymentStatusDto.status);
    }
    updateCid(id, updateCidDto) {
        return this.orderService.updateCidNumber(id, updateCidDto.cidNumber);
    }
    updateDeliveryCharge(id, updateDeliveryChargeDto) {
        return this.orderService.updateDeliveryCharge(id, updateDeliveryChargeDto.deliveryCharge);
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.UseGuards)(throttler_1.ThrottlerGuard),
    (0, throttler_1.Throttle)({ default: { limit: 5, ttl: 60000 } }),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Place a new order (Public)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Order successfully placed' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input or out of stock' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'List orders (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return paginated orders' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_orders_dto_1.ListOrdersDto]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get order details (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return order details' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update order status (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Order status updated' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_order_status_dto_1.UpdateOrderStatusDto]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Patch)(':id/payment'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update order payment status (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Payment status updated' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_payment_status_dto_1.UpdatePaymentStatusDto]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "updatePayment", null);
__decorate([
    (0, common_1.Patch)(':id/cid'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update order CID Number (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'CID Number updated' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_cid_dto_1.UpdateCidDto]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "updateCid", null);
__decorate([
    (0, common_1.Patch)(':id/delivery-charge'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update order delivery charge (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Delivery charge updated' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_delivery_charge_dto_1.UpdateDeliveryChargeDto]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "updateDeliveryCharge", null);
exports.OrderController = OrderController = __decorate([
    (0, swagger_1.ApiTags)('Orders'),
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
//# sourceMappingURL=order.controller.js.map