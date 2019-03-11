class BaseConfig{
    authenticationUrl = 'https://api-sworg.offline.smartwebs.net';
    baseUrl = 'https://api-smartresidentportal.offline.smartwebs.net/SWWebService/Services/ResidentPortal/ResidentialPortalService.svc';
    headers = {
        'Accept': 'application/x-jsonr+json, application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'SwClassic eyJ1SWQiOiJVMVRaLU1oZFN3ekFGWDgwNUdvIiwibUlkIjoiSjJmQW1JRk91ZWtIQkEifQ=='
    };
}
export const ApiConfig = new BaseConfig();