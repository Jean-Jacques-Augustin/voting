import React, {useState} from "react";
import axios from "axios";
import CustomTextField from "../CustomTextField";
import {Button} from "@mui/material";
import {postData} from "../../middleware/connexionBack";
import {useSelector} from "react-redux";

const AddUser = () => {
    const token = useSelector((state) => state.user.token);
    const [formData, setFormData] = useState({
        name: "", email: "", num_vote: "", address: "",
    });

    const [errors, setErrors] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formErrors = {};

        if (!formData.name) {
            formErrors.name = "Le nom est obligatoire";
        }

        if (!formData.email) {
            formErrors.email = "L'email est obligatoire";
        }

        if (!formData.num_vote) {
            formErrors.num_vote = "Le numéro de vote est obligatoire";
        }

        setErrors(formErrors);

        if (Object.keys(formErrors).length > 0) {
            return;
        }

        try {
            const response = await postData("users" , formData ,token );
            console.log(response);
        } catch (error) {
            console.error(error);
            setErrors({
                global: "Une erreur est survenue, veuillez réessayer.",
            });
        }
    };

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData((formData) => ({...formData, [name]: value}));
        setErrors((errors) => ({...errors, [name]: ""}));
    };

    return (<form
            onSubmit={handleSubmit}
            style={{
                display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "1rem",
            }}
        >
            <CustomTextField
                label="Nom"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={errors.name}
                helperText={errors.name}
            />
            <CustomTextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
                helperText={errors.email}
            />
            <CustomTextField
                label="Numéro de vote"
                type="text"
                name="num_vote"
                value={formData.num_vote}
                onChange={handleInputChange}
                error={errors.num_vote}
                helperText={errors.num_vote}
            />
            <CustomTextField
                label="Adresse"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
            />

            <Button variant="contained" color="primary" type="submit">
                Ajouter
            </Button>
            {errors.global && <div>{errors.global}</div>}
        </form>);
};

export default AddUser;
