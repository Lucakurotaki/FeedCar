import { db } from "..";
import { ActionTime } from "../../../../domain/capsules/ActionTime";
import { Id } from "../../../../domain/capsules/Id";
import { Comment } from "../../../../domain/entities/Comment";

export class FirestoreCommentRepository{
    private commentReference = db.collection('comments');

    public async get(vehicleId: Id): Promise<Comment[]>{
        const commentsDocs = await this.commentReference.where('vehicleId', '==', vehicleId.id).get();

        const comments = commentsDocs.docs.map(doc=>({id: doc.id, ...doc.data()}));

        return comments as Comment[];
    }

    public async add(comment: Comment): Promise<Id>{
        const commentId = await this.commentReference.add(comment);

        return {id: commentId.id} as Id;
    }

    public async delete(commentId: Id): Promise<ActionTime>{
        const comment = await this.commentReference.doc(commentId.id).delete();

        return {id: commentId.id, time: comment.writeTime} as ActionTime;
    }
}