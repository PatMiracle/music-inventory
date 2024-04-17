import dotenv from "dotenv";

import express from "express";
import morgan from "morgan";
import errorHandler from "errorhandler";

import connectDb from "./db/connect";

import inventoryRoute from "./routes/inventory";
import compression from "compression";

// Populate DB
// import populate from "./db/populate";
// populate().catch((e) => console.log(e));

dotenv.config({ path: ".env" });

const port = process.env.PORT || 3000;
const app = express();

app.use(morgan("dev"));
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/inventory", inventoryRoute);

if (process.env.NODE_ENV === "development") {
  app.use(errorHandler());
}

async function main() {
  try {
    await connectDb();
    app.listen(port, () => console.log(`server running at port ${port}!`));
  } catch (error) {
    console.log(error);
  }
}
main();
