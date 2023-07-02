import {Schema, model, Document} from 'mongoose';
import {Candidate} from "../interfaces/candidat";


const candidateSchema = new Schema<Candidate>({
    party: {
        type: String,
        required: true
    },
    userId: {
        type: "string",
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

export default model<Candidate & Document>('Candidate', candidateSchema);
