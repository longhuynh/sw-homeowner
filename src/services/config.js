class BaseConfig {
  baseUrl = 'https://resident.demo.smartwebs.net';
  commonApiUrl = `${this.baseUrl}/SWWebservice/Services/Complex/CommonService.svc`;
  residentApiUrl = `${this.baseUrl}/SWWebService/Services/ResidentPortal/ResidentialPortalService.svc`;
  unitApiUrl = `${this.baseUrl}/SWWebservice/Services/UnitsArea/UnitsAreaService.svc`;
  violationApiUrl = `${this.baseUrl}/SWWebservice/Services/ViolationArea/ViolationAreaService.svc`;
  arcApiUrl = `${this.baseUrl}/SWWebservice/Services/ArcArea/ArcAreaService.svc`;

  authorizationKey = 'SwClassic eyJ1SWQiOiJVMVRaLU1oZFN3ekFGWDgwNUdvIiwibUlkIjoiSjJmQW1JRk91ZWtIQkEifQ==';

  headers = {
    'Accept': 'application/x-jsonr+json, application/json, text/plain',
    'Content-Type': 'application/json;charset=UTF-8',
    'Authorization': this.authorizationKey
  };

  uploadHeaders = {
    'Accept': 'application/x-jsonr+json, application/json, text/plain',
    'Content-Type': 'multipart/form-data',
    'Authorization': this.authorizationKey
  };

  switchToEnvironment (name) {
    switch(name){
      case 'Dev': 
        this.baseUrl = 'https://office.demo.smartwebs.net';
        break;
      case 'Demo':      
        this.baseUrl = 'https://resident.demo.smartwebs.net';
        break;
      case 'Prod':      
        this.baseUrl = 'https://resident.smartwebs.net';
        break;
      default:
        break;
    }
  }

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

      return response.ok ? await response : null;
    }
    catch (error) {
      console.log(error);
    }
  }
  
}

export const HttpService = new BaseConfig();