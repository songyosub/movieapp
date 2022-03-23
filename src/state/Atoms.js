import { atom } from "recoil";

const inputState = atom({
  key: "input",
  default: "",
});

const moviesState = atom({
  key: "movieList",
  default: [],
});

const pageState = atom({
  key: "page",
  default: 1,
});

const modalState = atom({
  key: "modal",
  default: {
    isOpen: false,
    movie: {}
  },
});

const favoritesState = atom({
  key: "favorites",
  default: [],
});

const currentPageInternal = atom({
  key: "currentPage",
  default: 0,
});

export {
  inputState,
  moviesState,
  pageState,
  modalState,
  favoritesState,
  currentPageInternal,
};
