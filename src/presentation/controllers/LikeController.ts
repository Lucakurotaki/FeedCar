import { Request, Response } from "express";
import { AddLikeCommand } from "../../application/command/likeCommand/AddLikeCommand";
import { DeleteLikeCommand } from "../../application/command/likeCommand/DeleteLikeCommand";
import { GetLikeQuery } from "../../application/query/likeQuery/GetLikeQuery";
import { FirestoreLikeRepository } from "../../infrastructure/persistence/firestore/repositories/FirestoreLikeRepository";
import { FirestoreSession } from "../../infrastructure/persistence/firestore/session/FirestoreSession";

export class LikeController{

    public async add(req: Request, res: Response): Promise<Response>{
        const {vehicleId} = req.body;

        const session = new FirestoreSession();

        const sessionId = await session.get();

        if(!sessionId.id){
            return res.status(400).send('No session found.');
        }

        const repoLike = new FirestoreLikeRepository();

        const command = new AddLikeCommand(repoLike);

        const likeId = await command.execute({userId: sessionId.id, vehicleId: vehicleId});

        return res.status(201).json({id: likeId.id});
    }

    public async get(req: Request, res: Response): Promise<Response>{
        const vehicleId = req.params.id;

        const session = new FirestoreSession();

        const sessionId = await session.get();

        if(!sessionId.id){
            return res.status(400).send('No session found.');
        }

        const repoLike = new FirestoreLikeRepository();

        const query = new GetLikeQuery(repoLike);

        const likeCheck = await query.execute({userId: sessionId.id, vehicleId});

        return res.status(200).json({like: likeCheck});
    }

    public async delete(req: Request, res: Response): Promise<Response>{
        const reqId = req.params.id;

        const session = new FirestoreSession();

        const sessionId = await session.get();

        if(!sessionId.id){
            return res.status(400).send('No session found.');
        }

        const repoLike = new FirestoreLikeRepository();

        const command = new DeleteLikeCommand(repoLike);

        const likeDelete = await command.execute({id: reqId});

        return res.status(200).json({id: likeDelete.id, time: likeDelete.time});
    }
}