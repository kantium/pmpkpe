#!/usr/bin/env node

'use strict';

const program  = require('commander');
const bcryptjs = require('bcryptjs');
const atob     = require('atob');
const fs       = require('fs');

let saltContent            = '';
let privateKeyContent      = '';
let mailboxPasswordContent = '';

const printHelp = function() {
  console.log('pmpkpe - Extract the password for your ProtonMail private key');
  console.log('');
  console.log('  Usage:');
  console.log('      pmpkpe -s /path/to/salt.txt -m /path/to/mailboxpassword.txt');
}

const checkArgs = function() {
  if(!program.salt || !program.mailboxPassword) {
    printHelp();
    process.exit();
  }else{
    getValues().then(function(values) {
      getPassword(values.salt,values.mailboxPassword);
    }, function(err){
      console.log(err);
    });
  }
}

const getValues = function() {
  return new Promise(function(resolve, reject) {
    try {
      const p1 = readFile(program.salt);
      const p2 = readFile(program.mailboxPassword);

      Promise.all([p1,p2]).then(values => {
        resolve({
          salt: values[0],
          mailboxPassword: values[1]
        });
      });
    }catch(err){
      reject(err);
    }
  });
}

const binaryStringToArray = function(str) {
  const bytes = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    bytes[i] = str.charCodeAt(i);
  }
  return bytes;
}

const getPassword = function(KeySalt, MailboxPassword) {
  const saltBinary = binaryStringToArray(atob(KeySalt.trim()));
  var hash = bcryptjs.hashSync(MailboxPassword, '$2y$10$' + bcryptjs.encodeBase64(saltBinary, 16));
  console.log(hash.slice(29));
}

const readFile = function(file) {
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
  .version('1.0.3')
  .option('-s --salt <saltFile>', 'Salt for key obtained from your browsers webtools')
  .option('-m --mailboxPassword <mailboxPasswordFile>', 'Mailbox password for protonmail, this is your first of two passwords when logging in')
  .option('-i, --importGpg', 'Import protonmail key into GPG after extraction')
  .parse(process.argv);

checkArgs();
