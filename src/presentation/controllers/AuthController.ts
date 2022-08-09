import { Request, Response } from "express";
import { CreateUserCommand } from "../../application/command/userCommand/CreateUserCommand";
import { Id } from "../../domain/capsules/Id";
import { FirestoreUserRepository } from "../../infrastructure/persistence/firestore/repositories/FirestoreUserRepository";
import { FirestoreSession } from "../../infrastructure/persistence/firestore/session/FirestoreSession";

export class AuthController{
    public async register(req: Request, res: Response): Promise<Response>{
        const {username, email, password} = req.body;

        const repoUser = new FirestoreUserRepository();

        const command = new CreateUserCommand(repoUser);

        const userId = await command.execute({username, email, password});

        return res.status(201).json({id: userId.id});
    }

    public async login(req: Request, res: Response): Promise<Response>{
        const {userId} = req.body;

        const session = new FirestoreSession();

        const sessionCheck = await session.get();

        if(sessionCheck.id){
            return res.status(400).send('Active session found.');
        }

        const sessionId = await session.start({id: userId} as Id);

        return res.status(200).json({id: sessionId.id , time: sessionId.time});
    }

    public async logout(req: Request, res: Response): Promise<Response>{
        const session = new FirestoreSession();

        const sessionId = await session.get();

        if(!sessionId.id){
            return res.status(400).send('No session found.');
        }

        await session.quit();
        return res.status(200).send();
    }

    public async get(req: Request, res: Response): Promise<Response>{
        const session = new FirestoreSession();
        
        const sessionId = await session.get();

        if(!sessionId.id){
            return res.status(400).send('No session found.');
        }

        return res.json({id: sessionId.id});
    }
}