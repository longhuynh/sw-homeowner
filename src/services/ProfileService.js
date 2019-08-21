import { HttpService } from "./config";

export class ProfileService {
  constructor() {
    console.log("ProfileService constructor");
  }

  async getUserInfo(username, password) {
    const url = ``;
    const data = { UserName: username, Password: password };
    const user =  await HttpService.put(url, data);  
    
    return user;
  }

  async saveUserInfo(username, password) {
    const url = `https://office.smartwebs.net/SWWebservice/Services/Complex/CommonService.svc/GetUser`;
    const data = { userName: username, userPass: password };

    const user = await HttpService.post(url, data);

    return user;
  }
}
