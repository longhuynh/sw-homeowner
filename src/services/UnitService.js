import { HttpService } from "./config";
import _ from 'lodash';
const moment = require('moment');

export class UnitService {
  constructor() {
    console.log("UnitService constructor");
  }

  async getUnitCounter(associationIdEncrypted, unitIdEncrypted) {
    const url = `${HttpService.unitApiUrl}/GetUnitCounters`;
    const data = { 
      unitIdEncrypted: unitIdEncrypted,
      associationIdEncrypted: associationIdEncrypted
    };
         
    return HttpService.post(url, data);
  }

  async getResidentIncomingNotes(unitIdEncrypted, userIdEncrypted) {
    const url = `${HttpService.unitApiUrl}/GetResidentIncomingNotes`;
    const data = { 
      onlyNew: true,
      startDate: moment().subtract(7, 'days'),
      unitIdEncrypted: unitIdEncrypted,
      userIdEncrypted: userIdEncrypted
    };

    return HttpService.post(url, data);
  }

  async getUnitsByUser(userIdEncrypted) {
    const url = `${HttpService.unitApiUrl}/GetUnitsByUser`;
    const data = {
      userIdEncrypted: userIdEncrypted
    };
         
    return HttpService.post(url, data);
  }

  async getOwnerUnitDetails(unitIdEncrypted) {
    const url = `${HttpService.unitApiUrl}/GetOwnerUnitDetails`;
    const data = {
      unitIdEncrypted: unitIdEncrypted
    };
         
    return HttpService.post(url, data);
  }

  async getServiceNoteTypes(managementIdEncrypted) {
    const url = `${HttpService.unitApiUrl}/GetServiceNoteTypes`;
    const data = {
      managementIdEncrypted: managementIdEncrypted
    };
         
    return HttpService.post(url, data);
  }

  async saveOwnerUnit(associationIdEncrypted, managementIdEncrypted, userIdEncrypted, owner, unit) {
    const url = `${HttpService.unitApiUrl}/SaveOwnerUnit`;
    const data = {
      clientKey: {
        AssociationIdEncrypted: associationIdEncrypted,
        ManagementIdEncrypted: managementIdEncrypted,
        UserIdEncrypted: userIdEncrypted
      },
      owner: owner,
      unit: unit
    };
         
    return HttpService.post(url, data);
  }  

  async saveNote(userIdEncrypted, note, ownerIdEncrypted, serviceNotesTypeEidEncrypted) {
    const url = `${HttpService.unitApiUrl}/SaveNote`;
    const data = {
      note: {
        AppSpecificIdEncrypted: '6s_b0MBMZ9mzGHWFYTI',
        IsActive: true,
        IsPublic: true,
        IsResidentNote: true,
        LastUpdatedByUserIdEncrypted: userIdEncrypted,
        Notes: note,
        OwnerIdEncrypted: ownerIdEncrypted,
        ServiceNotesTypeEidEncrypted: serviceNotesTypeEidEncrypted
      }
    };
    console.log(data);
    return HttpService.post(url, data);
  }  
}
