export enum Status {
  DOING = "đang làm",
  NOT_STARTED = "chưa làm",
  DELAYED = "làm chậm",
  DONE = "hoàn thành",
}
export type Blog = {
  _id: string;
  title: string;
  text: string;
  startDay: Date;
  endDay: Date;
  status: Status;
};
