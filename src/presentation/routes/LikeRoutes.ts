import { Router } from "express";
import { LikeController } from "../controllers/LikeController";

const likeController = new LikeController();

const router = Router();

router.get('/:id', likeController.get);
router.post('/', likeController.add);
router.delete('/:id', likeController.delete);

export default router;