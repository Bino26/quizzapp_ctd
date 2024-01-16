## Quiz App

Quiz App is an educational plateform that help students to prepare for an interview in JavaScript or masterize it . Express.js is used to create a RESTful API for communication between the frontend and backend.

## Tech Stack

- **Client:** React JS ,AXIOS,MATERIEL-UI

- **Server:** Node, Express , MongoDB .

- **Authentication :** JSON Web Tokens (JWT)


## Key Features:

- **User Authentication:** Users can signup, login, and logout from the application.
- **Profile Management:** Users can update their profile information, including name and email.
- **Password Management:** Users can change their password and request a password reset if forgotten.
- **Diverse Question Types:** Support various question types (multiple choice, true/false, fill in the blanks, etc.).
- **Category and Difficulty Levels:** Categorize quizzes and include difficulty levels for user preference.
- **Note-Taking Capability:** Allow users to take notes during or after a quiz.
- **Favorite Section:** Users can mark quizzes as favorites for easy access in the dedicated section to view and manage favorite quizzes.
- **Profile Dashboard:** Display user details, achievements, and progress.User can also reset his progress.
- **Research bar:** Easily accessible at the top of the page, the Search Bar serves as a dynamic tool to help you discover quizzes with precision and speed.
  
## Run Locally

Clone the project :

```bash
  git clone <repository-url>
```

Go to the project directory :

```bash
  cd repository-name
```

## Running the App

1. Start the backend server:

```bash
  cd backend
```

Install the dependencies :

```bash
  npm install
```

To run this project, you will need to create an .env file and add the following environment variables to your .env file:

```
PORT=<server-port>
MONGO_URL=<mongodb-connection-string>
CLIENT_URL=<client-side-url>
SECRET=<jwt-secret-key>

```

Launch the server :

```bash
  npm run dev
```

2. Start the frontend server:

```bash
   cd client
```

Install the dependencies :

```bash
  npm install
```

Launch the server :

```bash
  npm start 
```


3. Access the app in your web browser:

Open a web browser and access the application at `http://localhost:3000`

**Note:** Make sure to update the port number (`3000`) according to your client server configuration.

Feel free to customize and enhance the project according to your needs and send pull requests.

## Screenshoots

**Profile Dashboard** : 
![main-dashboard](https://github.com/Bino26/quizzapp_ctd/assets/81714858/222033cc-0abb-462d-9d27-03c90d861dd3)

**Quiz Interface** : 
![quiz-interface](https://github.com/Bino26/quizzapp_ctd/assets/81714858/8906d948-0ee2-4876-bf9b-0b86240b6200)


