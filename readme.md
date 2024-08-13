# Full-stack Blog Application

A MERN web application project helping users to read about unknown topics also write their own blogs . 

Any user can signup/signin and start reading great posts also write their own.

The backend service is developed using MySQL & Express. The frontend is in Reactjs using Typescript.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and yarn installed.
- MySQL database server running.

## Getting Started

### Installing Dependencies

1. Clone this repository to your local machine:

```bash
git clone https://github.com/RajdeepDey010/miclient-blogapp.git
```

2. Navigate to the frontend directory:

```bash
cd miclient-blogapp/frontend
```

3. Install project dependencies:

```bash
yarn
```

4. Navigate to the backend directory:

```bash
cd miclient-blogapp/backend
```

5. Install project dependencies:

```bash
yarn
```

### Setting Up the Database

1. Create a MySQL database for the project.

2. In the backend directory Copy the below `.env` file contents to your `.env` and configure the database connection details:

   ```env
   PORT=8080
   DB_NAME=yourdbname
   DB_USER=yourdbusername
   DB_PASSWORD=yourdbpassword
   JWTKEY="F4N5htY7bS9YMGx8JzE0W9KB5y5Dp9D6fph+qGhzv9Y="
   ```

### Running Backend

To create the necessary database tables and start the mysql server, run the following command:

```bash
yarn typeorm migration:run
```

### Starting the Server

Start the Node.js server:

```bash
yarn start
```

The server will run on `http://localhost:8080`.

## Backend API

- root = http://localhost:8080 
- login = http://localhost:8080/login
- signup = http://localhost:8080/register
- create a post = http://localhost:8080//createpost
- edit a post = http://localhost:8080//editpost
- delete a post = http://localhost:8080//delpost/:userId/posts/:postId
- get a user = http://localhost:8080//getUser
- get a user post = http://localhost:8080//userpost/:userId/posts


### Starting the Frontend

Start the vite project:

```bash
yarn dev
```

The server will run on `http://localhost:5173/`.

## Frontend API

- Home = http://localhost:5173/ 
- Signin = http://localhost:5173/signin
- Signup = http://localhost:5173/signup
- My Blogs = http://localhost:5173/myblogs
- Write = http://localhost:5173/write


### Thank You & Happy Coding!