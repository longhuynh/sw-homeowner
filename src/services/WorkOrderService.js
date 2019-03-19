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

  async getComments(idEncrypted) {
    const url = `${ApiConfig.residentApiUrl}/GetUnitWorkOrderComments`;

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
    const url = `${ApiConfig.residentApiUrl}/GetUnitWorkOrderDocuments`;

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

  async uploadPhoto(formData, userIdEncrypted, workOrderIdEncypted) {
    const params = `userIdEnc=${userIdEncrypted}&workOrderIdEnc=${workOrderIdEncypted}&app=wo`;

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

export const WorkOrderServiceInstance = new WorkOrderService();