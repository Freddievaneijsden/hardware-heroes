const express = require('express');
const cors = require('cors');
const app = express();

const port = 3000;

app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const userRoute = require('./routes/userRoute');
app.use(userRoute);

app.listen(port, () => console.log(`Hardware Heroes listening on port ${port}!`));

