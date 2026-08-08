import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
export declare class MessageController {
    private readonly messageService;
    constructor(messageService: MessageService);
    create(createMessageDto: CreateMessageDto): Promise<{
        email: string | null;
        id: string;
        name: string;
        createdAt: Date;
        contactNumber: string;
        message: string;
    }>;
    findAll(): Promise<{
        email: string | null;
        id: string;
        name: string;
        createdAt: Date;
        contactNumber: string;
        message: string;
    }[]>;
    remove(id: string): Promise<{
        email: string | null;
        id: string;
        name: string;
        createdAt: Date;
        contactNumber: string;
        message: string;
    }>;
}
