import express, { Request, Response } from 'express'
// import { showUserOrders } from './order'
import { DashboardQueries } from '../services/dashboard'
import auth from '../middleware/verifyAuthToken'

const orderProducts = new DashboardQueries()



// get orders of the logged in user
const getOrders = async (req: Request, res: Response) =>{
  try {
    const user = auth.getLoggedInUser(req)
    const orders = await orderProducts.productsInOrder(user.id)
    res.status(200)
    if(orders == null) {
      res.json('Logged in user has no orders')
    } else {
      res.json(orders)
    }
  } catch (err) {
     res.status(401)
     res.json(`Error while retreiving user order: ${err}`)
   }
}

// const getOrders = async (req: Request, res: Response) => {
//   try {
//     const user = auth.getLoggedInUser(req)
//     const order = await showUserOrders(user.id)
//     if(order == null) {
//       res.json('Logged in user has not orders')
//     } else {
//       const orderId = order.id;
//       const products = await orderProducts.productsInOrder(orderId);
//       res.json(products)
//     }
//   } catch (err) {
//     res.status(401)
//     res.json(`Error while retreiving user order: ${err}`)
//   }
// }


const dashboardRoutes = (app: express.Application)=>{
  app.get('/orders', auth.verifyAuthToken, getOrders)
}

export default dashboardRoutes
