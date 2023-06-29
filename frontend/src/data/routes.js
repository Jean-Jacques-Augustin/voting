import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

export const routes = [
    {
        path: "/dashboard/users",
        name: "Users",
        icon: <GroupIcon/>,
    },
    {
        path: "/dashboard/candidat",
        name: "Candidates",
        icon: <PersonIcon/>,
    },
    {
        path: "/dashboard/users",
        name: "Résultat de vote",
        icon: <CheckBoxIcon/>,
    },
];
