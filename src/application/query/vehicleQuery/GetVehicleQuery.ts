import { Id } from "../../../domain/capsules/Id";
import { Vehicle } from "../../../domain/entities/Vehicle";
import { VehicleRepository } from "../../repositories/VehicleRepo";


interface GetVehicleRequestModel{
    id: string;
}

export class GetVehicleQuery{
    private vehicleRepository: VehicleRepository;

    constructor(vehicleRepoParam: VehicleRepository){
        this.vehicleRepository = vehicleRepoParam;
    }

    public async execute(request: GetVehicleRequestModel): Promise<Vehicle>{
        const reqId = request as Id;

        return this.vehicleRepository.get(reqId);
    }
}