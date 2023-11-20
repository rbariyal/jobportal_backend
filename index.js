const express = require("express");
const dotenv= require("dotenv")
dotenv.config();
const cors=require('cors');
const connectTOMongo=require("./db");


const app = express();

let port =process.env.PORT;
if(port==null || port=="")
{
  port=8000;
}
app.use(cors());
app.use(express.json());
app.use("/api/auth",require("./routes/auth"))
app.use("/api/jobs",require("./routes/jobs"))

app.listen(port, () => {
    console.log(`server listening at port  ${port}`);
  });