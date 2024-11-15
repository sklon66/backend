import { Router } from "express";
import { recentlyViewedProducts } from '../controllers/users.controller.js';
import { productLimiter } from "../middlewares/productLimiter.js";

const usersRouter = Router();

/**
 * @swagger
 *  /api/v1/users/recentlyViewed:
 *    get:
 *      description: Get recently viewed product list 
 *      responses:
 *        200:
 *          description: success
 */
usersRouter.get('/recentlyViewed', productLimiter, recentlyViewedProducts);

export default usersRouter;
