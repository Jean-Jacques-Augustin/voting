import {Request, Response, NextFunction} from 'express';
import VoterModel from '../models/voter';
import Voter from "../models/voter";
import CandidateModel from "../models/candidate";
import UserModel from '../models/user';

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

        const description = candidateId.length > 1 ? 'Invalide' : 'Valide';

        const voter = await Voter.create({ num_vote, candidateId, description });
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

export const ComputeVoter = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Récupérer tous les votes
        const voters = await VoterModel.find();
        // Récupérer tous les candidats
        const candidates = await CandidateModel.find();

        // Filtrer les votes valides
        const validVotes = voters.filter((voter) => voter.description === 'Valide');

        // prendre nombre de votes total
        const totalVotes = voters.length;

        // prendre le nombre de vote valide
        const validVotesCount = validVotes.length;

        // prendre le users inscrit

        const inscrit = (await UserModel.find()).length





        // Pour chaque candidat, compter le nombre de votes
        const result = candidates.map((candidate) => {
            const nbVote = validVotes.filter((voter) => voter.candidateId.includes(candidate._id)).length;
            return {
                candidate,
                nbVote,
                percent: validVotesCount > 0 ? (nbVote / validVotesCount) * 100 : 0,

            };
        });

        return res.json({ result, totalVotes, validVotesCount,inscrit});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Une erreur est survenue lors du calcul des votes.' });
    }
};