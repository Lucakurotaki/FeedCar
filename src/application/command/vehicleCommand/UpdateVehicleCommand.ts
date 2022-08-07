import { Id } from "../../../domain/capsules/Id";
import { UpdateTime } from "../../../domain/capsules/UpdateTime";
import { Vehicle } from "../../../domain/entities/Vehicle";
import { VehicleRepository } from "../../repositories/VehicleRepo";

interface UpdateVehicleRequestModel{
    id: string;
    userId: string;
    model: string;
    year: Number;
    engine: Number;
    gear: string;
    onSale?: boolean;
    rent?: boolean;
    value: Number;
}

export class UpdateVehicleCommand{
    private vehicleRepository: VehicleRepository;

    constructor(vehicleRepoParam: VehicleRepository){
        this.vehicleRepository = vehicleRepoParam;
    }

    public async execute(request: UpdateVehicleRequestModel): Promise<UpdateTime>{
        const modifVehicle = request as Vehicle;

        const reqId = {id: request.id} as Id;

        return this.vehicleRepository.change(modifVehicle, reqId);
    }
}