import { Router } from "express";
import usersRouter from "../routers/users.router.js";
import productsRouter from "../routers/products.router.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";

const apiV1 = Router();

apiV1.use(tokenValidation);

apiV1.use('/users', usersRouter);
apiV1.use('/products', productsRouter);

export default apiV1;
