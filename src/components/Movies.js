import React, { useState, useEffect } from "react";
import { useFetchMoreItems, allItems } from "../state/Selector";
import { inputState } from "../state/Atoms";
import { useRecoilValue, useRecoilState } from "recoil";
import Collection from "./Collection";

import "../styles/Movies.css";
const Movies = () => {
  //const movieList = useRecoilValue(MoviesSelector);
  const [target, setTarget] = useState(""); // target
  //const [page, setPage] = useRecoilState(currentPage);

  const inputVal = useRecoilValue(inputState);
  const itemLoadables = useRecoilValue(allItems);
  const fetchMoreItems = useFetchMoreItems();
  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      fetchMoreItems();
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.4,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  return (
    <div className="movies">
      {itemLoadables.map(
        (itemLoadable, index) =>
          ({
            hasValue: (
              <Collection item={itemLoadable.contents} key={"col-" + index} />
            ),
            hasError: <div key={"col-" + index}>ERROR</div>,
            loading: <div key={"col-" + index}>LOADING~!</div>,
          }[itemLoadable.state])
      )}
      {inputVal ? <div ref={setTarget}></div> : ""}
    </div>
  );
};

export default React.memo(Movies);
