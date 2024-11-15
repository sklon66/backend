import express from 'express';
import apiV1 from './apis/api.v1.js';
import apiV2 from './apis/api.v2.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'test backend app',
      version: '3.0.0'
    }
  },
  apis: ['index.js', './routers/*.js']
}

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


/**
 * @swagger
 *  /HC:
 *    get:
 *      description: Health Check
 *      responses:
 *        200:
 *          description: success
 */
app.get('/HC', (req, res) => {
  res.sendStatus(200);
})

app.use('/api/v1', apiV1)
app.use('/api/v2', apiV2)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})