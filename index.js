#!/usr/bin/env node

'use strict';

const program  = require('commander');
const bcryptjs = require('bcryptjs');
const atob     = require('atob');
const fs       = require('fs');

let saltContent            = '';
let privateKeyContent      = '';
let mailboxPasswordContent = '';

let printHelp = function() {
  console.log('pmpkpe - Extract the password for your ProtonMail private key');
  console.log('');
  console.log('  Usage:');
  console.log('      pmpkpe -s /path/to/salt.txt -k /path/to/private.key -m /path/to/mailboxpassword.txt');
}

let checkArgs = function() {
  if(!program.salt || !program.privateKey || !program.mailboxPassword) {
    printHelp();
    process.exit();
  }else{
    getValues().then(function(values) {
      getPassword(values.salt,values.mailboxPassword);
    },function(err){
      console.log(err);
    });
  }
}

let getValues = function() {
  return new Promise(function(resolve, reject) {
    try {
      let p1 = readFile(program.privateKey);
      let p2 = readFile(program.salt);
      let p3 = readFile(program.mailboxPassword);

      Promise.all([p1,p2,p3]).then(values => {
        resolve({
          privateKey: (values[0].replace(/\\r\\n/g, '\n').replace(/\\n/g, '\n')),
	  salt: values[1],
	  mailboxPassword: values[2]
	});
      });
    }catch(err){
      reject(err);
    }
  });
}

let binaryToStringArray = function(str) {
        const bytes = new Uint8Array(str.length);
        for (let i = 0; i < str.length; i++) {
            bytes[i] = str.charCodeAt(i);
        }
        return bytes;
}

let getPassword = function(KeySalt, MailboxPassword) {
  let trimmedSalt = (KeySalt.replace(/\r?\n|\r/)).trim();
  const bytes = new Uint8Array(trimmedSalt.length);
  for (let i = 0; i < trimmedSalt.length; i++) {
    bytes[i] = trimmedSalt.charCodeAt(i);
  }

  let saltBinary = bytes;
  let hash = bcryptjs.hashSync(MailboxPassword.replace(/\r?\n|\r/), '$2y$10$' + bcryptjs.encodeBase64(saltBinary, 16));

  console.log(hash);
}

let readFile = function(file) {
  return new Promise(function(resolve, reject) {
    try {
        fs.readFile(file, 'utf8', function(err, contents) {
		resolve(contents);
    });
    }catch(err){
      reject(err);
    }
  });
}


program
  .version('1.0.0')
  .option('-s --salt <saltFile>', 'Salt for key obtained from your browsers webtools')
  .option('-k --privateKey <privateKeyFile>', 'Private key obtained from your browsers webtools')
  .option('-m --mailboxPassword <mailboxPasswordFile>', 'Mailbox password for protonmail, this is your first of two passwords when logging in')
  .option('-i, --importGpg', 'Import protonmail key into GPG after extraction')
  .parse(process.argv);

checkArgs();
