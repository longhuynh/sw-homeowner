import { ApiConfig } from "./config";

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
      
      return await response.json();
    }
    catch (error) {
      console.log(error);
    }
  }

}

export const LoginServiceInstance = new LoginService();