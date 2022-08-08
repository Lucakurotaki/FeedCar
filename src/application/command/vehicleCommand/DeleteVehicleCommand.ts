import { ActionTime } from "../../../domain/capsules/ActionTime";
import { Id } from "../../../domain/capsules/Id";
import { VehicleRepository } from "../../repositories/VehicleRepo";

interface DeleteVehicleRequestModel{
    id: string;
}

export class DeleteVehicleCommand{
    private vehicleRepository: VehicleRepository;

    constructor(vehicleRepoParam: VehicleRepository){
        this.vehicleRepository = vehicleRepoParam;
    }

    public async execute(request: DeleteVehicleRequestModel): Promise<ActionTime>{
        const reqId = request as Id;

        return this.vehicleRepository.delete(reqId);
    }
}