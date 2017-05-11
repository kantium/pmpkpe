# pmpkpe

### Feature

Generate your Protonmail Private Key passphrase based on the KeySalt and MailBoxPassword

### How to get your passphrase

*note : if you have a unique password on Protonmail, switch to a double password authentification (ProtonMail > Settings > Account)*

1. Install node.js (https://nodejs.org/en/download/package-manager/)
2. Install dependencies (see package.json)
  * `npm install github:dexice/pmpkpe`
3. Recover your KeySalt and PrivateKey (https://github.com/scastiel/protonmail-export)
4. Edit index.js file (KeySalt and MailBoxPassword fields)
5. run `node index.js` and get your passphrase
6. run `gpg --import private-key.txt` and enter the passphrase or use the [protonmail-export tool](https://github.com/scastiel/protonmail-export)

*enjoy*



