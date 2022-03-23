// Counter.js
import React, { useEffect } from "react";
import Movies from "../components/Movies";
import Searchbar from "../components/Searchbar";

function Search() {
  return (
    <div>
      <Searchbar />
      <React.Suspense fallback={<div>Loading...</div>}>
        <Movies key={"movies"} />
      </React.Suspense>
    </div>
  );
}

export default React.memo(Search);
