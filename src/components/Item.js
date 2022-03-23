import React from "react";
import "../styles/Item.css";

import { favoritesState } from "../state/Atoms";
import { useRecoilValue } from "recoil";
import useModal from '../hooks/useModal';
const Item = (props) => {
  const { movie } = props;
  const { openModal } = useModal();
  const favorites = useRecoilValue(favoritesState);

  const handleOpenModal = () => {
    openModal(movie);
  };

  return (
    <div className="item">
      <img src={movie.Poster} alt={movie.Title} />
      <div className="info" onClick={handleOpenModal}>
        <span className="title">
          {favorites.find((fav) => fav.imdbID === movie.imdbID) ? "[★]" : ""}
          {movie.Title}
        </span>
        <span className="year">{movie.Year}</span>
        <span className="type">{movie.Type}</span>
      </div>
    </div>
  );
};

export default Item;
