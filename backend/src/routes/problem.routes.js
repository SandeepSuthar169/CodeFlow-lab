import express, { Router } from "express"

import { checkAdmin, verifyJWT } from "../middlewares/auth.middleware.js"
import { 
    createProblem,
    getProblemById,
    getAllProblems,
    getAllProblemsSolvedByUser,
    updateProblem,
    deleteProblem
}  from "../controllers/problem.contoller.js"

const router = Router()

router.post("/create-problem", verifyJWT, checkAdmin, createProblem)
router.get("/get-problem/:id", verifyJWT, getProblemById)
router.get("/get-all-problem", verifyJWT, getAllProblems)
router.put("/update-problem/:id", verifyJWT, checkAdmin, updateProblem)
router.delete("/delete-problem/:id", verifyJWT, checkAdmin, deleteProblem)
router.get("/get-solved-problem", verifyJWT, getAllProblemsSolvedByUser)


export default router
