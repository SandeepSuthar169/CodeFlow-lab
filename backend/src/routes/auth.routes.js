import { Router } from "express"
import { 
    registerUser, 
    loginUser, 
    logoutUser, 
    check 
} from "../controllers/auth.controllers.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()


router.post("/register", registerUser)
router.post("/login" , loginUser)
router.post("/logout",verifyJWT,  logoutUser)
router.get("/check",verifyJWT, check)

export default router
