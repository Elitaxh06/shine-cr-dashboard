import express from "express"
import cors from "cors"
import routes from "./routes/routes.js"
import morgan from "morgan"

const app = express()

app.use(cors({
    origin: [
        "http://localhost:5173",
        ""
    ]
}))

app.use(express.json())
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: true}))

app.use("/api", routes)

export default app