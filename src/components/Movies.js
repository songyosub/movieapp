import React, { useState, useEffect } from "react";
import { useFetchMoreItems, allItems } from "../state/Selector";
import { currentPageInternal, isEndState } from "../state/Atoms";
import { useRecoilValue, useRecoilState } from "recoil";
import MovieCollection from "./MovieCollection";

import "../styles/Movies.css";
const Movies = () => {
  //const movieList = useRecoilValue(MoviesSelector);
  const [target, setTarget] = useState(""); // target
  const page = useRecoilValue(currentPageInternal);
  const [isEnd, setIsEnd] = useRecoilState(isEndState);

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
      {itemLoadables.map((itemLoadable, index) => {
        switch (itemLoadable.state) {
          case "hasValue":
            if (itemLoadable.contents.data.Response === "True") {
              if (page * 10 > itemLoadable.contents.data.totalResults) {
                setIsEnd(true);
              } else {
                setIsEnd(false);
              }
            }
            return (
              <>
                <MovieCollection
                  item={itemLoadable.contents}
                  key={"col-" + index}
                />
              </>
            );
          case "hasError":
            return (
              <div className="hasError" key={"col-" + index}>
                "검색 결과가 없습니다."
              </div>
            );
          case "loading":
            return (
              <div className="loading" key={"col-" + index}>
                LOADING~!
              </div>
            );
          default:
            return "";
        }
      })}
      {page >= 1 && !isEnd ? (
        <div className="target" ref={setTarget}></div>
      ) : (
        <div>"검색 결과가 없습니다."</div>
      )}
    </div>
  );
};

export default React.memo(Movies);
