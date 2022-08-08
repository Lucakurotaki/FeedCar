import { Request, Response } from "express";
import { AddCommentCommand } from "../../application/command/commentCommand/AddCommentCommand";
import { DeleteCommentCommand } from "../../application/command/commentCommand/DeleteCommentCommand";
import { GetCommentsQuery } from "../../application/query/commentQuery/GetCommentsQuery";
import { FirestoreCommentRepository } from "../../infrastructure/persistence/firestore/repositories/FirestoreCommentRepository";
import { FirestoreSession } from "../../infrastructure/persistence/firestore/session/FirestoreSession";

export class CommentController{
    public async get(req: Request, res: Response): Promise<Response>{
        const reqId = req.params.id;

        const repoComment = new FirestoreCommentRepository();

        const query = new GetCommentsQuery(repoComment);

        const comments = await query.execute({vehicleId: reqId});

        return res.json(comments);
    }

    public async add(req: Request, res: Response): Promise<Response>{
        const {vehicleId, text} = req.body;

        const session = new FirestoreSession();

        const sessionId = await session.get();

        if(!sessionId.id){
            return res.status(400).send('No session found.');
        }

        const repoComment = new FirestoreCommentRepository();

        const command = new AddCommentCommand(repoComment);

        const commentId = await command.execute({userId: sessionId.id, vehicleId, text});

        return res.status(201).json({id: commentId.id});
    }

    public async delete(req: Request, res: Response): Promise<Response>{
        const session = new FirestoreSession();

        const sessionId = await session.get();

        if(!sessionId.id){
            return res.status(400).send('No session found.');
        }

        const reqId = req.params.id;

        const repoComment = new FirestoreCommentRepository();

        const command = new DeleteCommentCommand(repoComment);

        const commentDelete = await command.execute({id: reqId});

        return res.status(200).json({id: commentDelete.id, time: commentDelete.time});
    }
}