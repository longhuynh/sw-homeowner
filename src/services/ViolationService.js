import { ApiConfig } from "./config";


class ViolationService {
  constructor() {
    console.log("ViolationService constructor");
  }

  async getAll(jsonItems) {
    const url = `${ApiConfig.residentApiUrl}/GetUnitViolations`;
    
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

  async getViolation(jsonItems) {
    const url = `${ApiConfig.residentApiUrl}/GetUnitViolationDetail`;

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
    const url = `${ApiConfig.residentApiUrl}/SaveViolationNote`;

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

  async uploadPhoto(formData, associationIdEncrypted, userIdEncrypted, activityId) {
    const params = `associationIdEnc=${associationIdEncrypted}&userIdEnc=${userIdEncrypted}&activityId=${activityId}`;

    const url = `${ApiConfig.baseUrl}/SWWebservice/Ashx/AdditionFileHandler.ashx?${params}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: ApiConfig.uploadHeaders,
        body: formData,
      });

      return await response.json();
    }
    catch (error) {
      console.log(error);
    }
  }

}

export const ViolationServiceInstance = new ViolationService();