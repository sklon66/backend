import { Router } from "express";
import { create, get, getList } from '../controllers/products.controller.js';
import { productView } from "../middlewares/productView.js";

const productsRouter = Router();

// productsRouter.post('/', create);

/**
 * @swagger
 *  /api/v1/products:
 *    get:
 *      description: Get list of products
 *      responses:
 *        200:
 *          description: success
 */
productsRouter.get('/', getList);

/**
 * @swagger
 *  /api/v1/products/{productId}:
 *    get:
 *      description: Get product by id
 *      responses:
 *        200:
 *          description: success
 */
productsRouter.get('/:productId', productView, get);

export default productsRouter;
