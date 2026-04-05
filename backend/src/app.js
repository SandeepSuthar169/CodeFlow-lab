import cookieparser from "cookie-parser"
import cors from "cors"
import authRoutes from "./routes/auth.routes.js"
import healthCheckRouters from "./routes/helthcheck.routes.js"
import problemRoutes from './routes/problem.routes.js'

import express from "express"
const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
    allowedHeaders: ['Content-Type', "Authorization"]
})) 

app.use(express.json())
app.use(cookieparser())
app.use(express.urlencoded(
    {
        extended: true
    }
))


app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/healthcheck", healthCheckRouters)
app.use("/api/v1/problem", problemRoutes)



export default app;
