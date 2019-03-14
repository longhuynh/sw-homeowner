import { ApiConfig } from "./config";

class CommentService {
  constructor() {
    console.log("CommentService constructor");
  }

  async saveViolationComment(jsonItems) {
    try {
      const response = await fetch(`${ApiConfig.residentApiUrl}/SaveViolationNote`, {
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

  async saveWorkOrderComment(jsonItems) {
    try {
      const response = await fetch(`${ApiConfig.residentApiUrl}/SaveWorkOrderNote`, {
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

  async saveArcComment(jsonItems) {
    try {
      const response = await fetch(`${ApiConfig.residentApiUrl}/SaveArcNote`, {
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

export const CommentServiceInstance = new CommentService();