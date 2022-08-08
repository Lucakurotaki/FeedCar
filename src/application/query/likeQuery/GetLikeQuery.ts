import { Id } from "../../../domain/capsules/Id";
import { LikeRepository } from "../../repositories/LikeRepo";

interface GetLikeRequestModel{
    id: string;
}

export class GetLikeQuery{
    private likeRepository: LikeRepository;

    constructor(likeRepoParam: LikeRepository){
        this.likeRepository = likeRepoParam;
    }

    public async execute(request: GetLikeRequestModel): Promise<boolean>{
        const reqId = request as Id;

        return this.likeRepository.get(reqId);
    }
}