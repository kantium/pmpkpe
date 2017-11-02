# pmpkpe

### Feature

Generate your Protonmail Private Key passphrase based on the KeySalt and MailBoxPassword

### How to get your passphrase

*note : if you have a unique password on Protonmail, switch to a double password authentification (ProtonMail > Settings > Account)*

1. Install node.js (https://nodejs.org/en/download/package-manager/)
2. Recover your KeySalt and PrivateKey (https://github.com/scastiel/protonmail-export)
3. Clone this project
4. cd into the newly cloned directory

```
cd pmpkpe
```

6. Install the dependencies

```
npm install
```

6. Execute this program against your saved salt, mailbox password, and private key

```
node ./index.js -s ../salt.txt -k ../privatekey.txt -m ../mailboxpassword.txt
```

*enjoy*



