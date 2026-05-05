// Azure App Registration credentials
// Fill these in once IT provides them after ticket #SR-30161345 is approved
const appConfig = {
  clientId: 'YOUR_CLIENT_ID',         // from Azure App Registration
  tenantId: 'YOUR_TENANT_ID',         // from Azure App Registration
  redirectUri: window.location.origin, // auto-uses current URL

  // Notification email recipients
  // Add or remove approvers here as needed
  approverEmails: [
    'christian.degraaf@andrew.com',
    'ryan.stone1@andrew.com',
  ],

  // Portal URL — update when moved to company hosting
  portalUrl: 'https://site-directory-five.vercel.app',
};

export default appConfig;