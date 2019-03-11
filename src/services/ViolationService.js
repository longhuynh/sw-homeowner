import { ApiConfig } from "./config";

class ViolationService {
  constructor() {
    console.log("ViolationService constructor");
  }

  async getAll(jsonItems) {
    try {
      const response = await fetch(`${ApiConfig.baseUrl}/ResidentialPortalService.svc/GetUnitViolations`, {
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