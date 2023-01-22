
## database setup

### create user
** sh
CREATE USER abdallah WITH PASSWORD 'password123';
### create dev database
CREATE DATABASE store_dev;
### grant access
GRANT ALL PRIVILEGES ON DATABASE store_dev TO abdallah;

## How to run the project
1 - npm install
2 - npm install --global yarn
3 - yarn initstart to run migrations and compile
4 - node dist/server.js

## server port: 3000

## To run test
- yarn test
** this will create the store_test database**

## Environment variables
POSTGRES_HOST=127.0.0.1
POSTGRES_DATABASE=store_dev
POSTGRES_DATABASE_TEST=store_test
POSTGRES_USER=abdallah
POSTGRES_PASSWORD=password123
ENV=dev
BCRYPT_PASSWORD=store-dip-secret
SALT_ROUNDS=10
TOKEN_SECRET=tokensecretdip!
