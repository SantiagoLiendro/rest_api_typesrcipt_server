import { Request, Response } from "express"

import Products from "../models/Product.model"

export const getProducts = async (req: Request, res: Response) => {
    const products = await Products.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt'],
        },
        order: [
            ['id', 'DESC']
        ]
    })
    res.json({ data: products })
}

export const getProductByID = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Products.findByPk(id)
    if (!product) {
        return res
            .status(404)
            .json({ error: "Producto no encontrado" })
    }

    res.json({ data: product })
}

export const createProduct = async (req: Request, res: Response) => {
    //Validacion

    const product = await Products.create(req.body)
    res.status(201).json({ data: product })
}

export const updateProduct = async (req: Request, res: Response) => {

    const { id } = req.params
    const product = await Products.findByPk(id)
    if (!product) {
        return res
            .status(404)
            .json({ error: "Producto no encontrado" })
    }
    await product.update(req.body)
    await product.save()
    res.json({ data: product })
}

export const updateAvailability = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Products.findByPk(id)
    if (!product) {
        return res
            .status(404)
            .json({ error: "Producto no encontrado" })
    }

    product.availability = !product.dataValues.availability
    await product.save()
    res.json({ data: product })
}

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Products.findByPk(id)
    if (!product) {
        return res
            .status(404)
            .json({ error: "Producto no encontrado" })
    }
    await product.destroy()
    res.json({ data: "Producto Eliminado." })
}

