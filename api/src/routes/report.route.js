import { Router } from "express"
import { reportSelling, reportGeneratePdf } from "../controllers/report.controller.js"
import { isAuthenticated } from "../middlewares/auth.middleware.js"

const reportRoute = Router()

reportRoute.get('/report/selling/:id', isAuthenticated, reportSelling)
reportRoute.get('/report/generate/pdf/:id', isAuthenticated, reportGeneratePdf)

export default reportRoute