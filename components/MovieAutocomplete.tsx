import React, { useState, useCallback } from "react";
import { MovieResult, Renga } from "../types";

import styles from "./MovieAutocomplete.module.css";

const API_KEY = "ae9fe5055de5c1c32a0c4818ce4671f9";

const MovieAutocomplete = ({ renga, onTry }: Props) => {
  const [value, setValue] = useState("");
  const [results, setResults] = useState<MovieResult[]>([]);
  const onChange = useCallback(async query => {
    setValue(query);
    if (!query) {
      setResults([]);
      return;
    }
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
    );
    const body: { results: MovieResult[] } = await response.json();
    if (body.results) {
      setResults(body.results.slice(0, 7));
    }
  }, []);
  const onSelectMovie = useCallback(
    (result: MovieResult) => {
      setValue("");
      setResults([]);
      if (result.id === renga.movieDBID) {
        onTry(true, result);
      } else {
        onTry(false, result);
      }
    },
    [renga, onTry]
  );
  return (
    <div className={styles.autocomplete}>
      <input
        value={value}
        className={styles.input}
        onChange={evt => onChange(evt.target.value)}
      ></input>
      {results.length ? (
        <div className={styles.results}>
          {results.map(result => (
            <div
              className={styles.result}
              key={result.id}
              onClick={() => onSelectMovie(result)}
            >
              {result.title}
            </div>
          ))}
        </div>
      ) : (
        undefined
      )}
    </div>
  );
};

interface Props {
  renga: Renga;
  onTry: (outcome: boolean, result: MovieResult) => void;
}

export default MovieAutocomplete;
