import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private logger = new Logger(PrismaService.name);
  private pool?: Pool;

  constructor(configService: ConfigService) {
    const dbUrl =
      configService.get<string>('DIRECT_URL') ||
      process.env.DIRECT_URL ||
      configService.get<string>('DATABASE_URL') ||
      process.env.DATABASE_URL ||
      '';

    let adapter: PrismaPg | undefined;
    let pool: Pool | undefined;

    if (dbUrl) {
      try {
        pool = new Pool({
          connectionString: dbUrl,
          ssl: { rejectUnauthorized: false },
        });
        adapter = new PrismaPg(pool);
      } catch (err) {
        console.error('Failed to initialize PrismaPg adapter:', err);
      }
    }

    if (adapter) {
      super({ adapter });
    } else {
      super();
    }

    this.pool = pool;
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Successfully connected to the database.');
    } catch (error) {
      this.logger.error('Database connection error during onModuleInit:', error);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    if (this.pool) {
      await this.pool.end();
    }
  }
}
