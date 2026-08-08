import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
  const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('Database connection URL not found in environment variables.');
  }

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  console.log('Seeding database...');

  const adminEmail = process.env.ADMIN_EMAIL || process.env.admin_email;
  const adminPassword = process.env.ADMIN_PASSWORD || process.env.admin_password;

  if (adminEmail && adminPassword) {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    const existingAdmin = await prisma.admin.findUnique({
      where: { email: adminEmail },
    });

    if (!existingAdmin) {
      await prisma.admin.create({
        data: {
          name: 'Urban Style Admin',
          email: adminEmail,
          password: passwordHash,
        },
      });
      console.log(`Admin user created successfully for email: ${adminEmail}`);
    } else {
      await prisma.admin.update({
        where: { email: adminEmail },
        data: {
          password: passwordHash,
        },
      });
      console.log(`Admin user password updated successfully for email: ${adminEmail}`);
    }
  } else {
    console.warn('Skipping admin seeding: ADMIN_EMAIL / ADMIN_PASSWORD (or admin_email / admin_password) not set in environment variables.');
  }

  await prisma.$disconnect();
  await pool.end();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });