require("dotenv").config()
const express = require("express")
const app = express()
const router = express.Router()
const {connectDB} = require("./config/db")
const cors = require("cors")
const PORT = process.env.PORT || 4000

const authRoutes = require("./controller/auth")
const eventRoutes = require("./controller/events")


const sessionValidation = require("./middleware/session")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use('/auth', authRoutes)
app.use('/events',sessionValidation, eventRoutes)



app.use(router)


app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on port ${PORT}`)
});

