<h1 align="center">
  MERN Chat App 3DES Encryption
</h1>
<p align="center">
  ReactJS, NodeJS, ExpressJS, MongoDB, 3DES Encryption
</p>

<img align="center" src="https://firebasestorage.googleapis.com/v0/b/licenseproject-c2773.appspot.com/o/mern.png?alt=media&token=3ec9ebdd-6476-4ae2-b172-7fcb635c072d" />

# Tech stack
MERN Chat App 3DES Encryption uses a number of open source projects to work properly:
* [ReactJS](https://reactjs.org/) - a JavaScript library for building user interfaces.
* [NodeJS](https://nodejs.org/) - is an open-source, server-side JavaScript runtime environment that allows you to run JavaScript code on the server.
* [ExpressJS](https://expressjs.com/) - is a popular web application framework for Node.js. It provides a set of features and tools that simplify the process of building web applications and APIs.
* [MongoDB](https://www.mongodb.com/) - a document-oriented, No-SQL database used to store the application data.

# Installation
MERN Chat App 3DES Encryption application requires [Node.js](https://nodejs.org/) to run.

### Clone the repositories
```sh
$ git clone https://github.com/catalyn98/MERN-Chat-App-3DES-Encryption.git
```

### Set environment variables 
To set up your project, follow these steps:
1. Create a *.env* file in the following directories: the *backend api* folder, the *frontend-user* folder, and the *frontend-admin* folder, this file will store your environment variables.
2. Create a MongoDB database and obtain the connection string provided by MongoDB for connecting to your database.
3. Create a Firebase project and obtain the Firebase connection string.

### Install the dependencies:
Start the server:
```sh
$ npm run build 
$ npm start 
```

Start the frontend:
```sh
$ cd frontend
$ npm run dev
```

# Web application screenshots 
| **Register screen** | **Login Screen** | **Start screen** |
| :-----------------: | :--------------: | :--------------: |
| ![Register Screen](https://github.com/catalyn98/MERN-Chat-App-3DES-Encryption/blob/main/screenshoots/2.Sign%20up%203DES-192.png) | ![Login Screen](https://github.com/catalyn98/MERN-Chat-App-3DES-Encryption/blob/main/screenshoots/1.Login%203DES-192.png) | ![Start Screen](https://github.com/catalyn98/MERN-Chat-App-3DES-Encryption/blob/main/screenshoots/3.Homepage%201.png) |
| **Conversation screen** | | |
| ![Conversation Screen](https://github.com/catalyn98/MERN-Chat-App-3DES-Encryption/blob/main/screenshoots/4.Homepage%202.png) | | |

# Triple Data Encryption Standard
3DES (Triple Data Encryption Standard) is a symmetric-key block cipher that enhances the original DES (Data Encryption Standard) by applying it three times to each data block. 
Developed to address the vulnerabilities of DES's 56-bit key, 3DES uses a key bundle containing three DES keys, each 56 bits long, resulting in an effective key length of 168 bits. 
The encryption process involves encrypting the plaintext with the first key, decrypting with the second, and encrypting again with the third (EDE mode). 
This triple-layer process increases security, making it more resistant to brute-force attacks compared to DES. 
Despite its enhanced security, 3DES is slower and considered less secure than modern algorithms like AES (Advanced Encryption Standard) due to its shorter effective key length and vulnerability to certain attacks. 
It is being phased out in favor of stronger, more efficient encryption methods.