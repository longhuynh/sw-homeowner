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

  
  async getComments(idEncrypted) {
    const url = `${ApiConfig.residentApiUrl}/GetUnitProjectComments`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: ApiConfig.headers,
        body: JSON.stringify({ idEncrypted: idEncrypted}),
      });

      return await response.json();
    }
    catch (error) {
      console.log(error);
    }
  }

  async getDocuments(idEncrypted) {
    const url = `${ApiConfig.residentApiUrl}/GetUnitProjectDocuments`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: ApiConfig.headers,
        body: JSON.stringify({ idEncrypted: idEncrypted}),
      });

      return await response.json();
    }
    catch (error) {
      console.log(error);
    }
  }

  async saveComment(jsonItems) {
    const url = `${ApiConfig.residentApiUrl}/SaveProjectNote`;
    
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

  async uploadPhoto(formData, userIdEncrypted, projectIdEncrypted) {
    const params = `userIdEnc=${userIdEncrypted}&projectIdEnc=${projectIdEncrypted}&app=arc`;

    const url = `${ApiConfig.baseUrl}/SWWebservice/Ashx/ResidentPortalFileHandler.ashx?${params}`;

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

export const ArcServiceInstance = new ArcService();