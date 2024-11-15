import { create, listByUserId } from "../dao/views.dao.js";

export async function addView(userId, productId) {
  await create(userId, productId)
}

export async function getViewed(userId) {
  return await listByUserId(userId);
}