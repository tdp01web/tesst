import bodyParser from "body-parser";
import "dotenv/config.js";
import express from "express";
import connectMongoDB from "./connect.js";
import router from "./routers/index.js";
import cors from "cors";
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());

const uri = process.env.MONGO_URI || null;
connectMongoDB(uri);

router(app);

app.listen(port, () => {
  console.log(`Khởi tạo thành công ${port}`);
});
