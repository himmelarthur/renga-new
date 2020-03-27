import { data } from "../../rengas";
import Renga from "../../components/Renga";
import { useState, useCallback, useEffect } from "react";
import { Renga as IRenga, FoundRenga, MovieResult } from "../../types";

let initialRengas = {};

try {
  const stringified = localStorage.getItem("initialRengas");
  if (stringified) {
    initialRengas = JSON.parse(stringified);
  }
} catch {}

const Rengas = () => {
  const [found, setFound] = useState<{ [rengaId: string]: FoundRenga }>({});
  useEffect(() => {
    try {
      const stringified = localStorage.getItem("initialRengas");
      if (stringified) {
        initialRengas = JSON.parse(stringified);
        setFound(initialRengas);
      }
    } catch {}
  }, []);
  const onFound = useCallback(
    (renga: IRenga, result: MovieResult) => {
      const newFound = {
        ...found,
        [renga.id]: { ...renga, title: result.title }
      };
      localStorage.setItem("initialRengas", JSON.stringify(newFound));
      setFound(newFound);
    },
    [found, setFound]
  );
  return (
    <div className="page">
      <h1 className="title">renga</h1>
      <h2 className="subtitle">find which movie matches the 3 emojis</h2>
      <div className="found">
        Found: {data.map(r => r.id).filter(id => found[id]).length}/
        {data.length}
      </div>
      <div className="content">
        {data.map((renga, index) => (
          <Renga
            key={index}
            renga={renga}
            found={found[renga.id]}
            onFound={(result: MovieResult) => onFound(renga, result)}
          />
        ))}
      </div>
    </div>
  );
};

export default Rengas;
