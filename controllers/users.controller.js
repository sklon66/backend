import { getViewedProducts } from "../services/products.service.js";

export async function recentlyViewedProducts(req, res) {
  const viewedProducts = await getViewedProducts(req.user.uid)
  res.json({ viewedProducts });
}