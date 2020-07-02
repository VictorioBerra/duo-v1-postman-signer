//
// HMAC Duo v1 API Signing Pre-Request script.
//
// - Tory Berra 9/19/2018
var CryptoJS = require("crypto-js");

// You only need to mess with the following variables.
const sKey = ""; // IE: "abc123def456hij789abc123def456hij789"
const iKey = ""; // IE: "ABCDEF123456789"
const host = ""; // IE: "api-xxxxxxxx.duosecurity.com"
const path = ""; // IE: "/admin/v1/users"

//
// End user variables.
//

var bodyParams = request.data || [];

// Sort the params
const paramKeys = Object.keys(bodyParams).sort();
var params = [];
for(var i = 0; i < paramKeys.length; i++) {
    var key = paramKeys[i];
    var value = bodyParams[key];
    params.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
}
var paramString = params.join('&');

const content_type = 'application/x-www-form-urlencoded';
//const method = request.method.toUpperCase();
const method = "GET";

// create canonical string
var date = new Date().toUTCString();
var canon = [date, method.toUpperCase(), host.toLowerCase(), path, paramString].join('\n');

// sign canonical string
var sig  = CryptoJS.HmacSHA1(canon, sKey);

// Build Headers
var auth =  `${iKey}:${sig}`;
var base64 = Buffer.from(auth).toString('base64');

// Make sure you set these in the Headers tab of Postman
// IE: Header: Date, Value: {{Date}}
pm.environment.set("Date", date);
pm.environment.set("Content-Type", content_type);
pm.environment.set("Authorization", "Basic " + base64);
