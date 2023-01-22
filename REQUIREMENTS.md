## API Endpoints
#### Products
- Index : '/products' [GET]
- Show : '/product/:id' [GET]
- Create [token required] : '/product' [POST]

#### Users
- Index [token required] '/users' [GET]
- Show [token required] '/user/:id' [GET]
- Create N[token required] '/user' [POST]

#### Orders
- Current Order by user (args: user id)[token required] '/orders' [GET]

## Data Shapes
#### Product
products (id:init, name:varchar, price:decimal)

#### User
products (id:init, username:varchar unique, firstname:varchar, lastname:varchar, password:varchar)

#### Orders
orders (id:init, user_id:bigint [foreign key to users table (id)], status:smallint)

#### Order_Products
order_products (order_id:bigint [foreign key to orders table (id)], product_id:bigint [foreign key to products table (id)], quantity:bigint)
