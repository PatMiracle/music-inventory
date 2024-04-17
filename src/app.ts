import dotenv from "dotenv";

import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import createError from "http-errors";

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

// catch 404 and forward to error handler
app.use(function (_req: Request, _res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (
  err: { message: string; status: number },
  req: Request,
  res: Response
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).send("error");
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
