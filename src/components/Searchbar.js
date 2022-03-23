import React, { useRef } from "react";
import { inputState } from "../state/Atoms";

import { useRecoilState, useResetRecoilState } from "recoil";
import { currentPageInternal } from "../state/Atoms";
import "../styles/Searchbar.css";
const Searchbar = () => {
  const [input, setInput] = useRecoilState(inputState);
  const resetPage = useResetRecoilState(currentPageInternal);
  const searchInput = useRef();

  const clickHandler = (e) => {
    resetPage();
    let target = searchInput.current.value;
    setInput(target);
  };

  return (
    <nav className="searchbar">
      <input type="text" ref={searchInput}></input>
      <button onClick={clickHandler}>검색</button>
    </nav>
  );
};

export default Searchbar;
