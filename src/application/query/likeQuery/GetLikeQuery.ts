import { Like } from "../../../domain/entities/Like";
import { LikeRepository } from "../../repositories/LikeRepo";

interface GetLikeRequestModel{
    userId: string;
    vehicleId: string;
}

export class GetLikeQuery{
    private likeRepository: LikeRepository;

    constructor(likeRepoParam: LikeRepository){
        this.likeRepository = likeRepoParam;
    }

    public async execute(request: GetLikeRequestModel): Promise<boolean>{
        const reqLike = request as Like;

        return this.likeRepository.get(reqLike);
    }
}