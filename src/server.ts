import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import dashboardRoutes from './handlers/dashboard'
import userRoutes from './handlers/user'
import productRoutes from './handlers/product'
import health from './health';
import cors from 'cors'

const app: express.Application = express();
const port = 3000;

const corsOptions = {
  origin: 'http://someotherdomain.com',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(bodyParser.json());
app.get('/', (_req: Request, res: Response) => {
  res.send('Hello')
})

app.use('/health', health);
dashboardRoutes(app)
userRoutes(app)
productRoutes(app)

const server = app.listen(port, (): void => {
  console.log(`Started at port: ${port}`)
})

export default server
