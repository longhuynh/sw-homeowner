import { HttpService } from "./config";

const User = {};

export class LoginService {
  constructor() {
    console.log("LoginService constructor");
  }

  async login(username, password) {
    const url = `${HttpService.commonApiUrl}/GetUser`;
    const data = { userName: username, userPass: password };

    const result = await HttpService.post(url, data);
    const userResult = result != null ? result.GetUserResult : null;
    Object.assign(User, userResult || {});
    
    return userResult;
  }
}

export const CurrentUser = User;