class BaseConfig {
  authenticationUrl = 'https://api-sworg.offline.smartwebs.net';
  baseUrl = 'https://office.offline.smartwebs.net';
  residentApiUrl = `${this.baseUrl}/SWWebService/Services/ResidentPortal/ResidentialPortalService.svc`;
  unitApiUrl = `${this.baseUrl}/SWWebservice/Services/UnitsArea/UnitsAreaService.svc`;
  violationApiUrl = `${this.baseUrl}/SWWebservice/Services/ViolationArea/ViolationAreaService.svc`;

  headers = {
    'Accept': 'application/x-jsonr+json, application/json, text/plain',
    'Content-Type': 'application/json;charset=UTF-8',
    'Authorization': 'SwClassic eyJ1SWQiOiJVMVRaLU1oZFN3ekFGWDgwNUdvIiwibUlkIjoiSjJmQW1JRk91ZWtIQkEifQ=='
  };

  uploadHeaders = {
    'Accept': 'application/x-jsonr+json, application/json, text/plain',
    'Content-Type': 'multipart/form-data',
    'Authorization': 'SwClassic eyJ1SWQiOiJVMVRaLU1oZFN3ekFGWDgwNUdvIiwibUlkIjoiSjJmQW1JRk91ZWtIQkEifQ=='
  };
}

export const ApiConfig = new BaseConfig();