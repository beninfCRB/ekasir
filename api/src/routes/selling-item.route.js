import { Router } from "express";
import { createSellingItem, deleteSellingItem, getSellingItem, getSellingItems } from "../controllers/selling-item.controller.js";
import sellingItemDto from "../dtos/selling-item.dto.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const sellingItemRoute = Router()

sellingItemRoute.get('/selling-items', isAuthenticated, getSellingItems)
sellingItemRoute.get('/selling-item/:id', isAuthenticated, getSellingItem)
sellingItemRoute.post('/selling-item', isAuthenticated, sellingItemDto, createSellingItem)
sellingItemRoute.delete('/selling-item/:id', isAuthenticated, deleteSellingItem)

export default sellingItemRoute;