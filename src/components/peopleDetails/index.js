import React from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";


const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const PeopleDetails = ( props) => {
  const people = props.people
  
  return (
    <>
      <Typography variant="h5" component="h3">
        Biography
      </Typography>

      <Typography variant="h6" component="p">
        {people.biography}
      </Typography>
      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Known_for_department" sx={{...chip}} color="primary" />
        </li>
        <li key={people.known_for_department}>
          <Chip label={people.known_for_department} sx={{...chip}} />
        </li>
      </Paper>
      <Paper component="ul" sx={{...root}}>
        <Chip label={`${people.birthday}`} />
        <Chip label={`${people.popularity}`} />
        <Chip label={`${people.place_of_birth}`} />
      </Paper>
      
      
      </>
  );
};
export default PeopleDetails ;