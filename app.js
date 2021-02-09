if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}
const express = require('express');
const routers = require('./routers');
const app = express();
const port = 3000;
const { errorHandlers } = require('./middlewares')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routers);
app.use(errorHandlers)

app.listen(port, () => {
  console.log(`this app listening at http://localhost:${port}`);
});
