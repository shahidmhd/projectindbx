import express from "express";
const app = express();
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import UserRouters from './routes/UserRouter.js'
import mongoose from 'mongoose'
import errorHandlingMidlleware from "./Middlewear/errorHandlingMidleware.js";



dotenv.config()


const port = process.env.PORT;
app.use(express.json());
const corsOptions = {
  origin: [
      'https://cargo-management.onrender.com',
      'https://www.cargo-management.onrender.com',
      'http://cargo-management.onrender.com',
      'http://frontendcargo.cyenosure.com'
  ],
  methods: ['GET', 'POST'],
  preflightContinue: true, // Allow preflight requests to pass through
};

app.use(cors());

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))


app.use('/api/users', UserRouters)
app.use(errorHandlingMidlleware)

// console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("\x1b[33m%s\x1b[0m", "Database connected successfully"); // Yellow color code: \x1b[33m
}).catch((error) => {
  console.log("\x1b[31m%s\x1b[0m", `Database connection error: ${error}`); // Red color code: \x1b[31m
});

app.listen(port, () => {
  console.log("\x1b[34m%s\x1b[0m", `Server listening at port ${port}`);
});
