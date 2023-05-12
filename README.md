# Backend of the arithmetic calculator Project

The arithmetic calculator Project provides a simple calculator functionality (addition, subtraction, multiplication, division, square root, and a random string generation) where each functionality will have a separate cost per request.

> **Notes:**
>   - You can see the cost per operation in the file seeder `/prisma/seed.js`
>   - Each user has 100 in the balance by default.
>   - *random_string* operation used an API from https://api.random.org/json-rpc/4/basic.
>   - The arithmetic calculator only allow integer values:
>       - JavaScript has a lot of problems with decimal arithmetic operations because it uses binary floating-point numbers to represent decimal values. This can result in rounding errors and imprecise calculations, especially when dealing with decimals that cannot be accurately represented in binary, such as 0.1 or 0.2. Additionally, JavaScript does not have built-in support for arbitrary-precision arithmetic, which can lead to further inaccuracies in calculations involving very large or very small decimal values.

## How to run in your Local Machine

 - Requirements: 
    - Node minimum version 18.15.0 LTS
    - NPM
    - A connection to MYSQL or MariaDB minimum v5.7.23-23

### Steps

1. Create a `.env` file base on `.env-example` and fill the global environments.
2. To run
    - In your console:
        - `npm i` Install all the dependencies
        - `npx prisma generate` Generate the required client to consume the DB
        - `npx prisma db push` Create or update the schema into the DB
        - `npx prisma db seed` Seed the database.
        - `npm run dev` Run a nodejs server in the port configured in the `env` file

### `.ENV` documentation

- **APP**
    - *PORT* Port to run the Fastify project 
    - *APP_JWT_SECRET* string secret for JWT token
    - *APP_JWT_EXPIRES_IN* 1h string value to set the expiration time
    - *APP_VALID_PASS_ID* An ID to allow only the connection if the user has the correct unique ID and time stamp. Check this file `/helpers/global-variables.js`

- **Database**
    - *DB_URL*`=mysql://<username>:<password>@<host>:<port>/<database>` URL string to connect

- **API RANDOM.ORG**
    - *API_RANDOMORG_KEY* Access key to consume the RANDOM ORG API
    - *API_RANDOMORG_URL* URL to consume the RANDOM ORG API

## API Postman Documentation

Run postman in your local:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/27378552-75bb5f0d-1f1e-4baf-9c42-8c0ffcc46290?action=collection%2Ffork&collection-url=entityId%3D27378552-75bb5f0d-1f1e-4baf-9c42-8c0ffcc46290%26entityType%3Dcollection%26workspaceId%3Dbc2cf066-94ce-4207-82ef-4bd754aeb6ea#?env%5BLocal-truenorth-arithmetic-calculator%5D=W3sia2V5IjoiYmFzZVVybCIsInZhbHVlIjoiaHR0cDovLzEyNy4wLjAuMTozMDAwIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6ImRlZmF1bHQiLCJzZXNzaW9uVmFsdWUiOiJodHRwOi8vMTI3LjAuMC4xOjMwMDAiLCJzZXNzaW9uSW5kZXgiOjB9XQ==)

Check online:

https://www.postman.com/cloudy-resonance-740147/workspace/calculator-project/collection/27378552-75bb5f0d-1f1e-4baf-9c42-8c0ffcc46290?action=share&creator=27378552

## Available Scripts

In the project directory, you can run:

### `npm run dev`

To start the app in dev mode.

### `npm start`

For production mode

### `npm run test`

Run the test cases made in Jest

## Kanbam Board

How I control the progress of this project? the answer is through a Kanban board

Check this out:

https://trello.com/b/UCxvjyb5/truenorth-arithmetic-calculator

## Need some help?

Pls contact me to <danimax.com@gmail.com> if you have some questions.