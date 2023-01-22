import { UserStore } from '../models/user';
import Client from '../database'

const pStore = new UserStore()

describe("User Model", () => {
  // delete all recordes after the test
  afterAll(async () => {
    const con = await Client.connect()
    const sql = 'DELETE FROM users'
    await con.query(sql)
  });

  it('should have an index method', () => {
    expect(pStore.index).toBeDefined();
  });

  it('should have a create method', () => {
    expect(pStore.create).toBeDefined();
  });

  it('should have a authenticate method', () => {
    expect(pStore.authenticate).toBeDefined();
  });
  it('should have a show method', () => {

    expect(pStore.show).toBeDefined();
  });



  it('create method should add a user', async () => {
    const result = await pStore.create({
      username: 'abdallah',
      firstname: 'abdallah',
      lastname: 'mekawy',
      password: 'password123'
    });
    expect(result).toBeDefined();
  });

  it('authenticate method should return the logged in user', async () => {
    const result = await pStore.authenticate("abdallah", "password123")
    expect(result).toBeDefined()
  });

  it('show method should return the correct user', async () => {
    const result = await pStore.show("1");
    expect(result).toBeDefined();
  });

  it('index method should return a list of users', async () => {
    const result = await pStore.index();
    expect(result[0].username).toEqual('abdallah');
  });


});
