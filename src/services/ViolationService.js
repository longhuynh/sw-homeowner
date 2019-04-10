import { ApiConfig } from "./config";


export class ViolationService {
  constructor() {
    console.log("ViolationService constructor");
  }

  async getAll(associationIdEnc, ownerIdEncrypted, unitIdEncrypted) {
    const url = `${ApiConfig.violationApiUrl}/GetViolationItems`;
    const data = { 
      associationIdEnc: associationIdEnc,
      ownerIdEncrypted: ownerIdEncrypted,
      unitIdEncrypted: unitIdEncrypted, 
      unitUniqueIdEncrypted: unitIdEncrypted,
      violationAreaFilter: {},
      viewHistory: false
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: ApiConfig.headers,
        body: JSON.stringify(data),
      });

      return await response.json();
    }
    catch (error) {
      console.log(error);
    }
  }

  async saveComment(jsonItems) {
    const url = `${ApiConfig.violationApiUrl}/SaveViolationNote`;

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