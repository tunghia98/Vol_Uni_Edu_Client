/* eslint-disable react/prop-types */
import * as React from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import FolderIcon from "@mui/icons-material/Folder";
import EditIcon from "@mui/icons-material/Edit";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function MyActivities({ activities }) {
  const [dense, setDense] = React.useState(false);

  return (
    <div className="flex flex-col justify-center items-center mb-10">
      <h1 className="font-extrabold text-sgu-blue text-5xl pt-10 pb-20">My Activities</h1>

      <Grid item xs={12} md={6} sx={{ width: "75%" }}>
        <Demo>
          <List dense={dense}>
            {activities.map((activity) => (
              <ListItem
                key={activity.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    component={Link}
                    to={`/my-activities/${activity.id}`}
                  >
                    <EditIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={`Activity ${activity.id}`} />
              </ListItem>
            ))}
          </List>
        </Demo>
      </Grid>
    </div>
  );
}
