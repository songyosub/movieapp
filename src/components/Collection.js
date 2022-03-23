import React from "react";
import "../styles/Item.css";

import Item from "./Item";
const Collection = (props) => {
  const { item } = props;
  console.log(props);
  const movies = item.data.Search;
  return (
    <div>
      {movies ? (
        movies.map((movie) => (
          <Item
            // key={movie.imdbID}
            // image={movie.Poster}
            // title={movie.Title}
            // year={movie.Year}
            // type={movie.Type}
            // imdbID={movie.imdbID}
            key={movie.imdbID}
            movie={movie}
          />
        ))
      ) : (
        <div>"검색결과가 없습니다"</div>
      )}
    </div>
  );
};

export default Collection;
