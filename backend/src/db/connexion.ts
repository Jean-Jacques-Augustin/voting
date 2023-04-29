import * as mongoose from "mongoose";


const MONGODB_URI = 'mongodb://127.0.0.1:27017/voting';
export default function ConnexionDB() {

    mongoose
        .connect(MONGODB_URI)
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.log(`MongoDB connection error: ${err}`));
}