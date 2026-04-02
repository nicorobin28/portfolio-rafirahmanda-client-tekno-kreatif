-- CreateEnum
CREATE TYPE "ImageAnchorPosition" AS ENUM ('BEFORE', 'AFTER');

-- AlterTable
ALTER TABLE "portfolio_images" ADD COLUMN     "anchorContentId" TEXT,
ADD COLUMN     "anchorPosition" "ImageAnchorPosition";

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "color" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portfolio_tags" (
    "portfolioId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "portfolio_tags_pkey" PRIMARY KEY ("portfolioId","tagId")
);

-- CreateIndex
CREATE UNIQUE INDEX "tags_label_key" ON "tags"("label");

-- AddForeignKey
ALTER TABLE "portfolio_images" ADD CONSTRAINT "portfolio_images_anchorContentId_fkey" FOREIGN KEY ("anchorContentId") REFERENCES "portfolio_contents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolio_tags" ADD CONSTRAINT "portfolio_tags_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "portfolios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolio_tags" ADD CONSTRAINT "portfolio_tags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
