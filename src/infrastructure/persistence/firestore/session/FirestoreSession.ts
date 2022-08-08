import { db } from ".."
import { ActionTime } from "../../../../domain/capsules/ActionTime";
import { Id } from "../../../../domain/capsules/Id";

export class FirestoreSession{
    private sessionReference = db.collection('session');

    public async start(id: Id): Promise<ActionTime>{
        const session = await this.sessionReference.doc('session').set(id);

        return {id: id.id, time: session.writeTime} as ActionTime;
    }

    public async quit(): Promise<boolean>{
        const session = await this.sessionReference.doc('session').delete();

        if(session){
            return true;
        }

        return false;
    }

    public async get(): Promise<Id>{
        const sessionDoc = await this.sessionReference.doc('session').get();

        const userId = {...sessionDoc.data()} as Id;

        return userId;
    }
}