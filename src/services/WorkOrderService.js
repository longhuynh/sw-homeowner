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
    const url = `${HttpService.residentApiUrl}/GetUnitWorkOrderComments`;
    const data = { idEncrypted: idEncrypted};

    return HttpService.post(url, data);
  }

  async getDocuments(idEncrypted) {
    const url = `${HttpService.residentApiUrl}/GetUnitWorkOrderDocuments`;
    const data = { idEncrypted: idEncrypted};

    return HttpService.post(url, data);
  }

  async saveComment(jsonItems) {
    const url = `${HttpService.residentApiUrl}/SaveWorkOrderNote`;

    return HttpService.post(url, jsonItems);
  }

  async uploadPhoto(formData, userIdEncrypted, workOrderIdEncypted) {
    const params = `userIdEnc=${userIdEncrypted}&workOrderIdEnc=${workOrderIdEncypted}&app=wo`;
    const url = `${HttpService.baseUrl}/SWWebservice/Ashx/ResidentPortalFileHandler.ashx?${params}`;

    return HttpService.upload(url, formData);
  }
}
