export interface ResponseFormat<T> {
  statusCode: number;
  message?: string;
  data?: T;
}
