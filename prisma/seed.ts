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

  const adminEmail = 'admin@urbanstyle.com';
  const existingAdmin = await prisma.admin.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash('admin1234', 10);
    await prisma.admin.create({
      data: {
        name: 'Admin User',
        email: adminEmail,
        password: passwordHash,
      },
    });
    console.log('Admin user created successfully: email: admin@urbanstyle.com, password: admin1234');
  } else {
    console.log('Admin user already exists.');
  }

  const requestedAdminEmail = 'urbanstyle@gmail.com';
  const existingRequestedAdmin = await prisma.admin.findUnique({
    where: { email: requestedAdminEmail },
  });

  if (!existingRequestedAdmin) {
    const requestedPasswordHash = await bcrypt.hash('urbanstyle_bangladesh_2026', 10);
    await prisma.admin.create({
      data: {
        name: 'Urban Style Admin',
        email: requestedAdminEmail,
        password: requestedPasswordHash,
      },
    });
    console.log('Requested Admin user created successfully: email: urbanstyle@gmail.com');
  } else {
    // Update password if it already exists to match requested
    const requestedPasswordHash = await bcrypt.hash('urbanstyle_bangladesh_2026', 10);
    await prisma.admin.update({
      where: { email: requestedAdminEmail },
      data: {
        password: requestedPasswordHash,
      },
    });
    console.log('Requested Admin user password updated successfully.');
  }

  await prisma.$disconnect();
  await pool.end();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
