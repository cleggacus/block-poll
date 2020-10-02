export enum ReqTypes { findNodes, updateNetwork };
export enum Status { Sending, Finding, Found };

export default interface Message{
  from: string;
  to: string;
  reqType: ReqTypes;
  status: Status;
  mes: any;
}