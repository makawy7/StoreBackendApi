import { DashboardQueries } from '../services/dashboard';
import Client from '../database'

const dStore = new DashboardQueries()


describe("DashboardQueries Model", () => {

  beforeAll(async () => {
    // inserting sample records
    const con = await Client.connect()
    const userSql = "INSERT INTO users VALUES (9,'user','abdallah','mekawy','abdallah')"
    const ordersSql = "INSERT INTO orders VALUES (9,9,0)"
    const productsSql = "INSERT INTO products VALUES (9,'product', 13)"
    const oPSql = "INSERT INTO order_products VALUES (9, 9, 3)"
    await con.query(`${userSql}; ${ordersSql}; ${productsSql}; ${oPSql}; `)
    con.release()
  });

  afterAll(async () => {
    // deleting sample records
    const con = await Client.connect()
    const oPSql = 'DELETE FROM order_products'
    const ordersSql = 'DELETE FROM orders'
    const productsSql = 'DELETE FROM products'
    const userSql = "DELETE FROM users"
    await con.query(`${oPSql}; ${ordersSql}; ${productsSql}; ${userSql}; `)
    con.release()
  });

  it('should have an index method', () => {
    expect(dStore.productsInOrder).toBeDefined();
  });

  it('productsInOrder should return orders by user', async () => {
    const user_id = 9
    const result = await dStore.productsInOrder(user_id as unknown as string)
      expect(result).toBeDefined()
  });


});
