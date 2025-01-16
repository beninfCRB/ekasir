import { Router } from "express"
import { createTax, deleteTax, getTax, getTaxs, updateTax } from "../controllers/tax.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import taxDto from "../dtos/tax.dto.js";

const taxRoute = Router()

taxRoute.get('/taxs', isAuthenticated, getTaxs)
taxRoute.get('/tax/:id', isAuthenticated, getTax)
taxRoute.post('/tax', isAuthenticated, taxDto, createTax)
taxRoute.put('/tax/:id', isAuthenticated, taxDto, updateTax)
taxRoute.delete('/tax/:id', isAuthenticated, deleteTax)

export default taxRoute;