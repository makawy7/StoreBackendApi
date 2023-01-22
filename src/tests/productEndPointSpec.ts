import request from 'supertest'
import server from '../server'
import Client from '../database'
import jwt from 'jsonwebtoken'

const user = {
  id:1,
  username:'abdallah',
  firstname:'abdallah',
  lastname:'mekawy',
  password:'abdallah'
}
// generate token to test routes protected with verifyAuthToken
const token = jwt.sign({user: user}, process.env.TOKEN_SECRET as string)

describe('Product Endpoints', (): void => {
  beforeAll(async () => {
    // delete all recordes after the test
    const con = await Client.connect()
    const sql = 'DELETE FROM products'
    await con.query(sql)
  })

  afterAll(() => {
    server.close()
  })

  describe('Server status', (): void => {
    it('server is working, and returns status code 200', async () => {
      await request(server).get('/health').expect(200)
    });
  });

  it('Can\'t create new product without token', async () => {
      const data = {
          name: 'Product 1',
          price: 12,
        }
      await request(server)
      .post('/product')
      .set({ 'Content-Type': 'application/json'})
      .send(data)
      .expect(401)
  });

  it('Successfully create new product with token', async () => {
      const data = {
      		name: 'Product 1',
      		price: '12',
      	}
      await request(server)
  		.post('/product')
      .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
  		.send(data)
  		.expect(200)
  		.then(async (response) => {
  			// Check the response
  			expect(response.body.id).toBeTruthy()
  			expect(response.body.name).toBe(data.name)
  			expect(response.body.price).toBe(data.price)
  		})
  });

  it('Index endpoint Successfully retrieving products', async () => {
      await request(server).get('/products').expect(200)
  });

  it('Show endpoint Successfully retrieving product', async () => {
    await request(server)
    .get('/product/1')
    .expect(200)
    .then(async (response) => {
      // Check the response
      expect(response.body.id).toBe(1)
      expect(response.body.name).toBe('Product 1')
      expect(response.body.price).toBe('12')
    })
  });


})
