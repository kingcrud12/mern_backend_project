import express from "express"
import { register, login } from "../controllers/Auth.js";

export const router = express.Router(); // creation du routeur

router.post("/register", register)
router.post("/login", login)

export default router;