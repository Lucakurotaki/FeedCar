import { Router } from "express";
import vehicleRoutes from './VehicleRoutes';
import authRoutes from './AuthRoutes';
import likeRoutes from './LikeRoutes';

const router = Router();

router.use('/vehicles', vehicleRoutes);
router.use('/auth', authRoutes);
router.use('/likes', likeRoutes);

export default router;

