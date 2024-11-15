export function productLimiter(req, res, next) {
  const oldJson = res.json
  res.json = function(data) {
    data.viewedProducts = data.viewedProducts.slice(0, 10);

    res.json = oldJson;
    return res.json(data);
  };
  next();
}