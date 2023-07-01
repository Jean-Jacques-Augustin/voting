import React, { useEffect, useState, useCallback } from "react";
import { getData } from "../middleware/connexionBack";
import {
	Grid,
	Container,
	Typography,
	Card,
	Box,
	AppBar,
	Toolbar,
} from "@mui/material";
import ResultatBox from "../components/ResultatBox";

export default function Resultat() {
	const [resultat, setResultat] = useState([]);
	const [totalVote, setTotalVote] = useState(0);
	const [inscrit, setInscrit] = useState(0);

	const getResulatData = useCallback(async () => {
		try {
			const resultatData = await getData("resultat");
			setResultat(resultatData.result);
			setTotalVote(resultatData.totalVotes);
			setInscrit(resultatData.validVotesCount);
		} catch (error) {
			console.error(error);
		}
	}, []);

	useEffect(() => {
		getResulatData();
	}, [getResulatData]);

	return (
		<Box>
			<AppBar color="inherit">
				<Toolbar>
					<Container>
						<Box
							sx={{
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
								p: 2,
							}}
						>
							<Typography variant="h6" component="div">
								Vote électronique {">"} Résultat de vote
							</Typography>
						</Box>
					</Container>
				</Toolbar>
			</AppBar>
			<Toolbar />
			<Container>
				{resultat.length > 0 ? (
					<div>
						<Card
							variant="outlined"
							sx={{
								display: "flex",
								flexDirection: {
									xs: "column",
									sm: "column",
								},
								alignItems: {
									xs: "center",
									sm: "flex-start",
								},
								p: 2,
								mt: 2,
							}}
						>
							<Typography variant="h5" marginBottom="1rem">
								Nombre de votants inscrits:
								<b>{totalVote}</b>
							</Typography>
							<Typography
								variant="h5"
								f
								marginBottom="1rem"
							>
								Nombre de votants ayant voté:{" "}
								<b>{inscrit}</b>
							</Typography>
						</Card>

						<Grid
							container
							spacing={2}
							justifyContent="start"
							alignItems="center"
							sx={{ mt: "2rem" }}
						>
							{resultat.map((result, index) => (
								<Grid
									key={index}
									item
									xs={12}
									sm={6}
									md={6}
								>
									<ResultatBox
										name={result.candidate.party}
										imageUrl={
											result.candidate.imageUrl
										}
										parties={
											result.candidate.party
										}
										description={
											result.candidate
												.description
										}
										nbVote={result.nbVote}
										percent={result.percent}
										nbVoteTotal={totalVote}
									/>
								</Grid>
							))}
						</Grid>
					</div>
				) : (
					<Typography variant="h5" marginBottom="1rem">
						Aucun résultat disponible
					</Typography>
				)}
			</Container>
		</Box>
	);
}
