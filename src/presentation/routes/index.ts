import { Router } from "express";
import vehicleRoutes from './VehicleRoutes';

const router = Router();

router.use('/vehicles', vehicleRoutes);

export default router;

