import { getProducts } from "../services/products.service.js";

export async function get(req, res) {
  const products = await getProducts(req.params.productId);
  res.json({ products });
}

export async function getList(req, res) {
  const products = await getProducts();
  res.json({ products });
}

export function create(req, res) {
  res.json({ success: true });
}