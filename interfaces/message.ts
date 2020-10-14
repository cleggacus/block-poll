export default interface Message{
  session?: string;
  from: string;
  to?: string;
  data: any;
}