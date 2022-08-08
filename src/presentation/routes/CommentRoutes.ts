import { Router } from "express";
import { CommentController } from "../controllers/CommentController";

const router = Router();
const commentController = new CommentController();

router.get('/:id', commentController.get);
router.post('/', commentController.add);
router.delete('/:id', commentController.delete);

export default router;