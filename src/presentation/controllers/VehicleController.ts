import { Request, Response } from "express";
import { CreateVehicleCommand } from "../../application/command/vehicleCommand/CreateVehicleCommand";
import { DeleteVehicleCommand } from "../../application/command/vehicleCommand/DeleteVehicleCommand";
import { UpdateVehicleCommand } from "../../application/command/vehicleCommand/UpdateVehicleCommand";
import { GetAllVehiclesQuery } from "../../application/query/vehicleQuery/GetAllVehiclesQuery";
import { GetVehicleQuery } from "../../application/query/vehicleQuery/GetVehicleQuery";
import { FirestoreVehicleRepository } from "../../infrastructure/persistence/firestore/repositories/FirestoreVehicleRepository";
import { FirestoreSession } from "../../infrastructure/persistence/firestore/session/FirestoreSession";

export class VehicleController{

    public async all(req: Request, res: Response): Promise<Response>{
        const repoVehicle = new FirestoreVehicleRepository();

        const query = new GetAllVehiclesQuery(repoVehicle);

        const vehicles = await query.execute();

        return res.json(vehicles);
    }

    public async get(req: Request, res: Response): Promise<Response>{
        const repoVehicle = new FirestoreVehicleRepository();

        const reqId = req.params.id;

        const query = new GetVehicleQuery(repoVehicle);

        const vehicle = await query.execute({id: reqId});

        return res.json(vehicle);
    }

    public async create(req: Request, res: Response): Promise<Response>{
        const {model, year, engine, gear, onSale, rent, value} = req.body;

        const session = new FirestoreSession();

        const sessionId = await session.get();

        if(!sessionId.id){
            return res.status(400).send('No session found.');
        }

        const repoVehicle = new FirestoreVehicleRepository();

        const command = new CreateVehicleCommand(repoVehicle);

        const vehicleId = await command.execute({userId: sessionId.id, model, year, engine, gear, onSale, rent, value});

        return res.status(201).json({id: vehicleId.id});
    }

    public async change(req: Request, res: Response): Promise<Response>{
        const reqId = req.params.id;

        const {id = reqId, model, year, engine, gear, onSale, rent, value} = req.body;

        const session = new FirestoreSession();

        const sessionId = await session.get();

        if(!sessionId.id){
            return res.status(400).send('No session found.');
        }

        const repoVehicle = new FirestoreVehicleRepository();

        const command = new UpdateVehicleCommand(repoVehicle);

        const vehicleUpdate = await command.execute({id, userId: sessionId.id, model, year, engine, gear, onSale, rent, value});

        return res.status(200).json({id: vehicleUpdate.id, time: vehicleUpdate.time});
    }

    public async delete(req: Request, res: Response): Promise<Response>{
        const session = new FirestoreSession();

        const sessionId = await session.get();

        if(!sessionId.id){
            return res.status(400).send('No session found.');
        }
        
        const repoVehicle = new FirestoreVehicleRepository();

        const reqId = req.params.id;

        const command = new DeleteVehicleCommand(repoVehicle);

        const vehicleDelete = await command.execute({id: reqId});

        return res.status(200).json({id: vehicleDelete.id, time: vehicleDelete.time});
    }
}