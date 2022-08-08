import { db } from "..";
import { UserRepository } from "../../../../application/repositories/UserRepo";
import { Id } from "../../../../domain/capsules/Id";
import { User } from "../../../../domain/entities/User";

export class FirestoreUserRepository implements UserRepository{
    private userReference = db.collection('users');

    public async get(id: Id): Promise<User> {
        const userDoc = await this.userReference.doc(id.id).get();

        const user = {id: userDoc.id, ...userDoc.data()} as User;

        return user;
    }

    public async create(userParam: User): Promise<Id> {
        const user = await this.userReference.add(userParam);

        return {id: user.id} as Id;
    }
}