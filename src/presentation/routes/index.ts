import { Router } from "express";
import vehicleRoutes from './VehicleRoutes';
import authRoutes from './AuthRoutes';
import likeRoutes from './LikeRoutes';
import commentRoutes from './CommentRoutes';

const router = Router();

router.use('/vehicles', vehicleRoutes);
router.use('/auth', authRoutes);
router.use('/likes', likeRoutes);
router.use('/comments', commentRoutes);

export default router;

