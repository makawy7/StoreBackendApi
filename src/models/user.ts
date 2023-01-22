import Client from '../database'
import bcrypt from 'bcrypt';

export type User = {
  id?: Number
  username: string
  firstname: string
  lastname: string
  password: string
}

const pepper = process.env.BCRYPT_PASSWORD
const saltRounds = process.env.SALT_ROUNDS as string

export class UserStore{
  async index():Promise<User[]> {
    try {
      const con = await Client.connect();
      const sql = 'SELECT * FROM users'
      const result = await con.query(sql)
      con.release()
      const  users = result.rows
      return users
    } catch(err) {
      throw new Error(`Unable to retrieve users: ${err}`)
    }
  }

  async create(u: User): Promise<User | null> {
    try {
      const con = await Client.connect();
      //make sure username has not previously been used
      const sql = 'SELECT * FROM users WHERE username=($1)'
      const result = await con.query(sql, [u.username])
      //  username already exists
      if(result.rows.length){
        return null
      } else {
        //  creating user
        const sql = 'INSERT INTO users (username, firstname, lastname, password) VALUES ($1, $2, $3, $4)  RETURNING *'
        // use the hashed password
        const hash = bcrypt.hashSync(
          u.password + pepper,
          parseInt(saltRounds)
        )
        const result = await con.query(sql, [u.username, u.firstname, u.lastname, hash])
        return result.rows[0]
      }
    } catch(err) {
      throw new Error(`Unable to create user ${u.username}: ${err}`)
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    try {
      const con = await Client.connect()
      const sql = 'SELECT * FROM users WHERE username=($1)'
      const result = await con.query(sql, [username])
      // check if username exists
      if(result.rows.length){
        const user = result.rows[0]
        if(bcrypt.compareSync(password+pepper, user.password)){
          return user
        }
      }
      return null
    }catch(err){
      throw new Error(`Unable to authenticate user ${username}: ${err}`)
    }
  }

  async show(id: string): Promise<User | null> {
    try {
      const con = await Client.connect()
      const sql = 'SELECT * FROM users WHERE id=($1)'
      const result = await con.query(sql, [id])
      // check if the user exists
      if(result.rows.length){
        const user = result.rows[0];
        return user
      }
      return null
    }catch(err){
      throw new Error(`Unable to find user: ${err}`)
    }
  }

}
