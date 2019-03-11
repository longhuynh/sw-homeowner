import { ApiConfig } from "./config";

class WorkOrderService {
  constructor() {
    console.log("WorkOrderService constructor");
  }

  async getAll(jsonItems) {
    try {
      const response = await fetch(`${ApiConfig.baseUrl}/GetUnitWorkOrders`, {
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

export const WorkOrderServiceInstance = new WorkOrderService();