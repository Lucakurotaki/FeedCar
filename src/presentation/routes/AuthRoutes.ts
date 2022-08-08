import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const authControler = new AuthController();

const router = Router();

router.post('/register', authControler.register);
router.post('/login', authControler.login);
router.get('/logout', authControler.logout);

export default router;