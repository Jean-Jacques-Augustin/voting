import {Request, Response, NextFunction} from 'express';
import VoterModel from '../models/voter';
import Voter from "../models/voter";

// GET /voters
export const getVoters = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const voters = await VoterModel.find().populate('candidateId');
        res.json(voters);
    } catch (error) {
        next(error);
    }
};

// GET /voters/:id
export const getVoterById = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    try {
        const voter = await VoterModel.findById(id).populate('candidateId');
        if (!voter) {
            res.sendStatus(404);
            return;
        }
        res.json(voter);
    } catch (error) {
        next(error);
    }
};

// POST /voters
export const createVoter = async (req: Request, res: Response) => {
    try {
        const { num_vote, candidateId } = req.body;
        const voter = await Voter.create({ num_vote, candidateId });
        res.status(201).json(voter);
        console.log(voter);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error});
    }
};

// PUT /voters/:id
export const updateVoter = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    const {userId, candidateId} = req.body;
    try {
        const voter = await VoterModel.findByIdAndUpdate(
            id,
            {userId, candidateId},
            {new: true}
        );
        if (!voter) {
            res.sendStatus(404);
            return;
        }
        res.json(voter);
    } catch (error) {
        next(error);
    }
};

// DELETE /voters/:id
export const deleteVoter = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    try {
        const voter = await VoterModel.findByIdAndDelete(id);
        if (!voter) {
            res.sendStatus(404);
            return;
        }
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};
