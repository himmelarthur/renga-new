import React, { useCallback } from "react";
import MovieAutocomplete from "./MovieAutocomplete";
import { Renga as IRenga, FoundRenga, MovieResult } from "../types";

import styles from "./Renga.module.css";

const Renga = ({ renga, found, onFound }: Props) => {
  const onTry = useCallback(
    (outcome: boolean, result: MovieResult) => {
      if (outcome) {
        onFound(result);
      }
    },
    [renga, onFound, found]
  );
  return (
    <div className={styles.renga}>
      <div className={styles.bricks}>{renga.bricks}</div>
      <div className={styles.right}>
        {!found ? (
          <MovieAutocomplete renga={renga} onTry={onTry}></MovieAutocomplete>
        ) : (
          <div className={styles.title}>{found.title}</div>
        )}
      </div>
    </div>
  );
};

interface Props {
  renga: IRenga;
  found: FoundRenga;
  onFound: (result: MovieResult) => void;
}

export default Renga;
