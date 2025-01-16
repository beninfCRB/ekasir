import { Router } from "express"
import { createSelling, deleteSelling, getSelling, getSellings, updateSelling } from "../controllers/selling.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import sellingDto from "../dtos/selling.dto.js";

const sellingRoute = Router()

sellingRoute.get('/sellings', isAuthenticated, getSellings)
sellingRoute.get('/selling/:id', isAuthenticated, getSelling)
sellingRoute.post('/selling', isAuthenticated, sellingDto, createSelling)
sellingRoute.put('/selling/:id', isAuthenticated, sellingDto, updateSelling)
sellingRoute.delete('/selling/:id', isAuthenticated, deleteSelling)

export default sellingRoute;