export interface MovieResult {
  id: number;
  title: string;
  release_date: string;
}

export interface Renga {
  id: string;
  bricks: string;
  movieDBID: string;
}

export interface FoundRenga extends Renga {
  title: string;
}
