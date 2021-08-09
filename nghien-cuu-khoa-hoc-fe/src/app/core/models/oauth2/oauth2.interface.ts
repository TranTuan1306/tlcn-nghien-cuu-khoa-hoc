/* eslint-disable @typescript-eslint/naming-convention */
export interface OAuth2 {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
}

export interface UserInfo {
  username: string;
  authorities: string[];
}

export interface OAuth2User {
  authenticated: boolean;
  authorities: Authority[];
  clientOnly: boolean;
  credentials: string;
  name: string;
  principal: string;
  details: OAuth2Detail;
  userAuthentication: UserAuthentication;
  oauth2Request: OAuth2Request;
}

export interface Authority {
  authority: string;
}

export interface UserAuthentication {
  authenticated: boolean;
  authorities: Authority[];
  credentials: string;
}

export interface OAuth2Detail {
  remoteAddress: string;
  sessionId: string;
  tokenType: string;
  tokenValue: string;
}

export interface OAuth2Request {
  approved: boolean;
  authorities: Authority[];
  clientId: string;
  grantType: string;
  refresh: boolean;
  requestParameters: RequestParameter;
  scope: string[];
}

export interface RequestParameter {
  grant_type: string;
  google_token: string;
}

export class UserGoogle {
  name: string;
  photoUrl: string;
  constructor(name: string, photoUrl: string) {
    this.name = name;
    this.photoUrl = photoUrl;
  }
}

export class RoleUser {
  authenticatePermissions: string;
  role: string;
  constructor(authenticatePermissions: string, role: string) {
    this.authenticatePermissions = authenticatePermissions;
    this.role = role;
  }
}
