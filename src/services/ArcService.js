import { HttpService } from "./config";
import _ from 'lodash';
import guid from "../utils/guid";

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

  async getProjectDetails(associationIdEncrypted, projectIdEncrypted) {    
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

  mapToDocuments(data){
    return  _.flatMap(data.Documents,
      (d) => [
        {
          IdEncrypted: d.DocumentIdEncrypted,
          DocumentType: d.DocumentType,
          Name: d.Name,
          Extension: d.PhysicalName.split('.')[1],
          Url: `/${d.PartialPath.split('\\').join('/')}${d.PhysicalName}`,
          CreatedDate: d.DateStamp,
          CreatedByUser: null,
        }
      ]);
  }

  mapToComments(data){
    return _.flatMap(data.ProjectHistory,
      (n) => [
        {
          IdEncrypted: guid(),
          CreatedDate: n.LastUpdatedDate,
          CreatedByUser: `${n.FirstName} ${n.LastName}`,
          Text: n.Notes
        }
      ]);
  }

}