import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ListOrdersDto } from './dto/list-orders.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { UpdatePaymentStatusDto } from './dto/update-payment-status.dto';
import { UpdateCidDto } from './dto/update-cid.dto';
import { Public } from '../common/decorators/public.decorator';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Public()
  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post()
  @ApiOperation({ summary: 'Place a new order (Public)' })
  @ApiResponse({ status: 201, description: 'Order successfully placed' })
  @ApiResponse({ status: 400, description: 'Invalid input or out of stock' })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List orders (Admin only)' })
  @ApiResponse({ status: 200, description: 'Return paginated orders' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll(@Query() query: ListOrdersDto) {
    return this.orderService.findAll(query);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get order details (Admin only)' })
  @ApiResponse({ status: 200, description: 'Return order details' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch(':id/status')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update order status (Admin only)' })
  @ApiResponse({ status: 200, description: 'Order status updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  updateStatus(@Param('id') id: string, @Body() updateOrderStatusDto: UpdateOrderStatusDto) {
    return this.orderService.updateOrderStatus(id, updateOrderStatusDto.status);
  }

  @Patch(':id/payment')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update order payment status (Admin only)' })
  @ApiResponse({ status: 200, description: 'Payment status updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  updatePayment(@Param('id') id: string, @Body() updatePaymentStatusDto: UpdatePaymentStatusDto) {
    return this.orderService.updatePaymentStatus(id, updatePaymentStatusDto.status);
  }

  @Patch(':id/cid')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update order CID Number (Admin only)' })
  @ApiResponse({ status: 200, description: 'CID Number updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  updateCid(@Param('id') id: string, @Body() updateCidDto: UpdateCidDto) {
    return this.orderService.updateCidNumber(id, updateCidDto.cidNumber);
  }
}
