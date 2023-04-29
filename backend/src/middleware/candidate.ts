import {Request, Response, NextFunction} from 'express';
import CandidateModel from "../models/candidate";
import UserModel from "../models/user";


/**
 * Middleware pour récupérer tous les candidats.
 */
export async function getAllCandidates(req: Request, res: Response, next: NextFunction) {

    try {
        const candidates = await CandidateModel.find();
        res.json(candidates);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Une erreur est survenue lors du traitement de votre requête.'});
    }
}

/**
 * Middleware pour récupérer un candidat par son ID.
 */
export async function getCandidateById(req: Request, res: Response, next: NextFunction) {
    try {
        const candidateId = req.params.candidateId;
        const candidate = await CandidateModel.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({message: 'Aucun candidat trouvé pour l\'ID fourni.'});
        }
        res.json(candidate);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Une erreur est survenue lors du traitement de votre requête.'});
    }
}

/**
 * Middleware pour créer un nouveau candidat.
 */
export async function createCandidate(req: Request, res: Response, next: NextFunction) {
    try {
        const {party, userId, description} = req.body;

        const user = UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({message: 'Aucun utilisateur trouvé pour l\'ID fourni.'});
        }

        const candidate = {party, userId, description};

        const newCandidate = await CandidateModel.create(candidate);
        res.status(201).json(newCandidate);


    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Une erreur est survenue lors du traitement de votre requête.'});
    }
}

/**
 * Middleware pour mettre à jour un candidat existant.
 */
export async function updateCandidate(req: Request, res: Response, next: NextFunction) {
    try {
        const candidateId = req.params.candidateId;
        const {party, userId, description} = req.body;
        const updatedCandidate = await CandidateModel.findByIdAndUpdate(candidateId, {
            party,
            userId,
            description
        }, {new: true});
        if (!updatedCandidate) {
            return res.status(404).json({message: 'Aucun candidat trouvé pour l\'ID fourni.'});
        }
        res.json(updatedCandidate);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Une erreur est survenue lors du traitement de votre requête.'});
    }
}

/**
 * Middleware pour supprimer un candidat existant.
 */
export async function deleteCandidate(req: Request, res: Response, next: NextFunction) {
    try {
        const candidateId = req.params.candidateId;
        const deletedCandidate = await CandidateModel.findByIdAndDelete(candidateId);
        if (!deletedCandidate) {
            return res.status(404).json({message: 'Aucun candidat trouvé pour l\'ID fourni.'});
        }
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Une erreur est survenue lors du traitement de votre requête.'});
    }
}
