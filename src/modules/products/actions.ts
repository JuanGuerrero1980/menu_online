"use server";

import { uploadProductImage, removeStoredImage } from "@/lib/storage/service";
import {
  createProduct,
  updateProduct,
  addProductImage,
  removeProductImage,
} from "./service";
import { ProductStatus } from "@/generated/prisma/enums";

export async function createProductAction(
  tenantId: string,
  formData: FormData
) {
  const product = await createProduct(tenantId, {
    name: formData.get("name") as string,
    description: (formData.get("description") as string) || undefined,
    basePrice: Number(formData.get("basePrice")),
    status: formData.get("status") as ProductStatus,
  });

  const file = formData.get("image") as File | null;
  if (file && file.size > 0) {
    const url = await uploadProductImage(file);
    await addProductImage(
      tenantId,
      product.id,
      url,
      (formData.get("altText") as string) || undefined
    );
  }

  return product;
}

export async function updateProductAction(
  tenantId: string,
  productId: string,
  formData: FormData
) {
  const product = await updateProduct(tenantId, productId, {
    name: formData.get("name") as string,
    description: (formData.get("description") as string) || undefined,
    basePrice: Number(formData.get("basePrice")),
    status: formData.get("status") as ProductStatus,
  });

  const file = formData.get("image") as File | null;
  if (file && file.size > 0) {
    const url = await uploadProductImage(file);
    await addProductImage(
      tenantId,
      product.id,
      url,
      (formData.get("altText") as string) || undefined
    );
  }

  return product;
}

export async function removeProductImageAction(
  tenantId: string,
  imageId: string
) {
  const image = await removeProductImage(tenantId, imageId);
  await removeStoredImage(image.url);
  return image;
}
