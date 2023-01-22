import Client from '../database'

export type ProductOrder = {
  product_id: number
  order_id: number
  product_name: string
  quantity: number
  order_status: number
}


export class DashboardQueries{

  // async productsInOrder(orderId: number): Promise<ProductOrder[]> {
  //   try{
  //     const con = await Client.connect()
  //     const sql = 'SELECT * FROM order_products WHERE order_id = ($1)'
  //     const result = await con.query(sql, [orderId])
  //     con.release()
  //     return result.rows
  //   } catch(err){
  //     throw new Error(`Unable to get products of the order: ${err}`)
  //   }
  // }

  // get products for orders of the current login user
  // returns null if a users has not orders
  async productsInOrder(userId: string): Promise<ProductOrder | null> {
    try{
      const con = await Client.connect()
      // join tables products, orders and order_products
      const sql = 'SELECT products.id AS product_id, orders.id AS order_id, products.name AS product_name, order_products.quantity AS quantity, orders.status AS order_status FROM order_products INNER JOIN orders ON orders.user_id=($1) AND orders.id = order_products.order_id INNER JOIN products ON order_products.product_id = products.id'
      const result = await con.query(sql, [userId])
      con.release()
        if(result.rows.length){
          return result.rows[0]
        } else {
          return null
        }
    } catch(err){
      throw new Error(`Unable to get products of the order: ${err}`)
    }
  }

}
