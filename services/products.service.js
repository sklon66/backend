import { list } from "../dao/products.dao.js";
import { getViewed } from "./views.service.js"

export async function getProducts(id) {
  return await list({ id: id ? [id] : undefined });
}

export async function getViewedProducts(userId) {
  const viewedProductsIds = await getViewed(userId);

  if (viewedProductsIds.length === 0) {
    return [];
  }

  return await list({ id: viewedProductsIds.map(view => view.productId) });
}
