import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import morgan from "morgan"
import authRoute from "./routes/authRoutes.js"
import { auth } from "express-openid-connect"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import bodyParser from "body-parser"
import http from "http"
import path from "path"
import ejs from "ejs"
import logger from "./logger/logger.js"



dotenv.config()
const app = express()
const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT ||  5000
app.use(express.json())
app.use(morgan('dev'))
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)
app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'views')));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use("/", authRoute)


//catch other routes
app.all("*", (req, res )=>{
    res.status(404);
    res.json({
        message: "Not Found"
    })
})

//connect to DB
mongoose.connect(MONGODB_URI)
    .then(()=>{
        console.log("Connected to DB")
        app.listen(PORT, _ =>{
            console.log("application manager is running on PORT", PORT)
        })
    })