import { Id } from "../../domain/capsules/Id";
import { ActionTime } from "../../domain/capsules/ActionTime";
import { Vehicle } from "../../domain/entities/Vehicle";

export interface VehicleRepository{
    all(): Promise<Vehicle[]>;
    get(id: Id): Promise<Vehicle>;
    create(vehicleObj: Vehicle): Promise<Id>;
    change(vehicleObj: Vehicle, id: Id): Promise<ActionTime>;
    delete(id: Id): Promise<ActionTime>;
}