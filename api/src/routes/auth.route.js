import { Router } from "express"
import { signinController, signoutController, signupController } from "../controllers/auth.controller.js"
import signinDto from "../dtos/auth/signin.dto.js"
import signupDto from "../dtos/auth/signup.dto.js"
import { isAuthenticated } from "../middlewares/auth.middleware.js"

const authRoute = Router()

authRoute.post('/signin', signinDto, signinController)
authRoute.post('/signup', signupDto, signupController)
authRoute.post('/signout', isAuthenticated, signoutController)

export default authRoute