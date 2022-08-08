import { Router } from "express";
import vehicleRoutes from './VehicleRoutes';
import authRoutes from './AuthRoutes'

const router = Router();

router.use('/vehicles', vehicleRoutes);
router.use('/auth', authRoutes);

export default router;

