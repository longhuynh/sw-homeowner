import { HttpService } from "./config";
import _ from 'lodash';

export class ViolationService {
  constructor() {
    console.log("ViolationService constructor");
  }

  async getAll(associationIdEnc, ownerIdEncrypted, unitIdEncrypted) {
    const url = `${HttpService.violationApiUrl}/GetViolationItems`;
    const data = { 
      associationIdEnc: associationIdEnc,
      ownerIdEncrypted: ownerIdEncrypted,
      unitIdEncrypted: unitIdEncrypted, 
      unitUniqueIdEncrypted: unitIdEncrypted,
      violationAreaFilter: {}
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
    return _.flatMap(violation.Activities[0].Documents, (d) => [
      {
        IdEncrypted: d.DocumentId,
        Name: d.Name,
        Extension: d.Extension,
        Url: d.Href,
        CreatedDate: d.DateStamp,
        CreatedByUser: `${d.CreatedByUserFirstName} ${d.CreateByUserLastName}`,
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

    return HttpService.post(url, data);
  }

  async uploadPhoto(formData, associationIdEncrypted, userIdEncrypted, activityId) {
    const params = `associationIdEnc=${associationIdEncrypted}&userIdEnc=${userIdEncrypted}&activityId=${activityId}`;
    const url = `${HttpService.baseUrl}/SWWebservice/Ashx/AdditionFileHandler.ashx?${params}`;

    return HttpService.upload(url, formData);
  }
}