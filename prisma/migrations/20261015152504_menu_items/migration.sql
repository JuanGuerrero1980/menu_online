-- CreateTable
CREATE TABLE "MenuCategory" (
    "id" UUID NOT NULL,
    "menuId" UUID NOT NULL,
    "categoryId" UUID NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MenuCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuItem" (
    "id" UUID NOT NULL,
    "menuCategoryId" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "priceOverride" DECIMAL(12,2),
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MenuItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MenuCategory_menuId_idx" ON "MenuCategory"("menuId");

-- CreateIndex
CREATE INDEX "MenuCategory_categoryId_idx" ON "MenuCategory"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "MenuCategory_menuId_categoryId_key" ON "MenuCategory"("menuId", "categoryId");

-- CreateIndex
CREATE INDEX "MenuItem_menuCategoryId_idx" ON "MenuItem"("menuCategoryId");

-- CreateIndex
CREATE INDEX "MenuItem_productId_idx" ON "MenuItem"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "MenuItem_menuCategoryId_productId_key" ON "MenuItem"("menuCategoryId", "productId");

-- CreateIndex
CREATE INDEX "Menu_tenantId_idx" ON "Menu"("tenantId");

-- AddForeignKey
ALTER TABLE "MenuCategory" ADD CONSTRAINT "MenuCategory_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuCategory" ADD CONSTRAINT "MenuCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuItem" ADD CONSTRAINT "MenuItem_menuCategoryId_fkey" FOREIGN KEY ("menuCategoryId") REFERENCES "MenuCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuItem" ADD CONSTRAINT "MenuItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
