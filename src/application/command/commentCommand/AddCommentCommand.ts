import { Id } from "../../../domain/capsules/Id";
import { Comment } from "../../../domain/entities/Comment";
import { CommentRepository } from "../../repositories/CommentRepo";

interface AddCommentRequestModel{
    userId: string;
    vehicleId: string;
    text: string;
}

export class AddCommentCommand{
    private commentRepository: CommentRepository;

    constructor(commentRepoParam: CommentRepository){
        this.commentRepository = commentRepoParam;
    }

    public async execute(request: AddCommentRequestModel): Promise<Id>{
        const newComment = request as Comment;

        return this.commentRepository.add(newComment);
    }
}