require("dotenv").config()
const express = require("express")
const app = express()
const router = express.Router()
const {connectDB} = require("./config/db")
const cors = require("cors")
const PORT = process.env.PORT || 4000

const authRoutes = require("./controller/Auth")
const eventRoutes = require("./controller/events")
const AdminUserRoutes = require("./controller/AdminUser")
const ReportedPostRoutes = require("./controller/ReportedPost")

const sessionValidation = require("./middleware/Session")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use('/api/auth', authRoutes)
app.use('/api/adminUser', AdminUserRoutes)
app.use('/api/reportedPost',sessionValidation, ReportedPostRoutes)
app.use('/api/events',sessionValidation, eventRoutes)

app.use(router)

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on port ${PORT}`)
});

