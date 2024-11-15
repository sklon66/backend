import { addView } from "../services/views.service.js";
import redisClient from "../utils/redis.js";

export function productView(req, res, next) {
  const oldJson = res.json
  res.json = async function(data) {
    const productL = data.products.length;
    for (let i = 0; i < productL; i++) {
      const product = data.products[i];

      const userId = req.user?.uid;
  
      const topScores = await redisClient.zRangeWithScores('counters', -10, -1);
  
      const productScore = await redisClient.zIncrBy('counters', 1, product.id);
  
      changeCachedProductIfNeeded(product, productScore, topScores);
  
      console.log(`Product view`, { userId, productId: product.id });
      addView(userId, product.id);
  
      res.json = oldJson;
      return res.json(data);
    }
  };
  next();
};

function changeCachedProductIfNeeded(product, productScore, topScores) {
  if (topScores.length < 10) {
    redisClient.set(product.id, JSON.stringify(product));
    return;
  }

  if (!topScores.find(score => score.id === product.id)) {
    redisClient.set(product.id, JSON.stringify(product));
    const lowestScore = topScores.reduce((acc, val) => {
      if (val.score < acc.score) {
        acc = val;
      }
    }, { value: product.id, score: productScore });

    redisClient.del(lowestScore.value);
    return;
  }


}