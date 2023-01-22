import express, { Request, Response } from 'express'
import { Product, ProductStore } from '../models/product'
import auth from '../middleware/verifyAuthToken'

const pStore = new ProductStore()


const index = async (_req: Request, res: Response) => {
  try {
    const products = await pStore.index()
    res.status(200)
    res.json(products)
  } catch (err) {
    res.json(`error occured while retrieving products: ${err}`)
  }
}

const show = async (req: Request, res: Response) => {
  try {
  const product = await pStore.show(req.params.id)
  res.status(200)
  res.json(product)
  } catch (err) {
    throw new Error(`error occured while showing product ${req.params.id}: ${err}`)
  }
}

const create = async (req: Request, res: Response) => {
  try {
    const p: Product = {
      name: req.body.name,
      price: req.body.price
    }
    const product = await pStore.create(p)
    res.status(200)
    res.json(product)
  } catch (err) {
    throw new Error(`error occured while creating product: ${err}`)
  }
}


const productRoutes = (app: express.Application) => {
  app.get('/products', index)
  app.post('/product', auth.verifyAuthToken, create)
  app.get('/product/:id', show)
}


export default productRoutes
