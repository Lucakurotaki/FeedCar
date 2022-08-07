import { db } from "..";
import { VehicleRepository } from "../../../../application/repositories/VehicleRepo";
import { Id } from "../../../../domain/capsules/Id";
import { UpdateTime } from "../../../../domain/capsules/UpdateTime";
import { Vehicle } from "../../../../domain/entities/Vehicle";

export class FirestoreVehicleRepository implements VehicleRepository{
    private vehiclesReference = db.collection('vehicles');

    public async all(): Promise<Vehicle[]>{
        const vehiclesDoc = await this.vehiclesReference.get();

        const vehicles = vehiclesDoc.docs.map(doc=>({id: doc.id, ...doc.data()}));

        return vehicles as Vehicle[];
    }

    public async get(id: Id): Promise<Vehicle>{
        const vehicleDoc = await this.vehiclesReference.doc(id.id).get();
        
        const vehicle = {id: vehicleDoc.id, ...vehicleDoc.data()} as Vehicle;

        return vehicle;
    }

    public async create(vehicleObj: Vehicle): Promise<Id> {
        const vehicle = await this.vehiclesReference.add(vehicleObj);

        return {id: vehicle.id} as Id;
    }

    public async change(vehicleObj: Vehicle, id: Id): Promise<UpdateTime> {
        const vehicle = await this.vehiclesReference.doc(id.id).update(vehicleObj as object);

        return {id: id.id, time: vehicle.writeTime} as UpdateTime;
    }
}