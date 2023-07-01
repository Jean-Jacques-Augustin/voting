import React, { useCallback, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { getData } from "../../middleware/connexionBack";
import { useSelector } from "react-redux";

export default function Votes() {
	const [voters, setVoters] = useState([]);
	const [resultat, setResultat] = useState([]);
	const token = useSelector((state) => state.user.token);

	const getResulatData = useCallback(async () => {
		try {
			const resultatData = await getData("getVotes", token);
			setResultat(resultatData);
		} catch (error) {
			console.error(error);
		}
	}, []);

	useEffect(() => {
		getResulatData();
	}, [getResulatData]);

	console.log(resultat);

	return (
		<div>
			<Typography variant="h4" align="left">
				Votes enregistrés :
			</Typography>
			<br />
			<Paper sx={{ width: "100%", mb: 12 }}>
				<TableContainer>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								<TableCell>
									<b>Numéro de vote</b>
								</TableCell>
								<TableCell>
									<b>Date de vote</b>
								</TableCell>
								<TableCell>
									<b>Identifiant du candidat voté</b>
								</TableCell>
								<TableCell>
									<b>Observation</b>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{resultat.map((row) => (
								<TableRow key={row._id}>
									<TableCell>
										<b>{row.num_vote}</b>
									</TableCell>
									<TableCell>
										{
											// date en format ISO
											new Date(
												row.date,
											).toLocaleDateString(
												"fr-FR",
												{
													year: "numeric",
													month: "long",
													day: "numeric",

													// ajout de l'heure
													hour: "numeric",
													minute: "numeric",
													second: "numeric",
												},
											)
										}
									</TableCell>
									<TableCell>
										{Array.isArray(
											row.candidateId,
										)
											? // Si candidateId est un tableau
											  row.candidateId.join(
													", ",
											  )
											: // Sinon, afficher le candidat unique dans la cellule de la table
											  row.candidateId}
									</TableCell>
									<TableCell>
										{row.description}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</div>
	);
}
