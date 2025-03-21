import { Router } from "express"
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/product.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { productDto, productUpdateDto } from "../dtos/product.dto.js";

const productRoute = Router()

productRoute.get('/products', isAuthenticated, getProducts)
productRoute.get('/public/products', getProducts)
productRoute.get('/product/:id', isAuthenticated, getProduct)
productRoute.post('/product', isAuthenticated, productDto, createProduct)
productRoute.put('/product/:id', isAuthenticated, productUpdateDto, updateProduct)
productRoute.delete('/product/:id', isAuthenticated, deleteProduct)

export default productRoute;