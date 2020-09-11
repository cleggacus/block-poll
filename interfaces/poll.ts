export interface Option {
  name: string;
  votes: number;
}

export default interface Poll {
  title: string;
  username: string;
  options: Option[];
}