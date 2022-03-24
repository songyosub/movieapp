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
    const length = itemLoadables.length;
    if (length > 0) {
      const firstLoadable = itemLoadables[0];
      if (firstLoadable.state === "hasValue" && firstLoadable.contents.data.Response === "True") {
        const totalResults = firstLoadable.contents.data.totalResults;
        const isEnd = page * 10 > totalResults;
        setIsEnd(isEnd);
      }

      const lastLoadable = itemLoadables[length - 1];
      if (lastLoadable.state === "hasValue" && lastLoadable.contents.data.Response === "False") {
        setIsEnd(true);
      }
    }
  }, [itemLoadables, page, setIsEnd]);

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

  const NoResult = () => (
    <div className="hasError">
      "검색 결과가 없습니다."
    </div>
  );

  const Loader = () => (
    <div className="loading">
      LOADING~!
    </div>
  );

  const MovieResult = (itemLoadable, index) => {
    switch (itemLoadable.state) {
      case "hasValue":
        return (
          <MovieCollection
            item={itemLoadable.contents}
            key={"col-" + index}
          />
        );
      case "hasError":
        return <NoResult key={index}/>;
      case "loading":
        return <Loader key={index}/>;
      default:
        return "";
    };
  };

  return (
    <div className="movies">
      {itemLoadables.map((itemLoadable, index) => MovieResult(itemLoadable, index))}
      {page === 0 && <div>검색된 결과가 없습니다.</div>}
      {page >= 1 && !isEnd && <div className="target" ref={setTarget}></div>}
      {page >= 1 && isEnd && <div>더이상 데이터가 없습니다.</div>}
    </div>
  );
};

export default React.memo(Movies);
