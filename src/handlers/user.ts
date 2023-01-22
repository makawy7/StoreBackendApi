import express, { Request, Response } from 'express'
import { User, UserStore } from '../models/user'
import auth from '../middleware/verifyAuthToken'
import jwt from 'jsonwebtoken'


const uStore = new UserStore()

const index = async (_req: Request, res: Response) => {
  try {
    const users = await uStore.index()
    res.status(200)
    res.json(users)
  } catch (err) {
    throw new Error(`error occured while retrieving users: ${err}`)
  }
}


const create = async (req: Request, res: Response) => {
  try {
    const u: User = {
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password
    }
    const user = await uStore.create(u)
    //  username already exists
    if(user == null){
      res.status(401)
      res.json(`Username already exists!`)
    } else {
      var token = jwt.sign({user: user}, process.env.TOKEN_SECRET as string)
      res.status(200)
      res.json(token)
    }
  } catch (err) {
    throw new Error(`error occured while creating user: ${err}`)
  }
}

const authenticate = async (req: Request, res: Response) => {
  try {
    const user = await uStore.authenticate(req.body.username, req.body.password)
    //  username or password is incorrect
    if(user == null){
      res.status(401)
      res.json(`Username or password is incorrect!`)
    } else {
      var token = jwt.sign({user: user}, process.env.TOKEN_SECRET as string)
      res.status(200)
      res.json(token)
    }
  } catch (err) {
    throw new Error(`error occured while authenticating user: ${err}`)
  }
}

const show = async (req: Request, res: Response) => {
  try {
    const user = await uStore.show(req.params.id)
    res.status(200)
    res.json(user)
  } catch (err) {
    throw new Error(`error occured while showing user: ${err}`)
  }
}


const userRoutes = (app: express.Application) => {
  app.get('/users', auth.verifyAuthToken, index)
  app.get('/user/:id', auth.verifyAuthToken, show)
  app.post('/user', create)
  app.post('/authenticate', authenticate)
}


export default userRoutes
