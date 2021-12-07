import express from "express";
import cors from 'cors'
import Router from "./routes/routes.js";
import env from 'dotenv'
env.config()

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(Router);
app.use(cors());

app.set('trust proxy', true)

app.listen(process.env.PORT, () => console.log(`Server Running at http://localhost:${process.env.PORT}`));