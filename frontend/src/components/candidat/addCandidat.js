import React, {useState, useEffect} from "react";
import CustomTextField from "../CustomTextField";
import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {getData, postData} from "../../middleware/connexionBack";

export default function AddCandidat() {
    const [formData, setFormData] = useState({
        party: "", userId: "", description: "",
    });
    const [data, setData] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getData("users");
                setData(response);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formErrors = {};

        if (!formData.party) {
            formErrors.party = "Le parti est obligatoire";
        }

        if (!formData.userId) {
            formErrors.userId = "L'ID utilisateur est obligatoire";
        }

        if (!formData.description) {
            formErrors.description = "La description est obligatoire";
        }

        setErrors(formErrors);

        if (Object.keys(formErrors).length > 0) {
            return;
        }

        try {
            const response = await postData("candidates", formData);
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
                label="Parti"
                name="party"
                value={formData.party}
                onChange={handleInputChange}
                error={errors.party}
                helperText={errors.party}
            />
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Nom du candidat</InputLabel>
                <Select
                    labelId="userId"
                    id="userId"
                    value={formData.userId}
                    label="Nom du candidat"
                    name="userId"
                    onChange={handleInputChange}
                >
                    {data.map((item) => (<MenuItem key={item._id} value={item._id}>
                            {item.name}
                        </MenuItem>))}
                </Select>
            </FormControl>
            <CustomTextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                error={errors.description}
                helperText={errors.description}
            />

            <Button variant="contained" color="primary" type="submit">
                Ajouter
            </Button>

            {errors.global && <div>{errors.global}</div>}
        </form>);
}
