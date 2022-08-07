import { Id } from "../../../domain/capsules/Id";
import { User } from "../../../domain/entities/User";
import { UserRepository } from "../../repositories/UserRepo";

interface GetUserRequestModel{
    id: string;
}

export class GetUserQuery{
    private userRepository: UserRepository;

    constructor(userRepoParam: UserRepository){
        this.userRepository = userRepoParam;
    }

    public async execute(request: GetUserRequestModel): Promise<User>{
        const reqId = request as Id;

        return this.userRepository.get(reqId);
    }
}