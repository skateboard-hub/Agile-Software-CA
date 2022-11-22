import React from "react";
import { getPeoples } from "../api/tmdb-api";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import PeoplePageTemplate from '../components/templatePeopleListPage';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { useParams } from 'react-router-dom';

const PeopleListPage = (props) => {
  const { page } = useParams();
  const {  data: pages, error, isLoading, isError }  = useQuery(
    ['popular'+{page},{ id:page }], getPeoples)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const peoples = pages.results;
  return (
    <>
    <PeoplePageTemplate
    title="Popular Peoples"
    peoples={peoples}
    />
    <Pagination
      sx={{ display: 'flex', justifyContent: 'center'}}
      page={page}
      count={15}
      renderItem={(m) => (
        <PaginationItem
          component={Link}
          to={`/${m.page === 1 ? '' : `popular/${Number(m.page)}`}`}
          {...m}
        />
      )}
    />
    </>

  );
};
export default PeopleListPage;