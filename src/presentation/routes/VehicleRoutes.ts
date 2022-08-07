import { Router } from "express";
import { VehicleController } from "../controllers/VehicleController";

const vehicleController = new VehicleController();

const router = Router();

router.get('/', vehicleController.all);
router.get('/:id', vehicleController.get);
router.post('/', vehicleController.create);
router.put('/:id', vehicleController.change);

export default router;