import {
  selector,
  selectorFamily,
  useSetRecoilState,
  waitForNone,
} from "recoil";
import { inputState, favoritesState, currentPageInternal } from "./Atoms";
import axios from "axios";
const API_KEY = "92e32667";

const itemQuery = selectorFamily({
  key: "ItemQuery",
  get:
    (page) =>
    ({ get }) => {
      const inputVal = get(inputState);
      return axios(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${inputVal}&page=${
          page + 1
        }`
      );
    },
});

const useFetchMoreItems = () => {
  const setCurrentPage = useSetRecoilState(currentPageInternal);
  return () => setCurrentPage((page) => page + 1);
};
const allItems = selector({
  key: "AllItems",
  get: ({ get }) => {
    const current = get(currentPageInternal);
    const pageRange = Array.from(Array(current).keys());
    return get(waitForNone(pageRange.map(itemQuery)));
  },
});

const favoriteSelector = selector({
  key: "favoriteSelector",
  get: ({ get }) => {
    let favorites = get(favoritesState);
    if (favorites.length === 0) {
      favorites = JSON.parse(window.localStorage.getItem("favorites"));
    }
    return favorites || [];
  },
  set: ({ set }, newValue) => {
    window.localStorage.setItem("favorites", JSON.stringify(newValue));
    set(favoritesState, newValue);
  },
});
export { allItems, useFetchMoreItems, favoriteSelector };
