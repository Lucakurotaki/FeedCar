import { ActionTime } from "../../domain/capsules/ActionTime";
import { Id } from "../../domain/capsules/Id";
import { Comment } from "../../domain/entities/Comment";

export interface CommentRepository{
    add(comment: Comment): Promise<Id>;
    get(vehicleId: Id): Promise<Comment[]>;
    delete(commentId: Id): Promise<ActionTime>;
}