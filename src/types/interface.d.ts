export interface IId {
  id: number;
}

export interface INameEmailCountry {
  name: string;
  email: string;
  country?: string;
}
export interface IReqFiles {
  [fieldname: string]: Express.Multer.File[];
}
export interface IUpdateUserBody {
  id: number;
  name?: string;
  email?: string;
  country?: string;
}

export interface IInsertRatingsBody {
  appId: number;
  comment?: string;
  rating: number;
}

export interface IEditRatingsBody extends IInsertRatingsBody {
  id: number;
}
