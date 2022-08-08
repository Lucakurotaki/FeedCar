import { ActionTime } from "../../../domain/capsules/ActionTime";
import { Id } from "../../../domain/capsules/Id";
import { CommentRepository } from "../../repositories/CommentRepo";

interface DeleteCommentRequestModel{
    id: string;
}

export class DeleteCommentCommand{
    private commentRepository: CommentRepository;

    constructor(commentRepoParam: CommentRepository){
        this.commentRepository = commentRepoParam;
    }

    public async execute(request: DeleteCommentRequestModel): Promise<ActionTime>{
        const reqId = request as Id;

        return this.commentRepository.delete(reqId);
    }
}