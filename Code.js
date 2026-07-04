function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Auto-create headers in Row 1 if the sheet is completely blank
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "ID", 
        "Full Name", 
        "Phone", 
        "Category", 
        "School or Workplace", 
        "Church", 
        "Location", 
        "Wants Mentorship", 
        "Registered At"
      ]);
      // Make the header row bold
      sheet.getRange("A1:I1").setFontWeight("bold");
    }
    
    // Append the row to the Google Sheet
    sheet.appendRow([
      data.id || "",
      data.fullName || "",
      data.phone || "",
      data.category || "",
      data.schoolOrWork || "",
      data.church || "",
      data.location || "",
      data.wantsMentorship || "",
      data.registeredAt || new Date().toISOString()
    ]);
    
    return ContentService.createTextOutput("SUCCESS").setMimeType(ContentService.MimeType.TEXT);
  } catch (err) {
    return ContentService.createTextOutput("ERROR: " + err.message).setMimeType(ContentService.MimeType.TEXT);
  }
}
