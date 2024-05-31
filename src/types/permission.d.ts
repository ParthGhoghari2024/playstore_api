export interface IPermissionReqBody {
  id?: number;
  name: string;
  versionId: number;
  description: string;
}

export interface IAppIdVersionId {
  appId?: number;
  versionId?: number;
}

export interface IApplicationIdUserId {
  userId?: number;
  applicationId?: number;
}
