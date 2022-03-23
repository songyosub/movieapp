import { atom } from "recoil";

let inputState = atom({
  key: "input",
  default: "",
});

let moviesState = atom({
  key: "movieList",
  default: [],
});

let pageState = atom({
  key: "page",
  default: 1,
});

let modalState = atom({
  key: "modal",
  default: {},
});

let favoritesState = atom({
  key: "favorites",
  default: [],
});
let currentPageInternal = atom({
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
