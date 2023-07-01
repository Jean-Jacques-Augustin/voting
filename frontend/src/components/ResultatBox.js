import React, { useEffect, useState } from "react";
import {
	Avatar,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Typography,
} from "@mui/material";
import { baseUrl } from "../middleware/connexionBack";

const ResultatBox = (props) => {
	return (
		<Card variant="outlined">
			<CardContent
				sx={{
					display: "flex",
					flexDirection: { xs: "column", sm: "row" },
					alignItems: { xs: "center", sm: "flex-start" },
					p: 2,
				}}
			>
				<Avatar
					alt={props.name}
					src={`${baseUrl}/${props.imageUrl}`}
					sx={{
						width: { xs: 100, sm: 150 },
						height: { xs: 100, sm: 150 },
						border: "2px solid #ffffff",
						boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
					}}
				/>

				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						p: 2,
					}}
				>
					<Typography
						variant="h4"
						component="div"
						sx={{ mb: 1, color: "textSecondary" }}
					>
						{props.parties}
					</Typography>
					<Typography
						variant="body2"
						component="div"
						sx={{ fontStyle: "italic" }}
					>
						{props.description}
					</Typography>
					<Typography
						variant="h5"
						component="div"
						sx={{ mb: 1, color: "textSecondary" }}
					>
						Nombre de votes:
						<br />
						<span style={{ fontWeight: "bold" }}>
							{props.nbVote} / {props.nbVoteTotal}
						</span>
						<br />
						<span
							style={{ fontSize: "1.2rem", color: "#888" }}
						>
							{props.percent}%
						</span>
					</Typography>
				</Box>
			</CardContent>
		</Card>
	);
};

export default ResultatBox;
