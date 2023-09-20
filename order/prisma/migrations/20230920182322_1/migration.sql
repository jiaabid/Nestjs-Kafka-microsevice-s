-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "products" INTEGER[],
    "createdBy" INTEGER NOT NULL,
    "bill" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);
