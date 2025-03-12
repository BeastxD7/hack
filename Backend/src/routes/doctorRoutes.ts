import { Router } from "express";
import registerDoctor from "../controllers/doctorController";


const router = Router();

router.post("/register", registerDoctor);

export default router;
