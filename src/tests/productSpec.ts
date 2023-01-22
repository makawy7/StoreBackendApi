import { ProductStore } from '../models/product';
import Client from '../database'

const pStore = new ProductStore()

describe("Product Model", () => {
  // delete all recordes after the test
  beforeAll(async () => {
    const con = await Client.connect()
    const sql = 'DELETE FROM products'
    await con.query(sql)
  });

  it('should have an index method', () => {
    expect(pStore.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(pStore.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(pStore.create).toBeDefined();
  });


  it('create method should add a product', async () => {
    const result = await pStore.create({
      name: 'Product 1',
      price: '250'
    });
    expect(result.name).toEqual('Product 1');
  });

  it('index method should return a list of products', async () => {
    const result = await pStore.index();
    expect(result[0].name).toEqual('Product 1');
  });

  it('show method should return the correct products', async () => {
    const p = await pStore.index();
    const id = p[0].id as unknown as string
    const result = await pStore.show(id);
    expect(result.name).toEqual('Product 1');
  });


});
