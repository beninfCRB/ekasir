import { Router } from "express"
import { createStock, deleteStock, getStock, getStocks, updateStock } from "../controllers/stock.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import stockDto from "../dtos/stock.dto.js";

const stockRoute = Router()

stockRoute.get('/stocks', isAuthenticated, getStocks)
stockRoute.get('/stock/:id', isAuthenticated, getStock)
stockRoute.post('/stock', isAuthenticated, stockDto, createStock)
stockRoute.put('/stock/:id', isAuthenticated, stockDto, updateStock)
stockRoute.delete('/stock/:id', isAuthenticated, deleteStock)

export default stockRoute;