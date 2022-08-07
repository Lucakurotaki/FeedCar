import { Id } from "../../../domain/capsules/Id";
import { User } from "../../../domain/entities/User";
import { UserRepository } from "../../repositories/UserRepo";

interface CreateUserRequestModel{
    username: string;
    email: string;
    password: string;
}

export class CreateUserCommand{
    private userRepository: UserRepository;

    constructor(userRepoParam: UserRepository){
        this.userRepository = userRepoParam;
    }

    public async execute(request: CreateUserRequestModel): Promise<Id>{
        const newUser = request as User;

        return this.userRepository.create(newUser);
    }
}