import User from "../models/user";
import {Response, Request} from "express";
import Authentication from "../models/authentication";
import bcrypt from "bcrypt";
import generateVerificationCode from "../utils/codeGen";
import SignupEmail from "../utils/template/sendCode";
import {jwt_key} from "../utils/configuration";
import jwt from 'jsonwebtoken'

export async function findUserByNumVote(numVote: string) {
    return User.findOne({num_vote: numVote});
}

export async function registerUser(req: Request, res: Response) {
    const num_vote = req.body.num_vote;
    const password = req.body.password;

    try {
        const user = await findUserByNumVote(num_vote);

        if (!user) {
            return res.status(400).json({
                message: "Utilisateur non trouvé, veuillez contacter l'administrateur",
            });
        }

        const email = user.email;

        const code = generateVerificationCode().toString();

        if (code == null) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }

        SignupEmail(email, user.name, code);

        // Crypt password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Save all in the database
        const auth = new Authentication({
            num_vote: user.num_vote,
            password: hash,
            verif_code: code,
        });

        await auth.save();
        return res.status(200).json({
            message: "Email de vérification envoyé",
            user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}

export async function verifyUser(req: Request, res: Response) {
    const code = req.body.code;
    const num_vote = req.body.num_vote;
    const email = req.body.email;

    const user = await User.findOne({num_vote: num_vote});

    if (!user) {
        return res.status(400).json({
            message: "Utilisateur non trouvé, veuillez contacter l'administrateur",
        });
    }

    if (user.email !== email) {
        return res.status(400).json({
            message: "Adresse e-mail incorrecte",
        });
    }

    try {
        const auth = await Authentication.findOne({num_vote: num_vote});

        if (!auth) {
            return res.status(400).json({
                message: "Utilisateur non trouvé, veuillez contacter l'administrateur",
            });
        }

        if (auth.is_verified) {
            return res.status(202).json({
                message: "Utilisateur déjà vérifié",
            });
        }

        if (auth.verif_code !== code) {
            return res.status(400).json({
                message: "Code de vérification incorrect",
            });
        }
        auth.is_verified = true;
        await auth.save();

        return res.status(200).json({
            message: "Utilisateur vérifié",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }

}

export async function loginUser(req: Request, res: Response) {
    const num_vote = req.body.num_vote;
    const password = req.body.password;

    try {
        const auth = await Authentication.findOne({num_vote: num_vote});
        const user = await User.findOne({num_vote: num_vote});

        if (!user) {
            return res.status(400).json({
                message: "Utilisateur non trouvé, veuillez contacter l'administrateur",
            });
        }

        if (!auth) {
            return res.status(400).json({
                message: "Utilisateur non trouvé, veuillez contacter l'administrateur",
            });
        }

        if (!auth.is_verified) {
            return res.status(400).json({
                message: "Utilisateur non vérifié",
            });
        }

        const isMatch = bcrypt.compare(password, auth.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Mot de passe incorrect",
            });
        }

        if(!auth.is_verified) {
            return res.status(400).json({
                message: "Utilisateur non vérifié",
            });
        }

        const information = {
            name: user.name,
            numvote: user.num_vote,
            email: user.email,
            role: user.role,
            is_verified: auth.is_verified
        }

        if (!information) {
            return res.status(500).json("Erreur du serveur, veuillez contacter les admins")
        }
        // set token.

        const token = jwt.sign({information}, jwt_key);

        return res.status(200).json({
            message: "Utilisateur connecté",
            user: information,
            token: token
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}
