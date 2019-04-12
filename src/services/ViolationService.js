import { HttpService } from "./config";


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
      violationAreaFilter: {},
      viewHistory: false
    };

    return HttpService.post(url, data);
  }

  async saveComment(activityIdEnc, note, userIdEnc) {
    const url = `${HttpService.violationApiUrl}/AddNote`;
    const data = { 
      activityIdEnc: activityIdEnc,
      note: note,
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