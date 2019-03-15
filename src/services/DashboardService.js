import { ApiConfig } from "./config";

class DashboardService {
  async getDashboard(jsonItems) {
    const url = `${ApiConfig.residentApiUrl}/GetUnitSummaryData`;
    
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

export const DashboardServiceInstance = new DashboardService();