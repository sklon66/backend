import db from '../utils/firebase.js'
import redisClient from '../utils/redis.js';

const viewsRef = db.collection('Views');

export async function create(userId = 123, productId) {
  await viewsRef.add({
    userId,
    productId
  })
}

export async function listByUserId(userId) {
  const result = await viewsRef.where('userId', '==', userId).get();
  const data = [];

  result.forEach(doc => {
    doc = doc.data();
    const duplicate = data.find(i => i.productId === doc.productId);
    if (!duplicate) {
      data.push({ ...doc })
    }
  });

  return data;
}
