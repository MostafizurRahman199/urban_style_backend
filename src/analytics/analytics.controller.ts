import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { RevenueQueryDto, RevenueRange } from './dto/revenue-query.dto';
import { LowStockQueryDto } from './dto/low-stock-query.dto';

@ApiTags('Analytics')
@ApiBearerAuth()
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('summary')
  @ApiOperation({ summary: 'Get summary statistics (total revenue, orders, products, pending orders)' })
  @ApiResponse({ status: 200, description: 'Return summary analytics' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getSummary() {
    return this.analyticsService.getSummary();
  }

  @Get('orders-by-status')
  @ApiOperation({ summary: 'Get orders count grouped by status' })
  @ApiResponse({ status: 200, description: 'Return counts grouped by orderStatus' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getOrdersByStatus() {
    return this.analyticsService.getOrdersByStatus();
  }

  @Get('revenue-over-time')
  @ApiOperation({ summary: 'Get revenue grouped by time range' })
  @ApiResponse({ status: 200, description: 'Return revenue list over time' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getRevenueOverTime(@Query() query: RevenueQueryDto) {
    return this.analyticsService.getRevenueOverTime(query.range || RevenueRange.DAY);
  }

  @Get('top-products')
  @ApiOperation({ summary: 'Get best-selling products by quantity sold' })
  @ApiResponse({ status: 200, description: 'Return top products' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getTopProducts() {
    return this.analyticsService.getTopProducts();
  }

  @Get('low-stock')
  @ApiOperation({ summary: 'Get list of products below stock threshold' })
  @ApiResponse({ status: 200, description: 'Return products with low stock' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getLowStock(@Query() query: LowStockQueryDto) {
    return this.analyticsService.getLowStock(query.threshold ?? 10);
  }
}
