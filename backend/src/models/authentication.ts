import {Document, model, Schema} from "mongoose";
import {Authentication} from "../interfaces/authentication";


const AuthentificationSchema = new Schema({
    num_vote: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    verif_code: {
        type: String,
        required: true
    },
    is_verified: {
        type: Boolean,
    }
});

export default model<Authentication & Document>('Authentication', AuthentificationSchema);
