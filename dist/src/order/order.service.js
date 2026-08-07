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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OrderService = class OrderService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createOrderDto) {
        return this.prisma.$transaction(async (tx) => {
            let itemsSubtotal = 0;
            const orderItemsData = [];
            for (const item of createOrderDto.items) {
                const product = await tx.product.findUnique({
                    where: { id: item.productId },
                });
                if (!product) {
                    throw new common_1.NotFoundException(`Product with ID ${item.productId} not found`);
                }
                if (!product.isActive) {
                    throw new common_1.BadRequestException(`Product "${product.name}" is not active`);
                }
                if (product.quantity < item.quantity) {
                    throw new common_1.BadRequestException(`Insufficient stock for "${product.name}". Available: ${product.quantity}, requested: ${item.quantity}`);
                }
                const price = product.discountPrice !== null && product.discountPrice !== undefined
                    ? Number(product.discountPrice)
                    : Number(product.price);
                const itemTotal = price * item.quantity;
                itemsSubtotal += itemTotal;
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
                    price: price,
                    color: item.color || null,
                    size: item.size || null,
                });
            }
            const deliveryCharge = Number(createOrderDto.deliveryCharge || 0);
            const totalAmount = itemsSubtotal + deliveryCharge;
            const order = await tx.order.create({
                data: {
                    customerName: createOrderDto.customerName,
                    contactNumber: createOrderDto.contactNumber,
                    address: createOrderDto.address,
                    message: createOrderDto.message || null,
                    deliveryCharge,
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
    async findAll(query) {
        const { orderStatus, paymentStatus, startDate, endDate, search, page = 1, limit = 10 } = query;
        const skip = (page - 1) * limit;
        const where = {};
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
    async findOne(id) {
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
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        return order;
    }
    async updateOrderStatus(id, status) {
        await this.findOne(id);
        return this.prisma.order.update({
            where: { id },
            data: { orderStatus: status },
        });
    }
    async updatePaymentStatus(id, status) {
        await this.findOne(id);
        return this.prisma.order.update({
            where: { id },
            data: { paymentStatus: status },
        });
    }
    async updateCidNumber(id, cidNumber) {
        await this.findOne(id);
        return this.prisma.order.update({
            where: { id },
            data: { cidNumber },
        });
    }
    async updateDeliveryCharge(id, deliveryCharge) {
        const order = await this.findOne(id);
        const itemsSubtotal = order.items.reduce((sum, item) => {
            return sum + Number(item.price) * item.quantity;
        }, 0);
        const newDeliveryCharge = Number(deliveryCharge || 0);
        const newTotalAmount = itemsSubtotal + newDeliveryCharge;
        return this.prisma.order.update({
            where: { id },
            data: {
                deliveryCharge: newDeliveryCharge,
                totalAmount: newTotalAmount,
            },
        });
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrderService);
//# sourceMappingURL=order.service.js.map