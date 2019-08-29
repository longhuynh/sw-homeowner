import { HttpService } from "./config";
import _ from 'lodash';

export class ViolationService {
  constructor() {
    console.log("ViolationService constructor");
  }

  async getAll(associationIdEncrypted, unitIdEncrypted) {
    const url = `${HttpService.unitApiUrl}/GetUnitViolations`;
    const data = { 
      associationIdEncrypted: associationIdEncrypted,
      unitIdEncrypted: unitIdEncrypted
    };
        
    return HttpService.post(url, data);
  }

  async getViolationItemById(associationIdEncrypted, violationIdEncrypted) {
    const url = `${HttpService.violationApiUrl}/GetViolationItemById`;
    const data = { 
      associationIdEncrypted: associationIdEncrypted,
      violationIdEncrypted: violationIdEncrypted
    };
        
    return HttpService.post(url, data);
  }

  
  
  getComments(violation) {
    return _.flatMap(violation.Activities[0].Notes, (n) => [
      {
        IdEncrypted: n.ActivityNotesCreatedByUserIdEnc,
        CreatedDate: n.CreatedDate,
        CreatedByUser: `${n.CreatedByUserFirstName} ${n.CreateByUserLastName}`,
        Text: n.Text
      }
    ]);
  }
  
  getDocuments(violation) {
    const activity = violation.Activities[0];
    return _.flatMap(activity.Documents, (d) => [
      {
        IdEncrypted: d.DocumentId,
        DocumentType: d.TypeName,
        Name: d.Name,
        Extension: d.Extension,
        Url: d.Href,
        CreatedDate: d.DateStamp,
        CreatedByUser: activity.CreatedByUserFirstName,
      }
    ]);
  }

  async saveComment(activityIdEnc, note, userIdEnc) {
    const url = `${HttpService.violationApiUrl}/AddNote`;
    const data = { 
      activityIdEnc: activityIdEnc,
      note: note,
      isPublic: true,
      isResidentNote: true,
      userIdEnc: userIdEnc
    };

    console.log(data);

    return HttpService.post(url, data);
  }

  async uploadPhoto(formData, associationIdEncrypted, userIdEncrypted, activityId) {
    const params = `associationIdEnc=${associationIdEncrypted}&userIdEnc=${userIdEncrypted}&activityId=${activityId}`;
    const url = `${HttpService.baseUrl}/SWWebservice/Ashx/AdditionFileHandler.ashx?${params}`;

    return HttpService.upload(url, formData);
  }
}