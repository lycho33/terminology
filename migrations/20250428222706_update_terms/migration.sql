/*
  Warnings:

  - You are about to drop the column `Example` on the `Term` table. All the data in the column will be lost.
  - You are about to drop the column `Usage` on the `Term` table. All the data in the column will be lost.
  - Added the required column `example` to the `Term` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topicId` to the `Term` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usage` to the `Term` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Term" DROP COLUMN "Example",
DROP COLUMN "Usage",
ADD COLUMN     "example" JSONB NOT NULL,
ADD COLUMN     "topicId" INTEGER NOT NULL,
ADD COLUMN     "usage" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Term" ADD CONSTRAINT "Term_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
