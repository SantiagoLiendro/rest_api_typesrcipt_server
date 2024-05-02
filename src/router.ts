import { Router } from "express";
import { body, param } from 'express-validator'

import {
    createProduct, getProducts,
    getProductByID, updateProduct,
    updateAvailability, deleteProduct
} from "./handlers/products";
import { handleInputError } from "./middleware";


const router = Router()

/**
 *@swagger
 *components:
 *     schemas:
 *         Product:
 *              type: object
 *              properties:
 *                  id: 
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name: 
 *                      type: string
 *                      description: The Product name
 *                      example: Monitor curvo de 42 pulgadas
 *                  price: 
 *                      type: float
 *                      description: The Product price
 *                      example: 300
 * 
 *                  availability: 
 *                      type: boolean
 *                      description: The Product availability
 *                      example: true
 */

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of Products
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                             schema:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Product'
 */

router.get('/', getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: Get a product by ID
 *      tags:
 *          - Products
 *      description: Return a product based on its unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          requiered: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful Response
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Not found
 *          400:
 *              description: Bad Request - Invalid ID
 */

router.get('/:id',
    param('id')
        .isInt().withMessage("ID no valido."),
    handleInputError,
    getProductByID
)

/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Create a new product
 *      tags:   
 *          - Products
 *      description: Return a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor Curvo 49 pulgadas"
 *                          price:
 *                              type: number
 *                              example: 399
 *      responses:
 *        201:
 *           description: Product created successfully
 *        400:
 *            description: Bad Request - invalid input data
 */

router.post('/',
    body('name').notEmpty().withMessage('El nombre del producto no puede ir vacio.'),
    body('price')
        .isNumeric().withMessage("Valor no valido.")
        .notEmpty().withMessage('El producto debe tener un precio.')
        .custom(value => value > 0).withMessage("Precio no valido."),
    handleInputError,
    createProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Update a product white user input
 *      tags:
 *          - Products
 *      description: Retunrs the updated product
 *      parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the product to update
 *            required: true
 *            schema:
 *                type: integer
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor curvo"
 *                          price:
 *                              type: number
 *                              example: 300
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Return the updated product
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - invalid ID or ivalid input data
 *          404:
 *              description: Not found
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties: 
 *                              error:
 *                                  type: string
 */

router.put('/:id',
    param('id')
        .isInt().withMessage("ID no valido."),
    body('name').notEmpty().withMessage('El nombre del producto no puede ir vacio.'),
    body('price')
        .isNumeric().withMessage("Valor no valido.")
        .notEmpty().withMessage('El producto debe tener un precio.')
        .custom(value => value > 0).withMessage("Precio no valido."),
    body('availability')
        .isBoolean().withMessage("Valor para disponiblilidad no valido."),
    handleInputError,
    updateProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Change the availability the product
 *      tags:
 *          - Products
 *      description: Return the product thad the availability updated 
 *      parameters:
 *          - in: path
 *            name: id
 *            description: The ID the of product to update
 *            required: true
 *            schema: 
 *               type: integer
 *      responses:
 *          200: 
 *              description: Return the product with the changed Return the product with the changed availability
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400: 
 *              description: Bad Request - invalid ID
 *          404:
 *              description: Not found
 *              content:
 *                  application/json:  
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 */

router.patch('/:id',
    param('id')
        .isInt().withMessage("ID no valido."),
    handleInputError,
    updateAvailability
)

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Remove a product
 *      tags:
 *          - Products
 *      description: Remove a product
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID thad product to remove
 *          required: true
 *          schema: 
 *              type: integer
 *      responses:
 *          200: 
 *              description: The product was removed successful
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              data:
 *                                  type: string
 *                                  value: Producto Eliminado.
 *          400:
 *              description: Bad request - Invalid ID
 *          404:
 *              description: Not Found
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                               error:
 *                                  type: string
 */

router.delete('/:id',
    param('id')
        .isInt().withMessage("ID no valido."),
    handleInputError,
    deleteProduct
)


export default router;