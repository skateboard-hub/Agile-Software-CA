import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";
import Header from "../components/headerMovieList";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const FavoriteMoviesPage = () => {
  const { favorites: movieIds } = useContext(MoviesContext);
  const context = useContext(MoviesContext);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Create an array of queries and run in parallel.
  const favoriteMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );

  // Check if any of the parallel queries is still loading.
  const isLoading = favoriteMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const movies = favoriteMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });

  let isLog2 = context.isLog;

  const submitContent2 = (e) => {
    e.preventDefault();
    context.changeLogState(input);
    console.log(isLog2)
  };

  let input = ['username', 'password'];

  const combineContent = (e) => {
    e.preventDefault();
    switch (e.target.name) {
      case "username":
        input[0] = e.target.value;
        break;
      case "password":
        input[1] = e.target.value;
        break;
      default:
        break;
    };
  }

  return (
    <>
      {isLog2 ? (
        <PageTemplate
          title="Favorite Movies"
          movies={movies}
          action={(movie) => {
            return (
              <>
                <RemoveFromFavorites movie={movie} />
                <WriteReview movie={movie} />
              </>
            );
          }}
        />) : (
        <>
          <Grid container sx={{ padding: '20px' }}  >
            <Grid item xs={12} >
              <Header title="Log In" />
            </Grid>
            <Box sx={{
              flexGrow: 1, padding: '40px',
              '& .MuiOutlinedInput-root': { m: 1 },
            }}>
              <Grid container sx={{ justifyContent: 'center', margin: 'auto', height: '600px' }}>
                {isMobile ? (
                  <Card sx={{ width: '100%', display: 'flex' }}>
                  <div style={{ justifyContent: 'center', margin: 'auto' }}>
                    <TextField
                      required
                      id="outlined-required"
                      name="username"
                      label="Username"
                      InputLabelProps={{ shrink: true }}
                      sx={{ width: '100%' }}
                      onChange={(event) => combineContent(event)}
                    />
                    <br />
                    <TextField
                      name="password"
                      id="outlined-multiline-static"
                      label="Password"
                      InputLabelProps={{ shrink: true }}
                      sx={{ width: '100%' }}
                      onChange={(event) => combineContent(event)}
                    />
                    <br />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{
                        width: '100%'
                      }}
                      onClick={(event) => submitContent2(event)}
                    >
                      Log In <br/>Through mobile
                    </Button>
                  </div>
                </Card>
                ): (
                  <Card sx={{ width: '40%', display: 'flex' }}>
                  <div style={{ justifyContent: 'center', margin: 'auto' }}>
                    <TextField
                      required
                      id="outlined-required"
                      name="username"
                      label="Username"
                      InputLabelProps={{ shrink: true }}
                      sx={{ width: '100%' }}
                      onChange={(event) => combineContent(event)}
                    />
                    <br />
                    <TextField
                      name="password"
                      id="outlined-multiline-static"
                      label="Password"
                      InputLabelProps={{ shrink: true }}
                      sx={{ width: '100%' }}
                      onChange={(event) => combineContent(event)}
                    />
                    <br />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{
                        width: '100%'
                      }}
                      onClick={(event) => submitContent2(event)}
                    >
                      Log In
                    </Button>
                  </div>
                </Card>
                )}
                

              </Grid>
            </Box>
          </Grid >
        </>
      )
      }

    </>
  );
};

export default FavoriteMoviesPage;