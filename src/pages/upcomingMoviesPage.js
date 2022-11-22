import React from "react";
import { getupcomingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import PlaylistAddIcon from "../components/cardIcons/playlistAdd";
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const UpcomingPage = (props) => {

  const { page } = useParams();
  const {  data:pages, error, isLoading, isError }  = useQuery(
    ["upcomingpages", { id: page }],
    getupcomingMovies)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = pages.results;
  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  //const addToFavorites = (movieId) => true 

  return (
    <>
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => {
        return <PlaylistAddIcon movie={movie} />
      }}
    />
    <Pagination
      sx={{ display: 'flex', justifyContent: 'center'}}
      page={page}
      count={15}
      renderItem={(m) => (
        <PaginationItem
          component={Link}
          to={`/${m.page === 1 ? '' : `upcoming/${Number(m.page)}`}`}
          {...m}
        />
      )}
    />
    </>
  );
};
export default UpcomingPage;
