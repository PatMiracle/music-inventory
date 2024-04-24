import dotenv from "dotenv";

import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";

import connectDb from "./db/connect";

import inventoryRoute from "./routes/inventory";
import compression from "compression";

import cors from "cors";

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

app.use(cors());

app.use("/inventory", inventoryRoute);

app.all("*", (_req: Request, res: Response) => {
  res.status(404).send(`cannot find ${_req.url}`);
});

async function main() {
  try {
    await connectDb();
    app.listen(port, () => console.log(`server running at port ${port}!`));
  } catch (error) {
    console.log(error);
  }
}
main();
