export interface IId {
  id: number;
}

export interface INameEmail {
  name: string;
  email: string;
}
export interface IReqFiles {
  [fieldname: string]: Express.Multer.File[];
}
