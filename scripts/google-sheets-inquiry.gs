/**
 * Google Apps Script web app that appends website inquiries to a Google Sheet.
 *
 * Setup:
 * 1. Open the target Google Sheet → Extensions → Apps Script, paste this file.
 * 2. Deploy → New deployment → type "Web app".
 *    Execute as: Me. Who has access: Anyone.
 * 3. Copy the web app URL (ends in /exec) into GOOGLE_SHEETS_WEBHOOK_URL
 *    in .env.local (and in your hosting provider's env settings).
 * After editing this script, redeploy (Manage deployments → Edit → New version)
 * or the old code keeps running.
 */

const SHEET_NAME = 'Inquiries';
const COLUMNS = [
  'createdAt',
  'source',
  'fullName',
  'email',
  'phone',
  'preferredDate',
  'guests',
  'destinationSlug',
  'packageId',
  'specialRequests',
  'message',
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(COLUMNS);
    }

    sheet.appendRow(COLUMNS.map((key) => (data[key] === undefined ? '' : data[key])));

    return json({ success: true });
  } catch (err) {
    return json({ success: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
