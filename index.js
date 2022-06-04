'use strict';
const fs = require('fs');
const jwt = require('jsonwebtoken');
var uuid = require('uuid');

var privateKEY  = fs.readFileSync('./private.key', 'utf8'); //This key is generated from the KeyStore Application, just export the PKCS#8 Private Key
var publicKEY  = fs.readFileSync('./public.key', 'utf8'); //This key is generated from the KeyStore Application, just export the public key
/*
 ====================   JWT Signing =====================
*/

var appId  = '045077e9-08c4-4d6e-914d-d5f1a9a8cd27'; //PacificSource Application
var tenant  = 'https://login.microsoftonline.com/6b95829c-73ae-43c9-b768-532ca4532cd3/oauth2/token'; //PacificSource Azure Domain
var type = 'JWT';
var jti = uuid.v1(); 
var certificate_hash = '<x5t_signature>'; //Certificate Base64 hash, this one you get it from the C# code
var passcode = '<the_password_you_use_to_open_your_certificate>'; //Cert Password

var payload = {
};


var signOptions = {
 issuer:  appId,
 subject:  appId,
 audience:  tenant,
 expiresIn:  "12h",
 jwtid: jti,
 header:{
     typ: type,
     alg:'RS256',
     x5t:certificate_hash
 },
 algorithm:  "RS256"  
};

var token = jwt.sign(payload, {key:privateKEY, passphrase:passcode}, signOptions);
console.log("Token :" + token);
fs.writeFileSync('key_node.txt',token);



/*
 ====================   JWT Verify =====================
*/
var verifyOptions = {
 issuer:  appId,
 subject:  appId,
 audience:  tenant,
 expiresIn:  "12h",
 algorithm:  ["RS256"]
};

var legit = jwt.verify(token, publicKEY, verifyOptions);
console.log("\nJWT verification result: " + JSON.stringify(legit));