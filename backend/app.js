const express = require('express');
const cors = require('cors');
const app = express();

const port = 3000;

app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const userRoute = require('./routes/userRoute');
const loginRoute = require('./routes/loginRoute');
app.use(userRoute);
app.use(loginRoute);

app.listen(port, () => console.log(`Hardware Heroes listening on port ${port}!`));

