import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import hitRouter from './router/hitsRouter';

config();
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(json());
app.use('/hits', hitRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
