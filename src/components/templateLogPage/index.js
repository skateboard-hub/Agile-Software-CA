import React,{useContext} from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { MoviesContext } from "../../contexts/moviesContext";


function LogPageTemplate({ title }) {

  const context = useContext(MoviesContext);
  
  const submitContent = (e) => {
    e.preventDefault();
    context.changeLogState(['a','b']);
  };

  return (
    <>
      <Grid container sx={{ padding: '20px' }} xs={12} >
        <Grid item xs={12} >
          <Header title={title} />
        </Grid>
        <Box sx={{
          flexGrow: 3, padding: '20px',
          '& .MuiOutlinedInput-root': { m: 1 },
        }}>
          <Grid container sx={{ justifyContent: 'center', margin: 'auto', height: '600px' }}>

            <Card sx={{ width: '40%', display: 'flex' }}>
                <TextField
                  required
                  id="outlined-required"
                  name="username"
                  label="Username"
                  InputLabelProps={{ shrink: true }}
                  sx={{ justifyContent: 'center', margin: 'auto',  width: '60%' }}
                />

              <TextField
                name="description"
                id="outlined-multiline-static"
                label="Password"
                InputLabelProps={{ shrink: true }}
                sx={{ justifyContent: 'center', margin: 'auto', width: '60%' }}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  m: 1,
                  p: 1,
                  width: '60%',
                  justifyContent: 'center', margin: 'auto'
                }}
                onClick={submitContent}
              >
                Sign In
              </Button>
          </Card>


      </Grid>
    </Box>
      </Grid >
    </>
  );
}
export default LogPageTemplate;