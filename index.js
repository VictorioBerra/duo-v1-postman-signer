//
// HMAC Duo v1 API Signing Pre-Request script.
//
// - Tory Berra 9/19/2018

// You only need to mess with the following variables.
const sKey = ""; // IE: "abc123def456hij789abc123def456hij789"
const iKey = ""; // IE: "ABCDEF123456789"
const host = request.url.split("/")[2].toLowerCase(); // IE: "api-xxxxxxxx.duosecurity.com"
const path = request.url.replace(/^.*\/\/[^\/]+/, ''); // IE: "/admin/v1/users"
const params = ""; // IE: "realname=First%20Last&username=root"

//
// End user variables.
//

const content_type = 'application/x-www-form-urlencoded';
const method = request.method.toUpperCase();

// create canonical string
var date = new Date().toUTCString();
var canon = [date, method.toUpperCase(), host.toLowerCase(), path, params].join('\n');

// sign canonical string
var sig  = CryptoJS.HmacSHA1(canon, sKey);

// Build Headers
var auth =  `${iKey}:${sig}`;
var base64 = Buffer.from(auth).toString('base64');
 
// Make sure you set these in the Headers tab of Postman
// IE: Header: Date, Value: {{Date}}
postman.setEnvironmentVariable('Date', date);
postman.setEnvironmentVariable('Content-Type', content_type);
postman.setEnvironmentVariable('Authorization', "Basic " + base64);
