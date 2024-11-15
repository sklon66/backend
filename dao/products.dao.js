import redisClient from '../utils/redis.js';
import db from '../utils/firebase.js'
import admin from 'firebase-admin'

const productsRef = db.collection('Products');

export async function create(name, description) {
  await productsRef.add({
    name,
    description
  })
}

export async function list(filter) {
  let query = productsRef;
  const data = [];

  if (filter.id?.length > 0) {
    const cache = await redisClient.MGET(filter.id);

    cache.forEach((product) => {
      if (!product) return;
      product = JSON.parse(product);

      data.push(product);
      filter.id = filter.id.filter(id => id !== product.id);
    });

    if (filter.id.length === 0) {
      return data;
    }

    query = query.where(
      admin.firestore.FieldPath.documentId(),
      'in',
      filter.id
    );
  }

  const result = await query.get();

  result.forEach(doc => data.push({...doc.data(), id: doc.id}));
  return data;
}
