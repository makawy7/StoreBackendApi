// import Client from '../database'
//
//
// export type Order = {
//   id: number
//   user_id: string
//   status: string
// }
//
// export class OrderStore{
//   // async create(user: number): Promise<Order[]> {
//   //   try{
//   //     const con = await Client.connect()
//   //     const sql = 'INSERT INTO orders (user_id, status) VALUES ($1, 0) RETURNING *'
//   //     const result = await con.query(sql, [user])
//   //     con.release()
//   //     return result.rows
//   //   } catch(err){
//   //     throw new Error(`Unable to create order: ${err}`)
//   //   }
//   // }
//   async show(id: string): Promise<Order | null> {
//     try{
//       const con = await Client.connect()
//       const sql = 'SELECT * FROM orders where user_id=($1)'
//       const result = await con.query(sql, [id])
//       con.release()
//       if(result.rows.length){
//         return result.rows[0]
//       } else {
//         return null
//       }
//     } catch(err){
//       throw new Error(`Unable to get orders: ${err}`)
//     }
//   }
//
// }
