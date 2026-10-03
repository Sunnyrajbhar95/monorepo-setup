/*
  Warnings:

  - Added the required column `email` to the `BillParticipent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobile` to the `BillParticipent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `BillParticipent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BillParticipent" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "mobile" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
