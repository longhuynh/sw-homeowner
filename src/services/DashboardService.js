import { HttpService } from "./config";

export class DashboardService {
  async getDashboard(unitIdEncrypted, associationIdEncrypted) {
    const url = `${HttpService.unitApiUrl}/GetUnitCounters`;
    const data = { 
      unitIdEncrypted: unitIdEncrypted, 
      associationIdEncrypted: associationIdEncrypted,
      includeBalance: true
    };

    return HttpService.post(url, data);
  }

}