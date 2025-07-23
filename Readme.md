<a id="top"></a>

<h1 align="center">URL Shortener App</h1>

<br>

This project is a URL Shortener application that allows users to enter a long URL, which is then shortened to a much shorter URL that can be easily shared.

<br>

## Features

1. URL shortening: Users can enter a long URL and get a shortened URL that can be easily shared.

<br>

### Run application using docker:

> `docker compose up --build`

### Run application using script:

1. Run mongodb database locally if not running, Open Git Bash in root directory of your project where Setup.sh file is present and run the below command:

   ```bash
   ./script.sh
   ```

2. This will setup the frontend application and database, finally start the server using below command:

   ```bash
   cd server
   npm start
   ```

## Application Setup

To setup the application locally, follow these steps:

1. Star and Fork this repo to create your own copy to work from.
2. Clone the repository you forked to your local machine using:

   ```bash
   git clone <your_forked_repo_url>
   ```

3. Navigate to the Server directory using command "cd server" and create a .env file and copy contents of .env.example file to .env file and add all secret keys to setup MongoDB database.
4. Install dependencies in server directory of project:

   ```bash
   npm install
   ```

5. Start the server using command:

   ```bash
   npm start
   ```

6. Now Navigate to the client directory using command "cd client" and create a .env.local file and copy contents of .env.sample file to .env.local file and add server URL.

7. Install dependencies in client directory of project:

   ```bash
   npm install
   ```

8. Start the application using command:

   ```bash
   npm start
   ```

9. Open http://localhost:3000 in your browser to see the application.

<br>

<br>

## Usage

To use the app, follow these steps:

1. Enter a long URL in the input field and click the "Shorten" button.
2. Copy the shortened URL and share it with others.
3. Sign in to see a list of shortened urls and click rate.

