// Importez les dépendances nécessaires
import jwt from 'jsonwebtoken';
import {jwt_key} from "../utils/configuration";

// Définissez votre enum Role avec les rôles possibles
enum Role {
    Admin = 'admin',
    User = 'user',
}

// Définissez votre fonction de middleware d'authentification
const authMiddleware = (allowedRoles: Role[]) => {
    return (req, res, next) => {
        const token = req.header('Authorization');

        if (!token)
            // Le token est manquant
            return res.status(401).json({message: 'Missing token'});


        try {
            const decodedToken = jwt.verify(token, jwt_key);


            const userRole: Role = decodedToken.role;

            if (!allowedRoles.includes(userRole)) {
                return res.status(403).json({message: 'Unauthorized'});
            }

            req.user = decodedToken;

            next();
        } catch (error) {
            // Le token est invalide ou expiré
            return res.status(401).json({message: 'Invalid token'});
        }
    };
};

export default authMiddleware;
