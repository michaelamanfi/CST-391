const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello and welcome to my first NodeJS app with monitor!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
