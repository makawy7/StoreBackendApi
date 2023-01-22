import Client from '../database'


export type Product = {
  id?: Number
  name: string
  price: string
}

export class ProductStore{
  async index(): Promise<Product[]> {
    try{
      const con = await Client.connect()
      const sql = 'SELECT * FROM products'
      const result = await con.query(sql)
      con.release()
      return result.rows
    } catch(err){
      throw new Error(`Unable to get products: ${err}`)
    }
  }

  async show(id: string): Promise<Product> {
    try{
      const con = await Client.connect()
      const sql = 'SELECT * FROM products WHERE id=($1)'
      const result = await con.query(sql, [id])
      con.release()
      return result.rows[0]
    } catch(err){
      throw new Error(`Unable to show product: ${err}`)
    }
  }
  async create(p: Product): Promise<Product> {
    try{
      const con = await Client.connect()
      const sql = 'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *'
      const result = await con.query(sql, [p.name, p.price])
      con.release()
      return result.rows[0]
    } catch(err){
      throw new Error(`Unable to create product: ${err}`)
    }
  }
}
