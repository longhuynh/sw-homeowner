import { HttpService } from "./config";

export class ArcService {
  constructor() {
    console.log("ArcService constructor");
  }
  
  async getAll(associationIdEncrypted, unitIdEncrypted) {
    const url = `${HttpService.unitApiUrl}/GetUnitArcProjects`;
    const data = { 
      associationIdEncrypted: associationIdEncrypted,
      unitIdEncrypted: unitIdEncrypted      
    };

    return HttpService.post(url, data);
  }

  async getArc(associationIdEncrypted, projectIdEncrypted) {
    const url = `${HttpService.arcApiUrl}/GetProjectDetails`;
    const data = { 
      associationIdEncrypted: associationIdEncrypted,
      projectIdEncrypted: projectIdEncrypted
    };

    return HttpService.post(url, data);
  }

  
  async getComments(idEncrypted) {
    const url = `${HttpService.residentApiUrl}/GetUnitProjectComments`;
    const data = { idEncrypted: idEncrypted};
    
    return HttpService.post(url, data);
  }

  async getDocuments(idEncrypted) {
    const url = `${HttpService.residentApiUrl}/GetUnitProjectDocuments`;
    const data = { idEncrypted: idEncrypted};
    
    return HttpService.post(url, data);
  }

  async saveComment(jsonItems) {
    const url = `${HttpService.residentApiUrl}/SaveProjectNote`;
    
    return HttpService.post(url, jsonItems);
  }

  async uploadPhoto(formData, userIdEncrypted, projectIdEncrypted) {
    const params = `userIdEnc=${userIdEncrypted}&projectIdEnc=${projectIdEncrypted}&app=arc`;
    const url = `${HttpService.baseUrl}/SWWebservice/Ashx/ResidentPortalFileHandler.ashx?${params}`;

    return HttpService.upload(url, formData);
  }

}