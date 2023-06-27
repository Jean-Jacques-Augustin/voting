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
import { fileFilter, fileStorage } from "../utils/multer";
import authMiddleware, { Role } from "../security/isAuth";
const upload = multer({ storage: fileStorage, fileFilter: fileFilter });



const appRoute = express.Router();

/**
 * User routes
 */

appRoute.get('/users', authMiddleware([Role.Admin, Role.User]), getAllUsers);

appRoute.post('/users', createUser);

appRoute.get('/users/:id', authMiddleware([Role.Admin, Role.User]), getUserById);

appRoute.put('/users/:id',authMiddleware([Role.Admin, Role.User]),  updateUser);

appRoute.delete('/users/:id',authMiddleware([Role.Admin, Role.User]), deleteUser);


/**
 * Candidate routes
 */

appRoute.post('/candidates', upload.single('image'), createCandidate);

appRoute.get('/candidates', getAllCandidates);

appRoute.get('/candidates/:id', getCandidateById);

appRoute.put('/candidates/:id', updateCandidate);

appRoute.delete('/candidates/:id', deleteCandidate);


/**
 * Authentication routes
 */

appRoute.post('/register', registerUser);
appRoute.post('/verify', verifyUser);
appRoute.post('/login', loginUser);


export default appRoute;