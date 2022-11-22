import React from "react";
import { useParams } from 'react-router-dom';
import PageTemplate from "../components/templateMovieListPage";
import { getMoviesByPage } from '../api/tmdb-api';
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

const PaginationPage = (props) => {
  
  const { page } = useParams();
  const { data: pages, error, isLoading, isError } = useQuery(
    ["pages", { id: page }],
    getMoviesByPage
  );
    
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = pages.results;

  // const page = id;
  return (
    <>
    <PageTemplate
      title="Discover Movies"
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

export default PaginationPage;