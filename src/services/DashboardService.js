import { ApiConfig } from "./config";

class DashboardService {
  async getDashboard(jsonItems) {
    try {
      const response = await fetch(`${ApiConfig.baseUrl}/GetUnitSummaryData`, {
        method: 'POST',
        headers: ApiConfig.headers,
        body: JSON.stringify(jsonItems),
      });
      return await response.json();
    }
    catch (error) {
      console.error(error);
    }
  }

}

export const DashboardServiceInstance = new DashboardService();