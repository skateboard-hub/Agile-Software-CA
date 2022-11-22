import PeopleHeader from "../headerPeople";
import Grid from "@mui/material/Grid";
import ImageListItem from "@mui/material/ImageListItem";
import { getPeopleImages } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "../../css/swiper.css"
import KnownForCard from "../knownForCard/knownForCard";
import { MoviesContext } from "../../contexts/moviesContext";
import React, { useContext } from "react";
import AddToFavoritesIcon from '../cardIcons/addToFavorites'


const TemplatePeoplePage = ({ people, children }) => {
  const { data , error, isLoading, isError } = useQuery(
    ["images", { id: people.id }],
    getPeopleImages
  );
  const context = useContext(MoviesContext)
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }


  const settings = {
    dots: true,
    dotsClass:'slick-dots1',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const images = data.profiles
  let displayImages=[]
  if(images.length>3){
    for(let i=0;i<3;i++){
      displayImages.push(images[i]);
    }
  }
  else{
    displayImages=images;
  }

  const movies=context.knownFor;

  return (
    <>
      <PeopleHeader people={people} />

      <Grid container spacing={5} sx={{ padding: "15px" }}>
        <Grid item xs={3} sx={{maxHeight:'400'}}>
          <div style={{maxHeight:'400'}}>
            <Slider {...settings}>
            
                {displayImages.map((image) => (
                    <ImageListItem key={image.file_path} cols={1}>
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                        alt={image.poster_path}
                        
                    />
                    </ImageListItem>
                ))}

            </Slider>
          </div>
        </Grid>

        <Grid item xs={9}>
          {children}
        </Grid>
        <Grid item xs={12}>
          <h1>Known for following films:</h1>
        </Grid>
        
          {movies.map((movie) => (
            <Grid key={movie.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
              <KnownForCard movie={movie} 
                action={(movie) => {
                  return <AddToFavoritesIcon movie={movie} />
              }} />
            </Grid>
          ))}
        
      </Grid>
    </>
  );
};

export default TemplatePeoplePage;