import { authenticationUrl, headers } from "./config";

export const login = (username, password) => {
    return fetch(`${authenticationUrl}/User/Authenticate`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({ UserName: username, Password: password }),
    })
    .then(response => response.json()) 
    .catch(error => {
      console.error(error);
    });
}
