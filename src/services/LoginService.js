import { HttpService } from "./config";

const User = {};

export class LoginService {
  constructor() {
    console.log("LoginService constructor");
  }

  async login(username, password) {
    const url = `${HttpService.commonApiUrl}/GetUser`;
    const data = { userName: username, userPass: password };

    const user = await HttpService.post(url, data);
    Object.assign(User, user || {});
    
    return user;
  }
}

export const CurrentUser = User;