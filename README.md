# Academic Advising Center Chatbot

In a busy academic advising center of an university, students are frustrated that they need to wait more than one hour to see their advisor.

Using a chatbot, we can save time for both the students and the staffs.

### Testing the demo
To simply see a live demo of this application, go to [this site](https://academic-center-chatbot.herokuapp.com/) and use the following credentials to log in:
- Email: `cody@uni.edu`
- Password: `123`

### Running the application on your machine

To start the application, you need first have a Postgres database named "1901-gh-stackathon" and another databse named "1901-gh-stackathon." Then, you follow the following steps:

1.  Execute `npm install` or `npm i` to install all the dependencies
2.  Execute `npm run seed` to fill some dummy data in the database
3.  Download the [Dialogflow settings file](https://github.com/vchu22/1901-GH-Stackathon/releases/download/1.0/AcademicBot.zip)
4.  Log in [Dialogflow](https://console.dialogflow.com/api-client/#/login) using your Google account, then import the settings file you just downloaded by following [this tutorial](https://dialogflow.com/docs/agents/export-import-restore)
5.  On the Dialogflow dashboard, click on "Integrations" and enable the "Web Demo." Then, click on the text "Web Demo" which will then show a modal with some code in it. Copy the url inside the `<iframe>` tag and paste it in the `link` variable in `client/secret.js`
6.  The first time you run the application or whenever you have changes in your front-end code, you have to use `npm run start-dev` to start the server. (This command will start the webpack along with the server scripts)
7.  Go to `localhost:8080` in a browser and log in as one of the user you see in the seed file `script/seed.js`
