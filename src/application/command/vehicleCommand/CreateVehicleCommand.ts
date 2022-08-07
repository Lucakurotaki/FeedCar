import { Id } from "../../../domain/capsules/Id";
import { Vehicle } from "../../../domain/entities/Vehicle";
import { VehicleRepository } from "../../repositories/VehicleRepo";

interface CreateVehicleRequestModel{
    userId: string;
    model: string;
    year: Number;
    engine: Number;
    gear: string;
    onSale?: boolean;
    rent?: boolean;
    value: Number;
}

export class CreateVehicleCommand{
    private vehicleRepository: VehicleRepository;

    constructor(vehicleRepoParam: VehicleRepository){
        this.vehicleRepository = vehicleRepoParam;
    }

    public async execute(request: CreateVehicleRequestModel): Promise<Id>{
        const newVehicle = request as Vehicle;

        return this.vehicleRepository.create(newVehicle);
    }
}