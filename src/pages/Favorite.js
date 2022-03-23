import React from "react";
import Item from "../components/Item";

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
          <Item
            movie={movie}
            key={movie.imdbID}
            // key={movie.imdbID}
            // image={movie.Poster}
            // title={movie.Title}
            // year={movie.Year}
            // type={movie.Type}
            // imdbID={movie.imdbID}
            // isFavorite={movie.isFavorite}
          />
        ))}
      </div>
    </div>
  );
};
export default Favorite;
