import { ApiConfig } from "./config";

export class AccountService {
  async getAccountSummary(jsonItems) {
    const url = `${ApiConfig.residentApiUrl}/AccountSummary`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: ApiConfig.headers,
        body: JSON.stringify(jsonItems),
      });
      
      return await response.json();
    }
    catch (error) {
      console.log(error);
    }
  }

}