import { MovieResult, Renga } from "../types";

import { sign } from "tweetnacl";
import { encodeUTF8, decodeBase64 } from "tweetnacl-util";

const PUBLIC_KEY = new Uint8Array([
  1,
  159,
  49,
  146,
  248,
  88,
  245,
  102,
  36,
  29,
  147,
  136,
  53,
  222,
  227,
  45,
  177,
  203,
  28,
  43,
  71,
  169,
  125,
  97,
  26,
  173,
  26,
  122,
  48,
  87,
  54,
  206
]);

export const check = (result: MovieResult, renga: Renga) => {
  const rengaMovieId = sign.open(decodeBase64(renga.movieDBID), PUBLIC_KEY);
  return (
    rengaMovieId !== null && Number(encodeUTF8(rengaMovieId)) === result.id
  );
};
