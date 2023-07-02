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
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Box from "@mui/material/Box";
import { getData, postData } from "../../middleware/connexionBack";
import axios from "axios";
import { baseUrl } from "../../middleware/connexionBack";
import { useSelector } from "react-redux";

function AddCandidat() {
	const [formData, setFormData] = useState({
		party: "",
		userId: "",
		description: "",
		image: null,
	});
	const [data, setData] = useState([]);
	const [errors, setErrors] = useState({});
	const [success, setSuccess] = useState(false);

	const handleImageSelect = useCallback((event) => {
		const file = event.target.files[0];
		setFormData((formData) => ({ ...formData, image: file }));
	}, []);

	const token = useSelector((state) => state.user.token);

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

	const handleInputChange = useCallback((event) => {
		const { name, value } = event.target;
		setFormData((formData) => ({ ...formData, [name]: value }));
		setErrors((errors) => ({ ...errors, [name]: "" }));
	}, []);

	const formErrorsRef = useRef({});
	const handleSubmit = useCallback(
		async (event) => {
			event.preventDefault();
			formErrorsRef.current = {};

			if (!formData.party) {
				formErrorsRef.current.party = "Le parti est obligatoire";
			}

			if (!formData.userId) {
				formErrorsRef.current.userId =
					"L'ID utilisateur est obligatoire";
			}

			if (!formData.description) {
				formErrorsRef.current.description =
					"La description est obligatoire";
			}

			setErrors(formErrorsRef.current);

			if (Object.keys(formErrorsRef.current).length > 0) {
				console.log("Form errors", formErrorsRef.current);
				return;
			}

			const response = await axios.post(
				`${baseUrl}/candidates`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				},
			);
			
			if (response.status === 201) {
				setSuccess(true);
				setFormData({
					party: "",
					userId: "",
					description: "",
					image: null,
				});
			} else {
				setSuccess(false);
			}


			console.log("Form submitted");
		},
		[formData],
	);

	const hasFormDataChanged = useCallback(
		(newFormData) => {
			return (
				newFormData.party !== formData.party ||
				newFormData.userId !== formData.userId ||
				newFormData.description !== formData.description ||
				newFormData.image !== formData.image
			);
		},
		[formData],
	);

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

			{/* Image upload field */}
			<Box
				sx={{
					width: 300,
					mb: 4,
				}}
			>
				<input
					type="file"
					name="image"
					onChange={handleImageSelect}
					style={{ display: "none" }}
					id="image-upload"
				/>
				<label htmlFor="image-upload">
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
							width: "100%",
							minHeight: 200,
							backgroundColor: "#F5F5F5",
							border: "1px solid #E0E0E0",
							borderRadius: 4,
							cursor: "pointer",
						}}
					>
						{formData.image ? (
							<img
								src={URL.createObjectURL(
									formData.image,
								)}
								alt="Selected Image"
								style={{
									width: "100%",
									height: "auto",
									marginBottom: 8,
								}}
							/>
						) : (
							<React.Fragment>
								<CloudUploadIcon
									sx={{
										fontSize: 48,
										color: "gray",
									}}
								/>
								<p style={{ color: "gray", margin: 0 }}>
									Glissez et déposez une image ici ou
									cliquez pour sélectionner une image
								</p>
							</React.Fragment>
						)}
					</div>
				</label>
			</Box>

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
