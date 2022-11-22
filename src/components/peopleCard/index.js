import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png'
import React from "react";
import CardHeader from "@mui/material/CardHeader";
import EnterPeopleDetails from "../cardIcons/enterPeopleDetail";
import { Link } from "react-router-dom";


export default function PeopleCard({ people }) {
  return (
        <Card sx={{ maxWidth: 345,height:600 }}>
        <CardHeader sx={{height:64}}
        title={
          <Typography variant="h5" component="p">
            {people.name}{" "}
          </Typography>
        }
      />
          <CardMedia
            sx={{ height: 350 }}
            image={
              people.profile_path
                ? `https://image.tmdb.org/t/p/w500/${people.profile_path}`
                : img
            }
          />
          <CardContent>
            <Grid container>
                <Typography variant="h6" component="p">
                  popularity:{people.popularity}
                </Typography>
            </Grid>
          </CardContent>
          <CardActions disableSpacing>
            <Link to={`/peoples/${people.id}`}>
              <EnterPeopleDetails people={people}>
              </EnterPeopleDetails>
            </Link>
          </CardActions>
        </Card>
      );
}
