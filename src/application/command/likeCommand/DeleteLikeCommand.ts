import { ActionTime } from "../../../domain/capsules/ActionTime";
import { Id } from "../../../domain/capsules/Id";
import { LikeRepository } from "../../repositories/LikeRepo";

interface DeleteLikeRequestModel{
    id: string;
}

export class DeleteLikeCommand{
    private likeRepository: LikeRepository;

    constructor(likeRepoParam: LikeRepository){
        this.likeRepository = likeRepoParam;
    }

    public async execute(request: DeleteLikeRequestModel): Promise<ActionTime>{
        const reqId = request as Id;

        return this.likeRepository.delete(reqId);
    }
}