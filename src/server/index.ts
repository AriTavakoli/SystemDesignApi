import "module-alias/register"
import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import morganBodyMiddleWare from './middleware/morganBodyMiddleWare';
import { connectToMongoDB, disconnectFromMongoDB } from '../db/connection';
import answers from './routes/question';
import question from './routes/questionRoute';

dotenv.config();

const app: Express = express();

connectToMongoDB();
// Parse JSON payloads
app.use(express.json());


// morganBody middleware
morganBodyMiddleWare(app);

// logging middleware
morgan.token('cutoff-remaining', (req: Request, res: Response) => {
  return process.memoryUsage().heapUsed.toString();
});

app.use(morgan(':cutoff-remaining :method :url :status :response-time ms - :res[content-length]'));

app.use(require('express-status-monitor')());




// Route handling middleware
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});




// ROUTES

app.use('/answers', answers);
app.use('/qa/questions', question);

//

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Server shutting down...');
  disconnectFromMongoDB();
  process.exit();
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
