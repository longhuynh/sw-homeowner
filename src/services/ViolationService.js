import { ApiConfig } from "./config";

class ViolationService {
  constructor() {
    console.log("ViolationService constructor");
  }

  async getAll(jsonItems) {
    try {
      const response = await fetch(`${ApiConfig.residentApiUrl}/GetUnitViolations`, {
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

  async getViolation(jsonItems) {
    try {
      const response = await fetch(`${ApiConfig.residentApiUrl}/GetUnitViolationDetail`, {
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

export const ViolationServiceInstance = new ViolationService();