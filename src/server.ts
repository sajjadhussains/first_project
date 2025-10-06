import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

async function main() {
  try {
    // console.log("before");
    await mongoose.connect(config.database_url as string);
    // console.log("after");
    console.log(config.database_url);
    app.listen(config.port, () => {
      console.log(` app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
