"use strict"

var bcryptjs = require('bcryptjs');
var atob = require('atob');

function binaryStringToArray(str) {
        const bytes = new Uint8Array(str.length);
        for (let i = 0; i < str.length; i++) {
            bytes[i] = str.charCodeAt(i);
        }
        return bytes;
}

var KeySalt = "KeySalt==";
var MailboxPassword = "MailboxPassword";

const saltBinary = binaryStringToArray(atob(KeySalt.trim()));
var hash = bcryptjs.hashSync(MailboxPassword, '$2y$10$' + bcryptjs.encodeBase64(saltBinary, 16));
console.log(hash.slice(29));
