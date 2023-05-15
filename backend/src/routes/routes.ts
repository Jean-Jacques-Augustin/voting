import express from "express";
import {createUser, deleteUser, getAllUsers, getUserById, updateUser} from "../middleware/user";
import {
    createCandidate,
    deleteCandidate,
    getAllCandidates,
    getCandidateById,
    updateCandidate
} from "../middleware/candidate";
import {registerUser, verifyUser} from "../middleware/authentication";



const appRoute = express.Router();

/**
 * User routes
 */

// Route pour récupérer tous les utilisateurs
appRoute.get('/users', getAllUsers);

// Route pour créer un nouvel utilisateur
appRoute.post('/users', createUser);

// Route pour récupérer un utilisateur par son ID
appRoute.get('/users/:id', getUserById);

// Route pour mettre à jour un utilisateur existant
appRoute.put('/users/:id', updateUser);

// Route pour supprimer un utilisateur existant
appRoute.delete('/users/:id', deleteUser);


/**
 * Candidate routes
 */

// Créer une candidature
appRoute.post('/candidates', createCandidate);

// Recuperate toutes les candidatures
appRoute.get('/candidates', getAllCandidates);

// Récupérer une candidature par son ID
appRoute.get('/candidates/:id', getCandidateById);

// Mettre à jour une candidature existante
appRoute.put('/candidates/:id', updateCandidate);

// Supprimer une candidature existante
appRoute.delete('/candidates/:id', deleteCandidate);


/**
 * Authentication routes
 */

appRoute.post('/register', registerUser);
appRoute.post('/verify', verifyUser);


export default appRoute;