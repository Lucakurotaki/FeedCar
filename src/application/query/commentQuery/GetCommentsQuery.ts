import { Id } from "../../../domain/capsules/Id";
import { Comment } from "../../../domain/entities/Comment";
import { CommentRepository } from "../../repositories/CommentRepo";

interface GetCommentsRequestModel{
    vehicleId: string
}

export class GetCommentsQuery{
    private commentRepository: CommentRepository;

    constructor(commentRepoParam: CommentRepository){
        this.commentRepository = commentRepoParam;
    }

    public async execute(request: GetCommentsRequestModel): Promise<Comment[]>{
        const reqId = {id: request.vehicleId} as Id;

        return this.commentRepository.get(reqId);
    }
}