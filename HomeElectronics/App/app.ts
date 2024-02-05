//Import express package.
import express, { Request, Response } from 'express';
import dotenv from "dotenv";
import productsRouter from '../Routes/products.routes';
import logger from '../middleware/logger.middleware';
import cors from 'cors'
import helmet from 'helmet';

dotenv.config();

//Define constants for the app and port number
const app = express();
const port = process.env.PORT;

if (process.env.NODE_ENV == 'development') {
    // add logger middleware
    app.use(logger);
  }

  // Parse JSON bodies
app.use(express.json());
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// enable all CORS request
// needs to be installed:
// npm install cors
app.use(cors());

// adding set of security middleware
// needs to be installed:
// npm install helmet
app.use(helmet());

//Expose the endpoints
app.use('/', [productsRouter]);

   //Listen on port
   app.listen(port, () => {
    //Log a message to the console to indicate the URL we're listening at.
    console.log(`App listening at http://localhost:${port}`)
   });

