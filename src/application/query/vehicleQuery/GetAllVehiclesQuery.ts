import { Vehicle } from "../../../domain/entities/Vehicle";
import { VehicleRepository } from "../../repositories/VehicleRepo";

export class GetAllVehiclesQuery{
    private vehicleRepository: VehicleRepository;

    constructor(vehicleRepoParam: VehicleRepository){
        this.vehicleRepository = vehicleRepoParam;
    }

    public async execute(): Promise<Vehicle[]>{
        return this.vehicleRepository.all();
    }
}