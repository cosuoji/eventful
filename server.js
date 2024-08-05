import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import morgan from "morgan"
import authRoute from "./routes/authRoutes.js"
import bodyParser from "body-parser"
import ejs from "ejs"
import path from "path"
import { rateLimiterUsingThirdParty } from "./utils/rateLimiter.js"
import creatoRoute from "./routes/creatorRoutes.js"
import useRoute from "./routes/userRoutes.js"
import verifyRoute from "./routes/verfyRoute.js"
import client from "./utils/redis.js"

//import httpLogger from "./logger/httplogger.js"




dotenv.config()
const app = express()
const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT ||  5000
app.use(bodyParser.json())
app.use(express.json())
app.use(morgan('dev'))
app.use(rateLimiterUsingThirdParty)
app.use(bodyParser.urlencoded({extended: false}))
//app.use(httpLogger)

client.connect()

app.set('view engine', 'ejs');

app.use("/", authRoute)
app.use("/verify", verifyRoute)
app.use("/creator", creatoRoute)
app.use("/user", useRoute)


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
            console.log("Eventful is running on PORT", PORT)
        })
    })