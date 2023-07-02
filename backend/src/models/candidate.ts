import {Schema, model, Document} from 'mongoose';
import {Candidate} from "../interfaces/candidat";


const candidateSchema = new Schema<Candidate>({
    party: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: "string",
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    imageUrl: {
        type: String,
        required: true,
        unique: true
    }
});

export default model<Candidate & Document>('Candidate', candidateSchema);
