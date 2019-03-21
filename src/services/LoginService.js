import { ApiConfig } from "./config";

const User = {};

class LoginService {
  constructor() {
    console.log("LoginService constructor");
  }

  async login(username, password) {
    const url = `${ApiConfig.authenticationUrl}/User/Authenticate`;
    
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: ApiConfig.headers,
        body: JSON.stringify({ UserName: username, Password: password }),
      });

      const user =  await response.json();

      Object.assign(User, user);
      
      return user;
    }
    catch (error) {
      console.log(error);
    }
  }

}

export const LoginServiceInstance = new LoginService();
export const CurrentUser = User;