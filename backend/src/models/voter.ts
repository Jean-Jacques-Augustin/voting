import {Schema, model} from 'mongoose';
import {Voter} from "../interfaces/voter";


const voterSchema = new Schema({
    num_vote: {
        type: String,
        required: true,
        unique: true
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
    },

    // si te tableaux candidateId.length > 1 alors on a un vote nul
    description: {
        type: String,
        required: true,
    },
});

const VoterModel = model<Voter>('Voter', voterSchema);

export default VoterModel;
