require("dotenv").config();
const express = require("express");
const app = express();
const dbConnect = require('./database');
const router = require("./routes");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const cors = require('cors');
const corsOption = {
  credentials:true,
  origin: ['http://localhost:3000'],
}
app.use(cors(corsOption));

dbConnect();
app.use("/storage", express.static("storage"));
const PORT = process.env.PORT || 5500;
app.use(express.json({limit:'5mb'}));
app.use(router);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
