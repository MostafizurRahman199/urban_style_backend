/*
  Warnings:

  - Added the required column `contactNumber` to the `ContactMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ContactMessage" ADD COLUMN     "contactNumber" TEXT NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;
