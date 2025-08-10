export const msalConfig = {
  auth: {
    clientId: "9c614d43-d038-4388-aba0-ba59443166a0",
    authority: "https://login.microsoftonline.com/7620b5c2-03bd-4afe-9e10-e58f7cef40e3",
    redirectUri: "http://localhost:3000",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  }
};

// Use basic User.Read scope for now
export const loginRequest = {
  scopes: ["User.Read"]
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};