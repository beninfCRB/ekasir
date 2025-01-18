import { Router } from "express"
import { createCategory, deleteCategory, getCategory, getCategorys, updateCategory } from "../controllers/category.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import categoryDto from "../dtos/category.dto.js";

const categoryRoute = Router()

categoryRoute.get('/categories/public', getCategorys)
categoryRoute.get('/categories', isAuthenticated, getCategorys)
categoryRoute.get('/category/:id', isAuthenticated, getCategory)
categoryRoute.post('/category', isAuthenticated, categoryDto, createCategory)
categoryRoute.put('/category/:id', isAuthenticated, categoryDto, updateCategory)
categoryRoute.delete('/category/:id', isAuthenticated, deleteCategory)

export default categoryRoute;