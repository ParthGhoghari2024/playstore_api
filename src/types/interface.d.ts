export interface IId {
  id: number;
}
export interface IEmailPassword {
  email: string;
  password: string;
}
export interface ICreateUserBody {
  name: string;
  email: string;
  password: string;
  country?: string;
}
export interface IJwtPayload {
  userId: number;
  name: string;
  email: string;
  roleId: number;
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

export interface IReducedRatingObj {
  comment?: string;
  rating: number;
  user: {
    name: string;
    email: string;
  };
}
export interface IReducedRating {
  appId: any;
  ratings: IReducedRatingObj[];
}

export interface IPermissionObj {
  id?: number;
  name: string;
  description: string;
}
export interface IReducedPermission {
  versionId: number;
  permission: IPermissionObj[];
}

export interface ILoginRes {
  name: string;
  email: string;
  token: string;
  redirectLocation: string;
}
