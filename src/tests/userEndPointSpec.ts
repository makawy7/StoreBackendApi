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

describe('Users Endpoints', (): void => {
  afterAll(async () => {
    server.close()
    // delete all recordes after the test
    const con = await Client.connect()
    const sql = 'DELETE FROM users'
    await con.query(sql)
  })

  describe('Server status', (): void => {
    it('server is working, and returns status code 200', async () => {
      await request(server).get('/health').expect(200)
    });
  });


  it('Successfully creating new user', async () => {
      const data = {
          username:'abdallah',
          firstname:'abdallah',
          lastname:'mekawy',
          password:'password123'
        }
      await request(server)
      .post('/user')
      .set({ 'Content-Type': 'application/json'})
      .send(data)
      .expect(200)
  });

  it('Successfully authenticating user', async () => {
      const data = {
      		username:'abdallah',
      		password:'password123'
      	}
      await request(server)
  		.post('/authenticate')
      .set({ 'Content-Type': 'application/json'})
  		.send(data)
  		.expect(200)
  });

  it('Can\'t show user without token', async () => {
      await request(server)
      .get('/user/1')
      .expect(401)
  });
  it('Successfully showing user with token', async () => {
      await request(server)
      .get('/user/1')
      .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
      .expect(200)
      .then((response) => {
        expect(response.body.username).toBe('abdallah')
      })
  });

  it('Can\'t retrieve users without token', async () => {
    await request(server).get('/users').expect(401)
  });
  it('index endpoint Successfully retrieving users with token', async () => {
    await request(server)
          .get('/users')
          .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
          .expect(200)
  });


})
