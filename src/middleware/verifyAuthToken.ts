import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

type Token = {
  user: {
    id: string
    username: string
    firstname: string
    password: string
  }
  iat?: number
}

interface funType {
  (): void;
}

// uses header token
const verifyAuthToken = (req: Request, res: Response, next: funType): void => {
try {
  const authorizationHeader = req.headers.authorization as string
  const token = authorizationHeader.split(' ')[1]
  jwt.verify(token, process.env.TOKEN_SECRET as string) as Token
  next()
} catch (err) {
  res.status(401)
  res.json(`You must be logged in! ${err}`)
}
}

//  get user id from the token
// only used after verifyAuthToken()
const getLoggedInUser = (req: Request) => {
    const authorizationHeader = req.headers.authorization as string
    const token = authorizationHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string) as Token
    return decoded.user
}

export default { verifyAuthToken, getLoggedInUser }
