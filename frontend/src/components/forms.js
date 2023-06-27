import {
  Button,
  Card,
  CardHeader,
  CardContent,
  Typography,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

export const CustomButton = (props) => {
  return (
    <Button
      onClick={props.onClick}
      variant="outlined"
      color="primary"
      className="button"
    >
      {props.name}
    </Button>
  );
};

export const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 13,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

export const CustomCard = (props) => {
  return (
    <Card variant="elevation" className="paper_glass">
      <CardHeader subheader={props.name} title={props.titre} />
      <CardContent>
        <Typography paragraph>{props.content}</Typography>
      </CardContent>
    </Card>
  );
};
