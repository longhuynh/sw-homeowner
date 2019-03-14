import { ApiConfig } from "./config";

class ArcService {
  constructor() {
    console.log("ArcService constructor");
  }

  async getAll(jsonItems) {
    try {
      const response = await fetch(`${ApiConfig.residentApiUrl}/GetUnitArcProjects`, {
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

export const ArcServiceInstance = new ArcService();