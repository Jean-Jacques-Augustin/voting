import {Schema, model} from 'mongoose';
import {Voter} from "../interfaces/voter";


const voterSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    candidateId: [
        {
            type: String,
            required: true,
        },
    ],
    date: {
        type: Date,
        default: Date.now,
    }
});

const VoterModel = model<Voter>('Voter', voterSchema);

export default VoterModel;
