import React, { useState } from "react";
export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] )
  const [myReviews, setMyReviews] = useState( {} ) 
  const [playlist, setplaylist] = useState( [] )
  const [knownFor, setKnownFor] = useState( [] )
  const [isLog, setIsLog] = useState( false)
  const user =['a','b'];

  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)){
      newFavorites = [...favorites, movie.id];
    }
    else{
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites)
  };
  const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };
  const addPlaylist = (movie) => {
    let newPlaylist = [];
    if (!playlist.includes(movie.id)){
      newPlaylist = [...playlist, movie.id];
    }
    else{
      newPlaylist = [...playlist];
    }
    setplaylist(newPlaylist)
    console.log(playlist);
  } ;
  const addKnownFor = (people) => {
    let newKnownFor = people.known_for;
    setKnownFor(newKnownFor)
  };
  const changeLogState = (submit) => {
    console.log("submit:"+submit)
    console.log("user:"+user)
    if(submit[0] === user[0] && submit[1] === user[1]){
        setIsLog(true); 
    }
    else{
      setIsLog(false); 
    }
  };
  
  //console.log(myReviews);
  // We will use this function in a later section
  const removeFromFavorites = (movie) => {
    setFavorites( favorites.filter(
      (mId) => mId !== movie.id
    ) )
  };

  return (
    <MoviesContext.Provider
      value={{
        knownFor,
        favorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
        addPlaylist,
        addKnownFor,
        changeLogState,
        isLog,
        user
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;