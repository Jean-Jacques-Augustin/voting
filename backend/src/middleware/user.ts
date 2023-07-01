import { Request, Response, NextFunction } from 'express';
import UserModel from "../models/user";


export interface CreateUserDto {
    name: string;
    email: string;
    num_vote: string;
    role?: string;
    address?: string;
}

interface UpdateUserDto extends CreateUserDto {}

// Middleware pour récupérer tous les utilisateurs
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

// Middleware pour créer un nouvel utilisateur
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const createUserDto: CreateUserDto = req.body;
        const user = new UserModel(createUserDto);
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        next(error);
    }
};

// Middleware pour récupérer un utilisateur par son ID
export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

// Middleware pour mettre à jour un utilisateur existant
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updateUserDto: UpdateUserDto = req.body;
        const user = await UserModel.findByIdAndUpdate(req.params.id, updateUserDto, {
            new: true,
            runValidators: true,
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

// Middleware pour supprimer un utilisateur existant
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserModel.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};
