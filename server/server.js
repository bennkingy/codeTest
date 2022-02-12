const data = require('./data/response.json')
const express = require('express')
const app = express()
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Holidays API",
      version: '1.0.0',
    },
  },
  apis: ["server.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/**
* @swagger
* /api:
*   get:
*     description: Get all product data for holidays category
*     responses:
*       200:
*         description: Success
* 
*/
app.get("/api", (req, res) => {
    res.json(data)
})
  
app.listen(5000, () => {console.log("Server started on port 5000", data)})