import {Schema, model} from 'mongoose';


const voterSchema = new Schema<Voter>({
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
