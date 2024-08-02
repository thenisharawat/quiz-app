```sh {"id":"01J488F4YTETCZX2ZCP9EG34EF"}
# Quiz Web Application

This is a quiz application built with the stack (MongoDB, Express.js and Node.js).

## Features
1. Auto admin creation when server starts first time
2. Admin can add, edit, delete quizzes and view scores
3. Admin & User authentication for both with JWT
4. Users can view and attempt quizzes, view their scores on dashboard
5. Morgan logger for server requests and Pino logger for logging data
6. Used helmet for API security
7. Used express-validator for form validation and API security using custom middleware
8. Used Bycryptjs for password hashing
9. Used mongoose for database operations
10. Used common functions for http codes and custom messages
11. Used async/await for promise handling
12. Used aggregate function for joins

## Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Add a `.env` file with the required environment variables (examples are mentioned below):
```
PORT=5000
MONGO_URL=mongodb://localhost:27017/quiz_db
JWT_SECRET= "8B61CBC6579DDCE9D988DF3FE5EC11EC7556C8951F4C6D91175D711514C7F1458A19F641877475AB99CC677828A57869BDCC2AC7C2ECE7EB73D47779E67562A73FA1587651B65A18DDFC82D91C6688348B864D3DBB6AE4"
ADMIN_NAME="Admin One"
ADMIN_EMAIL="admin@test.com"
ADMIN_PASSWORD="1234"
ADMIN_MOBILE=8976543210
ADMIN_NAME2="Admin Two"
ADMIN_EMAIL2="admin2@test.com"
ADMIN_PASSWORD2="1111"
ADMIN_MOBILE2=8976543211
```
```

```md {"id":"01J488KNTJNBBCMKGM2RGMHE6D"}
4. Start the server: `npm start`

```