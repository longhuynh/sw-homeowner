import { HttpService } from "./config";

export class WorkOrderService {
  constructor() {
    console.log("WorkOrderService constructor");
  }

  async getAll(associationIdEncrypted, unitIdEncrypted) {
    const url = `${HttpService.unitApiUrl}/GetUnitWorkorders`;
    const data = { 
      associationIdEncrypted: associationIdEncrypted,
      unitIdEncrypted: unitIdEncrypted
    };

    return HttpService.post(url, data);
  }

  async getComments(idEncrypted) {
    const url = `${HttpService.unitApiUrl}/GetWorkOrderComments`;
    const data = { idEncrypted: idEncrypted};

    return HttpService.post(url, data);
  }

  async getDocuments(idEncrypted) {
    const url = `${HttpService.unitApiUrl}/GetWorkOrderDocuments`;
    const data = { idEncrypted: idEncrypted};

    return HttpService.post(url, data);
  }

  async saveComment(userIdEncrypted, idEncrypted, note) {
    const url = `${HttpService.unitApiUrl}/SaveWorkOrderNote`;
    const data = { 
        userIdEncrypted: userIdEncrypted,
        idEncrypted: idEncrypted,
        note: note
      };

    return HttpService.post(url, data);
  }

  async uploadPhoto(formData, userIdEncrypted, workOrderIdEncypted) {
    const params = `userIdEnc=${userIdEncrypted}&workOrderIdEnc=${workOrderIdEncypted}&app=wo`;
    const url = `${HttpService.baseUrl}/SWWebservice/Ashx/ResidentPortalFileHandler.ashx?${params}`;

    return HttpService.upload(url, formData);
  }
}
