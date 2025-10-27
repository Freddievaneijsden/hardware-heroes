const express = require('express');
const cors = require('cors');
const app = express();

const port = 3000;

app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const userRoute = require('./routes/userRoute');
const loginRoute = require('./routes/loginRoute');
const componentRoute = require('./routes/componentRoute');
const progressRoute = require('./routes/progressRoute')
const quizRoute = require('./routes/quizRoute');

app.use(userRoute);
app.use(loginRoute);
app.use(componentRoute);
app.use(progressRoute);
app.use(quizRoute);

app.listen(port, () => console.log(`Hardware Heroes listening on port ${port}!`));

