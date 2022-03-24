import React, { useRef } from "react";
import { inputState } from "../state/Atoms";

import { useResetRecoilState, useSetRecoilState } from "recoil";
import { currentPageInternal } from "../state/Atoms";
import { useFetchMoreItems } from "../state/Selector";
import "../styles/Searchbar.css";
const Searchbar = () => {
  const setInput = useSetRecoilState(inputState);
  const resetPage = useResetRecoilState(currentPageInternal);
  const searchInput = useRef();
  const fetchMoreItems = useFetchMoreItems();

  const clickHandler = (e) => {
    resetPage();
    let target = searchInput.current.value;
    if (target) {
      fetchMoreItems();
      setInput(target);
    }
  };

  return (
    <nav className="searchbar">
      <input
        className="search-input"
        type="text"
        ref={searchInput}
        placeholder="검색어를 입력해주세요."
      ></input>
      <button className="search-button" onClick={clickHandler}>
        검색
      </button>
    </nav>
  );
};

export default Searchbar;
