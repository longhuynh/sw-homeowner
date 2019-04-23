class BaseConfig {
  authenticationUrl = 'https://api-sworg.offline.smartwebs.net';
  baseUrl = 'https://office.offline.smartwebs.net';
  residentApiUrl = `${this.baseUrl}/SWWebService/Services/ResidentPortal/ResidentialPortalService.svc`;
  unitApiUrl = `${this.baseUrl}/SWWebservice/Services/UnitsArea/UnitsAreaService.svc`;
  violationApiUrl = `${this.baseUrl}/SWWebservice/Services/ViolationArea/ViolationAreaService.svc`;
  arcApiUrl = `${this.baseUrl}/SWWebservice/Services/ArcArea/ArcAreaService.svc`;

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

  async post(url, data){
    try {   
      const response = await fetch(url, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(data),
      });

      return response.ok ? await response.json() : null;
    }
    catch (error) {
      console.log(error);
    }
  }

  async put(url, data){
    try {   
      const response = await fetch(url, {
        method: 'PUT',
        headers: this.headers,
        body: JSON.stringify(data),
      });

      return response.ok ? await response.json() : null;
    }
    catch (error) {
      console.log(error);
    }
  }

  async upload(url, formData){
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: this.uploadHeaders,
        body: formData,
      });

      return response.ok;
    }
    catch (error) {
      console.log(error);
    }
  }
  
}

export const HttpService = new BaseConfig();