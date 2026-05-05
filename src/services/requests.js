import appConfig from '../config/appConfig';

// REQUEST SERVICE
// Currently: sends email notification via Graph API (Option 1)
// Future: also writes to Azure Table Storage (Option 3)
// Only this file needs to change when we add Option 3.

// ─── OPTION 3 PLACEHOLDER ───────────────────────────────────────────────────
// When Gregg sets up Azure Table Storage, uncomment and complete this function:
//
// async function writeToTableStorage(request) {
//   const { storageAccountName, storageAccountKey, tableName } = appConfig.tableStorage;
//   // Call Azure Table Storage REST API here
//   // https://docs.microsoft.com/en-us/rest/api/storageservices/insert-entity
// }
// ────────────────────────────────────────────────────────────────────────────

function buildEmailBody(request) {
  const { type, site, details, submittedBy, submittedAt } = request;

  const lines = [
    `Request Type: ${type}`,
    `Site Name: ${site.name}`,
    `Site URL: ${site.url}`,
    `Requested By: ${submittedBy}`,
    `Submitted: ${submittedAt}`,
    '',
    'Request Details:',
    ...Object.entries(details).map(([k, v]) => `  ${k}: ${v}`),
    '',
    `Review pending requests: ${appConfig.portalUrl}/admin`,
  ];

  return lines.join('\n');
}

function buildEmailHtml(request) {
  const { type, site, details, submittedBy, submittedAt } = request;

  const detailRows = Object.entries(details)
    .map(([k, v]) => `<tr><td style="padding:6px 12px;color:#666;font-size:13px">${k}</td><td style="padding:6px 12px;font-size:13px;font-weight:500">${v}</td></tr>`)
    .join('');

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#005CB9;padding:20px 24px;border-radius:8px 8px 0 0">
        <h2 style="color:#fff;margin:0;font-size:18px">Site Request — ${type}</h2>
        <p style="color:#b3d1f5;margin:4px 0 0;font-size:13px">SharePoint Self-Service Portal</p>
      </div>
      <div style="border:1px solid #e0e0e0;border-top:none;padding:24px;border-radius:0 0 8px 8px">
        <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
          <tr style="background:#f8f9fa">
            <td style="padding:6px 12px;color:#666;font-size:13px">Site Name</td>
            <td style="padding:6px 12px;font-size:13px;font-weight:600">${site.name}</td>
          </tr>
          <tr>
            <td style="padding:6px 12px;color:#666;font-size:13px">Site URL</td>
            <td style="padding:6px 12px;font-size:13px"><a href="${site.url}" style="color:#005CB9">${site.url}</a></td>
          </tr>
          <tr style="background:#f8f9fa">
            <td style="padding:6px 12px;color:#666;font-size:13px">Requested By</td>
            <td style="padding:6px 12px;font-size:13px">${submittedBy}</td>
          </tr>
          <tr>
            <td style="padding:6px 12px;color:#666;font-size:13px">Submitted</td>
            <td style="padding:6px 12px;font-size:13px">${submittedAt}</td>
          </tr>
          ${detailRows}
        </table>
        <a href="${appConfig.portalUrl}/admin"
           style="display:inline-block;background:#005CB9;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-size:13px;font-weight:600">
          View in Admin Portal →
        </a>
      </div>
    </div>
  `;
}

async function sendEmailNotification(request, accessToken) {
  // This function requires a valid MSAL access token with Mail.Send permission
  // It will work once the Azure App Registration is approved and MSAL is wired in
  if (!accessToken) {
    console.log('[requests] No access token — email will send once Azure is configured');
    console.log('[requests] Request details:', request);
    return { success: true, mock: true };
  }

  const emailPayload = {
    message: {
      subject: `[Site Request] ${request.type} — ${request.site.name}`,
      body: {
        contentType: 'HTML',
        content: buildEmailHtml(request),
      },
      toRecipients: appConfig.approverEmails.map(email => ({
        emailAddress: { address: email },
      })),
    },
    saveToSentItems: true,
  };

  const response = await fetch('https://graph.microsoft.com/v1.0/me/sendMail', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(emailPayload),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Email failed: ${error}`);
  }

  return { success: true };
}

export async function submitRequest({ type, site, details, submittedBy, accessToken }) {
  const request = {
    type,
    site,
    details,
    submittedBy: submittedBy || 'Portal User',
    submittedAt: new Date().toLocaleString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    }),
  };

  try {
    // OPTION 1 — Email notification
    await sendEmailNotification(request, accessToken);

    // OPTION 3 — Azure Table Storage (uncomment when ready)
    // await writeToTableStorage(request);

    return { success: true };
  } catch (error) {
    console.error('[requests] submitRequest failed:', error);
    return { success: false, error: error.message };
  }
}