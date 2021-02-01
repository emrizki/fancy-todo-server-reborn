const express = require('express');
const routers = require('./routers');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routers);

app.listen(port, () => {
  console.log(`this app listening at http://localhost:${port}`);
});
