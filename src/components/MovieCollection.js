import React from "react";
import { useRecoilValue } from "recoil";

import "../styles/MovieCard.css";
import { favoriteSelector } from "../state/Selector";
import MovieCard from "./MovieCard";

const MovieCollection = (props) => {
  const { item } = props;
  const favorites = useRecoilValue(favoriteSelector);

  const movies = item.data.Search;
  const refinedMovies = movies
    ? movies.map((movie) => {
        return {
          ...movie,
          isFavorite: favorites.find((fav) => fav.imdbID === movie.imdbID),
        };
      })
    : [];
  return (
    <div>
      {refinedMovies ? (
        refinedMovies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))
      ) : (
        <div>"검색결과가 없습니다"</div>
      )}
    </div>
  );
};

export default MovieCollection;
