import { ApiConfig } from "./config";

class WorkOrderService {
  constructor() {
    console.log("WorkOrderService constructor");
  }

  async getAll(jsonItems) {
    const url = `${ApiConfig.residentApiUrl}/GetUnitWorkorders`;

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

  async saveComment(jsonItems) {
    const url = `${ApiConfig.residentApiUrl}/SaveWorkOrderNote`;

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

export const WorkOrderServiceInstance = new WorkOrderService();