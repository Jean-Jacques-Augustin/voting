import React, { useState, useEffect, useCallback, useRef } from "react";
import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Typography,
} from "@mui/material";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { getData, postData } from "../../middleware/connexionBack";
import { useSelector } from "react-redux";

function AddCandidat() {
	const [formData, setFormData] = useState({
		party: "",
		userId: "",
		description: "",
	});
	const [data, setData] = useState([]);
	const [errors, setErrors] = useState({});
	const [success, setSuccess] = useState(false);
	const token = useSelector((state) => state.user.token);
	const formErrorsRef = useRef({});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await getData("users", token);
				setData(response);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData((formData) => ({ ...formData, [name]: value }));
		setErrors((errors) => ({ ...errors, [name]: "" }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		formErrorsRef.current = {};

		const requiredFields = {
			party: "Le parti est obligatoire",
			userId: "L'ID utilisateur est obligatoire",
			description: "La description est obligatoire",
		};

		Object.entries(requiredFields).forEach(
			([fieldName, errorMessage]) => {
				if (!formData[fieldName]) {
					formErrorsRef.current[fieldName] = errorMessage;
				}
			},
		);

		setErrors(formErrorsRef.current);

		if (Object.keys(formErrorsRef.current).length > 0) {
			console.log("Form errors", formErrorsRef.current);
			return;
		}
		const response = await postData("candidates", formData, token);

		if (response) {
			setSuccess(true);
			setFormData({
				party: "",
				userId: "",
				description: "",
			});
		} else {
			setErrors({ global: "Erreur lors de l'ajout du candidat" });
		}

		console.log("Form submitted");
	};

	return (
		<Box
			component="form"
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				gap: "1rem",
			}}
		>
			{/* Party field */}
			<TextField
				label="Parti"
				name="party"
				value={formData.party}
				onChange={handleInputChange}
				error={Boolean(errors.party)}
				helperText={errors.party}
				fullWidth
			/>

			{/* User Select */}
			<FormControl fullWidth>
				<InputLabel id="demo-simple-select-label">
					Nom du candidat
				</InputLabel>
				<Select
					labelId="userId"
					id="userId"
					value={formData.userId}
					label="Nom du candidat"
					name="userId"
					onChange={handleInputChange}
				>
					{data &&
						data.map((item) => (
							<MenuItem key={item._id} value={item._id}>
								{item.name}
							</MenuItem>
						))}
				</Select>
			</FormControl>

			{/* Description field */}
			<TextField
				fullWidth
				label="Description"
				name="description"
				value={formData.description}
				onChange={handleInputChange}
				error={Boolean(errors.description)}
				helperText={errors.description}
			/>

			{/* Submit button */}
			<Button
				variant="contained"
				color="primary"
				onClick={handleSubmit}
			>
				Ajouter
			</Button>

			{success && (
				<Typography sx={{ color: "green" }}>
					Le candidat a bien été ajouté.
				</Typography>
			)}

			{errors.global && (
				<Typography sx={{ color: "red" }}>
					Erreur lors de l'ajout du candidat.
				</Typography>
			)}
		</Box>
	);
}

export default React.memo(AddCandidat);
