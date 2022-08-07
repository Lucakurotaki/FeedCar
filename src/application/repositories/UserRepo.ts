import { Id } from "../../domain/capsules/Id";
import { User } from "../../domain/entities/User";

export interface UserRepository{
    get(id: Id): Promise<User>;
    create(user: User): Promise<Id>;
}