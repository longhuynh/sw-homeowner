import { HttpService } from "./config";

export class AccountService {
  async getAccountSummary(unitIdEncrypted, associationIdEncrypted) {
    const url = `${HttpService.unitApiUrl}/GetAccountSummary`;
    const data = { 
      unitIdEncrypted: unitIdEncrypted, 
      associationIdEncrypted: associationIdEncrypted
    };
    
    return HttpService.post(url, data);
  }

}