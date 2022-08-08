import { Id } from "../../../domain/capsules/Id";
import { Like } from "../../../domain/entities/Like";
import { LikeRepository } from "../../repositories/LikeRepo";

interface AddLikeRequestModel{
    userId: string;
    vehicleId: string;
}

export class AddLikeCommand{
    private likeRepository: LikeRepository;

    constructor(likeRepoParam: LikeRepository){
        this.likeRepository = likeRepoParam;
    }

    public async execute(request: AddLikeRequestModel): Promise<Id>{
        const newLike = request as Like;

        return this.likeRepository.add(newLike);
    }
}