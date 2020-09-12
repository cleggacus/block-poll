export interface Option {
  date: number;
  name: string;
  votes: number;
}

export default interface Poll {
  title: string;
  username: string;
  options: Option[][];
}