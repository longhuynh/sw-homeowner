import { baseUrl, headers } from "./config";

export const getDashboard = (jsonItems) => {
    return fetch(`${baseUrl}/ResidentialPortalService.svc/GetUnitSummaryData`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(jsonItems),
    })
    .then(response => response.json()) 
    .catch(error => {
      console.error(error);
    });
}
