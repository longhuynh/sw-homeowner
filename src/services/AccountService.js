import { HttpService } from "./config";

export class AccountService {
  async getAccountSummary(jsonItems) {
    const url = `${HttpService.residentApiUrl}/AccountSummary`;
    
    return HttpService.post(url, jsonItems);
  }

}