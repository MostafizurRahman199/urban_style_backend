import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('messages')
@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Submit a new contact message (Public)' })
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Get all contact messages (Admin only)' })
  findAll() {
    return this.messageService.findAll();
  }

  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a contact message by ID (Admin only)' })
  remove(@Param('id') id: string) {
    return this.messageService.remove(id);
  }
}
