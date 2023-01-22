import request from 'supertest'
import server from '../server'
import Client from '../database'
import jwt from 'jsonwebtoken'

const user = {
  id:9,
  username:'abdallah',
  firstname:'abdallah',
  lastname:'mekawy',
  password:'abdallah'
}
// generate token to test routes protected with verifyAuthToken
const token = jwt.sign({user: user}, process.env.TOKEN_SECRET as string)

describe('Orders Endpoints', (): void => {
  beforeAll(async () => {
    // inserting sample records
    const con = await Client.connect()
    const userSql = "INSERT INTO users VALUES (9,'user','abdallah','mekawy','abdallah')"
    const ordersSql = "INSERT INTO orders VALUES (9,9,0)"
    const productsSql = "INSERT INTO products VALUES (9,'product', 13)"
    const oPSql = "INSERT INTO order_products VALUES (9, 9, 3)"
    await con.query(`${userSql}; ${ordersSql}; ${productsSql}; ${oPSql}; `)
    con.release()
  })

  afterAll(async () => {
    // deleting sample records
    const con = await Client.connect()
    const oPSql = 'DELETE FROM order_products'
    const ordersSql = 'DELETE FROM orders'
    const productsSql = 'DELETE FROM products'
    const userSql = "DELETE FROM users"
    await con.query(`${oPSql}; ${ordersSql}; ${productsSql}; ${userSql}; `)
    con.release()
    server.close()
  })

  describe('Server status', (): void => {
    it('server is working, and returns status code 200', async () => {
      await request(server).get('/health').expect(200)
    });
  });

  it('Can\'t get user orders without auth token', async () => {
      await request(server)
      .get('/orders')
      .expect(401)
  });

  it('Successfully get user orders with auth token', async () => {
      await request(server)
      .get('/orders')
      .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
      .expect(200)
  });
})
