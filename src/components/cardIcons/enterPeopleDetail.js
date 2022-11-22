import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import Button from "@mui/material/Button";

const EnterPeopleDetail = ({ people })  => {
  const context = useContext(MoviesContext);
  const handleAddToKnownFor 
  = (e) => {
    context.addKnownFor(people);
  };
;
  return (

      <Button variant="outlined" size="medium" color="primary" onClick={handleAddToKnownFor}>
        More Info ...
      </Button>
  );
};

export default EnterPeopleDetail;


