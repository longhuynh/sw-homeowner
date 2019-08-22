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
      onlyPublic: true,
      projectIdEncrypted: projectIdEncrypted
    };

    return HttpService.post(url, data);
  }

  async saveComment(projectHistoryDto) {
    const url = `${HttpService.arcApiUrl}/SaveProjectHistory`;
    const data = { 
      projectHistoryDto: projectHistoryDto
    };

    return HttpService.post(url, data);
  }

  async uploadPhoto(formData, userIdEncrypted, projectIdEncrypted) {
    const params = `userIdEnc=${userIdEncrypted}&projectIdEnc=${projectIdEncrypted}&app=arc`;
    const url = `${HttpService.baseUrl}/SWWebservice/Ashx/ResidentPortalFileHandler.ashx?${params}`;

    return HttpService.upload(url, formData);
  }

}