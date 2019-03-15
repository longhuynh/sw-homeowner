import { ApiConfig } from "./config";

class ArcService {
  constructor() {
    console.log("ArcService constructor");
  }
  
  async getAll(jsonItems) {
    const url = `${ApiConfig.residentApiUrl}/GetUnitArcProjects`;

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

  async getArc(jsonItems) {
    const url = `${ApiConfig.residentApiUrl}/GetUnitProjectDetail`;

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
    const url = `${ApiConfig.residentApiUrl}/SaveArcNote`;
    
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

export const ArcServiceInstance = new ArcService();