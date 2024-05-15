const express = require('express');
const cors = require('cors');
const PORT = 3000;
const app = express();
const connectDB = require('./db/db_config');
const routes = require("./routes/todoRoutes");

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/api", routes);

// Connect to the database
connectDB().then(() => {
  //Listening on PORT after successful DB connection
  app.listen(PORT, () => {
    console.log(`Live at http://localhost:${PORT}`);
  });
}).catch(error => {
  console.error('Failed to connect to the database:', error);
});
