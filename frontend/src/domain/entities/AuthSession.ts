import { User } from "./User";
import { AccessToken } from "../valueObjects/AccessToken";

export class AuthSession {
  private _accessToken: AccessToken;
  private _user: User;

  constructor(accessToken: AccessToken, user: User) {
    this._accessToken = accessToken;
    this._user = user;
  }

  get accessToken(): AccessToken {
    return this._accessToken;
  }

  get user(): User {
    return this._user;
  }
}