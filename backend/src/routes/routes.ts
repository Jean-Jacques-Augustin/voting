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
import {createVoter, getVoters} from "../middleware/voter";

const upload = multer({storage: fileStorage, fileFilter: fileFilter});

const appRoute = express.Router();

/**
 * User routes
 */

appRoute.get('/users', getAllUsers);

appRoute.post('/users', createUser);

appRoute.get('/users/:id', getUserById);

appRoute.put('/users/:id', updateUser);

appRoute.delete('/users/:id', deleteUser);


/**
 * Candidate routes
 */

appRoute.post('/candidates', upload.single('image'), createCandidate);

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


export default appRoute;