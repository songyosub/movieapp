import React, { useRef } from "react";
import "../styles/Modal.css";

import { favoritesState, modalState } from "../state/Atoms";
import { useRecoilValue, useRecoilState } from "recoil";

const Modal = () => {
  const [favorites, setFavorites] = useRecoilState(favoritesState);
  const [modalInfo, setModalInfo] = useRecoilState(modalState);
  const { isOpenModal, movie } = modalInfo;
  const isFav = useRef(false);
  const closeModal = (e) => {
    e.preventDefault();
    setModalInfo((prev) => ({ ...prev, isOpenModal: false }));
  };

  if (movie) {
    isFav.current = favorites.find((fav) => fav.imdbID === movie.imdbID)
      ? true
      : false;
  }

  const favoriteHandler = (e) => {
    e.preventDefault();
    if (isFav.current) {
      setFavorites(favorites.filter((fav) => fav.imdbID !== movie.imdbID));
      setModalInfo((prev) => ({ ...prev, isOpenModal: false }));
    } else {
      setFavorites((prev) => prev.concat(movie));
      setModalInfo((prev) => ({ ...prev, isOpenModal: false }));
    }
  };
  return (
    <div className={isOpenModal ? "openModal modal" : "modal"}>
      {isOpenModal ? (
        <section>
          <main>{movie.Title}</main>
          <footer>
            <button className="close" onClick={favoriteHandler}>
              {isFav.current ? "즐겨찾기 제거" : "즐겨찾기 추가"}
            </button>
            <button className="close" onClick={closeModal}>
              취소
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};
export default Modal;
