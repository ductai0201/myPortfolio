export interface IBlog {
  _id?: string;
  title?: string;
  description?: string;
  content?: string;
  gallery?: string[] | string;
  createdAt?: string;
  updatedAt?: string;
}
