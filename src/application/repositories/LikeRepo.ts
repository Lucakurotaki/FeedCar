import { Id } from "../../domain/capsules/Id";
import { ActionTime } from "../../domain/capsules/ActionTime";
import { Like } from "../../domain/entities/Like";

export interface LikeRepository{
    get(like: Like): Promise<boolean>;
    add(like: Like): Promise<Id>;
    delete(id: Id): Promise<ActionTime>;
}