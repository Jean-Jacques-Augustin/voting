import express from "express";
import {createUser, deleteUser, getAllUsers, getUserById, updateUser} from "../middleware/user";
import {
    createCandidate,
    deleteCandidate,
    getAllCandidates,
    getCandidateById,
    updateCandidate
} from "../middleware/candidate";
import {loginUser, registerUser, verifyUser} from "../middleware/authentication";
import multer from "multer";
import {fileFilter, fileStorage} from "../utils/multer";
import {ComputeVoter, createVoter, getVoters} from "../middleware/voter";
import authMiddleware, { Role } from "../security/isAuth";

const upload = multer({storage: fileStorage, fileFilter: fileFilter});

const appRoute = express.Router();

/**
 * User routes
 */

appRoute.get('/users' , authMiddleware([Role.Admin]), getAllUsers);

appRoute.post('/users', authMiddleware([Role.Admin]),  createUser);

appRoute.get('/users/:id',authMiddleware([Role.Admin]),  getUserById);

appRoute.put('/users/:id',authMiddleware([Role.Admin]),  updateUser);

appRoute.delete('/users/:id',authMiddleware([Role.Admin]),  deleteUser);


/**
 * Candidate routes
 */

appRoute.post('/candidates', upload.single('image'),authMiddleware([Role.Admin]),  createCandidate);

appRoute.get('/candidates', getAllCandidates);

appRoute.get('/candidates/:id', getCandidateById);

appRoute.put('/candidates/:id', updateCandidate);

appRoute.delete('/candidates/:id', deleteCandidate);

/**
 * Authentication routes || n'a pas besoin de role
 */
appRoute.post('/register', registerUser);
appRoute.post('/verify', verifyUser);
appRoute.post('/login', loginUser);

/**
 * Voter
 **/

appRoute.post('/createVote', createVoter);
appRoute.get('/getVotes', getVoters)
appRoute.get('/resultat', ComputeVoter)


export default appRoute;