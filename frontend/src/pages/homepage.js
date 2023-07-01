import React from "react";
import {
	Box,
	Typography,
	AppBar,
	Toolbar,
	Button,
	Container,
	Grid,
	IconButton,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import votingImage from "./../img/urban-online-voting.png";
import { Link } from "react-router-dom";

export default function Homepage() {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<Toolbar/>
			<Container sx={{ mt: "2rem", mb: "2rem", minHeight: "80vh" }}>
				<Grid container justifyContent="center" spacing={2}>
					<Typography
						variant="h3"
						align="center"
						color="primary"
						gutterBottom
					>
						Bienvenue sur Voting App
					</Typography>

					<img
						alt="Image voting"
						style={{
							width: "100%",
							height: "auto",
							objectFit: "cover",
						}}
						src={votingImage}
					/>
					<br />
					<div
						style={{
							padding: "2rem",
						}}
					>
						<Typography
							variant="body1"
							align="center"
							color="textSecondary"
						>
							C'est l'endroit idéal pour exprimer votre
							opinion et participer aux votes
							communautaires.
						</Typography>
						<Typography
							variant="body1"
							align="center"
							color="textSecondary"
						>
							Lorem ipsum dolor sit amet, consectetur
							adipisicing elit. Accusantium culpa dicta
							iusto natus nemo officia qui quis quo
							reiciendis sit. At culpa eum hic in maiores
							nostrum officiis sunt voluptas?
						</Typography>
					</div>
					<Button
						variant="contained"
						color="primary"
						size="large"
						sx={{ mt: "2rem" }}
						component={Link}
						to="/voter"
					>
						Commencer à voter
					</Button>
				</Grid>
			</Container>
			<Box
				sx={{
					bgcolor: "background.default",
					minHeight: "15vh",
					padding: "2rem",
				}}
			>
				<Container>
					<Grid container justifyContent="center">
						<Grid item xs={12} md={6}>
							<Typography
								variant="h6"
								align="center"
								gutterBottom
							>
								À propos de nous
							</Typography>
							<Typography
								variant="body1"
								align="center"
								color="textSecondary"
							>
								Voting App est une plateforme en ligne
								qui facilite les votes communautaires et
								permet aux utilisateurs d'exprimer leurs
								opinions de manière démocratique.
							</Typography>
						</Grid>
						<Grid item xs={12} md={6} spacing={2}>
							<Typography
								variant="h6"
								align="center"
								gutterBottom
							>
								Contactez-nous
							</Typography>
							<Typography
								variant="body1"
								align="center"
								color="textSecondary"
							>
								Vous pouvez nous contacter par e-mail ou
								via les réseaux sociaux:
							</Typography>
							<Grid
								container
								justifyContent="center"
								sx={{ mt: "1rem" }}
							>
								<IconButton
									color="primary"
									aria-label="Email"
									href="mailto:contact@votingapp.com"
								>
									<EmailIcon />
								</IconButton>
								<IconButton
									color="primary"
									aria-label="Facebook"
									href="https://www.facebook.com/votingapp"
									target="_blank"
									rel="noopener noreferrer"
								>
									<FacebookIcon />
								</IconButton>
								<IconButton
									color="primary"
									aria-label="Twitter"
									href="https://www.twitter.com/votingapp"
									target="_blank"
									rel="noopener noreferrer"
								>
									<TwitterIcon />
								</IconButton>
								<IconButton
									color="primary"
									aria-label="Instagram"
									href="https://www.instagram.com/votingapp"
									target="_blank"
									rel="noopener noreferrer"
								>
									<InstagramIcon />
								</IconButton>
							</Grid>
						</Grid>
					</Grid>
				</Container>
			</Box>
		</Box>
	);
}
