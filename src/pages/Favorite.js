import React from "react";
import MovieCard from "../components/MovieCard";

import { favoritesState } from "../state/Atoms";
import { useRecoilValue } from "recoil";

const Favorite = () => {
  const favorites = useRecoilValue(favoritesState);
  console.log(favorites);
  return (
    <div>
      <h2>내 즐겨찾기</h2>
      <div>
        {favorites.map((movie) => (
          <MovieCard
            movie={movie}
            key={movie.imdbID}
          />
        ))}
      </div>
    </div>
  );
};
export default Favorite;
