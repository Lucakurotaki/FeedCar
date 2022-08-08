import { db } from "..";
import { LikeRepository } from "../../../../application/repositories/LikeRepo";
import { ActionTime } from "../../../../domain/capsules/ActionTime";
import { Id } from "../../../../domain/capsules/Id";
import { Like } from "../../../../domain/entities/Like";

export class FirestoreLikeRepository implements LikeRepository{
    private likeReference = db.collection('likes');

    public async get(id: Id): Promise<boolean> {
        const likeDoc = await this.likeReference.doc(id.id).get();

        if(likeDoc.exists){
            return true;
        }

        return false;
    }

    public async add(likeParam: Like): Promise<Id> {
        const like = await this.likeReference.add(likeParam);

        return {id: like.id} as Id;
    }

    public async delete(id: Id): Promise<ActionTime> {
        const likeDoc = await this.likeReference.doc(id.id).delete();

        return {id: id.id, time: likeDoc.writeTime} as ActionTime;
    }
}