import Search from "./pages/Search";
import Favorite from "./pages/Favorite";

export const routes = [
  {
    path: "/",
    exact: true,
    component: <Search />,
    title: "Search",
  },
  {
    path: "/favorite",
    exact: false,
    component: <Favorite />,
    title: "Favorites",
  },
];
