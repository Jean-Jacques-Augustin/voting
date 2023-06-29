import {Express} from "express";
import express from "express";
import ConnexionDB from "./db/connexion";
import appRoute from "./routes/routes";


const cors = require('cors');



const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use('/api', appRoute);
app.use('/api/img', express.static('public/images'));
ConnexionDB();

const PORT = 5002;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
