import { HttpService } from "./config";

const User = {};

export class LoginService {
  constructor() {
    console.log("LoginService constructor");
  }

  async login(username, password) {
    const url = `${HttpService.authenticationUrl}/User/Authenticate`;
    const data = { UserName: username, Password: password };

    const user =  await HttpService.put(url, data);
    Object.assign(User, user || {});
    
    return user;
  }

}

export const CurrentUser = User;