import {Schema, model} from "mongoose";
import {User} from "../interfaces/user";


const userSchema = new Schema<User>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    num_vote: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    address: {
        type: String
    }
});

const UserModel = model<User>('User', userSchema);

export default UserModel;
