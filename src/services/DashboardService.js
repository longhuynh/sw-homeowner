import { ApiConfig } from "./config";

export class DashboardService {
  async getDashboard(unitIdEncrypted, associationIdEncrypted) {
    const url = `${ApiConfig.unitApiUrl}/GetUnitCounters`;
    
    try {
      const data = { 
        unitIdEncrypted: unitIdEncrypted, 
        associationIdEncrypted: associationIdEncrypted 
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: ApiConfig.headers,
        body: JSON.stringify(data),
      });
      return await response.json();
    }
    catch (error) {
      console.log(error);
    }
  }

}