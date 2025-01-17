import { Router } from "express"
import { reportSelling } from "../controllers/report.controller.js"
import { isAuthenticated } from "../middlewares/auth.middleware.js"

const reportRoute = Router()

reportRoute.get('/report/:id', isAuthenticated, reportSelling)

export default reportRoute