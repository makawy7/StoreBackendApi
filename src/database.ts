import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const {
  POSTGRES_HOST,
  POSTGRES_DATABASE,
  POSTGRES_DATABASE_TEST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  ENV
} = process.env

let client = new Pool({
});

if (ENV == 'dev') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DATABASE,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
  })
}
if (ENV == 'test') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DATABASE_TEST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
  })
}


export default client
