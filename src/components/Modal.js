import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";

import { favoritesState } from "../state/Atoms";
import "../styles/Modal.css";

import useModal from "../hooks/useModal";

const Modal = () => {
  const [favorites, setFavorites] = useRecoilState(favoritesState);
  const [isFavorite, setIsFavorite] = useState(false);

  const { closeModal, modalInfo } = useModal();
  const { isOpen, movie } = modalInfo;

  useEffect(() => {
    const isFavorite = !!favorites.find((fav) => fav.imdbID === movie.imdbID);
    setIsFavorite(isFavorite);
  }, [favorites, movie]);

  const handleConfirm = () => {
    closeModal();
    if (isFavorite) {
      handleRemoveFavorite();
    } else {
      handleAddFavorite();
    }
  }

  const handleAddFavorite = () => {
    setFavorites((prev) => prev.concat(movie));
  }

  const handleRemoveFavorite = () => {
    setFavorites(favorites.filter((fav) => fav.imdbID !== movie.imdbID));
  }

  const handleClose = () => {
    closeModal();
  };

  return (
    <div className={isOpen ? "openModal modal" : "modal"}>
      {isOpen ? (
        <section>
          <main>{movie.Title}</main>
          <footer>
            <button className="close" onClick={handleConfirm}>
              {isFavorite ? "즐겨찾기 제거" : "즐겨찾기 추가"}
            </button>
            <button className="close" onClick={handleClose}>
              취소
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};
export default Modal;
