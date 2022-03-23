import React from "react";

import "../styles/MovieCard.css";
import useModal from '../hooks/useModal';

const MovieCard = (props) => {
  const { movie } = props;
  const { Poster, Title, Year, Type, isFavorite } = movie;
  const { openModal } = useModal();

  const handleOpenModal = () => {
    openModal(movie);
  };

  return (
    <div className="item">
      <img src={Poster} alt={Title} />
      <div className="info" onClick={handleOpenModal}>
        <span className="title">
          {isFavorite ? "[★]" : ""}
          {Title}
        </span>
        <span className="year">{Year}</span>
        <span className="type">{Type}</span>
      </div>
    </div>
  );
};

export default MovieCard;
