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
      console.log("ItemQuery");
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
    const favorites = get(favoritesState);
    return favorites;
  },
});
export { allItems, useFetchMoreItems };
