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
