import { Request, Response, NextFunction } from 'express';
import Authentication from "../models/authentication";



// Middleware pour vérifier l'authentification de l'utilisateur
export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Vérifier si l'utilisateur est authentifié
        const { num_vote, password } = req.body;
        const user = await Authentication.findOne({ num_vote });

        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Identifiants invalides' });
        }

        // Ajouter l'utilisateur authentifié à la requête
        req.user = user;

        // Passer à la prochaine étape du middleware
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};
