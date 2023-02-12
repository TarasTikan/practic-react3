export function MovieList({ movies, onDelete, openModal }) {
  return (
    <ul>
      {movies.map(el => {
        return (
          <li key={el.id}>
            <p>Title: {el.title}</p>
            <p>Count:{el.vote_count}</p>
            <button type="button" onClick={() => onDelete(el.id)}>
              Удалить
            </button>
            <button
              type="button"
              onClick={() => {
                openModal({ src: el.backdrop_path, alt: el.title });
              }}
            >
              Show poster
            </button>
          </li>
        );
      })}
    </ul>
  );
}
