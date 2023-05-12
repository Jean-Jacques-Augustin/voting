import {Express} from "express";
import express from "express";
import ConnexionDB from "./db/connexion";
import appRoute from "./routes/routes";


const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', appRoute);
ConnexionDB();

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
