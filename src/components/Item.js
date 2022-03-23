import React from "react";
import "../styles/Item.css";

import { modalState, favoritesState } from "../state/Atoms";
import { useRecoilValue, useRecoilState } from "recoil";
const Item = (props) => {
  const { movie } = props;
  const [modalInfo, setModalInfo] = useRecoilState(modalState);
  const favorites = useRecoilValue(favoritesState);
  const openModal = () => {
    setModalInfo({ isOpenModal: true, movie });
  };
  return (
    <div className="item">
      <img src={movie.Poster} alt={movie.Title} />
      <div className="info" onClick={openModal}>
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
