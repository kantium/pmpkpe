# pmpkpe

### Feature

Generate your Protonmail Private Key passphrase based on the KeySalt and MailBoxPassword

Special thanks to [krisclarkdev](https://github.com/krisclarkdev), [vinyll](https://github.com/vinyll), [Freebien](https://github.com/Freebien) and [jooray](https://github.com/jooray).

### How to get your passphrase

1. Install node.js (https://nodejs.org/en/download/package-manager/)
2. Clone pmpkpe repo:

```
git clone git@github.com:kantium/pmpkpe.git
```
 
3. install required node modules:

```
cd pmpkpe && npm install && npm update && cd ..

```

4. Recover your KeySalt and PrivateKey-s for each of your addresses (see below)

5. Execute this program against your saved salt and mailbox password
that you save into a file (this is either your second password if you use
two passwords or a single login password if you use the default
recommended procedure of using just one password):

```
nodejs ./pmpkpe/index.js -s ./salt.txt -m ./mailboxpassword.txt
```

6. The output of this program will be a passphrase that you can use to
decrypt all the private keys for all your addresses. You can import them
using:

```
gpg --import private-key.asc
```

for each key.

You can the list the imported keys:

```
gpg --list-secret-keys
```

and change the passphrase to some passphrase that you will remember:

```
gpg --edit-key KEYID passwd quit
```

(where key id can be a fingerprint from the previous list or your e-mail address)


*enjoy*


### How to download your ProtonMail private key?

ProtonMail stores an encrypted version of your private key on its servers. From the settings pane of your account you can download your public key; unfortunately you cannot download your private key. The good news: you can very easilly find it using the development tools of your browser. Here's how:

1. Open the ProtonMail app and log out completely. You should now see the login screen.
2. Open the dev tools of your browser, and the _Network_ tab to see all network calls.
3. Enter your username and password and click _Login_ button.
4. In the network calls, find the one to “/api/auth”.
5. In this network call, open the *Response* tab to see raw data returned from the server, find the line beginning with `"KeySalt":` and copy the value without quotes to a file.
6. Find a post call to “/api/users”, there will be a section with addresses, find sections starting with `"PrivateKey":`, and copy the rest of the line, from `"-----BEGIN PGP PRIVATE KEY` to the last `"`, without the trailing comma.
7. Open the *Console* tab of the dev tools, type `console.log(<PASTE THE COPIED CONTENT HERE>)` then press enter.
8. Copy the result of the command, and put it into a text file, that's it you have your private key!
9. Repeat points 6-8 for all addresses to get all your private keys
