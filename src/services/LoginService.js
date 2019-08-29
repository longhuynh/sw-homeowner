import { HttpService } from "./config";

const User = {};

export class LoginService {
  constructor() {
    console.log("LoginService constructor");
  }

  async login(username, password) {
    const url = `${HttpService.commonApiUrl}/GetUser`;
    console.log(url);

    const data = { userName: username, userPass: password };

    const result = await HttpService.post(url, data);
    const userResult = result != null ? result.GetUserResult : null;
    Object.assign(User, userResult || {});
    
    return userResult;
  }

  async getShortResidentUser(associationIdEncrypted, userIdEncrypted) {
    const url = `${HttpService.simpleApiUrl}/GetShortResidentUser`;
    const data = { 
      associationIdEncrypted: associationIdEncrypted,
      userIdEncrypted: userIdEncrypted 
    };

    const result = await HttpService.post(url, data);
    
    return result;
  }
}

export const CurrentUser = User;