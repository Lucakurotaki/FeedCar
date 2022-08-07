import { Id } from "../../domain/capsules/Id";
import { UpdateTime } from "../../domain/capsules/UpdateTime";
import { Vehicle } from "../../domain/entities/Vehicle";

export interface VehicleRepository{
    all(): Promise<Vehicle[]>;
    get(id: Id): Promise<Vehicle>;
    create(vehicleObj: Vehicle): Promise<Id>;
    change(vehicleObj: Vehicle, id: Id): Promise<UpdateTime>;
}