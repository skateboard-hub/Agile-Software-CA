import React from "react";
import { getTopRatedMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';


const TopRatedPage = (props) => {

  const { page } = useParams();
  const { data: pages, error, isLoading, isError } = useQuery(
    ["topRted", { id: page }],
    getTopRatedMovies
  );
  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = pages.results;

  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))


  return (
    <>
    <PageTemplate
      title="Top Rated Movies"
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />
      }}
    />
    <Pagination
      sx={{ display: 'flex', justifyContent: 'center'}}
      page={page}
      count={15}
      renderItem={(m) => (
        <PaginationItem
          component={Link}
          to={`/${m.page === 1 ? '' : `moviespage/${Number(m.page)}`}`}
          {...m}
        />
      )}
    />
    </>
  );
};
export default TopRatedPage;