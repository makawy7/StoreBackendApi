import express, { Request, Response } from 'express';

const health = express.Router();

health.get('/', (_req: Request, res: Response) => {
  const data = {
    uptime: process.uptime(),
    message: 'Ok',
    date: new Date(),
  };

  res.status(200).send(data);
});

export default health;
