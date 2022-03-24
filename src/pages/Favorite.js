import React from "react";
import MovieCard from "../components/MovieCard";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { favoriteSelector } from "../state/Selector";
import { useRecoilState } from "recoil";

const Favorite = () => {
  const [favorites, setFavorites] = useRecoilState(favoriteSelector);
  console.log(favorites);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const items = reorder(
      favorites,
      result.source.index,
      result.destination.index
    );

    setFavorites(items);
  };
  return (
    <div>
      <h2>내 즐겨찾기</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="favorite">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {favorites.map((movie, index) => (
                <Draggable
                  key={movie.imdbID}
                  {...provided.droppableProps}
                  draggableId={movie.imdbID}
                  index={index}
                >
                  {(provided) => (
                    <div>
                      <div
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                      >
                        <MovieCard movie={movie} key={movie.imdbID} />
                      </div>
                      {provided.placeholder}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
export default Favorite;
